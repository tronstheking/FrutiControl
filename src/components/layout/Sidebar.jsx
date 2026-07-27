import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  Citrus, 
  LayoutGrid, 
  Calculator, 
  Package, 
  Truck, 
  BookMarked, 
  Receipt, 
  Wallet, 
  RotateCcw
} from 'lucide-react';

export const Sidebar = () => {
  const { bcvRate, resetToDefaultData } = useStore();

  const navItems = [
    { to: "/", label: "Resumen General", icon: LayoutGrid },
    { to: "/pos", label: "Punto de Venta POS", icon: Calculator },
    { to: "/inventario", label: "Inventario", icon: Package },
    { to: "/proveedores", label: "Proveedores", icon: Truck },
    { to: "/fiados", label: "Por Cobrar (Fiados)", icon: BookMarked },
    { to: "/por-pagar", label: "Por Pagar", icon: Receipt },
    { to: "/flujo-caja", label: "Flujo de Caja", icon: Wallet },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0 shadow-sm">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-[#059669] rounded-2xl flex items-center justify-center shadow-md text-white">
            <Citrus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-black text-[#047857] leading-none">FrutiControl VE</h1>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Tasa: {bcvRate.toFixed(2)} Bs.</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#059669] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Reset Action */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <button
          onClick={() => {
            if (window.confirm("¿Restablecer datos de demostración?")) {
              resetToDefaultData();
            }
          }}
          className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restablecer Datos
        </button>
      </div>
    </aside>
  );
};
