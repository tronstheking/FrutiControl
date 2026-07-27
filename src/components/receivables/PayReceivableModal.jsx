import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { HandCoins } from 'lucide-react';
import { formatUSD, formatBs } from '../../utils/formatters';

export const PayReceivableModal = () => {
  const { activeModal, modalData, closeModal, payReceivable, bcvRate } = useStore();
  const [payAmount, setPayAmount] = useState('');
  const [isFull, setIsFull] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('📱 Pago Móvil');

  const isOpen = activeModal === 'payReceivable';
  if (!isOpen || !modalData) return null;

  const remaining = modalData.remainingAmount !== undefined ? Number(modalData.remainingAmount) : Number(modalData.amount);
  const parsedPay = isFull ? remaining : (parseFloat(payAmount) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parsedPay <= 0) return;
    payReceivable(modalData.id, parsedPay, isFull, paymentMethod);
    closeModal();
  };

  const paymentMethods = [
    { label: '📱 Pago Móvil (Bs)', value: '📱 Pago Móvil' },
    { label: '💵 Efectivo Divisas ($)', value: '💵 Efectivo Divisas' },
    { label: '💳 Punto de Venta (Bs)', value: '💳 Punto de Venta' },
    { label: '💵 Efectivo Bolívares (Bs)', value: '💵 Efectivo Bolívares' },
    { label: '🏦 Transferencia (Zelle/Otros)', value: '🏦 Transferencia' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={`💰 Cobrar / Registrar Abono: ${modalData.client}`}>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Balance */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase block">Saldo Pendiente</span>
            <span className="text-2xl font-black text-amber-700">{formatUSD(remaining)}</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-gray-400 uppercase block">En Bolívares</span>
            <span className="text-base font-bold text-gray-700">{formatBs(remaining, bcvRate)}</span>
          </div>
        </div>

        {/* Payment type toggle */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tipo de Pago</label>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setIsFull(true)}
              className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                isFull ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}>
              Pago Total<br />
              <span className="text-xs font-semibold opacity-80">{formatUSD(remaining)}</span>
            </button>
            <button type="button" onClick={() => setIsFull(false)}
              className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                !isFull ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}>
              Abono Parcial
            </button>
          </div>
        </div>

        {!isFull && (
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Monto del Abono ($ USD)</label>
            <input type="number" step="0.01" required
              placeholder={`Máx: ${remaining.toFixed(2)}`}
              value={payAmount} onChange={(e) => setPayAmount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors" />
          </div>
        )}

        {/* Payment Method Selector */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Método de Pago del Abono</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          >
            {paymentMethods.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Confirm amount */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center text-sm">
          <span className="font-semibold text-emerald-700">Total a registrar:</span>
          <span className="font-extrabold text-emerald-700">{formatUSD(parsedPay)} · {formatBs(parsedPay, bcvRate)}</span>
        </div>

        <div className="flex gap-2 pt-1">
          <button type="button" onClick={closeModal}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
            Cancelar
          </button>
          <button type="submit"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-colors">
            <HandCoins className="w-4 h-4" /> Registrar Cobro
          </button>
        </div>
      </form>
    </Modal>
  );
};
