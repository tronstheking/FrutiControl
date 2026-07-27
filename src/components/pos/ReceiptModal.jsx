import React from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { CheckCircle2, MessageSquareCode, X } from 'lucide-react';
import { formatUSD, formatBs, getFruitEmoji } from '../../utils/formatters';

export const ReceiptModal = () => {
  const { activeModal, modalData, closeModal, bcvRate } = useStore();

  const isOpen = activeModal === 'receipt';

  if (!isOpen || !modalData) return null;

  const itemsText = modalData.items.map(i => `• ${i.kg} kg ${i.name} (${formatUSD(i.priceKg)}/kg) = ${formatUSD(i.kg * i.priceKg)}`).join("\n");

  const whatsappText = encodeURIComponent(
`*RECIBO DE VENTA - FrutiControl VE* 🇻🇪
-----------------------------------
*Nº Ticket:* #${modalData.ticketNo}
*Fecha:* ${modalData.date}
*Cliente:* ${modalData.client}
*Método Pago:* ${modalData.payMethod}

*PRODUCTOS:*
${itemsText}

*TOTAL PROCESADO:*
💵 *USD:* ${formatUSD(modalData.totalUSD)}
🇻🇪 *Bolívares:* ${formatBs(modalData.totalUSD, bcvRate)}
*Tasa BCV:* ${bcvRate.toFixed(2)} Bs/$
-----------------------------------
_¡Gracias por su compra!_`
  );

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="✅ ¡Venta Procesada con Éxito!" maxWidth="max-w-md">
      <div className="space-y-4 text-gray-800">
        <div className="text-center space-y-1">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
          <h3 className="text-lg font-black text-gray-900">Ticket #${modalData.ticketNo}</h3>
          <p className="text-xs text-gray-400 font-medium">{modalData.date} • {modalData.client}</p>
        </div>

        {/* Items Summary Card */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between text-xs text-gray-500 border-b border-emerald-100 pb-2 font-medium">
            <span>Método: <strong className="text-gray-900">{modalData.payMethod}</strong></span>
            <span>BCV: <strong className="text-gray-900">{bcvRate.toFixed(2)} Bs.</strong></span>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {modalData.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs font-medium">
                <span className="text-gray-700">{getFruitEmoji(item.name)} {item.kg}kg {item.name}</span>
                <span className="font-bold text-gray-900">{formatUSD(item.kg * item.priceKg)}</span>
              </div>
            ))}
          </div>

          <div className="bg-emerald-600 p-3 rounded-xl flex justify-between items-center text-white shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-emerald-200 uppercase block">TOTAL PAGADO</span>
              <span className="text-lg font-black">{formatUSD(modalData.totalUSD)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-200 uppercase block">Bolívares (BCV)</span>
              <span className="text-sm font-bold">{formatBs(modalData.totalUSD, bcvRate)}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquareCode className="w-4 h-4" /> Compartir Recibo por WhatsApp
          </a>

          <button
            onClick={closeModal}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold text-xs rounded-xl transition-colors"
          >
            Cerrar Ticket
          </button>
        </div>
      </div>
    </Modal>
  );
};
