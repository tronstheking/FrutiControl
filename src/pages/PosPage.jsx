import React from 'react';
import { useStore } from '../store/useStore';
import { Store, Plus, ShoppingCart, AlertTriangle } from 'lucide-react';
import { formatUSD, getFruitEmoji } from '../utils/formatters';

export const PosPage = () => {
  const { inventory, openModal, addToPosCart } = useStore();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Store className="w-6 h-6 text-emerald-400" /> Terminal POS de Ventas
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Selecciona o toca cualquier fruta del catálogo para abrir la caja registradora táctil
          </p>
        </div>

        <button
          onClick={() => openModal('pos')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 shrink-0"
        >
          <ShoppingCart className="w-4 h-4" /> Abrir POS Completo
        </button>
      </div>

      {/* Touch Grid Catalog */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          👉 Toca una fruta para vender:
        </h3>

        {inventory.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <Store className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm font-medium">No hay frutas registradas en el catálogo de la caja registradora.</p>
            <button
              onClick={() => openModal('fruit')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              + Agregar Fruta Manual
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {inventory.map((fruit) => {
              const emoji = getFruitEmoji(fruit.name);
              const isLow = Number(fruit.kg) <= 10;
              return (
                <div
                  key={fruit.id}
                  onClick={() => {
                    addToPosCart(fruit);
                    openModal('pos');
                  }}
                  className={`pos-touch-card p-4 rounded-2xl border cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    isLow 
                      ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60' 
                      : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{emoji}</span>
                    <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">{fruit.name}</h4>
                    <p className="text-sm font-black text-emerald-400 mt-0.5">{formatUSD(fruit.priceKg)}<span className="text-[10px] text-slate-400 font-normal">/kg</span></p>
                    <span className={`text-[10px] font-semibold block mt-1 ${isLow ? 'text-rose-400 font-bold flex items-center gap-0.5' : 'text-slate-400'}`}>
                      {isLow && <AlertTriangle className="w-3 h-3" />} {fruit.kg} kg dispon.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
