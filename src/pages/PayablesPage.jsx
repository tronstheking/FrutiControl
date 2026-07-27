import React from 'react';
import { useStore } from '../store/useStore';
import { Receipt, Plus, CheckCircle2, Edit3, Trash2 } from 'lucide-react';
import { formatUSD, formatBs, formatDate } from '../utils/formatters';

export const PayablesPage = React.memo(() => {
  const payables = useStore(state => state.payables);
  const markPayablePaid = useStore(state => state.markPayablePaid);
  const deletePayable = useStore(state => state.deletePayable);
  const openModal = useStore(state => state.openModal);
  const bcvRate = useStore(state => state.bcvRate);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-rose-600" /> Cuentas por Pagar
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Deudas pendientes con proveedores y facturas por cancelar</p>
        </div>

        <button
          onClick={() => openModal('payable')}
          className="px-4 py-2.5 bg-[#047857] hover:bg-[#065f46] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Registrar Deuda
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Proveedor</th>
                <th className="py-3 px-4">Concepto</th>
                <th className="py-3 px-4">Monto ($ y Bs.)</th>
                <th className="py-3 px-4">Fecha Pago</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payables.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                    No hay cuentas por pagar registradas.
                  </td>
                </tr>
              ) : (
                payables.map((item) => {
                  const isPaid = item.status === 'Pagado';
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{item.supplier}</td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{item.concept}</td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 text-xs font-black block">{formatUSD(item.amount)}</strong>
                        <span className="text-[10px] text-slate-400 font-semibold">{formatBs(item.amount, bcvRate)}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{formatDate(item.dueDate)}</td>
                      <td className="py-3.5 px-4">
                        {isPaid ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#047857] border border-emerald-200 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Pagado
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200 w-fit">
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
                              className="p-2 rounded-xl bg-emerald-50 text-[#047857] hover:bg-emerald-100 border border-emerald-200 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => openModal('payable', item)}
                            title="Editar"
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
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
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
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
});
