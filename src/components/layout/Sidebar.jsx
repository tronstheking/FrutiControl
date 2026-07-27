import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  PieChart, 
  Store, 
  Boxes, 
  Truck, 
  HandCoins, 
  FileSpreadsheet, 
  TrendingUp, 
  PlusCircle, 
  Citrus 
} from 'lucide-react';

export const Sidebar = () => {
  const { openModal } = useStore();

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
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex shrink-0 min-h-screen sticky top-0 h-screen">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <Citrus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white leading-none flex items-center gap-1.5">
              FrutiControl <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">VE 🇻🇪</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">POS & Gestión VE</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/5'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
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

      {/* Footer Quick Action */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => openModal('pos')}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" /> Nueva Venta Rápida
        </button>
      </div>
    </aside>
  );
};
