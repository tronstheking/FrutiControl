import React, { useState, useMemo } from 'react';
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

export const InventoryPage = React.memo(() => {
  const inventory = useStore(state => state.inventory);
  const deleteFruit = useStore(state => state.deleteFruit);
  const openModal = useStore(state => state.openModal);
  const addToPosCart = useStore(state => state.addToPosCart);
  const bcvRate = useStore(state => state.bcvRate);

  const [search, setSearch] = useState('');

  // Memoized Totals
  const { totalCostUSD, totalSalesUSD, potentialProfitUSD, avgMarginPct } = useMemo(() => {
    let costSum = 0;
    let salesSum = 0;

    inventory.forEach((item) => {
      const kg = Number(item.kg) || 0;
      const priceKg = Number(item.priceKg) || 0;
      const costKg = Number(item.costKg) || (priceKg * 0.7);

      costSum += kg * costKg;
      salesSum += kg * priceKg;
    });

    const profit = salesSum - costSum;
    const margin = costSum > 0 ? ((profit / costSum) * 100).toFixed(1) : 0;

    return {
      totalCostUSD: costSum,
      totalSalesUSD: salesSum,
      potentialProfitUSD: profit,
      avgMarginPct: margin
    };
  }, [inventory]);

  // Memoized Filtered Inventory
  const filteredInventory = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return inventory;
    return inventory.filter((item) =>
      item.name.toLowerCase().includes(term) ||
      (item.supplier && item.supplier.toLowerCase().includes(term))
    );
  }, [inventory, search]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Boxes className="w-6 h-6 text-[#047857]" /> Stock de Frutas & Márgenes
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Control de kilos, márgenes de ganancia y re-surtido de mercancía</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('waste')}
            className="px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 transition-colors flex items-center gap-1.5"
          >
            <Apple className="w-4 h-4" /> Registrar Merma
          </button>
          <button
            onClick={() => openModal('fruit')}
            className="px-4 py-2.5 bg-[#047857] hover:bg-[#065f46] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Nueva Fruta
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <small className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">📦 Inversión (A Costo)</small>
          <div className="text-xl font-black text-slate-900">{formatUSD(totalCostUSD)}</div>
          <span className="text-xs text-slate-400 font-medium">{formatBs(totalCostUSD, bcvRate)}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <small className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">💵 Valor Venta Esperado</small>
          <div className="text-xl font-black text-[#047857]">{formatUSD(totalSalesUSD)}</div>
          <span className="text-xs text-slate-400 font-medium">{formatBs(totalSalesUSD, bcvRate)}</span>
        </div>

        <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 shadow-sm space-y-1">
          <small className="text-[10px] font-extrabold text-[#047857] uppercase tracking-wider block">🟢 Ganancia Potencial</small>
          <div className="text-xl font-black text-slate-900">{formatUSD(potentialProfitUSD)}</div>
          <span className="text-xs text-[#059669] font-black">+{avgMarginPct}% Margen Prom.</span>
        </div>
      </div>

      {/* Search & Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden space-y-4">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar fruta o proveedor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Fruta</th>
                <th className="py-3 px-4">Stock (kg)</th>
                <th className="py-3 px-4">Precio Venta vs Costo</th>
                <th className="py-3 px-4">Margen Ganancia</th>
                <th className="py-3 px-4">Valor Venta ($ y Bs.)</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
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
                    <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${isLow ? 'bg-rose-50/40' : ''}`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{emoji}</span>
                          <div>
                            <strong className="text-slate-900 text-xs font-bold block">{item.name}</strong>
                            {isLow && (
                              <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> ¡Quedan pocos kg!
                              </span>
                            )}
                            {item.supplier && <span className="text-[10px] text-slate-400 block font-medium">{item.supplier}</span>}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-black text-xs">
                        <span className={isLow ? 'text-rose-600' : 'text-slate-900'}>{kg} kg</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-slate-900 block">Venta: {formatUSD(priceKg)}</span>
                        <span className="text-[10px] text-slate-400 font-medium">Costo: {formatUSD(costKg)}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#047857] border border-emerald-200">
                          +{formatUSD(unitProfit)}/kg (+{marginPct}%)
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-xs">
                        <span className="text-slate-900 font-black block">{formatUSD(totalSalesVal)}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{formatBs(totalSalesVal, bcvRate)}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openModal('restock', item)}
                            title="+ Re-surtir kilos"
                            className="p-2 rounded-xl bg-emerald-50 text-[#047857] hover:bg-emerald-100 border border-emerald-200 transition-colors"
                          >
                            <PackagePlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              addToPosCart(item);
                              openModal('pos');
                            }}
                            title="Vender en POS"
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal('fruit', item)}
                            title="Editar"
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
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
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
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
});
