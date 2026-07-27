import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { MinusCircle, PlusCircle, Zap, DollarSign, Calendar, Tag, ArrowRight } from 'lucide-react';
import { getTodayDateString, formatBs, formatUSD } from '../../utils/formatters';

const quickExpensePresets = [
  { label: '⛽ Gasolina', value: 'Gasolina / Combustible', icon: '⛽' },
  { label: '🛍️ Bolsas', value: 'Bolsas Plásticas', icon: '🛍️' },
  { label: '🚚 Flete', value: 'Flete / Transporte', icon: '🚚' },
  { label: '🧊 Hielo', value: 'Hielo / Refrigeración', icon: '🧊' },
  { label: '🥪 Almuerzo', value: 'Almuerzo / Comida', icon: '🥪' },
  { label: '🧹 Limpieza', value: 'Artículos de Limpieza', icon: '🧹' },
  { label: '🍎 Compra Fruta', value: 'Compra de Fruta Lote', icon: '🍎' },
  { label: '💡 Servicios', value: 'Pago Servicio / Local', icon: '💡' },
];

export const TransactionModal = () => {
  const { activeModal, closeModal, addTransaction, bcvRate } = useStore();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getTodayDateString());
  const amountInputRef = useRef(null);

  const isOpen = activeModal === 'expense' || activeModal === 'transaction';

  useEffect(() => {
    setDescription('');
    setAmount('');
    setDate(getTodayDateString());
  }, [activeModal, isOpen]);

  if (!isOpen) return null;

  const parsedAmount = parseFloat(amount) || 0;

  const handleSelectPreset = (presetValue) => {
    setDescription(presetValue);
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || parsedAmount <= 0) return;

    addTransaction({
      description: description.trim(),
      type: 'Egreso',
      amount: parsedAmount,
      date
    });

    closeModal();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal} 
      title="💸 Registrar Gasto / Egreso"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick expense presets chips */}
        <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-black text-rose-800 uppercase tracking-wide">
              <Zap className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse" /> Presets Rápidos (Toca 1 vez)
            </span>
            <span className="text-[10px] font-bold text-rose-500">Auto-enfoca el monto</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickExpensePresets.map((preset) => {
              const isSelected = description === preset.value;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleSelectPreset(preset.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 flex items-center gap-1 ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200 font-extrabold'
                      : 'bg-white text-gray-700 border-rose-200 hover:border-rose-400 hover:bg-rose-50'
                  }`}
                >
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
            <Tag className="w-3.5 h-3.5 text-rose-600" /> Descripción / Concepto del Gasto
          </label>
          <input
            type="text"
            required
            placeholder="Ej: Gasolina, flete, bolsas, hielo..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold text-sm focus:outline-none focus:border-rose-500 focus:bg-white transition-all placeholder-gray-400 shadow-xs"
          />
        </div>

        {/* Amount & Date Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              <DollarSign className="w-3.5 h-3.5 text-rose-600" /> Monto ($ USD)
            </label>
            <input
              ref={amountInputRef}
              type="number"
              step="0.01"
              required
              placeholder="Ej: 15.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-black text-base focus:outline-none focus:border-rose-500 focus:bg-white transition-all placeholder-gray-400 shadow-xs"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" /> Fecha
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-gray-900 font-bold text-sm focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Live BCV Calculation Badge */}
        {parsedAmount > 0 && (
          <div className="p-3 rounded-xl border flex items-center justify-between transition-all bg-rose-50 border-rose-200 text-rose-900">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">Equivalente BCV</span>
              <span className="text-sm font-black">{formatBs(parsedAmount, bcvRate)}</span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/80 border border-black/5 shadow-xs">
              Tasa: {bcvRate.toFixed(2)} Bs/$
            </span>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="w-1/3 py-3.5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold rounded-xl text-xs transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-2/3 py-3.5 text-white font-black rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-rose-200"
          >
            <span>Guardar Gasto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </Modal>
  );
};
