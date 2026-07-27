import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { Apple, Trash2 } from 'lucide-react';
import { formatUSD, formatBs, getFruitEmoji } from '../../utils/formatters';

export const WasteModal = () => {
  const { activeModal, closeModal, inventory, registerWaste, bcvRate, addToast } = useStore();

  const [selectedId, setSelectedId] = useState('');
  const [wasteKg, setWasteKg] = useState('');
  const [reason, setReason] = useState('Dañada / Podrida');
  const [logExpense, setLogExpense] = useState(true);

  const isOpen = activeModal === 'waste';

  if (!isOpen) return null;

  const selectedFruit = inventory.find(f => f.id === Number(selectedId));
  const parsedWasteKg = parseFloat(wasteKg) || 0;
  const costKg = selectedFruit ? (Number(selectedFruit.costKg) || Number(selectedFruit.priceKg) * 0.7) : 0;
  const lossUSD = parsedWasteKg * costKg;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFruit || parsedWasteKg <= 0) {
      addToast("Selecciona una fruta e indica los kg de merma mayores a 0.", "warning");
      return;
    }

    if (parsedWasteKg > Number(selectedFruit.kg)) {
      addToast(`Los kg de merma no pueden superar el stock disponible (${selectedFruit.kg} kg).`, "warning");
      return;
    }

    registerWaste(selectedFruit.id, parsedWasteKg, reason, logExpense);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="🍎 Registrar Merma / Pérdida de Fruta">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Seleccionar Fruta Afectada
          </label>
          <select
            required
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">-- Selecciona Fruta --</option>
            {inventory.map(f => (
              <option key={f.id} value={f.id}>
                {getFruitEmoji(f.name)} {f.name} ({f.kg} kg dispon.)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Kilos Perdidos / Dañados (kg)
          </label>
          <input
            type="number"
            step="0.1"
            required
            placeholder="Ej: 3.5"
            value={wasteKg}
            onChange={(e) => setWasteKg(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Motivo de la Merma
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="Dañada / Podrida">🍏 Fruta Madura / Podrida</option>
            <option value="Golpe de Transporte">🚚 Golpeada en Transporte</option>
            <option value="Consumo Interno">🍽️ Consumo Interno / Muestra</option>
            <option value="Ajuste de Balanza">⚖️ Ajuste de Pesaje</option>
          </select>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="waste-expense-check"
            checked={logExpense}
            onChange={(e) => setLogExpense(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500 bg-slate-900"
          />
          <label htmlFor="waste-expense-check" className="text-xs text-slate-300 font-semibold cursor-pointer">
            Registrar pérdida como Gasto/Egreso a costo de compra
          </label>
        </div>

        {/* Calculated loss preview */}
        <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3.5 flex justify-between items-center text-xs">
          <div>
            <span className="text-[10px] font-bold text-rose-400 uppercase block">Valor Pérdida A Costo</span>
            <span className="text-lg font-black text-rose-400">{formatUSD(lossUSD)}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-rose-400 uppercase block">Bolívares (BCV)</span>
            <span className="text-xs font-bold text-white">{formatBs(lossUSD, bcvRate)}</span>
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
            className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-600/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Descontar Merma
          </button>
        </div>
      </form>
    </Modal>
  );
};
