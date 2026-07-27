import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  LayoutGrid, 
  Calculator, 
  Package, 
  Wallet, 
  MoreHorizontal, 
  Zap 
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { openModal } = useStore();
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Resumen", icon: LayoutGrid },
    { to: "/pos", label: "POS", icon: Calculator },
    { to: "/inventario", label: "Inventario", icon: Package },
    { to: "/flujo-caja", label: "Caja", icon: Wallet },
    { to: "/fiados", label: "Más", icon: MoreHorizontal },
  ];

  return (
    <>
      {/* Floating Action Button (FAB): Nueva Venta Rápida */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <button
          onClick={() => openModal('pos')}
          className="bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-lg shadow-emerald-700/30 flex items-center gap-2 transition-all active:scale-95"
        >
          <Zap className="w-4 h-4 fill-white" /> Nueva Venta Rápida
        </button>
      </div>

      {/* Bottom Fixed Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 md:hidden shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center min-w-[56px] py-1 transition-all"
              >
                <div
                  className={`w-12 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-[#059669] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-0.5 ${
                    isActive ? 'text-[#059669]' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};
