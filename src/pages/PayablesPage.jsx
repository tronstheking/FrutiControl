import React from 'react';
import { useStore } from '../store/useStore';
import { Receipt, Plus, CheckCircle2, Edit3, Trash2 } from 'lucide-react';
import { formatUSD, formatBs, formatDate } from '../utils/formatters';

export const PayablesPage = () => {
  const { payables, markPayablePaid, deletePayable, openModal, bcvRate } = useStore();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-rose-400" /> Cuentas por Pagar
          </h2>
          <p className="text-xs text-slate-400 mt-1">Deudas pendientes con proveedores y facturas por cancelar</p>
        </div>

        <button
          onClick={() => openModal('payable')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> Registrar Deuda
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Proveedor</th>
                <th className="py-3 px-4">Concepto</th>
                <th className="py-3 px-4">Monto ($ y Bs.)</th>
                <th className="py-3 px-4">Fecha Pago</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {payables.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No hay cuentas por pagar registradas.
                  </td>
                </tr>
              ) : (
                payables.map((item) => {
                  const isPaid = item.status === 'Pagado';
                  return (
                    <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">{item.supplier}</td>
                      <td className="py-3.5 px-4 text-slate-300">{item.concept}</td>
                      <td className="py-3.5 px-4">
                        <strong className="text-white text-xs font-black block">{formatUSD(item.amount)}</strong>
                        <span className="text-[10px] text-slate-400 font-medium">{formatBs(item.amount, bcvRate)}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{formatDate(item.dueDate)}</td>
                      <td className="py-3.5 px-4">
                        {isPaid ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Pagado
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 w-fit">
                            Pendiente
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {!isPaid && (
                            <button
                              onClick={() => {
                                if (window.confirm(`¿Marcar como pagado a ${item.supplier}?`)) {
                                  markPayablePaid(item.id);
                                }
                              }}
                              title="Marcar como Pagado"
                              className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => openModal('payable', item)}
                            title="Editar"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("¿Eliminar esta cuenta por pagar?")) {
                                deletePayable(item.id);
                              }
                            }}
                            title="Eliminar"
                            className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
