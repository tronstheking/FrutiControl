import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { formatUSD, formatBs, getTodayDateString, isSameDate } from '../utils/formatters';
import { TrendingUp, TrendingDown, Wallet, BookOpen, CreditCard, Archive, ShoppingCart, PlusCircle } from 'lucide-react';

export const OverviewPage = React.memo(() => {
  const inventory = useStore(state => state.inventory);
  const receivables = useStore(state => state.receivables);
  const payables = useStore(state => state.payables);
  const transactions = useStore(state => state.transactions);
  const bcvRate = useStore(state => state.bcvRate);
  const openModal = useStore(state => state.openModal);

  const { soldTodayUSD, salesTodayCount } = useMemo(() => {
    const todayStr = getTodayDateString();
    const todayIncome = transactions.filter(t => t.type === 'Ingreso' && (t.date === todayStr || isSameDate(t.date || t.id, todayStr)));

    return {
      soldTodayUSD: todayIncome.reduce((s, t) => s + Number(t.amount || 0), 0),
      salesTodayCount: todayIncome.length,
    };
  }, [transactions]);

  const { totalIncomeUSD, totalExpenseUSD, netBalanceUSD } = useMemo(() => {
    const income = transactions.filter(t => t.type === 'Ingreso').reduce((s, t) => s + Number(t.amount || 0), 0);
    const expense = transactions.filter(t => t.type === 'Egreso').reduce((s, t) => s + Number(t.amount || 0), 0);
    return { totalIncomeUSD: income, totalExpenseUSD: expense, netBalanceUSD: income - expense };
  }, [transactions]);

  const { inventoryValueUSD, totalVarieties } = useMemo(() => ({
    inventoryValueUSD: inventory.reduce((s, f) => s + (Number(f.kg || 0) * Number(f.costKg || f.priceKg || 0)), 0),
    totalVarieties: inventory.length,
  }), [inventory]);

  const { totalReceivablesUSD, pendingReceivablesCount } = useMemo(() => {
    const pending = receivables.filter(r => r.status !== 'Pagado');
    return {
      totalReceivablesUSD: pending.reduce((s, r) => s + (r.remainingAmount !== undefined ? Number(r.remainingAmount) : Number(r.amount || 0)), 0),
      pendingReceivablesCount: pending.length,
    };
  }, [receivables]);

  const { totalPayablesUSD, pendingPayablesCount } = useMemo(() => {
    const pending = payables.filter(p => p.status !== 'Pagado');
    return {
      totalPayablesUSD: pending.reduce((s, p) => s + Number(p.amount || 0), 0),
      pendingPayablesCount: pending.length,
    };
  }, [payables]);

  return (
    <div className="space-y-4 page-enter">
      {/* Today's Hero Card */}
      <div className="bg-emerald-600 rounded-2xl p-5 text-white">
        <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">Vendido Hoy</p>
        <p className="text-4xl font-black mt-1 leading-none">{formatUSD(soldTodayUSD)}</p>
        <p className="text-emerald-200 text-sm font-medium mt-1">{formatBs(soldTodayUSD, bcvRate)}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-emerald-100 text-xs font-semibold">{salesTodayCount} ventas registradas hoy</span>
          <button
            onClick={() => openModal('pos')}
            className="flex items-center gap-1.5 bg-white/20 active:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Vender
          </button>
        </div>
      </div>

      {/* Quick Stats 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="stat-tile">
          <div className="flex items-center gap-2 mb-1">
            <div className="icon-badge bg-emerald-50">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-xs font-semibold text-gray-500">Ingresos</span>
          </div>
          <p className="text-lg font-black text-gray-900">{formatUSD(totalIncomeUSD)}</p>
          <p className="text-[11px] text-gray-400 font-medium">{formatBs(totalIncomeUSD, bcvRate)}</p>
        </div>

        <div className="stat-tile">
          <div className="flex items-center gap-2 mb-1">
            <div className="icon-badge bg-red-50">
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <span className="text-xs font-semibold text-gray-500">Egresos</span>
          </div>
          <p className="text-lg font-black text-gray-900">{formatUSD(totalExpenseUSD)}</p>
          <p className="text-[11px] text-gray-400 font-medium">{formatBs(totalExpenseUSD, bcvRate)}</p>
        </div>

        <div className="stat-tile">
          <div className="flex items-center gap-2 mb-1">
            <div className="icon-badge bg-amber-50">
              <BookOpen className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-xs font-semibold text-gray-500">Fiados</span>
          </div>
          <p className="text-lg font-black text-amber-600">{formatUSD(totalReceivablesUSD)}</p>
          <p className="text-[11px] text-gray-400 font-medium">{pendingReceivablesCount} clientes</p>
        </div>

        <div className="stat-tile">
          <div className="flex items-center gap-2 mb-1">
            <div className="icon-badge bg-blue-50">
              <Archive className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-gray-500">Inventario</span>
          </div>
          <p className="text-lg font-black text-gray-900">{formatUSD(inventoryValueUSD)}</p>
          <p className="text-[11px] text-gray-400 font-medium">{totalVarieties} variedades</p>
        </div>
      </div>

      {/* Balance Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="icon-badge bg-slate-100">
              <Wallet className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-bold text-gray-900">Balance de Caja</span>
          </div>
          <button
            onClick={() => openModal('dailyClosure')}
            className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl active:bg-emerald-100"
          >
            Cerrar Día
          </button>
        </div>

        <p className={`text-3xl font-black ${netBalanceUSD < 0 ? 'text-red-600' : 'text-gray-900'}`}>
          {formatUSD(netBalanceUSD)}
        </p>
        <p className="text-sm text-gray-500 font-medium mt-0.5">{formatBs(netBalanceUSD, bcvRate)}</p>

        {/* Progress bar */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Ingresos vs Egresos</span>
            <span>{totalIncomeUSD > 0 ? Math.round((netBalanceUSD / totalIncomeUSD) * 100) : 0}% margen</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, totalIncomeUSD > 0 ? Math.max(0, (netBalanceUSD / totalIncomeUSD) * 100) : 0)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Deudas por Pagar */}
      {pendingPayablesCount > 0 && (
        <div className="card border-red-100 bg-red-50/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="icon-badge bg-red-100">
                <CreditCard className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Por Pagar</p>
                <p className="text-xs text-gray-500">{pendingPayablesCount} facturas pendientes</p>
              </div>
            </div>
            <p className="text-lg font-black text-red-600">{formatUSD(totalPayablesUSD)}</p>
          </div>
        </div>
      )}

      {/* Quick Sell CTA */}
      <button
        onClick={() => openModal('pos')}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 active:bg-gray-800 text-white font-bold py-4 rounded-2xl text-sm transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        Abrir Punto de Venta POS
      </button>
    </div>
  );
});
