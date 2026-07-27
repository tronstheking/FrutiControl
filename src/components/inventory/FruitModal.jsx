import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { formatUSD, formatBs } from '../../utils/formatters';

export const FruitModal = () => {
  const { activeModal, modalData, closeModal, addFruit, editFruit, suppliers, bcvRate } = useStore();

  const [name, setName] = useState('');
  const [kg, setKg] = useState('');
  const [priceKg, setPriceKg] = useState('');
  const [costKg, setCostKg] = useState('');
  const [supplier, setSupplier] = useState('');

  const isOpen = activeModal === 'fruit';

  useEffect(() => {
    if (modalData) {
      setName(modalData.name || '');
      setKg(modalData.kg !== undefined ? modalData.kg : '');
      setPriceKg(modalData.priceKg !== undefined ? modalData.priceKg : '');
      setCostKg(modalData.costKg !== undefined ? modalData.costKg : '');
      setSupplier(modalData.supplier || '');
    } else {
      setName('');
      setKg('');
      setPriceKg('');
      setCostKg('');
      setSupplier('');
    }
  }, [modalData, isOpen]);

  if (!isOpen) return null;

  const parsedKg = parseFloat(kg) || 0;
  const parsedPrice = parseFloat(priceKg) || 0;
  const totalValUSD = parsedKg * parsedPrice;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || parsedKg < 0 || parsedPrice < 0) return;

    const data = {
      name: name.trim(),
      kg: parsedKg,
      priceKg: parsedPrice,
      costKg: parseFloat(costKg) || (parsedPrice * 0.7),
      supplier
    };

    if (modalData && modalData.id) {
      editFruit(modalData.id, data);
    } else {
      addFruit(data);
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={modalData ? "Editar Fruta" : "Agregar Fruta al Inventario"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Nombre de la Fruta</label>
          <input
            type="text"
            required
            placeholder="Ej: Cambur Criollo..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Cantidad (kg)</label>
            <input
              type="number"
              step="0.1"
              required
              placeholder="Ej: 150"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Precio Venta / kg ($)</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="Ej: 0.80"
              value={priceKg}
              onChange={(e) => setPriceKg(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Precio Costo Compra / kg ($)</label>
          <input
            type="number"
            step="0.01"
            required
            placeholder="Ej: 0.50"
            value={costKg}
            onChange={(e) => setCostKg(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
          <small className="text-[10px] text-slate-400 mt-1 block">Para calcular el margen real y valor de mermas.</small>
        </div>

        {/* Calculated preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex justify-between items-center text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Valor Lote ($ USD)</span>
            <span className="text-base font-black text-emerald-400">{formatUSD(totalValUSD)}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Valor Lote (BCV)</span>
            <span className="text-xs font-bold text-white">{formatBs(totalValUSD, bcvRate)}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Proveedor Asignado</label>
          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">-- Seleccionar Proveedor --</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
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
            Guardar Fruta
          </button>
        </div>
      </form>
    </Modal>
  );
};
