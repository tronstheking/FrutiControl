import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Receipt, 
  Wallet, 
  Calculator, 
  Bolt, 
  Handshake,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { formatUSD, formatBs, getFruitEmoji } from '../../utils/formatters';

export const PosTerminalModal = () => {
  const { 
    activeModal, 
    closeModal, 
    inventory, 
    posCart, 
    addToPosCart, 
    updatePosCartQty, 
    removePosCartItem, 
    clearPosCart,
    processPosCheckout,
    bcvRate,
    addToast
  } = useStore();

  const [search, setSearch] = useState('');
  const [payMethod, setPayMethod] = useState('Pago Móvil (Bs.)');
  const [clientName, setClientName] = useState('');
  const [paidAmount, setPaidAmount] = useState('');

  const isOpen = activeModal === 'pos';

  if (!isOpen) return null;

  const totalUSD = posCart.reduce((sum, item) => sum + (item.kg * item.priceKg), 0);

  // Vueltos calculation logic
  const paidVal = parseFloat(paidAmount) || 0;
  const totalBs = totalUSD * bcvRate;
  let changeText = "Ingresa monto pagado";
  let isInsufficient = false;

  if (paidVal > 0) {
    if (bcvRate > 1 && paidVal > totalUSD * 1.5) {
      // User paid in Bolívares
      const changeBs = paidVal - totalBs;
      if (changeBs < -0.05) {
        changeText = "Insuficiente (Bs.)";
        isInsufficient = true;
      } else {
        const changeUSD = changeBs / bcvRate;
        changeText = `${formatUSD(Math.max(0, changeUSD))} (${formatBs(Math.max(0, changeUSD), bcvRate)})`;
      }
    } else {
      // User paid in USD
      const diffUSD = paidVal - totalUSD;
      if (diffUSD < -0.005) {
        changeText = "Insuficiente (USD)";
        isInsufficient = true;
      } else {
        changeText = `${formatUSD(Math.max(0, diffUSD))} (${formatBs(Math.max(0, diffUSD), bcvRate)})`;
      }
    }
  }

  const filteredInventory = inventory.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckout = (e) => {
    if (e) e.preventDefault();
    if (posCart.length === 0) {
      addToast("El ticket del POS está vacío. Añade una fruta primero.", "warning");
      return;
    }

    if (payMethod === "Fiado / Crédito" && !clientName.trim()) {
      addToast("Debes ingresar el nombre del cliente para registrar a fiado.", "warning");
      return;
    }

    processPosCheckout(clientName || "Cliente Mostrador", payMethod);
  };

  const handleDirectFiado = () => {
    if (posCart.length === 0) {
      addToast("El ticket del POS está vacío.", "warning");
      return;
    }
    let name = clientName.trim();
    if (!name) {
      name = prompt("🤝 Nombre del cliente para el FIADO:");
      if (!name || !name.trim()) {
        addToast("Debes ingresar el nombre del cliente para el fiado.", "warning");
        return;
      }
    }
    processPosCheckout(name.trim(), "Fiado / Crédito");
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="🛒 Terminal POS Gourmet Frutícola" maxWidth="max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        
        {/* Left Column: Fruit Catalog Touch Grid */}
        <div className="lg:col-span-7 flex flex-col space-y-4 border-b lg:border-b-0 lg:border-r border-slate-800 pb-4 lg:pb-0 lg:pr-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="🔍 Toca una fruta o busca (ej: Cambur...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
            {filteredInventory.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500 space-y-2">
                <ShoppingBag className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-sm">No se encontraron frutas en inventario.</p>
              </div>
            ) : (
              filteredInventory.map((fruit) => {
                const emoji = getFruitEmoji(fruit.name);
                const isLow = Number(fruit.kg) <= 10;
                return (
                  <div
                    key={fruit.id}
                    onClick={() => addToPosCart(fruit)}
                    className={`pos-touch-card p-3 rounded-2xl border cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                      isLow 
                        ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60' 
                        : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{emoji}</span>
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">{fruit.name}</h4>
                      <p className="text-sm font-black text-emerald-400 mt-0.5">{formatUSD(fruit.priceKg)}<span className="text-[10px] text-slate-400 font-normal">/kg</span></p>
                      <span className={`text-[10px] font-semibold block mt-1 ${isLow ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                        {isLow ? '⚠️ Low stock' : `${fruit.kg} kg dispon.`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Order Ticket & Checkout */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Ticket Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" /> Ticket de Orden
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {posCart.length} Ítems
            </span>
          </div>

          {/* Cart Items List */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 flex-1">
            {posCart.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs space-y-1">
                <ShoppingBag className="w-6 h-6 mx-auto opacity-40" />
                <p>Toca una fruta del catálogo a la izquierda para añadir al ticket.</p>
              </div>
            ) : (
              posCart.map((item, idx) => {
                const emoji = getFruitEmoji(item.name);
                return (
                  <div key={idx} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-bold text-white truncate">{emoji} {item.name}</p>
                      <p className="text-[10px] text-slate-400">{formatUSD(item.priceKg)}/kg</p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => updatePosCartQty(idx, -0.5)}
                        className="text-slate-400 hover:text-white font-bold p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-white w-10 text-center">{item.kg.toFixed(1)}kg</span>
                      <button
                        onClick={() => updatePosCartQty(idx, 0.5)}
                        className="text-slate-400 hover:text-white font-bold p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right w-16 px-1">
                      <span className="font-extrabold text-emerald-400 block">{formatUSD(item.kg * item.priceKg)}</span>
                    </div>

                    <button
                      onClick={() => removePosCartItem(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Form Options */}
          <form onSubmit={handleCheckout} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                  <Wallet className="w-3 h-3 text-emerald-400" /> Método Pago
                </label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Pago Móvil (Bs.)">📱 Pago Móvil (Bs.)</option>
                  <option value="Efectivo USD ($)">💵 Efectivo USD ($)</option>
                  <option value="Efectivo Bs.">🇻🇪 Efectivo Bs.</option>
                  <option value="Zelle ($)">⚡ Zelle ($)</option>
                  <option value="Punto de Venta (Bs.)">💳 Punto / Tarjeta</option>
                  <option value="Fiado / Crédito">🤝 Fiado (Deuda)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Cliente
                </label>
                <input
                  type="text"
                  placeholder="Mostrador"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Paid & Change Box */}
            {payMethod !== "Fiado / Crédito" && (
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">PAGA CON ($ O BS.)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ej: 20.00"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">VUELTOS / CAMBIO</label>
                  <div className="h-8 flex items-center px-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-bold">
                    <span className={isInsufficient ? "text-rose-400 font-bold" : "text-amber-400 font-bold truncate"}>
                      {changeText}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Total Box */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <small className="text-[10px] uppercase font-bold text-slate-400 block">TOTAL A COBRAR</small>
                <span className="text-xl font-black text-emerald-400 leading-none">{formatUSD(totalUSD)}</span>
              </div>
              <div className="text-right">
                <small className="text-[10px] uppercase font-bold text-slate-400 block">Bolívares (BCV)</small>
                <span className="text-sm font-black text-white leading-none">{formatBs(totalUSD, bcvRate)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={clearPosCart}
                className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={handleDirectFiado}
                disabled={posCart.length === 0}
                className="py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
              >
                <Handshake className="w-3.5 h-3.5" /> FIADO
              </button>
              <button
                type="submit"
                disabled={posCart.length === 0}
                className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
              >
                <Bolt className="w-3.5 h-3.5" /> COBRAR
              </button>
            </div>
          </form>
        </div>

      </div>
    </Modal>
  );
};
