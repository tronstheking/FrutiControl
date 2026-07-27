import React, { useState, useMemo } from 'react';
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

export const CashflowPage = React.memo(() => {
  const transactions = useStore(state => state.transactions);
  const deleteTransaction = useStore(state => state.deleteTransaction);
  const openModal = useStore(state => state.openModal);
  const bcvRate = useStore(state => state.bcvRate);

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

  // Memoized Filtered & Sorted Transactions
  const sortedTransactions = useMemo(() => {
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
        (t.description && t.description.toLowerCase().includes(q)) || formatDate(t.date).includes(q)
      );
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, typeFilter, dateFrom, dateTo, search]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#047857]" /> Movimientos de Caja
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Histórico completo de ventas, cobros y gastos</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('pos')}
            className="px-3.5 py-2.5 bg-[#047857] hover:bg-[#065f46] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" /> Vender
          </button>
          <button
            onClick={() => openModal('expense')}
            className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
          >
            <MinusCircle className="w-4 h-4" /> Egreso
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por concepto o cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669]"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button
              onClick={() => setTypeFilter('Todos')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                typeFilter === 'Todos' ? 'bg-[#059669] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📋 Todos
            </button>
            <button
              onClick={() => setTypeFilter('Ingreso')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                typeFilter === 'Ingreso' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🟢 Ingresos
            </button>
            <button
              onClick={() => setTypeFilter('Egreso')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                typeFilter === 'Egreso' ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🔴 Egresos
            </button>
          </div>
        </div>

        {/* Date Filter & Presets */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#059669]" /> Presets:
            </span>
            <button
              onClick={() => handleDatePreset('hoy')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
            >
              📅 Hoy
            </button>
            <button
              onClick={() => handleDatePreset('mes')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
            >
              🗓️ Este Mes
            </button>
            <button
              onClick={() => handleDatePreset('todo')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
            >
              ♾️ Histórico
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold"
            />
            <span className="text-slate-400 font-medium">hasta</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold"
            />
            {(dateFrom || dateTo) && (
              <button
                onClick={() => { setDateFrom(''); setDateTo(''); }}
                className="p-1 text-slate-400 hover:text-slate-700"
                title="Limpiar fechas"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Descripción</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Monto ($ y Bs.)</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-semibold">
                    No se encontraron movimientos con este filtro.
                  </td>
                </tr>
              ) : (
                sortedTransactions.map((t) => {
                  const isIncome = t.type === 'Ingreso';
                  return (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 text-slate-500 font-mono font-medium">{formatDate(t.date)}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{t.description}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          isIncome 
                            ? 'bg-emerald-50 text-[#047857] border-emerald-200' 
                            : 'bg-rose-50 text-rose-600 border-rose-200'
                        }`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className={`text-xs font-black block ${isIncome ? 'text-[#047857]' : 'text-rose-600'}`}>
                          {isIncome ? '+' : '-'}{formatUSD(t.amount)}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-semibold">{formatBs(t.amount, bcvRate)}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => {
                            if (window.confirm("¿Deseas eliminar este movimiento?")) {
                              deleteTransaction(t.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
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
});
