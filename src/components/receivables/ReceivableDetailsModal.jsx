import React from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { formatUSD, formatBs, formatDate } from '../../utils/formatters';
import { HandCoins, Trash2, Calendar, Receipt, CreditCard, History } from 'lucide-react';

export const ReceivableDetailsModal = () => {
  const { activeModal, modalData, closeModal, openModal, deleteReceivable, bcvRate } = useStore();

  const isOpen = activeModal === 'receivableDetails';
  if (!isOpen || !modalData) return null;

  const initialAmount = Number(modalData.amount || 0);
  const remaining = modalData.remainingAmount !== undefined ? Number(modalData.remainingAmount) : initialAmount;
  const totalPaid = initialAmount - remaining;
  const abonosList = modalData.abonos || [];

  const handlePayClick = () => {
    closeModal();
    setTimeout(() => {
      openModal('payReceivable', modalData);
    }, 150);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar fiado de ${modalData.client}?`)) {
      deleteReceivable(modalData.id);
      closeModal();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={`📋 Historial de Deuda: ${modalData.client}`}>
      <div className="space-y-4">
        
        {/* Balance Card Header */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white shadow-lg shadow-amber-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-100">Saldo Deudor Pendiente</span>
                <h3 className="text-3xl font-black text-white mt-0.5">{formatUSD(remaining)}</h3>
                <span className="text-xs text-amber-100 font-semibold">{formatBs(remaining, bcvRate)}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black shadow-xs ${
                remaining === 0 ? 'bg-emerald-400 text-emerald-950' : 'bg-amber-900/40 text-amber-100'
              }`}>
                {remaining === 0 ? 'PAGADO' : 'PENDIENTE'}
              </span>
            </div>

            {/* Summary mini breakdown */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/20 text-xs">
              <div>
                <span className="text-amber-100/80 font-medium block">Monto Original:</span>
                <span className="font-bold text-white">{formatUSD(initialAmount)}</span>
              </div>
              <div>
                <span className="text-amber-100/80 font-medium block">Total Abonado:</span>
                <span className="font-bold text-emerald-200">{formatUSD(totalPaid)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Concept details */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
            <Receipt className="w-3.5 h-3.5 text-emerald-600" /> Concepto / Detalle
          </div>
          <p className="text-sm font-bold text-gray-900">{modalData.concept || 'Sin descripción'}</p>
          <div className="flex items-center gap-1 text-xs text-gray-400 font-medium pt-1">
            <Calendar className="w-3.5 h-3.5" /> Registrado el {formatDate(modalData.date || Date.now())}
          </div>
        </div>

        {/* Abonos History List */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase mb-2">
            <History className="w-3.5 h-3.5 text-emerald-600" /> Historial de Abonos ({abonosList.length})
          </div>

          {abonosList.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-400 font-semibold">No se han registrado abonos todavía.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {abonosList.map((abono, idx) => {
                const methodLabel = abono.method || '📱 Pago Móvil';
                return (
                  <div key={abono.id || idx} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-emerald-700">+{formatUSD(abono.amount)}</span>
                        <span className="text-[10px] text-gray-400">({formatBs(abono.amount, bcvRate)})</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 block mt-0.5">
                        {methodLabel}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                      {formatDate(abono.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleDelete}
            className="w-11 h-11 bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 rounded-xl flex items-center justify-center border border-red-100 shrink-0 transition-colors"
            title="Eliminar Fiado"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {remaining > 0 && (
            <button
              type="button"
              onClick={handlePayClick}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-colors"
            >
              <HandCoins className="w-4 h-4" /> + Registrar Nuevo Abono
            </button>
          )}
        </div>

      </div>
    </Modal>
  );
};
