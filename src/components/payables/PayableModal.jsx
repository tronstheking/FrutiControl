import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { getTodayDateString } from '../../utils/formatters';

export const PayableModal = () => {
  const { activeModal, modalData, closeModal, addPayable, editPayable, suppliers } = useStore();

  const [supplier, setSupplier] = useState('');
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(getTodayDateString());

  const isOpen = activeModal === 'payable';

  useEffect(() => {
    if (modalData) {
      setSupplier(modalData.supplier || '');
      setConcept(modalData.concept || '');
      setAmount(modalData.amount !== undefined ? modalData.amount : '');
      setDueDate(modalData.dueDate || getTodayDateString());
    } else {
      setSupplier('');
      setConcept('');
      setAmount('');
      setDueDate(getTodayDateString());
    }
  }, [modalData, isOpen]);

  if (!isOpen) return null;

  const parsedAmount = parseFloat(amount) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!supplier.trim() || parsedAmount <= 0) return;

    const data = {
      supplier: supplier.trim(),
      concept: concept.trim() || 'Deuda de Mercancía',
      amount: parsedAmount,
      dueDate
    };

    if (modalData && modalData.id) {
      editPayable(modalData.id, data);
    } else {
      addPayable(data);
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={modalData ? "Editar Deuda a Proveedor" : "Registrar Cuenta por Pagar"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Proveedor / Mayorista</label>
          <input
            type="text"
            required
            list="supplier-list-opts"
            placeholder="Ej: Frutícola Los Andes"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
          <datalist id="supplier-list-opts">
            {suppliers.map(s => <option key={s.id} value={s.name} />)}
          </datalist>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Concepto</label>
          <input
            type="text"
            required
            placeholder="Ej: Factura #4050 (10 cestas de fresa)"
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
              placeholder="Ej: 150.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Fecha de Pago</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
            className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-colors"
          >
            Guardar Deuda
          </button>
        </div>
      </form>
    </Modal>
  );
};
