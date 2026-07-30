import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { 
  formatUSD, 
  formatBs, 
  formatDate, 
  getCurrentMonthKey, 
  getPreviousMonthKey, 
  formatMonthYear, 
  MONTH_NAMES_ES 
} from '../utils/formatters';
import { Search, TrendingUp, TrendingDown, Trash2, Calendar, PlusCircle, XCircle } from 'lucide-react';

export const CashflowPage = React.memo(() => {
  const transactions = useStore(state => state.transactions);
  const deleteTransaction = useStore(state => state.deleteTransaction);
  const openModal = useStore(state => state.openModal);
  const bcvRate = useStore(state => state.bcvRate);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [periodFilter, setPeriodFilter] = useState('este_mes'); // 'este_mes' | 'mes_pasado' | 'custom' | 'todos'
  const [selectedMonthKey, setSelectedMonthKey] = useState(getCurrentMonthKey());

  const currentMonthKey = getCurrentMonthKey();
  const previousMonthKey = getPreviousMonthKey();

  // Extract all unique available months (YYYY-MM) from history, ensuring current & previous month exist
  const availableMonths = useMemo(() => {
    const monthsSet = new Set([currentMonthKey, previousMonthKey]);
    transactions.forEach(t => {
      if (t.date && typeof t.date === 'string' && t.date.length >= 7) {
        monthsSet.add(t.date.substring(0, 7));
      }
    });
    return Array.from(monthsSet).sort().reverse(); // Newest first
  }, [transactions, currentMonthKey, previousMonthKey]);

  // Main filtering logic
  const filteredTransactions = useMemo(() => {
    let list = [...transactions];

    // 1. Period / Month Filter
    if (periodFilter === 'este_mes') {
      list = list.filter(t => (t.date || '').startsWith(currentMonthKey));
    } else if (periodFilter === 'mes_pasado') {
      list = list.filter(t => (t.date || '').startsWith(previousMonthKey));
    } else if (periodFilter === 'custom' && selectedMonthKey) {
      list = list.filter(t => (t.date || '').startsWith(selectedMonthKey));
    }

    // 2. Type Filter (Ingreso / Egreso)
    if (typeFilter !== 'Todos') {
      list = list.filter(t => t.type === typeFilter);
    }

    // 3. Smart Search (Search in description, date, month name, amount, method)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(t => {
        const desc = (t.description || '').toLowerCase();
        const rawDate = (t.date || '').toLowerCase();
        const formatted = formatDate(t.date).toLowerCase();
        const amountStr = String(t.amount || '');
        const methodStr = (t.method || '').toLowerCase();

        // Check Spanish month name from t.date (e.g. 2026-07 -> "julio")
        let monthName = '';
        if (t.date && t.date.includes('-')) {
          const mParts = t.date.split('-');
          const mIdx = parseInt(mParts[1], 10) - 1;
          if (mIdx >= 0 && mIdx < 12) {
            monthName = MONTH_NAMES_ES[mIdx].toLowerCase();
          }
        }

        return (
          desc.includes(q) ||
          rawDate.includes(q) ||
          formatted.includes(q) ||
          monthName.includes(q) ||
          amountStr.includes(q) ||
          methodStr.includes(q)
        );
      });
    }

    return list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [transactions, periodFilter, selectedMonthKey, typeFilter, search, currentMonthKey, previousMonthKey]);

  // Calculate totals dynamically for the filtered view
  const totals = useMemo(() => {
    const income = filteredTransactions.filter(t => t.type === 'Ingreso').reduce((s, t) => s + Number(t.amount || 0), 0);
    const expense = filteredTransactions.filter(t => t.type === 'Egreso').reduce((s, t) => s + Number(t.amount || 0), 0);
    return { income, expense, net: income - expense };
  }, [filteredTransactions]);

  // Period label for subtitle/badge
  const getPeriodLabel = () => {
    if (periodFilter === 'este_mes') return `Este Mes (${formatMonthYear(currentMonthKey)})`;
    if (periodFilter === 'mes_pasado') return `Mes Pasado (${formatMonthYear(previousMonthKey)})`;
    if (periodFilter === 'custom') return formatMonthYear(selectedMonthKey);
    return 'Todos los Tiempos';
  };

  return (
    <div className="space-y-4 page-enter pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Flujo de Caja e Historial</h2>
          <p className="text-xs text-gray-500 font-medium">Búsqueda y consulta de ingresos y egresos</p>
        </div>
        <button
          onClick={() => openModal('expense')}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-md shadow-rose-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Gasto</span>
        </button>
      </div>

      {/* Period Selection Controls */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Período de Consulta:
          </span>
          <span className="text-xs font-black text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">
            {getPeriodLabel()}
          </span>
        </div>

        {/* Quick Period Tabs */}
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => setPeriodFilter('este_mes')}
            className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
              periodFilter === 'este_mes'
                ? 'bg-emerald-600 text-white shadow-sm font-black'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Este Mes
          </button>
          <button
            onClick={() => setPeriodFilter('mes_pasado')}
            className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
              periodFilter === 'mes_pasado'
                ? 'bg-emerald-600 text-white shadow-sm font-black'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Mes Pasado
          </button>
          <button
            onClick={() => setPeriodFilter('todos')}
            className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
              periodFilter === 'todos'
                ? 'bg-emerald-600 text-white shadow-sm font-black'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setPeriodFilter('custom')}
            className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
              periodFilter === 'custom'
                ? 'bg-emerald-600 text-white shadow-sm font-black'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Elegir Mes
          </button>
        </div>

        {/* Custom Month Dropdown if 'custom' is active */}
        {periodFilter === 'custom' && (
          <div className="pt-1">
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">
              Selecciona el mes específico a consultar:
            </label>
            <select
              value={selectedMonthKey}
              onChange={(e) => setSelectedMonthKey(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-500"
            >
              {availableMonths.map(mKey => (
                <option key={mKey} value={mKey}>
                  📅 {formatMonthYear(mKey)} {mKey === currentMonthKey ? '(Actual)' : mKey === previousMonthKey ? '(Anterior)' : ''}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Dynamic Summary Cards for Filtered Period */}
      <div className="grid grid-cols-3 gap-2">
        <div className="stat-tile text-center bg-emerald-50/50 border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-800 uppercase">Ingresos</p>
          <p className="text-sm font-black text-emerald-600 mt-1">{formatUSD(totals.income)}</p>
          <p className="text-[9px] text-emerald-700/70 font-medium">{formatBs(totals.income, bcvRate)}</p>
        </div>
        <div className="stat-tile text-center bg-rose-50/50 border-rose-100">
          <p className="text-[10px] font-bold text-rose-800 uppercase">Egresos</p>
          <p className="text-sm font-black text-rose-600 mt-1">{formatUSD(totals.expense)}</p>
          <p className="text-[9px] text-rose-700/70 font-medium">{formatBs(totals.expense, bcvRate)}</p>
        </div>
        <div className="stat-tile text-center bg-slate-50 border-slate-200">
          <p className="text-[10px] font-bold text-gray-500 uppercase">Balance</p>
          <p className={`text-sm font-black mt-1 ${totals.net < 0 ? 'text-rose-600' : 'text-gray-900'}`}>
            {formatUSD(totals.net)}
          </p>
          <p className="text-[9px] text-gray-500 font-medium">{formatBs(totals.net, bcvRate)}</p>
        </div>
      </div>

      {/* Type Filter Tabs (Todos / Ingresos / Egresos) */}
      <div className="flex gap-2">
        {['Todos', 'Ingreso', 'Egreso'].map(f => (
          <button
            key={f}
            onClick={() => setTypeFilter(f)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              typeFilter === f
                ? f === 'Ingreso' ? 'bg-emerald-600 text-white shadow-xs' : f === 'Egreso' ? 'bg-rose-600 text-white shadow-xs' : 'bg-gray-900 text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f === 'Ingreso' ? '↑ Ingresos' : f === 'Egreso' ? '↓ Egresos' : '📋 Todos'}
          </button>
        ))}
      </div>

      {/* Smart Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar por concepto, fecha (ej: 24/07), mes (ej: junio), monto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="app-input pl-10 pr-9 text-xs font-semibold"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Count & Reset helper */}
      <div className="flex items-center justify-between text-xs font-medium text-gray-500 px-1">
        <span>Mostrando {filteredTransactions.length} movimiento(s)</span>
        {(search || periodFilter !== 'este_mes' || typeFilter !== 'Todos') && (
          <button
            onClick={() => {
              setSearch('');
              setTypeFilter('Todos');
              setPeriodFilter('este_mes');
            }}
            className="text-emerald-600 hover:underline font-bold text-[11px]"
          >
            Restablecer filtros
          </button>
        )}
      </div>

      {/* Historical Transactions List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-gray-400 px-4">
            <p className="text-4xl mb-2">🔍</p>
            <p className="font-bold text-sm text-gray-700">Sin movimientos encontrados</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              No hay ingresos o egresos que coincidan con la búsqueda o el período seleccionado.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setTypeFilter('Todos');
                setPeriodFilter('todos');
              }}
              className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-xl text-xs transition-colors"
            >
              Ver Historial Completo
            </button>
          </div>
        ) : (
          filteredTransactions.map((t, idx) => {
            const isIncome = t.type === 'Ingreso';
            const formattedDateStr = formatDate(t.date);

            return (
              <div 
                key={t.id || idx} 
                className={`list-row gap-3 hover:bg-gray-50/80 transition-colors ${
                  idx !== filteredTransactions.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className={`icon-badge shrink-0 ${isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {isIncome
                    ? <TrendingUp className="w-4 h-4" />
                    : <TrendingDown className="w-4 h-4" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{t.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                      📅 {formattedDateStr}
                    </span>
                    {t.method && (
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {t.method}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0 flex items-center gap-2">
                  <div>
                    <p className={`text-sm font-black ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isIncome ? '+' : '-'}{formatUSD(t.amount)}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">{formatBs(t.amount, bcvRate)}</p>
                  </div>
                  <button
                    onClick={() => { if (window.confirm('¿Eliminar este movimiento del historial?')) deleteTransaction(t.id); }}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-rose-100 active:bg-rose-200 text-gray-400 hover:text-rose-600 flex items-center justify-center transition-colors ml-1"
                    title="Eliminar movimiento"
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

