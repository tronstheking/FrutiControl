import React from 'react';
import { useStore } from '../store/useStore';
import { Truck, Plus, MapPin, Phone, Edit3, Trash2, Citrus } from 'lucide-react';

export const SuppliersPage = () => {
  const { suppliers, deleteSupplier, openModal } = useStore();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-400" /> Directorio de Proveedores
          </h2>
          <p className="text-xs text-slate-400 mt-1">Mayoristas y distribuidoras frutícolas</p>
        </div>

        <button
          onClick={() => openModal('supplier')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> Agregar Proveedor
        </button>
      </div>

      {/* Grid of Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 glass-panel rounded-2xl border border-slate-800 space-y-2">
            <Truck className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm font-medium">No hay proveedores registrados en el directorio.</p>
          </div>
        ) : (
          suppliers.map((supp) => {
            const initial = supp.name.charAt(0).toUpperCase();
            return (
              <div
                key={supp.id}
                className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xl shrink-0">
                    {initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white truncate">{supp.name}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" /> {supp.location || 'Venezuela'}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <p className="flex items-center gap-1.5">
                    <Citrus className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <strong>Frutas:</strong> <span className="text-slate-400 truncate">{supp.fruit}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <strong>Teléfono:</strong> <span className="text-slate-400 font-mono">{supp.phone}</span>
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => openModal('supplier', supp)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`¿Deseas eliminar al proveedor ${supp.name}?`)) {
                        deleteSupplier(supp.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-500/30 transition-colors text-xs font-semibold flex items-center gap-1"
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
};
