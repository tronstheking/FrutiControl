import React from 'react';
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

export const OverviewPage = () => {
  const { 
    inventory, 
    receivables, 
    payables, 
    transactions, 
    bcvRate, 
    openModal 
  } = useStore();

  const todayStr = new Date().toISOString().split('T')[0];

  const todayTransactions = transactions.filter(t => t.date === todayStr);
  const todayIncomeTrans = todayTransactions.filter(t => t.type === 'Ingreso');

  const soldTodayUSD = todayIncomeTrans.reduce((sum, t) => sum + Number(t.amount), 0);
  const salesTodayCount = todayIncomeTrans.length;

  const totalIncomeUSD = transactions.filter(t => t.type === 'Ingreso').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenseUSD = transactions.filter(t => t.type === 'Egreso').reduce((sum, t) => sum + Number(t.amount), 0);
  const netBalanceUSD = totalIncomeUSD - totalExpenseUSD;

  const inventoryValueUSD = inventory.reduce((sum, f) => sum + (Number(f.kg) * Number(f.costKg || f.priceKg)), 0);
  const totalVarieties = inventory.length;

  const pendingReceivables = receivables.filter(r => r.status !== 'Pagado');
  const totalReceivablesUSD = pendingReceivables.reduce((sum, r) => sum + (r.remainingAmount !== undefined ? Number(r.remainingAmount) : Number(r.amount)), 0);

  const pendingPayables = payables.filter(p => p.status !== 'Pagado');
  const totalPayablesUSD = pendingPayables.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="space-y-4 pb-16 animate-fadeIn">
      {/* 2-Column Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Vendido Hoy */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">Vendido Hoy</span>
          <div className="text-lg sm:text-xl font-black text-[#047857]">{formatUSD(soldTodayUSD)}</div>
          <div className="text-[11px] font-medium text-slate-400">{formatBs(soldTodayUSD, bcvRate)}</div>
          <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-[#059669]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{salesTodayCount} ventas hoy</span>
          </div>
        </div>

        {/* Capital Caja */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">Capital Caja</span>
          <div className={`text-lg sm:text-xl font-black ${netBalanceUSD < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
            {formatUSD(netBalanceUSD)}
          </div>
          <div className="text-[11px] font-medium text-slate-400">{formatBs(netBalanceUSD, bcvRate)}</div>
          <div className="pt-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
              En tiempo real
            </span>
          </div>
        </div>

        {/* Inventario */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">Inventario</span>
          <div className="text-lg sm:text-xl font-black text-slate-800">{formatUSD(inventoryValueUSD)}</div>
          <div className="text-[11px] font-medium text-slate-500">{totalVarieties} variedades</div>
          <div className="pt-2">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#059669] h-full rounded-full w-2/3" />
            </div>
          </div>
        </div>

        {/* Fiados */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">Fiados</span>
          <div className="text-lg sm:text-xl font-black text-amber-700">{formatUSD(totalReceivablesUSD)}</div>
          <div className="text-[11px] font-medium text-slate-400">{formatBs(totalReceivablesUSD, bcvRate)}</div>
          <div className="pt-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              {pendingReceivables.length} pendientes
            </span>
          </div>
        </div>

        {/* Deudas */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">Deudas</span>
          <div className="text-lg sm:text-xl font-black text-rose-600">{formatUSD(totalPayablesUSD)}</div>
          <div className="text-[11px] font-medium text-slate-400">{pendingPayables.length} pendientes</div>
          <div className="pt-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-50 text-rose-700 border border-rose-200">
              VENCIDO
            </span>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">Balance</span>
          <div className={`text-lg sm:text-xl font-black ${netBalanceUSD < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
            {formatUSD(netBalanceUSD)}
          </div>
          <div className="pt-3">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full w-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Flujo de Caja Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900">Flujo de Caja</h3>
          <BarChart2 className="w-5 h-5 text-slate-700" />
        </div>

        <div className="py-3 flex items-center justify-around border-t border-b border-slate-100">
          <div className="text-center space-y-0.5">
            <span className="text-xs font-black text-[#047857] block">{formatUSD(totalIncomeUSD)}</span>
            <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">INGRESOS</span>
          </div>
          <div className="text-center space-y-0.5">
            <span className="text-xs font-black text-rose-600 block">{formatUSD(totalExpenseUSD)}</span>
            <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">EGRESOS</span>
          </div>
        </div>

        <button
          onClick={() => openModal('pos')}
          className="w-full py-3.5 bg-[#047857] hover:bg-[#065f46] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Rocket className="w-4 h-4" /> Vender Ahora
        </button>
      </div>

      {/* Balance Operativo Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
        <h3 className="text-base font-black text-slate-900 mb-1">Balance Operativo</h3>

        <div className="space-y-2 divide-y divide-slate-100">
          {/* Total Ingresos */}
          <div 
            onClick={() => openModal('pos')}
            className="pt-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2.5 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#047857] flex items-center justify-center shrink-0 font-bold border border-emerald-100">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Total Ingresos</strong>
                <span className="text-[11px] text-slate-400 font-medium">Hoy</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-extrabold text-[#047857]">{formatUSD(totalIncomeUSD)}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Total Egresos */}
          <div 
            onClick={() => openModal('expense')}
            className="pt-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2.5 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 font-bold border border-rose-100">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Total Egresos</strong>
                <span className="text-[11px] text-slate-400 font-medium">Incluye Mermas</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-extrabold text-rose-600">{formatUSD(totalExpenseUSD)}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Balance Neto */}
          <div 
            onClick={() => openModal('dailyClosure')}
            className="pt-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2.5 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-bold border border-slate-200">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Balance Neto</strong>
                <span className="text-[11px] text-slate-400 font-medium">Resultado actual</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-xs font-extrabold ${netBalanceUSD < 0 ? 'text-slate-900' : 'text-[#047857]'}`}>
                {formatUSD(netBalanceUSD)}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
