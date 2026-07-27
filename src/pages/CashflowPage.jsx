import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  TrendingUp, 
  ShoppingCart, 
  MinusCircle, 
  Search, 
  Calendar, 
  X, 
  Trash2 
} from 'lucide-react';
import { formatUSD, formatBs, formatDate, getTodayDateString } from '../utils/formatters';

export const CashflowPage = () => {
  const { transactions, deleteTransaction, openModal, bcvRate } = useStore();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const todayStr = getTodayDateString();

  const handleDatePreset = (preset) => {
    if (preset === 'hoy') {
      setDateFrom(todayStr);
      setDateTo(todayStr);
    } else if (preset === 'mes') {
      const d = new Date();
      const firstDay = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
      setDateFrom(firstDay);
      setDateTo(todayStr);
    } else if (preset === 'todo') {
      setDateFrom('');
      setDateTo('');
    }
  };

  let filtered = [...transactions];

  if (typeFilter !== 'Todos') {
    filtered = filtered.filter(t => t.type === typeFilter);
  }

  if (dateFrom) {
    filtered = filtered.filter(t => t.date >= dateFrom);
  }

  if (dateTo) {
    filtered = filtered.filter(t => t.date <= dateTo);
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(t => 
      t.description.toLowerCase().includes(q) || formatDate(t.date).includes(q)
    );
  }

  const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" /> Movimientos de Caja
          </h2>
          <p className="text-xs text-slate-400 mt-1">Histórico completo de ventas, cobros y gastos</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('pos')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" /> Vender
          </button>
          <button
            onClick={() => openModal('expense')}
            className="px-3.5 py-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-bold text-xs rounded-xl border border-rose-500/40 transition-colors flex items-center gap-1.5"
          >
            <MinusCircle className="w-4 h-4" /> Egreso
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por concepto o cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button
              onClick={() => setTypeFilter('Todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                typeFilter === 'Todos' ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              📋 Todos
            </button>
            <button
              onClick={() => setTypeFilter('Ingreso')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                typeFilter === 'Ingreso' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              🟢 Ingresos
            </button>
            <button
              onClick={() => setTypeFilter('Egreso')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                typeFilter === 'Egreso' ? 'bg-rose-950/80 text-rose-400 border-rose-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              🔴 Egresos
            </button>
          </div>
        </div>

        {/* Date Filter & Presets */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Presets:
            </span>
            <button
              onClick={() => handleDatePreset('hoy')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              📅 Hoy
            </button>
            <button
              onClick={() => handleDatePreset('mes')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              🗓️ Este Mes
            </button>
            <button
              onClick={() => handleDatePreset('todo')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              ♾️ Histórico
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-semibold"
            />
            <span className="text-slate-500">hasta</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-semibold"
            />
            {(dateFrom || dateTo) && (
              <button
                onClick={() => { setDateFrom(''); setDateTo(''); }}
                className="p-1 text-slate-400 hover:text-white"
                title="Limpiar fechas"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Descripción</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Monto ($ y Bs.)</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No se encontraron movimientos con este filtro.
                  </td>
                </tr>
              ) : (
                sorted.map((t) => {
                  const isIncome = t.type === 'Ingreso';
                  return (
                    <tr key={t.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-4 text-slate-400 font-mono">{formatDate(t.date)}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{t.description}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isIncome 
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                            : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        }`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className={`text-xs font-black block ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isIncome ? '+' : '-'}{formatUSD(t.amount)}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-medium">{formatBs(t.amount, bcvRate)}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => {
                            if (window.confirm("¿Deseas eliminar este movimiento?")) {
                              deleteTransaction(t.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
