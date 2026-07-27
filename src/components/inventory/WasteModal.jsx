import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { Trash2 } from 'lucide-react';
import { formatUSD, formatBs, getFruitEmoji } from '../../utils/formatters';

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5";

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
    if (!selectedFruit || parsedWasteKg <= 0) { addToast('Selecciona una fruta e indica los kg de merma.', 'warning'); return; }
    if (parsedWasteKg > Number(selectedFruit.kg)) { addToast(`No puedes superar el stock disponible (${selectedFruit.kg} kg).`, 'warning'); return; }
    registerWaste(selectedFruit.id, parsedWasteKg, reason, logExpense);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="📉 Registrar Merma">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelCls}>Fruta Afectada</label>
          <select required value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className={inputCls}>
            <option value="">-- Selecciona Fruta --</option>
            {inventory.map(f => (
              <option key={f.id} value={f.id}>{getFruitEmoji(f.name)} {f.name} ({f.kg} kg)</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Kilos Perdidos / Dañados</label>
          <input type="number" step="0.1" required placeholder="Ej: 3.5"
            value={wasteKg} onChange={(e) => setWasteKg(e.target.value)} className={inputCls} />
          {selectedFruit && (
            <p className="text-xs text-gray-400 mt-1">Stock disponible: {selectedFruit.kg} kg</p>
          )}
        </div>

        <div>
          <label className={labelCls}>Motivo de la Merma</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls}>
            <option value="Dañada / Podrida">🍏 Fruta Madura / Podrida</option>
            <option value="Golpe de Transporte">🚚 Golpeada en Transporte</option>
            <option value="Consumo Interno">🍽️ Consumo Interno / Muestra</option>
            <option value="Ajuste de Balanza">⚖️ Ajuste de Pesaje</option>
          </select>
        </div>

        <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 cursor-pointer">
          <input type="checkbox" id="waste-expense-check" checked={logExpense}
            onChange={(e) => setLogExpense(e.target.checked)}
            className="w-4 h-4 rounded text-red-600 focus:ring-red-500" />
          <span className="text-xs text-gray-700 font-semibold">Registrar pérdida como gasto a precio de costo</span>
        </label>

        {lossUSD > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase block">Valor Pérdida</span>
              <span className="text-xl font-black text-red-600">{formatUSD(lossUSD)}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 uppercase block">En Bolívares</span>
              <span className="text-sm font-bold text-gray-700">{formatBs(lossUSD, bcvRate)}</span>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button type="button" onClick={closeModal}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
            Cancelar
          </button>
          <button type="submit"
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-red-200 flex items-center justify-center gap-2 transition-colors">
            <Trash2 className="w-4 h-4" /> Descontar Merma
          </button>
        </div>
      </form>
    </Modal>
  );
};
