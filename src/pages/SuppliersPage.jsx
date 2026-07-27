import React from 'react';
import { useStore } from '../store/useStore';
import { Truck, Plus, MapPin, Phone, Edit3, Trash2, Citrus } from 'lucide-react';

export const SuppliersPage = React.memo(() => {
  const suppliers = useStore(state => state.suppliers);
  const deleteSupplier = useStore(state => state.deleteSupplier);
  const openModal = useStore(state => state.openModal);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#047857]" /> Directorio de Proveedores
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Mayoristas y distribuidoras frutícolas</p>
        </div>

        <button
          onClick={() => openModal('supplier')}
          className="px-4 py-2.5 bg-[#047857] hover:bg-[#065f46] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Agregar Proveedor
        </button>
      </div>

      {/* Grid of Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <Truck className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No hay proveedores registrados en el directorio.</p>
          </div>
        ) : (
          suppliers.map((supp) => {
            const initial = supp.name.charAt(0).toUpperCase();
            return (
              <div
                key={supp.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#059669] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#047857] border border-emerald-200 flex items-center justify-center font-black text-xl shrink-0">
                    {initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{supp.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#059669] shrink-0" /> {supp.location || 'Venezuela'}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <p className="flex items-center gap-1.5">
                    <Citrus className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <strong>Frutas:</strong> <span className="text-slate-600 truncate font-medium">{supp.fruit}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                    <strong>Teléfono:</strong> <span className="text-slate-600 font-mono font-semibold">{supp.phone}</span>
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openModal('supplier', supp)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`¿Deseas eliminar al proveedor ${supp.name}?`)) {
                        deleteSupplier(supp.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
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
