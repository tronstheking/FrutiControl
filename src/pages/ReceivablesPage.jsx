import React from 'react';
import { useStore } from '../store/useStore';
import { 
  BookMarked, 
  Plus, 
  HandCoins, 
  MessageSquareCode, 
  Edit3, 
  Trash2, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { formatUSD, formatBs, formatDate } from '../utils/formatters';

export const ReceivablesPage = React.memo(() => {
  const receivables = useStore(state => state.receivables);
  const deleteReceivable = useStore(state => state.deleteReceivable);
  const openModal = useStore(state => state.openModal);
  const bcvRate = useStore(state => state.bcvRate);

  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-amber-600" /> Cuaderno Digital de Fiados
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl font-medium">
            Reemplaza la libreta: deudas en $ USD que <strong>se recalculan automáticamente en Bolívares (Bs.) todos los días</strong> a la tasa BCV del momento.
          </p>
        </div>

        <button
          onClick={() => openModal('receivable')}
          className="px-4 py-2.5 bg-[#047857] hover:bg-[#065f46] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Anotar Fiado
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Concepto / Frutas</th>
                <th className="py-3 px-4">Monto ($ y Bs.)</th>
                <th className="py-3 px-4">Fecha Acordada</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receivables.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                    No hay fiados anotados en el cuaderno digital.
                  </td>
                </tr>
              ) : (
                receivables.map((item) => {
                  const isPaid = item.status === 'Pagado';
                  const remaining = item.remainingAmount !== undefined ? Number(item.remainingAmount) : Number(item.amount);
                  const hasAbonos = item.abonos && item.abonos.length > 0;

                  const dueObj = new Date(item.dueDate || Date.now());
                  dueObj.setHours(0, 0, 0, 0);
                  const diffDays = Math.floor((todayObj - dueObj) / (1000 * 60 * 60 * 24));
                  const isOverdue = !isPaid && diffDays > 3;

                  // WhatsApp text
                  const cleanPhone = item.phone ? item.phone.replace(/\D/g, '') : '';
                  const phoneFormatted = cleanPhone.length >= 10 ? (cleanPhone.startsWith('58') ? cleanPhone : `58${cleanPhone.replace(/^0/, '')}`) : '';

                  const waMsg = encodeURIComponent(
                    `Hola ${item.client}, te saludamos de FrutiControl 🇻🇪.\n` +
                    `Te recordamos tu saldo de fiado por *${formatUSD(remaining)}* (${formatBs(remaining, bcvRate)}).\n` +
                    `Tasa BCV de hoy: ${bcvRate.toFixed(2)} Bs/$.\n` +
                    `¡Muchas gracias!`
                  );
                  const waUrl = phoneFormatted ? `https://wa.me/${phoneFormatted}?text=${waMsg}` : `https://wa.me/?text=${waMsg}`;

                  return (
                    <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${isOverdue ? 'bg-rose-50/40' : ''}`}>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 text-xs font-bold block">{item.client}</strong>
                        {item.phone && <span className="text-[10px] text-slate-400 block font-mono">{item.phone}</span>}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-slate-700 block font-medium">{item.concept}</span>
                        {hasAbonos && (
                          <span className="text-[10px] font-bold text-[#059669] block">
                            ✓ {item.abonos.length} abono(s) realizado(s)
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <strong className={`text-xs font-black block ${isPaid ? 'text-[#047857]' : 'text-amber-700'}`}>
                          {formatUSD(remaining)}
                        </strong>
                        <span className="text-[10px] text-slate-400 block font-semibold">
                          {formatBs(remaining, bcvRate)}
                        </span>
                        {hasAbonos && !isPaid && (
                          <span className="text-[9px] text-slate-400 line-through block">
                            Inicial: {formatUSD(item.amount)}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-slate-600 font-medium block">{formatDate(item.dueDate)}</span>
                        {isOverdue && (
                          <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1 mt-0.5">
                            <AlertTriangle className="w-3 h-3" /> Hace {diffDays} días
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {isPaid ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#047857] border border-emerald-200 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Pagado
                          </span>
                        ) : isOverdue ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3" /> Vencido
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 w-fit">
                            Pendiente
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {!isPaid && (
                            <button
                              onClick={() => openModal('payReceivable', item)}
                              title="Registrar Cobro / Abono"
                              className="p-2 rounded-xl bg-emerald-50 text-[#047857] hover:bg-emerald-100 border border-emerald-200 transition-colors"
                            >
                              <HandCoins className="w-4 h-4" />
                            </button>
                          )}
                          {!isPaid && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Enviar Recordatorio por WhatsApp"
                              className="p-2 rounded-xl bg-emerald-50 text-[#047857] hover:bg-emerald-100 border border-emerald-200 transition-colors"
                            >
                              <MessageSquareCode className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => openModal('receivable', item)}
                            title="Editar"
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Deseas borrar el fiado de ${item.client}?`)) {
                                deleteReceivable(item.id);
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
