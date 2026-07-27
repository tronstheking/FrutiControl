import React from 'react';
import { useStore } from '../store/useStore';
import { MetricCard } from '../components/common/MetricCard';
import { 
  CalendarDays, 
  Vault, 
  Boxes, 
  BookMarked, 
  Receipt, 
  TrendingUp, 
  Scale, 
  ArrowDownRight, 
  ArrowUpRight,
  ShoppingCart
} from 'lucide-react';
import { formatUSD, formatBs, getTodayDateString } from '../utils/formatters';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export const OverviewPage = () => {
  const { 
    bcvRate, 
    capitalInicial, 
    inventory, 
    receivables, 
    payables, 
    transactions, 
    openModal 
  } = useStore();

  const todayStr = getTodayDateString();

  const todayIncomeTransactions = transactions.filter(t => t.type === 'Ingreso' && t.date === todayStr);
  const todaySalesUSD = todayIncomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const todaySalesCount = todayIncomeTransactions.length;

  const totalIncome = transactions.filter(t => t.type === 'Ingreso').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'Egreso').reduce((sum, t) => sum + Number(t.amount), 0);
  const currentCapital = capitalInicial + totalIncome - totalExpense;

  const inventoryValue = inventory.reduce((sum, item) => sum + (Number(item.kg) * Number(item.priceKg)), 0);

  const totalReceivables = receivables
    .filter(r => r.status === 'Pendiente')
    .reduce((sum, r) => sum + (r.remainingAmount !== undefined ? Number(r.remainingAmount) : Number(r.amount)), 0);

  const pendingReceivablesCount = receivables.filter(r => r.status === 'Pendiente').length;

  const totalPayables = payables
    .filter(p => p.status === 'Pendiente')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingPayablesCount = payables.filter(p => p.status === 'Pendiente').length;

  const netBalance = totalIncome - totalExpense;

  // Chart Data preparation (grouped by date)
  const dateMap = {};
  transactions.forEach(t => {
    if (!dateMap[t.date]) {
      dateMap[t.date] = { date: t.date, Ingresos: 0, Egresos: 0 };
    }
    if (t.type === 'Ingreso') dateMap[t.date].Ingresos += Number(t.amount);
    if (t.type === 'Egreso') dateMap[t.date].Egresos += Number(t.amount);
  });

  const chartData = Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7);

  if (chartData.length === 0) {
    chartData.push({ date: todayStr, Ingresos: todaySalesUSD, Egresos: 0 });
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 5 Key Metric Cards (KPI Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Vendido Hoy"
          amountUsd={todaySalesUSD}
          bcvRate={bcvRate}
          icon={CalendarDays}
          badgeText={`⚡ ${todaySalesCount} venta${todaySalesCount === 1 ? '' : 's'} hoy`}
          badgeColor="emerald"
        />

        <MetricCard
          title="Capital Caja Total"
          amountUsd={currentCapital}
          bcvRate={bcvRate}
          icon={Vault}
          badgeText="En tiempo real"
          badgeColor="blue"
        />

        <MetricCard
          title="Valor Inventario"
          amountUsd={inventoryValue}
          bcvRate={bcvRate}
          icon={Boxes}
          badgeText={`${inventory.length} variedades`}
          badgeColor="emerald"
        />

        <MetricCard
          title="Fiados por Cobrar"
          amountUsd={totalReceivables}
          bcvRate={bcvRate}
          icon={BookMarked}
          badgeText={`${pendingReceivablesCount} pendientes`}
          badgeColor="amber"
        />

        <MetricCard
          title="Deudas por Pagar"
          amountUsd={totalPayables}
          bcvRate={bcvRate}
          icon={Receipt}
          badgeText={`${pendingPayablesCount} pendientes`}
          badgeColor="rose"
        />
      </div>

      {/* Main Grid: Cashflow Chart & Balance Operativo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cashflow Chart (Ingresos vs Egresos) */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" /> Flujo de Caja
              </h3>
              <p className="text-xs text-slate-400">Ingresos vs Egresos comparativos (Últimos días)</p>
            </div>
            <button
              onClick={() => openModal('pos')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Vender Ahora
            </button>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="Ingresos" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Egresos" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Balance Operativo */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Scale className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Balance Operativo</h3>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {/* Total Income */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-emerald-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Total Ingresos</span>
                <ArrowDownRight className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xl font-black text-white">{formatUSD(totalIncome)}</p>
              <small className="text-xs text-slate-400 block font-medium">{formatBs(totalIncome, bcvRate)}</small>
            </div>

            {/* Total Expense */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-rose-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-rose-400">
                <span>Total Egresos</span>
                <ArrowUpRight className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-xl font-black text-white">{formatUSD(totalExpense)}</p>
              <small className="text-xs text-slate-400 block font-medium">{formatBs(totalExpense, bcvRate)}</small>
            </div>

            {/* Net Balance */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 p-4 rounded-xl border border-emerald-500/40 flex items-center justify-between mt-2">
              <div>
                <span className="text-xs font-bold uppercase text-slate-300 block">Balance Neto</span>
                <strong className="text-2xl font-black text-emerald-400">{formatUSD(netBalance)}</strong>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-white block">{formatBs(netBalance, bcvRate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
