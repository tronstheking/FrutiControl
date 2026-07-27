import React, { useState, useMemo, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Search, 
  Mic, 
  SlidersHorizontal, 
  Plus, 
  ChevronRight, 
  Minus, 
  Trash2,
  Check
} from 'lucide-react';
import { formatUSD, formatBs } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

// Memoized Product Card Component to prevent re-renders of catalog items
const ProductCard = React.memo(({ item, onAdd }) => {
  const stockKg = Number(item.kg || 0);
  const price = Number(item.priceKg || 0);
  const hasImage = !!item.image;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col justify-between relative group hover:border-[#059669] transition-all shadow-sm">
      {/* Stock Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#10b981] text-white shadow-sm">
          {stockKg}kg
        </span>
      </div>

      {/* Product Image */}
      <div className="w-full h-32 rounded-xl bg-slate-50 overflow-hidden mb-2.5 flex items-center justify-center">
        {hasImage ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <span className="text-4xl">🍎</span>
        )}
      </div>

      {/* Title & Price */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
        <div className="flex items-center justify-between mt-1">
          <div>
            <span className="text-sm font-extrabold text-[#047857]">{formatUSD(price)}</span>
            <span className="text-[10px] text-slate-400 font-medium">/kg</span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => onAdd(item)}
            className="w-8 h-8 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const PosPage = React.memo(() => {
  const navigate = useNavigate();

  // Atomic Zustand Selectors
  const inventory = useStore(state => state.inventory);
  const posCart = useStore(state => state.posCart);
  const addToPosCart = useStore(state => state.addToPosCart);
  const updatePosCartQty = useStore(state => state.updatePosCartQty);
  const removePosCartItem = useStore(state => state.removePosCartItem);
  const clearPosCart = useStore(state => state.clearPosCart);
  const processPosCheckout = useStore(state => state.processPosCheckout);
  const bcvRate = useStore(state => state.bcvRate);

  const [search, setSearch] = useState('');
  const [payMethod, setPayMethod] = useState('Efectivo USD');
  const [clientName, setClientName] = useState('');
  const [cartExpanded, setCartExpanded] = useState(false);

  // Memoized Filtered Inventory
  const filteredInventory = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return inventory;
    return inventory.filter(f => f.name.toLowerCase().includes(term));
  }, [inventory, search]);

  // Memoized Cart Calculations
  const { totalCartUSD, totalCartItems } = useMemo(() => {
    return {
      totalCartUSD: posCart.reduce((sum, i) => sum + (Number(i.kg || 0) * Number(i.priceKg || 0)), 0),
      totalCartItems: posCart.reduce((sum, i) => sum + Number(i.kg || 0), 0)
    };
  }, [posCart]);

  // Memoized Callbacks
  const handleAddToCart = useCallback((item) => {
    addToPosCart(item);
  }, [addToPosCart]);

  const handleCheckout = useCallback(() => {
    if (posCart.length === 0) return;
    processPosCheckout(clientName, payMethod);
  }, [posCart.length, processPosCheckout, clientName, payMethod]);

  return (
    <div className="space-y-4 pb-28 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-1.5 text-[#047857] hover:bg-emerald-50 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-black text-[#047857]">Punto de Venta</h2>
        </div>

        <button
          onClick={() => setCartExpanded(!cartExpanded)}
          className="relative p-2 rounded-xl text-[#047857] hover:bg-emerald-50 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {posCart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#059669] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
              {posCart.length}
            </span>
          )}
        </button>
      </div>

      {/* Round Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-20 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669] shadow-sm"
        />
        <div className="absolute right-3 top-2.5 flex items-center gap-1.5 text-slate-400">
          <button className="p-1 hover:text-slate-700">
            <Mic className="w-4 h-4" />
          </button>
          <button className="p-1 hover:text-slate-700">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Method Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-bold">
        {['Efectivo USD', 'Pago Móvil', 'Zelle', 'BCV Bs.', 'Fiado / Crédito'].map((method) => {
          const isActive = payMethod === method;
          return (
            <button
              key={method}
              onClick={() => setPayMethod(method)}
              className={`px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shrink-0 transition-all ${
                isActive
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isActive && <Check className="w-3.5 h-3.5" />}
              <span>{method}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Touch Fruit Product Catalog */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredInventory.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onAdd={handleAddToCart}
          />
        ))}
      </div>

      {/* Sliding Order Cart Drawer / Bottom Sheet */}
      {posCart.length > 0 && (
        <div className="bg-white border-t-2 border-[#059669] rounded-2xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Resumen de Compra ({posCart.length} productos)
            </h3>
            <button
              onClick={clearPosCart}
              className="text-xs text-rose-600 font-bold hover:underline"
            >
              Vaciar Carrito
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {posCart.map((item, idx) => (
              <div key={item.id || idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl text-xs">
                <div>
                  <strong className="text-slate-900 font-bold block">{item.name}</strong>
                  <span className="text-[11px] text-slate-500 font-medium">{formatUSD(item.priceKg)} / kg</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                    <button
                      onClick={() => updatePosCartQty(idx, -0.5)}
                      className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-extrabold text-slate-900">{item.kg}kg</span>
                    <button
                      onClick={() => updatePosCartQty(idx, 0.5)}
                      className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <strong className="text-xs font-extrabold text-[#047857] w-14 text-right">
                    {formatUSD(item.kg * item.priceKg)}
                  </strong>

                  <button
                    onClick={() => removePosCartItem(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {payMethod === 'Fiado / Crédito' && (
            <input
              type="text"
              placeholder="Nombre del Cliente..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            />
          )}
        </div>
      )}

      {/* Fixed Checkout Bar */}
      <div className="fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-slate-200 p-3 shadow-2xl md:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">
              {posCart.length} Artículos ({totalCartItems.toFixed(1)}kg)
            </span>
            <strong className="text-lg font-black text-[#047857] block leading-tight">
              {formatUSD(totalCartUSD)}
            </strong>
            <span className="text-[10px] text-slate-400 font-semibold block">
              {formatBs(totalCartUSD, bcvRate)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={posCart.length === 0}
            className={`px-8 py-3.5 rounded-2xl font-black text-xs text-white shadow-lg flex items-center gap-2 transition-all ${
              posCart.length > 0
                ? 'bg-[#047857] hover:bg-[#065f46] shadow-emerald-800/20 active:scale-95'
                : 'bg-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Pagar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});
