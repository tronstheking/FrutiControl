import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { formatUSD, formatBs, getFruitEmoji } from '../utils/formatters';
import { Search, Plus, PackagePlus, AlertTriangle, ShoppingCart, Pencil, Trash2 } from 'lucide-react';

export const InventoryPage = React.memo(() => {
  const inventory = useStore(state => state.inventory);
  const deleteFruit = useStore(state => state.deleteFruit);
  const openModal = useStore(state => state.openModal);
  const addToPosCart = useStore(state => state.addToPosCart);
  const bcvRate = useStore(state => state.bcvRate);
  const [search, setSearch] = useState('');

  const { totalCostUSD, totalSalesUSD, potentialProfitUSD } = useMemo(() => {
    let cost = 0, sales = 0;
    inventory.forEach(f => {
      const kg = Number(f.kg) || 0;
      const price = Number(f.priceKg) || 0;
      const costKg = Number(f.costKg) || price * 0.7;
      cost += kg * costKg;
      sales += kg * price;
    });
    return { totalCostUSD: cost, totalSalesUSD: sales, potentialProfitUSD: sales - cost };
  }, [inventory]);

  const filteredInventory = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return inventory;
    return inventory.filter(f => f.name.toLowerCase().includes(q) || (f.supplier || '').toLowerCase().includes(q));
  }, [inventory, search]);

  return (
    <div className="space-y-4 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-gray-900">Inventario</h2>
        <div className="flex gap-2">
          <button
            onClick={() => openModal('waste')}
            className="action-btn action-btn-amber py-2 px-3 min-h-0 flex-row text-xs gap-1.5 rounded-xl"
            style={{flexDirection:'row', minHeight: 'auto', padding: '8px 12px'}}
          >
            📉 Merma
          </button>
          <button
            onClick={() => openModal('fruit')}
            className="flex items-center gap-1.5 bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-3 gap-2">
        <div className="stat-tile">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Costo</p>
          <p className="text-sm font-black text-gray-900 mt-0.5">{formatUSD(totalCostUSD)}</p>
        </div>
        <div className="stat-tile">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Precio Venta</p>
          <p className="text-sm font-black text-emerald-600 mt-0.5">{formatUSD(totalSalesUSD)}</p>
        </div>
        <div className="stat-tile">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Ganancia</p>
          <p className="text-sm font-black text-emerald-600 mt-0.5">{formatUSD(potentialProfitUSD)}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar fruta o proveedor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="app-input pl-10"
        />
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {filteredInventory.length === 0 ? (
          <div className="py-12 text-center text-gray-400 px-4">
            <p className="text-4xl mb-2">📦</p>
            <p className="font-bold text-gray-700 text-sm">Sin productos en el inventario</p>
            <p className="text-xs text-gray-400 mt-1">Toca "+ Agregar" para añadir productos o restaura la lista inicial</p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => openModal('fruit')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                + Agregar Producto
              </button>
            </div>
          </div>
        ) : (
          filteredInventory.map((item, i) => {
            const kg = Number(item.kg) || 0;
            const priceKg = Number(item.priceKg) || 0;
            const costKg = Number(item.costKg) || priceKg * 0.7;
            const unitProfit = priceKg - costKg;
            const marginPct = costKg > 0 ? ((unitProfit / costKg) * 100).toFixed(0) : 0;
            const isLow = kg <= 10;
            const emoji = getFruitEmoji(item.name);

            return (
              <div key={item.id} className="list-row gap-2.5">
                {/* Left: emoji + info (clickable to edit) */}
                <div
                  onClick={() => openModal('fruit', item)}
                  className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0 border border-gray-100 overflow-hidden group-hover:border-emerald-300 transition-colors">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling && (e.target.nextSibling.style.display = 'block'); }}
                      />
                    ) : null}
                    <span style={{ display: item.image ? 'none' : 'block' }}>{emoji}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate group-hover:text-emerald-700 transition-colors">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs font-semibold ${isLow ? 'text-red-500' : 'text-gray-500'}`}>
                        {isLow && '⚠️ '}{kg} kg
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs font-semibold text-emerald-600">{formatUSD(priceKg)}/kg</span>
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +{marginPct}% margen
                    </span>
                  </div>
                </div>

                {/* Right: actions (PackagePlus, Pencil, Trash2) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openModal('restock', item)}
                    className="w-9 h-9 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-100"
                    title="📦 Re-surtir / Sumar Kilos"
                  >
                    <PackagePlus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openModal('fruit', item)}
                    className="w-9 h-9 rounded-xl bg-blue-50 active:bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-100"
                    title="✏️ Editar Producto / Foto"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { if (window.confirm(`¿Eliminar ${item.name} del inventario?`)) deleteFruit(item.id); }}
                    className="w-9 h-9 rounded-xl bg-red-50 active:bg-red-100 text-red-600 flex items-center justify-center border border-red-100"
                    title="🗑️ Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});
