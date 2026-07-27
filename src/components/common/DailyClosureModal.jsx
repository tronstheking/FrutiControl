import React from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from './Modal';
import { Share2, Copy, MessageSquareCode } from 'lucide-react';
import { formatUSD, formatBs, getTodayDateString, formatDate } from '../../utils/formatters';

export const DailyClosureModal = () => {
  const { activeModal, closeModal, transactions, receivables, inventory, bcvRate, addToast } = useStore();

  const isOpen = activeModal === 'dailyClosure';

  if (!isOpen) return null;

  const todayStr = getTodayDateString();
  const dateObj = new Date();
  const formattedToday = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;

  const todayTransactions = transactions.filter(t => t.date === todayStr);
  const todayIncome = todayTransactions.filter(t => t.type === 'Ingreso').reduce((sum, t) => sum + Number(t.amount), 0);
  const todayExpense = todayTransactions.filter(t => t.type === 'Egreso').reduce((sum, t) => sum + Number(t.amount), 0);
  const todaySalesCount = todayTransactions.filter(t => t.type === 'Ingreso').length;
  const todayNet = todayIncome - todayExpense;

  const todayReceivables = receivables.filter(r => r.dueDate === todayStr && r.status === 'Pendiente');
  const lowStockItems = inventory.filter(i => Number(i.kg) <= 10);

  const reportText = 
`📊 *REPORTE DE CIERRE DE CAJA* - FrutiControl 🇻🇪
📅 *Fecha:* ${formattedToday}
💵 *Tasa BCV:* ${bcvRate.toFixed(2)} Bs/$

🛒 *Ventas del Día:* ${formatUSD(todayIncome)} (${formatBs(todayIncome, bcvRate)})
🔢 *Nº Ventas:* ${todaySalesCount}
💸 *Gastos del Día:* ${formatUSD(todayExpense)} (${formatBs(todayExpense, bcvRate)})
💰 *GANANCIA NETA DÍA:* ${formatUSD(todayNet)} (${formatBs(todayNet, bcvRate)})

📓 *Fiados Anotados Hoy:* ${todayReceivables.length} pendiente(s)
⚠️ *Alerta Stock Bajo (Surtir Mercado):*
${lowStockItems.length > 0 ? lowStockItems.map(i => `  • ${i.name}: quedan *${i.kg} kg*`).join("\n") : `  • ¡Inventario completo, no hay faltantes!`}

¡Cierre de jornada completado con FrutiControl 🚀`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(reportText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText).then(() => {
      addToast("¡Reporte de Cierre copiado al portapapeles!", "success");
    }).catch(() => {
      addToast("No se pudo copiar automáticamente.", "warning");
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="📊 Cierre de Caja del Día" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
          {reportText}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors border border-slate-700 text-sm"
          >
            <Copy className="w-4 h-4" /> Copiar Texto
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-emerald-600/20"
          >
            <MessageSquareCode className="w-4 h-4" /> Enviar por WhatsApp
          </a>
        </div>
      </div>
    </Modal>
  );
};
