import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { getTodayDateString } from '../../utils/formatters';

export const TransactionModal = () => {
  const { activeModal, modalData, closeModal, addTransaction } = useStore();

  const [description, setDescription] = useState('');
  const [type, setType] = useState('Egreso');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getTodayDateString());

  const isOpen = activeModal === 'expense' || activeModal === 'transaction';

  useEffect(() => {
    if (activeModal === 'expense') {
      setType('Egreso');
    } else if (modalData && modalData.type) {
      setType(modalData.type);
    } else {
      setType('Egreso');
    }
    setDescription('');
    setAmount('');
    setDate(getTodayDateString());
  }, [modalData, activeModal, isOpen]);

  if (!isOpen) return null;

  const parsedAmount = parseFloat(amount) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || parsedAmount <= 0) return;

    addTransaction({
      description: description.trim(),
      type,
      amount: parsedAmount,
      date
    });

    closeModal();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal} 
      title={type === 'Egreso' ? "🔴 Anotar Gasto / Egreso" : "🟢 Anotar Ingreso Directo"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Tipo de Movimiento</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('Egreso')}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                type === 'Egreso' ? 'bg-rose-950/80 border-rose-500 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <MinusCircle className="w-4 h-4" /> Egreso (Gasto)
            </button>
            <button
              type="button"
              onClick={() => setType('Ingreso')}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                type === 'Ingreso' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <PlusCircle className="w-4 h-4" /> Ingreso
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Descripción / Concepto</label>
          <input
            type="text"
            required
            placeholder={type === 'Egreso' ? "Ej: Flete de transporte, bolsas, hielo..." : "Ej: Venta directa sin POS..."}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Monto ($ USD)</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="Ej: 15.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Fecha</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
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
            className={`w-1/2 py-2.5 text-white font-bold rounded-xl text-xs shadow-lg transition-colors ${
              type === 'Egreso' ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
            }`}
          >
            Guardar Movimiento
          </button>
        </div>
      </form>
    </Modal>
  );
};
