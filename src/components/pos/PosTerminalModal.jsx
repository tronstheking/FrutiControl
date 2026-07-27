import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';
import {
  Search, Plus, Minus, Trash2, Receipt, Wallet,
  Bolt, Handshake, ShoppingBag
} from 'lucide-react';
import { formatUSD, formatBs, getFruitEmoji } from '../../utils/formatters';

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 font-medium text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-400";

export const PosTerminalModal = () => {
  const {
    activeModal, closeModal, inventory, posCart,
    addToPosCart, updatePosCartQty, removePosCartItem,
    clearPosCart, processPosCheckout, bcvRate, addToast
  } = useStore();

  const [search, setSearch] = useState('');
  const [payMethod, setPayMethod] = useState('Pago Móvil (Bs.)');
  const [clientName, setClientName] = useState('');
  const [paidAmount, setPaidAmount] = useState('');

  const isOpen = activeModal === 'pos';
  if (!isOpen) return null;

  const totalUSD = posCart.reduce((sum, item) => sum + (item.kg * item.priceKg), 0);
  const paidVal = parseFloat(paidAmount) || 0;
  const totalBs = totalUSD * bcvRate;
  let changeText = 'Ingresa monto pagado';
  let isInsufficient = false;

  if (paidVal > 0) {
    if (bcvRate > 1 && paidVal > totalUSD * 1.5) {
      const changeBs = paidVal - totalBs;
      if (changeBs < -0.05) { changeText = 'Insuficiente (Bs.)'; isInsufficient = true; }
      else changeText = `${formatUSD(Math.max(0, changeBs / bcvRate))} (${formatBs(Math.max(0, changeBs / bcvRate), bcvRate)})`;
    } else {
      const diffUSD = paidVal - totalUSD;
      if (diffUSD < -0.005) { changeText = 'Insuficiente (USD)'; isInsufficient = true; }
      else changeText = `${formatUSD(Math.max(0, diffUSD))} (${formatBs(Math.max(0, diffUSD), bcvRate)})`;
    }
  }

  const filteredInventory = inventory.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const handleCheckout = (e) => {
    if (e) e.preventDefault();
    if (posCart.length === 0) { addToast('El ticket está vacío.', 'warning'); return; }
    if (payMethod === 'Fiado / Crédito' && !clientName.trim()) { addToast('Ingresa el nombre del cliente.', 'warning'); return; }
    processPosCheckout(clientName || 'Mostrador', payMethod);
  };

  const handleDirectFiado = () => {
    if (posCart.length === 0) { addToast('El ticket está vacío.', 'warning'); return; }
    let name = clientName.trim();
    if (!name) { name = prompt('Nombre del cliente para el FIADO:'); }
    if (!name || !name.trim()) { addToast('Ingresa el nombre del cliente.', 'warning'); return; }
    processPosCheckout(name.trim(), 'Fiado / Crédito');
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="🛒 Punto de Venta POS" maxWidth="max-w-2xl">
      <div className="flex flex-col gap-4">

        {/* Fruit Grid */}
        <div>
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar fruta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto">
            {filteredInventory.length === 0 ? (
              <div className="col-span-full py-8 text-center text-gray-400 text-sm">
                <ShoppingBag className="w-7 h-7 mx-auto mb-2 opacity-40" />
                Sin frutas en inventario
              </div>
            ) : filteredInventory.map((fruit) => {
              const emoji = getFruitEmoji(fruit.name);
              const isLow = Number(fruit.kg) <= 10;
              return (
                <button
                  key={fruit.id}
                  type="button"
                  onClick={() => addToPosCart(fruit)}
                  className={`p-3 rounded-2xl border text-left transition-all active:scale-95 ${
                    isLow
                      ? 'bg-red-50 border-red-200 hover:border-red-300'
                      : 'bg-white border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{emoji}</span>
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-tight truncate">{fruit.name}</p>
                  <p className="text-sm font-black text-emerald-600 mt-0.5">{formatUSD(fruit.priceKg)}<span className="text-xs text-gray-400 font-normal">/kg</span></p>
                  <span className={`text-[10px] font-semibold ${isLow ? 'text-red-500' : 'text-gray-400'}`}>
                    {isLow ? '⚠️ Stock bajo' : `${fruit.kg} kg`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Ticket */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-emerald-600" /> Ticket de Orden
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
              {posCart.length} ítems
            </span>
          </div>

          <div className="space-y-2 max-h-36 overflow-y-auto">
            {posCart.length === 0 ? (
              <div className="py-5 text-center text-gray-400 text-xs bg-gray-50 rounded-xl">
                Toca una fruta de arriba para añadirla al ticket
              </div>
            ) : posCart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                <span className="text-lg shrink-0">{getFruitEmoji(item.name)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                  <p className="text-[10px] text-gray-500">{formatUSD(item.priceKg)}/kg</p>
                </div>

                <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 px-1.5 py-1">
                  <button onClick={() => updatePosCartQty(idx, -0.5)} className="text-gray-400 active:text-gray-700 p-0.5">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-gray-900 w-10 text-center">{item.kg.toFixed(1)}kg</span>
                  <button onClick={() => updatePosCartQty(idx, 0.5)} className="text-gray-400 active:text-gray-700 p-0.5">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <span className="text-sm font-black text-emerald-600 w-14 text-right shrink-0">
                  {formatUSD(item.kg * item.priceKg)}
                </span>
                <button onClick={() => removePosCartItem(idx)} className="text-gray-300 active:text-red-500 ml-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-emerald-600 rounded-2xl p-4 flex items-center justify-between text-white">
          <div>
            <span className="text-emerald-200 text-xs font-semibold uppercase">Total a Cobrar</span>
            <p className="text-2xl font-black">{formatUSD(totalUSD)}</p>
          </div>
          <div className="text-right">
            <span className="text-emerald-200 text-xs font-semibold uppercase">En Bolívares</span>
            <p className="text-sm font-black">{formatBs(totalUSD, bcvRate)}</p>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Método de Pago</label>
              <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)} className={inputCls}>
                <option value="Pago Móvil (Bs.)">📱 Pago Móvil</option>
                <option value="Efectivo USD ($)">💵 USD Efectivo</option>
                <option value="Efectivo Bs.">🇻🇪 Bs. Efectivo</option>
                <option value="Zelle ($)">⚡ Zelle</option>
                <option value="Punto de Venta (Bs.)">💳 Tarjeta</option>
                <option value="Fiado / Crédito">🤝 Fiado</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cliente</label>
              <input type="text" placeholder="Mostrador" value={clientName}
                onChange={(e) => setClientName(e.target.value)} className={inputCls} />
            </div>
          </div>

          {payMethod !== 'Fiado / Crédito' && (
            <div className="grid grid-cols-2 gap-2 bg-gray-50 border border-gray-100 rounded-xl p-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Paga con ($ o Bs.)</label>
                <input type="number" step="0.01" placeholder="Ej: 20.00" value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 font-bold focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Vuelto / Cambio</label>
                <div className={`h-10 flex items-center px-3 rounded-xl border text-sm font-bold ${isInsufficient ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-amber-600'}`}>
                  {changeText}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button type="button" onClick={clearPosCart}
              className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs rounded-xl transition-colors">
              Limpiar
            </button>
            <button type="button" onClick={handleDirectFiado} disabled={posCart.length === 0}
              className="py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl disabled:opacity-50 flex items-center justify-center gap-1">
              <Handshake className="w-3.5 h-3.5" /> FIADO
            </button>
            <button type="submit" disabled={posCart.length === 0}
              className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-200 disabled:opacity-50 flex items-center justify-center gap-1 transition-colors">
              <Bolt className="w-3.5 h-3.5" /> COBRAR
            </button>
          </div>
        </form>

      </div>
    </Modal>
  );
};
