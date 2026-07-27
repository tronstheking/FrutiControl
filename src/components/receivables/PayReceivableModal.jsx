import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { HandCoins } from 'lucide-react';
import { formatUSD, formatBs } from '../../utils/formatters';

export const PayReceivableModal = () => {
  const { activeModal, modalData, closeModal, payReceivable, bcvRate } = useStore();
  const [payAmount, setPayAmount] = useState('');
  const [isFull, setIsFull] = useState(true);

  const isOpen = activeModal === 'payReceivable';

  if (!isOpen || !modalData) return null;

  const remaining = modalData.remainingAmount !== undefined ? Number(modalData.remainingAmount) : Number(modalData.amount);
  const parsedPay = isFull ? remaining : (parseFloat(payAmount) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parsedPay <= 0) return;
    payReceivable(modalData.id, parsedPay, isFull);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={`💵 Registrar Cobro / Abono (${modalData.client})`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Saldo Pendiente</span>
            <span className="text-lg font-black text-amber-400">{formatUSD(remaining)}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Equivalente Hoy (BCV)</span>
            <span className="text-xs font-bold text-white">{formatBs(remaining, bcvRate)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Tipo de Pago</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsFull(true)}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                isFull ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              Pago Completo ({formatUSD(remaining)})
            </button>
            <button
              type="button"
              onClick={() => setIsFull(false)}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                !isFull ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              Abono Parcial
            </button>
          </div>
        </div>

        {!isFull && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Monto del Abono ($ USD)</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder={`Máx: ${remaining.toFixed(2)}`}
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}

        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex justify-between items-center text-xs">
          <span className="font-bold text-emerald-400">Total a registrar como ingreso:</span>
          <span className="font-extrabold text-white">{formatUSD(parsedPay)} ({formatBs(parsedPay, bcvRate)})</span>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <HandCoins className="w-4 h-4" /> Guardar Pago
          </button>
        </div>
      </form>
    </Modal>
  );
};
