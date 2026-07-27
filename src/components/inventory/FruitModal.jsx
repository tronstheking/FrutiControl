import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { formatUSD, formatBs, getFruitEmoji } from '../../utils/formatters';
import { Camera, Trash2 } from 'lucide-react';

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5";

export const FruitModal = () => {
  const { activeModal, modalData, closeModal, addFruit, editFruit, suppliers, bcvRate } = useStore();

  const [name, setName] = useState('');
  const [kg, setKg] = useState('');
  const [priceKg, setPriceKg] = useState('');
  const [costKg, setCostKg] = useState('');
  const [supplier, setSupplier] = useState('');
  const [image, setImage] = useState(null);

  const isOpen = activeModal === 'fruit';

  useEffect(() => {
    if (modalData) {
      setName(modalData.name || '');
      setKg(modalData.kg !== undefined ? modalData.kg : '');
      setPriceKg(modalData.priceKg !== undefined ? modalData.priceKg : '');
      setCostKg(modalData.costKg !== undefined ? modalData.costKg : '');
      setSupplier(modalData.supplier || '');
      setImage(modalData.image || null);
    } else {
      setName(''); setKg(''); setPriceKg(''); setCostKg(''); setSupplier(''); setImage(null);
    }
  }, [modalData, isOpen]);

  if (!isOpen) return null;

  const parsedKg = parseFloat(kg) || 0;
  const parsedPrice = parseFloat(priceKg) || 0;
  const parsedCost = parseFloat(costKg) || 0;
  const totalValUSD = parsedKg * parsedPrice;
  const margin = parsedCost > 0 ? (((parsedPrice - parsedCost) / parsedCost) * 100).toFixed(0) : 0;
  const currentEmoji = getFruitEmoji(name);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || parsedKg < 0 || parsedPrice < 0) return;
    const data = {
      name: name.trim(),
      kg: parsedKg,
      priceKg: parsedPrice,
      costKg: parsedCost || (parsedPrice * 0.7),
      supplier,
      image
    };
    if (modalData && modalData.id) {
      editFruit(modalData.id, data);
    } else {
      addFruit(data);
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={modalData ? "✏️ Editar Producto" : "🍊 Agregar Producto / Fruta"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Image Upload section */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 text-center space-y-2">
          <label className={labelCls}>Imagen del Producto</label>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-3xl overflow-hidden shadow-xs shrink-0">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span>{currentEmoji}</span>
              )}
            </div>

            <div className="space-y-1 text-left">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-sm">
                <Camera className="w-3.5 h-3.5" /> Subir Imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>

              {image ? (
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="block text-[11px] font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  Quitar foto personalizada
                </button>
              ) : (
                <p className="text-[10px] font-medium text-gray-400">
                  Si no subes foto, se asignará el icono {currentEmoji} automáticamente.
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className={labelCls}>Nombre de la Fruta / Producto</label>
          <input type="text" required placeholder="Ej: Cambur Criollo, Tobo de Fresa, Bolsa 5kg..." value={name}
            onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Cantidad (kg o Unid)</label>
            <input type="number" step="0.1" required placeholder="Ej: 150" value={kg}
              onChange={(e) => setKg(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Precio Venta / kg ($)</label>
            <input type="number" step="0.01" required placeholder="Ej: 0.80" value={priceKg}
              onChange={(e) => setPriceKg(e.target.value)} className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Precio Costo Compra / kg ($)</label>
          <input type="number" step="0.01" required placeholder="Ej: 0.50" value={costKg}
            onChange={(e) => setCostKg(e.target.value)} className={inputCls} />
          <p className="text-xs text-gray-400 mt-1">Para calcular el margen real y valor de mermas.</p>
        </div>

        {/* Live preview */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase block">Valor Lote</span>
            <span className="text-xl font-black text-emerald-700">{formatUSD(totalValUSD)}</span>
            <span className="text-xs text-emerald-600 block">{formatBs(totalValUSD, bcvRate)}</span>
          </div>
          {parsedCost > 0 && (
            <div className="text-right">
              <span className="text-xs font-bold text-gray-500 uppercase block">Margen</span>
              <span className={`text-xl font-black ${Number(margin) > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {margin}%
              </span>
            </div>
          )}
        </div>

        <div>
          <label className={labelCls}>Proveedor Asignado</label>
          <select value={supplier} onChange={(e) => setSupplier(e.target.value)} className={inputCls}>
            <option value="">-- Seleccionar Proveedor --</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button type="button" onClick={closeModal}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
            Cancelar
          </button>
          <button type="submit"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-200 transition-colors">
            {modalData ? 'Guardar Cambios' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
