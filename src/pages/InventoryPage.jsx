import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  Boxes, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  PackagePlus, 
  ShoppingCart, 
  Apple, 
  AlertTriangle 
} from 'lucide-react';
import { formatUSD, formatBs, getFruitEmoji } from '../utils/formatters';

export const InventoryPage = () => {
  const { inventory, deleteFruit, openModal, addToPosCart, bcvRate } = useStore();
  const [search, setSearch] = useState('');

  // Totals calculations
  let totalCostUSD = 0;
  let totalSalesUSD = 0;

  inventory.forEach((item) => {
    const kg = Number(item.kg) || 0;
    const priceKg = Number(item.priceKg) || 0;
    const costKg = Number(item.costKg) || (priceKg * 0.7);

    totalCostUSD += kg * costKg;
    totalSalesUSD += kg * priceKg;
  });

  const potentialProfitUSD = totalSalesUSD - totalCostUSD;
  const avgMarginPct = totalCostUSD > 0 ? ((potentialProfitUSD / totalCostUSD) * 100).toFixed(1) : 0;

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.supplier && item.supplier.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Boxes className="w-6 h-6 text-emerald-400" /> Stock de Frutas & Márgenes
          </h2>
          <p className="text-xs text-slate-400 mt-1">Control de kilos, márgenes de ganancia y re-surtido de mercancía</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('waste')}
            className="px-3.5 py-2 bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 transition-colors flex items-center gap-1.5"
          >
            <Apple className="w-4 h-4" /> Registrar Merma
          </button>
          <button
            onClick={() => openModal('fruit')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Nueva Fruta
          </button>
        </div>
      </div>

      {/* Summary Cards: Inversión vs Venta vs Ganancia */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <small className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">📦 Inversión (A Costo)</small>
          <div className="text-xl font-black text-white">{formatUSD(totalCostUSD)}</div>
          <span className="text-xs text-slate-400 font-medium">{formatBs(totalCostUSD, bcvRate)}</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <small className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">💵 Valor Venta Esperado</small>
          <div className="text-xl font-black text-emerald-400">{formatUSD(totalSalesUSD)}</div>
          <span className="text-xs text-slate-400 font-medium">{formatBs(totalSalesUSD, bcvRate)}</span>
        </div>

        <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
          <small className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">🟢 Ganancia Potencial</small>
          <div className="text-xl font-black text-white">{formatUSD(potentialProfitUSD)}</div>
          <span className="text-xs text-emerald-400 font-extrabold">+{avgMarginPct}% Margen Prom.</span>
        </div>
      </div>

      {/* Search & Inventory Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden space-y-4">
        <div className="p-4 border-b border-slate-800">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar fruta o proveedor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Fruta</th>
                <th className="py-3 px-4">Stock (kg)</th>
                <th className="py-3 px-4">Precio Venta vs Costo</th>
                <th className="py-3 px-4">Margen Ganancia</th>
                <th className="py-3 px-4">Valor Venta ($ y Bs.)</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No hay frutas registradas en el inventario.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => {
                  const kg = Number(item.kg) || 0;
                  const priceKg = Number(item.priceKg) || 0;
                  const costKg = Number(item.costKg) || (priceKg * 0.7);
                  const totalSalesVal = kg * priceKg;
                  const unitProfit = priceKg - costKg;
                  const marginPct = costKg > 0 ? ((unitProfit / costKg) * 100).toFixed(0) : 0;
                  const isLow = kg <= 10;
                  const emoji = getFruitEmoji(item.name);

                  return (
                    <tr key={item.id} className={`hover:bg-slate-900/50 transition-colors ${isLow ? 'bg-rose-950/10' : ''}`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{emoji}</span>
                          <div>
                            <strong className="text-white text-xs font-bold block">{item.name}</strong>
                            {isLow && (
                              <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> ¡Quedan pocos kg!
                              </span>
                            )}
                            {item.supplier && <span className="text-[10px] text-slate-500 block">{item.supplier}</span>}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-extrabold text-xs">
                        <span className={isLow ? 'text-rose-400' : 'text-white'}>{kg} kg</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-white block">Venta: {formatUSD(priceKg)}</span>
                        <span className="text-[10px] text-slate-500">Costo: {formatUSD(costKg)}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          +{formatUSD(unitProfit)}/kg (+{marginPct}%)
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-xs">
                        <span className="text-white block">{formatUSD(totalSalesVal)}</span>
                        <span className="text-[10px] text-slate-400">{formatBs(totalSalesVal, bcvRate)}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openModal('restock', item)}
                            title="+ Re-surtir kilos"
                            className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30 transition-colors"
                          >
                            <PackagePlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              addToPosCart(item);
                              openModal('pos');
                            }}
                            title="Vender en POS"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal('fruit', item)}
                            title="Editar"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Deseas eliminar ${item.name} del inventario?`)) {
                                deleteFruit(item.id);
                              }
                            }}
                            title="Eliminar"
                            className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
