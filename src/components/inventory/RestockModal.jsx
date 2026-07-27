import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { PackagePlus } from 'lucide-react';
import { formatUSD, formatBs } from '../../utils/formatters';

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
    <Modal isOpen={isOpen} onClose={closeModal} title={`📦 Re-surtir Stock (${modalData.name})`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300">
          <p className="font-semibold">Actual en stock: <strong>{modalData.kg} kg</strong></p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Kilos Comprados a Agregar (kg)
          </label>
          <input
            type="number"
            step="0.1"
            required
            placeholder="Ej: 50"
            value={addedKg}
            onChange={(e) => setAddedKg(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Precio Costo Mayorista / kg ($ USD)
          </label>
          <input
            type="number"
            step="0.01"
            required
            placeholder="Ej: 0.50"
            value={costKg}
            onChange={(e) => setCostKg(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="restock-expense-check"
            checked={logExpense}
            onChange={(e) => setLogExpense(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 bg-slate-900"
          />
          <label htmlFor="restock-expense-check" className="text-xs text-slate-300 font-semibold cursor-pointer">
            Registrar este pago de compra como Gasto/Egreso de hoy
          </label>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Pagado Mayorista</span>
            <span className="text-lg font-black text-emerald-400">{formatUSD(totalCostUSD)}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Bolívares (BCV)</span>
            <span className="text-xs font-bold text-white">{formatBs(totalCostUSD, bcvRate)}</span>
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
            className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <PackagePlus className="w-4 h-4" /> + Sumar Kilos
          </button>
        </div>
      </form>
    </Modal>
  );
};
