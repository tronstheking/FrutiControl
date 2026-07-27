import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { MinusCircle, PlusCircle, Zap } from 'lucide-react';
import { getTodayDateString } from '../../utils/formatters';

const quickExpensePresets = [
  { label: '⛽ Gasolina', value: 'Gasolina / Combustible' },
  { label: '🛍️ Bolsas', value: 'Bolsas Plásticas' },
  { label: '🚚 Flete', value: 'Flete / Transporte' },
  { label: '🧊 Hielo', value: 'Hielo / Refrigeración' },
  { label: '🥪 Almuerzo', value: 'Almuerzo / Comida' },
  { label: '🧹 Limpieza', value: 'Artículos de Limpieza' },
  { label: '🍎 Compra Fruta', value: 'Compra de Fruta Lote' },
  { label: '💡 Servicios', value: 'Pago Servicio / Local' },
];

export const TransactionModal = () => {
  const { activeModal, modalData, closeModal, addTransaction } = useStore();

  const [description, setDescription] = useState('');
  const [type, setType] = useState('Egreso');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getTodayDateString());
  const amountInputRef = useRef(null);

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
      title={type === 'Egreso' ? "💸 Anotar Gasto / Egreso" : "🟢 Anotar Ingreso Directo"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Tipo de Movimiento</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('Egreso')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                type === 'Egreso' ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <MinusCircle className="w-4 h-4 text-rose-600" /> Egreso (Gasto)
            </button>
            <button
              type="button"
              onClick={() => setType('Ingreso')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                type === 'Ingreso' ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" /> Ingreso
            </button>
          </div>
        </div>

        {/* Quick expense presets chips */}
        {type === 'Egreso' && (
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3">
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wide mb-2">
              <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Gastos Rápidos (Toca para autocompletar):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickExpensePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleSelectPreset(preset.value)}
                  className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all active:scale-95 ${
                    description === preset.value
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-gray-700 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Descripción / Concepto</label>
          <input
            type="text"
            required
            placeholder={type === 'Egreso' ? "Ej: Gasolina, flete, bolsas, hielo..." : "Ej: Venta directa sin POS..."}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-bold text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Monto ($ USD)</label>
            <input
              ref={amountInputRef}
              type="number"
              step="0.01"
              required
              placeholder="Ej: 15.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-bold text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Fecha</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 font-bold text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="w-1/2 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold rounded-xl text-xs transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`w-1/2 py-3 text-white font-black rounded-xl text-xs shadow-lg transition-colors ${
              type === 'Egreso' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
            }`}
          >
            Guardar Movimiento
          </button>
        </div>
      </form>
    </Modal>
  );
};
