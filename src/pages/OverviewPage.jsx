import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { 
  BarChart2, 
  Rocket, 
  ArrowUpRight, 
  ArrowDownRight, 
  Scale, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { formatUSD, formatBs } from '../utils/formatters';

export const OverviewPage = React.memo(() => {
  // Atomic selectors
  const inventory = useStore(state => state.inventory);
  const receivables = useStore(state => state.receivables);
  const payables = useStore(state => state.payables);
  const transactions = useStore(state => state.transactions);
  const bcvRate = useStore(state => state.bcvRate);
  const openModal = useStore(state => state.openModal);

  // Memoized Today's Calculations
  const { soldTodayUSD, salesTodayCount } = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayTransactions = transactions.filter(t => t.date === todayStr);
    const todayIncomeTrans = todayTransactions.filter(t => t.type === 'Ingreso');
    return {
      soldTodayUSD: todayIncomeTrans.reduce((sum, t) => sum + Number(t.amount || 0), 0),
      salesTodayCount: todayIncomeTrans.length
    };
  }, [transactions]);

  // Memoized Financial Totals
  const { totalIncomeUSD, totalExpenseUSD, netBalanceUSD } = useMemo(() => {
    const income = transactions.filter(t => t.type === 'Ingreso').reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const expense = transactions.filter(t => t.type === 'Egreso').reduce((sum, t) => sum + Number(t.amount || 0), 0);
    return {
      totalIncomeUSD: income,
      totalExpenseUSD: expense,
      netBalanceUSD: income - expense
    };
  }, [transactions]);

  // Memoized Inventory Valuation
  const { inventoryValueUSD, totalVarieties } = useMemo(() => {
    return {
      inventoryValueUSD: inventory.reduce((sum, f) => sum + (Number(f.kg || 0) * Number(f.costKg || f.priceKg || 0)), 0),
      totalVarieties: inventory.length
    };
  }, [inventory]);

  // Memoized Pending Receivables
  const { totalReceivablesUSD, pendingReceivablesCount } = useMemo(() => {
    const pending = receivables.filter(r => r.status !== 'Pagado');
    return {
      totalReceivablesUSD: pending.reduce((sum, r) => sum + (r.remainingAmount !== undefined ? Number(r.remainingAmount) : Number(r.amount || 0)), 0),
      pendingReceivablesCount: pending.length
    };
  }, [receivables]);

  // Memoized Pending Payables
  const { totalPayablesUSD, pendingPayablesCount } = useMemo(() => {
    const pending = payables.filter(p => p.status !== 'Pagado');
    return {
      totalPayablesUSD: pending.reduce((sum, p) => sum + Number(p.amount || 0), 0),
      pendingPayablesCount: pending.length
    };
  }, [payables]);

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Vendido Hoy */}
        <div className="stat-card">
          <span className="text-xs font-semibold text-slate-500">Vendido Hoy</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">{formatUSD(soldTodayUSD)}</div>
          <p className="text-xs text-slate-500 font-medium">{formatBs(soldTodayUSD, bcvRate)}</p>
          <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{salesTodayCount} ventas realizadas</span>
          </div>
        </div>

        {/* Capital Caja */}
        <div className="stat-card">
          <span className="text-xs font-semibold text-slate-500">Capital en Caja</span>
          <div className={`text-xl sm:text-2xl font-bold ${netBalanceUSD < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {formatUSD(netBalanceUSD)}
          </div>
          <p className="text-xs text-slate-500 font-medium">{formatBs(netBalanceUSD, bcvRate)}</p>
          <div className="pt-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Sincronizado
            </span>
          </div>
        </div>

        {/* Valor Inventario */}
        <div className="stat-card">
          <span className="text-xs font-semibold text-slate-500">Valor Inventario</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">{formatUSD(inventoryValueUSD)}</div>
          <p className="text-xs text-slate-500 font-medium">{totalVarieties} variedades registradas</p>
          <div className="pt-2">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-2/3" />
            </div>
          </div>
        </div>

        {/* Fiados por Cobrar */}
        <div className="stat-card">
          <span className="text-xs font-semibold text-slate-500">Fiados por Cobrar</span>
          <div className="text-xl sm:text-2xl font-bold text-amber-600">{formatUSD(totalReceivablesUSD)}</div>
          <p className="text-xs text-slate-500 font-medium">{formatBs(totalReceivablesUSD, bcvRate)}</p>
          <div className="pt-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              {pendingReceivablesCount} clientes pendientes
            </span>
          </div>
        </div>

        {/* Deudas por Pagar */}
        <div className="stat-card">
          <span className="text-xs font-semibold text-slate-500">Deudas por Pagar</span>
          <div className="text-xl sm:text-2xl font-bold text-rose-600">{formatUSD(totalPayablesUSD)}</div>
          <p className="text-xs text-slate-500 font-medium">{pendingPayablesCount} facturas pendientes</p>
          <div className="pt-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              Cuentas por vencer
            </span>
          </div>
        </div>

        {/* Balance Neto */}
        <div className="stat-card">
          <span className="text-xs font-semibold text-slate-500">Balance Operativo</span>
          <div className={`text-xl sm:text-2xl font-bold ${netBalanceUSD < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {formatUSD(netBalanceUSD)}
          </div>
          <p className="text-xs text-slate-500 font-medium">Margen global</p>
          <div className="pt-2">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Flujo de Caja Summary Card */}
      <div className="app-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Resumen Flujo de Caja</h3>
            <p className="text-xs text-slate-500">Ingresos vs Egresos del período actual</p>
          </div>
          <BarChart2 className="w-5 h-5 text-slate-400" />
        </div>

        <div className="py-3 grid grid-cols-2 gap-4 border-y border-slate-100 text-center">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Ingresos</span>
            <span className="text-lg font-bold text-emerald-600 block">{formatUSD(totalIncomeUSD)}</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Egresos</span>
            <span className="text-lg font-bold text-rose-600 block">{formatUSD(totalExpenseUSD)}</span>
          </div>
        </div>

        <button
          onClick={() => openModal('pos')}
          className="w-full btn-primary py-3 text-xs"
        >
          <Rocket className="w-4 h-4" /> Ir a Punto de Venta (POS)
        </button>
      </div>

      {/* Operational List */}
      <div className="app-card space-y-3">
        <h3 className="text-base font-bold text-slate-900 mb-1">Acciones y Estado Operativo</h3>

        <div className="space-y-2 divide-y divide-slate-100">
          <div 
            onClick={() => openModal('pos')}
            className="pt-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 p-3 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-slate-900 block">Registrar Venta POS</strong>
                <span className="text-[11px] text-slate-500">Facturación multi-moneda</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700">{formatUSD(totalIncomeUSD)}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div 
            onClick={() => openModal('expense')}
            className="pt-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 p-3 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-slate-900 block">Anotar Gastos / Merma</strong>
                <span className="text-[11px] text-slate-500">Egresos operativos</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-600">{formatUSD(totalExpenseUSD)}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div 
            onClick={() => openModal('dailyClosure')}
            className="pt-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 p-3 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-slate-900 block">Cierre de Caja Diario</strong>
                <span className="text-[11px] text-slate-500">Cuadre de caja</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">{formatUSD(netBalanceUSD)}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
