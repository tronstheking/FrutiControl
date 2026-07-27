import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { formatUSD, formatBs, formatDate, getTodayDateString } from '../utils/formatters';
import { Search, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';

export const CashflowPage = React.memo(() => {
  const transactions = useStore(state => state.transactions);
  const deleteTransaction = useStore(state => state.deleteTransaction);
  const openModal = useStore(state => state.openModal);
  const bcvRate = useStore(state => state.bcvRate);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');

  const sorted = useMemo(() => {
    let filtered = [...transactions];
    if (typeFilter !== 'Todos') filtered = filtered.filter(t => t.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(t => (t.description || '').toLowerCase().includes(q));
    }
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, typeFilter, search]);

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === 'Ingreso').reduce((s, t) => s + Number(t.amount || 0), 0);
    const expense = transactions.filter(t => t.type === 'Egreso').reduce((s, t) => s + Number(t.amount || 0), 0);
    return { income, expense, net: income - expense };
  }, [transactions]);

  return (
    <div className="space-y-4 page-enter">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-gray-900">Flujo de Caja</h2>
        <p className="text-xs text-gray-500 font-medium">Historial de movimientos y egresos</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="stat-tile text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Ingresos</p>
          <p className="text-sm font-black text-emerald-600 mt-1">{formatUSD(totals.income)}</p>
        </div>
        <div className="stat-tile text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Egresos</p>
          <p className="text-sm font-black text-red-600 mt-1">{formatUSD(totals.expense)}</p>
        </div>
        <div className="stat-tile text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Balance</p>
          <p className={`text-sm font-black mt-1 ${totals.net < 0 ? 'text-red-600' : 'text-gray-900'}`}>{formatUSD(totals.net)}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['Todos', 'Ingreso', 'Egreso'].map(f => (
          <button
            key={f}
            onClick={() => setTypeFilter(f)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              typeFilter === f
                ? f === 'Ingreso' ? 'bg-emerald-600 text-white' : f === 'Egreso' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {f === 'Ingreso' ? '↑ Ingresos' : f === 'Egreso' ? '↓ Egresos' : '📋 Todos'}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar movimiento..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="app-input pl-10"
        />
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {sorted.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <p className="text-4xl mb-2">📊</p>
            <p className="font-semibold text-sm">Sin movimientos</p>
          </div>
        ) : (
          sorted.map(t => {
            const isIncome = t.type === 'Ingreso';
            return (
              <div key={t.id} className="list-row gap-3">
                <div className={`icon-badge shrink-0 ${isIncome ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  {isIncome
                    ? <TrendingUp className="w-4 h-4 text-emerald-600" />
                    : <TrendingDown className="w-4 h-4 text-red-600" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{t.description}</p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{formatDate(t.date)}</p>
                </div>

                <div className="text-right shrink-0 flex items-center gap-2">
                  <div>
                    <p className={`text-sm font-black ${isIncome ? 'text-emerald-600' : 'text-red-600'}`}>
                      {isIncome ? '+' : '-'}{formatUSD(t.amount)}
                    </p>
                    <p className="text-[10px] text-gray-400">{formatBs(t.amount, bcvRate)}</p>
                  </div>
                  <button
                    onClick={() => { if (window.confirm('¿Eliminar este movimiento?')) deleteTransaction(t.id); }}
                    className="w-8 h-8 rounded-xl bg-gray-100 active:bg-red-100 text-gray-400 active:text-red-600 flex items-center justify-center ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
