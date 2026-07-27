import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { PackagePlus } from 'lucide-react';
import { formatUSD, formatBs } from '../../utils/formatters';

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5";

export const RestockModal = () => {
  const { activeModal, modalData, closeModal, restockFruit, bcvRate } = useStore();
  const [addedKg, setAddedKg] = useState('');
  const [costKg, setCostKg] = useState('');
  const [logExpense, setLogExpense] = useState(true);

  const isOpen = activeModal === 'restock';

  useEffect(() => {
    if (modalData) {
      setCostKg(modalData.costKg || (modalData.priceKg ? (Number(modalData.priceKg) * 0.7).toFixed(2) : ''));
      setAddedKg('');
    }
  }, [modalData, isOpen]);

  if (!isOpen || !modalData) return null;

  const parsedAddedKg = parseFloat(addedKg) || 0;
  const parsedCost = parseFloat(costKg) || 0;
  const totalCostUSD = parsedAddedKg * parsedCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parsedAddedKg <= 0) return;
    restockFruit(modalData.id, parsedAddedKg, parsedCost, logExpense);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={`📦 Re-surtir: ${modalData.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-sm text-emerald-700 font-semibold">
          Stock actual: <strong>{modalData.kg} kg</strong>
        </div>

        <div>
          <label className={labelCls}>Kilos a Agregar (kg)</label>
          <input type="number" step="0.1" required placeholder="Ej: 50"
            value={addedKg} onChange={(e) => setAddedKg(e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Precio Costo Mayorista / kg ($)</label>
          <input type="number" step="0.01" required placeholder="Ej: 0.50"
            value={costKg} onChange={(e) => setCostKg(e.target.value)} className={inputCls} />
        </div>

        <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 cursor-pointer">
          <input type="checkbox" id="restock-expense-check" checked={logExpense}
            onChange={(e) => setLogExpense(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
          <span className="text-xs text-gray-700 font-semibold">Registrar compra como gasto de hoy</span>
        </label>

        {totalCostUSD > 0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase block">Total Pagado</span>
              <span className="text-xl font-black text-blue-700">{formatUSD(totalCostUSD)}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 uppercase block">En Bolívares</span>
              <span className="text-sm font-bold text-gray-700">{formatBs(totalCostUSD, bcvRate)}</span>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button type="button" onClick={closeModal}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
            Cancelar
          </button>
          <button type="submit"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-colors">
            <PackagePlus className="w-4 h-4" /> + Sumar Kilos
          </button>
        </div>
      </form>
    </Modal>
  );
};
