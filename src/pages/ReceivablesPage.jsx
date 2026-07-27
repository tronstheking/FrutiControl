import React from 'react';
import { useStore } from '../store/useStore';
import { formatUSD, formatBs, formatDate } from '../utils/formatters';
import { Plus, HandCoins, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ReceivablesPage = React.memo(() => {
  const receivables = useStore(state => state.receivables);
  const deleteReceivable = useStore(state => state.deleteReceivable);
  const openModal = useStore(state => state.openModal);
  const bcvRate = useStore(state => state.bcvRate);

  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);

  const pending = receivables.filter(r => r.status !== 'Pagado');
  const paid = receivables.filter(r => r.status === 'Pagado');
  const totalPending = pending.reduce((s, r) => s + (r.remainingAmount !== undefined ? Number(r.remainingAmount) : Number(r.amount || 0)), 0);

  return (
    <div className="space-y-4 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">📓 Fiados</h2>
          <p className="text-xs text-gray-500 font-medium">Cuaderno digital de deudas</p>
        </div>
        <button
          onClick={() => openModal('receivable')}
          className="flex items-center gap-1.5 bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Anotar
        </button>
      </div>

      {/* Summary */}
      {pending.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Total por Cobrar</p>
          <p className="text-3xl font-black text-amber-700 mt-1">{formatUSD(totalPending)}</p>
          <p className="text-sm text-amber-600 font-medium">{formatBs(totalPending, bcvRate)}</p>
          <p className="text-xs text-amber-600 mt-1">{pending.length} clientes con saldo pendiente</p>
        </div>
      )}

      {receivables.length === 0 && (
        <div className="card text-center py-10">
          <p className="text-4xl mb-2">📝</p>
          <p className="font-bold text-gray-700 text-sm">Sin fiados registrados</p>
          <p className="text-xs text-gray-500 mt-1">Toca "Anotar" para registrar un fiado</p>
        </div>
      )}

      {/* Pending List */}
      {pending.length > 0 && (
        <div>
          <p className="section-header">Pendientes</p>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {pending.map(item => {
              const remaining = item.remainingAmount !== undefined ? Number(item.remainingAmount) : Number(item.amount || 0);
              const dueObj = new Date(item.dueDate || Date.now());
              dueObj.setHours(0, 0, 0, 0);
              const diffDays = Math.floor((todayObj - dueObj) / (1000 * 60 * 60 * 24));
              const isOverdue = diffDays > 3;

              return (
                <div key={item.id} className="list-row gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{item.client}</p>
                      {isOverdue && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 font-medium truncate mt-0.5">{item.concept}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-black text-amber-600">{formatUSD(remaining)}</span>
                      <span className="text-[11px] text-gray-400">{formatBs(remaining, bcvRate)}</span>
                    </div>
                    {isOverdue && (
                      <span className="chip chip-red mt-1">Vencido hace {diffDays}d</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => openModal('payReceivable', item)}
                      className="w-9 h-9 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-700 flex items-center justify-center"
                    >
                      <HandCoins className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { if (window.confirm(`¿Borrar fiado de ${item.client}?`)) deleteReceivable(item.id); }}
                      className="w-9 h-9 rounded-xl bg-red-50 active:bg-red-100 text-red-600 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Paid List */}
      {paid.length > 0 && (
        <div>
          <p className="section-header">Cobrados</p>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {paid.map(item => (
              <div key={item.id} className="list-row gap-3 opacity-60">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{item.client}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.concept}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-bold text-emerald-600">{formatUSD(Number(item.amount || 0))}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
