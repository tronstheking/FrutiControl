import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { getTodayDateString } from '../../utils/formatters';

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5";

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
      setSupplier(''); setConcept(''); setAmount(''); setDueDate(getTodayDateString());
    }
  }, [modalData, isOpen]);

  if (!isOpen) return null;

  const parsedAmount = parseFloat(amount) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!supplier.trim() || parsedAmount <= 0) return;
    const data = { supplier: supplier.trim(), concept: concept.trim() || 'Deuda de Mercancía', amount: parsedAmount, dueDate };
    if (modalData && modalData.id) {
      editPayable(modalData.id, data);
    } else {
      addPayable(data);
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={modalData ? "✏️ Editar Deuda" : "🧾 Registrar Deuda a Proveedor"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelCls}>Proveedor / Mayorista</label>
          <input type="text" required list="supplier-list-opts" placeholder="Ej: Frutícola Los Andes"
            value={supplier} onChange={(e) => setSupplier(e.target.value)} className={inputCls} />
          <datalist id="supplier-list-opts">
            {suppliers.map(s => <option key={s.id} value={s.name} />)}
          </datalist>
        </div>

        <div>
          <label className={labelCls}>Concepto</label>
          <input type="text" required placeholder="Ej: Factura #4050 (10 cestas de fresa)"
            value={concept} onChange={(e) => setConcept(e.target.value)} className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Monto Deuda ($ USD)</label>
            <input type="number" step="0.01" required placeholder="Ej: 150.00"
              value={amount} onChange={(e) => setAmount(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Fecha de Pago</label>
            <input type="date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
          </div>
        </div>

        {parsedAmount > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-sm">
            <span className="text-red-600 font-semibold">Deuda a registrar: </span>
            <span className="text-red-700 font-black">${parsedAmount.toFixed(2)} USD</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button type="button" onClick={closeModal}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
            Cancelar
          </button>
          <button type="submit"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-200 transition-colors">
            Guardar Deuda
          </button>
        </div>
      </form>
    </Modal>
  );
};
