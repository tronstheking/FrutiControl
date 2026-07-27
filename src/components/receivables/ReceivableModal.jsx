import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { formatUSD, formatBs, getTodayDateString } from '../../utils/formatters';

export const ReceivableModal = () => {
  const { activeModal, modalData, closeModal, addReceivable, editReceivable, bcvRate } = useStore();

  const [client, setClient] = useState('');
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [dueDate, setDueDate] = useState(getTodayDateString());

  const isOpen = activeModal === 'receivable';

  useEffect(() => {
    if (modalData) {
      setClient(modalData.client || '');
      setConcept(modalData.concept || '');
      setAmount(modalData.amount !== undefined ? modalData.amount : '');
      setPhone(modalData.phone || '');
      setDueDate(modalData.dueDate || getTodayDateString());
    } else {
      setClient('');
      setConcept('');
      setAmount('');
      setPhone('');
      setDueDate(getTodayDateString());
    }
  }, [modalData, isOpen]);

  if (!isOpen) return null;

  const parsedAmount = parseFloat(amount) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!client.trim() || parsedAmount <= 0) return;

    const data = {
      client: client.trim(),
      concept: concept.trim() || 'Fiado de Frutas',
      amount: parsedAmount,
      phone: phone.trim(),
      dueDate
    };

    if (modalData && modalData.id) {
      editReceivable(modalData.id, data);
    } else {
      addReceivable(data);
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={modalData ? "Editar Fiado" : "📓 Anotar Fiado en Cuaderno Digital"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Nombre del Cliente</label>
          <input
            type="text"
            required
            placeholder="Ej: Sra. María Pérez"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Teléfono / WhatsApp</label>
          <input
            type="text"
            placeholder="Ej: 04121234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Concepto / Frutas Acomodadas</label>
          <input
            type="text"
            required
            placeholder="Ej: 2kg Cambur + 1kg Fresa"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Monto Deuda ($ USD)</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="Ej: 12.50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Fecha Acordada</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Dynamic Dual Currency Auto-Recalculated Banner */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3.5 flex justify-between items-center text-xs">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase block">Deuda Fija ($ USD)</span>
            <span className="text-lg font-black text-amber-400">{formatUSD(parsedAmount)}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Hoy en Bolívares (BCV)</span>
            <span className="text-xs font-bold text-white">{formatBs(parsedAmount, bcvRate)}</span>
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
            className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-colors"
          >
            Anotar Fiado
          </button>
        </div>
      </form>
    </Modal>
  );
};
