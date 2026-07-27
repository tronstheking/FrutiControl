import React from 'react';
import { useStore } from '../store/useStore';
import { 
  BookMarked, 
  Plus, 
  HandCoins, 
  MessageSquareCode, 
  Edit3, 
  Trash2, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { formatUSD, formatBs, formatDate } from '../utils/formatters';

export const ReceivablesPage = () => {
  const { receivables, deleteReceivable, openModal, bcvRate } = useStore();

  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-amber-400" /> 📓 Cuaderno Digital de Fiados
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Reemplaza la libreta: deudas en $ USD que <strong>se recalculan automáticamente en Bolívares (Bs.) todos los días</strong> a la tasa BCV del momento.
          </p>
        </div>

        <button
          onClick={() => openModal('receivable')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> Anotar Fiado
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Concepto / Frutas</th>
                <th className="py-3 px-4">Monto ($ y Bs.)</th>
                <th className="py-3 px-4">Fecha Acordada</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {receivables.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No hay fiados anotados en el cuaderno digital.
                  </td>
                </tr>
              ) : (
                receivables.map((item) => {
                  const isPaid = item.status === 'Pagado';
                  const remaining = item.remainingAmount !== undefined ? Number(item.remainingAmount) : Number(item.amount);
                  const hasAbonos = item.abonos && item.abonos.length > 0;

                  const dueObj = new Date(item.dueDate || Date.now());
                  dueObj.setHours(0, 0, 0, 0);
                  const diffDays = Math.floor((todayObj - dueObj) / (1000 * 60 * 60 * 24));
                  const isOverdue = !isPaid && diffDays > 3;

                  // WhatsApp text
                  const cleanPhone = item.phone ? item.phone.replace(/\D/g, '') : '';
                  const phoneFormatted = cleanPhone.length >= 10 ? (cleanPhone.startsWith('58') ? cleanPhone : `58${cleanPhone.replace(/^0/, '')}`) : '';

                  const waMsg = encodeURIComponent(
                    `Hola ${item.client}, te saludamos de FrutiControl 🇻🇪.\n` +
                    `Te recordamos tu saldo de fiado por *${formatUSD(remaining)}* (${formatBs(remaining, bcvRate)}).\n` +
                    `Tasa BCV de hoy: ${bcvRate.toFixed(2)} Bs/$.\n` +
                    `¡Muchas gracias!`
                  );
                  const waUrl = phoneFormatted ? `https://wa.me/${phoneFormatted}?text=${waMsg}` : `https://wa.me/?text=${waMsg}`;

                  return (
                    <tr key={item.id} className={`hover:bg-slate-900/50 transition-colors ${isOverdue ? 'bg-rose-950/15' : ''}`}>
                      <td className="py-3.5 px-4">
                        <strong className="text-white text-xs font-bold block">{item.client}</strong>
                        {item.phone && <span className="text-[10px] text-slate-500 block font-mono">{item.phone}</span>}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-slate-200 block">{item.concept}</span>
                        {hasAbonos && (
                          <span className="text-[10px] font-semibold text-emerald-400 block">
                            ✓ {item.abonos.length} abono(s) realizado(s)
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <strong className={`text-xs font-black block ${isPaid ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {formatUSD(remaining)}
                        </strong>
                        <span className="text-[10px] text-slate-400 block font-medium">
                          {formatBs(remaining, bcvRate)}
                        </span>
                        {hasAbonos && !isPaid && (
                          <span className="text-[9px] text-slate-500 line-through block">
                            Inicial: {formatUSD(item.amount)}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-slate-300 block">{formatDate(item.dueDate)}</span>
                        {isOverdue && (
                          <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1 mt-0.5">
                            <AlertTriangle className="w-3 h-3" /> Hace {diffDays} días
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {isPaid ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Pagado
                          </span>
                        ) : isOverdue ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3" /> Vencido
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 w-fit">
                            Pendiente
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {!isPaid && (
                            <button
                              onClick={() => openModal('payReceivable', item)}
                              title="Registrar Cobro / Abono"
                              className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30 transition-colors"
                            >
                              <HandCoins className="w-4 h-4" />
                            </button>
                          )}
                          {!isPaid && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Enviar Recordatorio por WhatsApp"
                              className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 border border-emerald-500/30 transition-colors"
                            >
                              <MessageSquareCode className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => openModal('receivable', item)}
                            title="Editar"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Deseas borrar el fiado de ${item.client}?`)) {
                                deleteReceivable(item.id);
                              }
                            }}
                            title="Eliminar"
                            className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
