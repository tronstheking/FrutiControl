import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { formatUSD, formatBs, getTodayDateString } from '../../utils/formatters';

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5";

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
      setClient(''); setConcept(''); setAmount(''); setPhone(''); setDueDate(getTodayDateString());
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
    <Modal isOpen={isOpen} onClose={closeModal} title={modalData ? "✏️ Editar Fiado" : "📓 Anotar Fiado"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelCls}>Nombre del Cliente</label>
          <input type="text" required placeholder="Ej: Sra. María Pérez" value={client}
            onChange={(e) => setClient(e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Teléfono / WhatsApp</label>
          <input type="text" placeholder="Ej: 04121234567" value={phone}
            onChange={(e) => setPhone(e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Concepto / Frutas Acomodadas</label>
          <input type="text" required placeholder="Ej: 2kg Cambur + 1kg Fresa" value={concept}
            onChange={(e) => setConcept(e.target.value)} className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Monto Deuda ($ USD)</label>
            <input type="number" step="0.01" required placeholder="Ej: 12.50" value={amount}
              onChange={(e) => setAmount(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Fecha Acordada</label>
            <input type="date" required value={dueDate}
              onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
          </div>
        </div>

        {/* Live total preview */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase block">Deuda en Dólares</span>
            <span className="text-2xl font-black text-amber-700">{formatUSD(parsedAmount)}</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-gray-400 uppercase block">En Bolívares hoy</span>
            <span className="text-base font-black text-gray-700">{formatBs(parsedAmount, bcvRate)}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button type="button" onClick={closeModal}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
            Cancelar
          </button>
          <button type="submit"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-200 transition-colors">
            Anotar Fiado
          </button>
        </div>
      </form>
    </Modal>
  );
};
