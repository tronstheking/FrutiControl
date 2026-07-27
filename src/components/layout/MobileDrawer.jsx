import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  X, 
  Citrus, 
  PieChart, 
  Store, 
  Boxes, 
  Truck, 
  HandCoins, 
  FileSpreadsheet, 
  TrendingUp, 
  PlusCircle,
  Building2,
  RotateCcw
} from 'lucide-react';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { openModal, bcvRate, resetToDefaultData } = useStore();

  if (!isOpen) return null;

  const navItems = [
    { to: "/", label: "Resumen General", icon: PieChart },
    { to: "/pos", label: "Punto de Venta POS", icon: Store },
    { to: "/inventario", label: "Inventario", icon: Boxes },
    { to: "/proveedores", label: "Proveedores", icon: Truck },
    { to: "/fiados", label: "Por Cobrar (Fiados)", icon: HandCoins },
    { to: "/por-pagar", label: "Por Pagar", icon: FileSpreadsheet },
    { to: "/flujo-caja", label: "Flujo de Caja", icon: TrendingUp },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-slate-900 h-full border-r border-slate-800 flex flex-col justify-between p-5 z-10 animate-slideRight">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <Citrus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">FrutiControl VE</h3>
                <span className="text-[10px] text-emerald-400 font-semibold">Tasa: {bcvRate.toFixed(2)} Bs.</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              openModal('pos');
            }}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Venta Rápida POS
          </button>

          <button
            onClick={() => {
              if (window.confirm("¿Restablecer datos base de demostración?")) {
                resetToDefaultData();
                onClose();
              }
            }}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restablecer Datos
          </button>
        </div>
      </div>
    </div>
  );
};
