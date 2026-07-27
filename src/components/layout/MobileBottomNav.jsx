import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { PieChart, Boxes, Store, HandCoins, TrendingUp } from 'lucide-react';

export const MobileBottomNav = () => {
  const { openModal } = useStore();

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => openModal('pos')}
        className="fixed bottom-20 right-4 z-40 md:hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/50 flex items-center justify-center border-2 border-emerald-400/30 active:scale-95 transition-all"
        title="Nueva Venta POS"
      >
        <Store className="w-6 h-6" />
      </button>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around py-2 px-1 md:hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-semibold transition-colors ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <PieChart className="w-5 h-5" />
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/inventario"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-semibold transition-colors ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Boxes className="w-5 h-5" />
          <span>Stock</span>
        </NavLink>

        <button
          onClick={() => openModal('pos')}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-bold text-emerald-400"
        >
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white -mt-4 shadow-lg shadow-emerald-600/40 border-2 border-slate-900">
            <Store className="w-4 h-4" />
          </div>
          <span>POS</span>
        </button>

        <NavLink
          to="/fiados"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-semibold transition-colors ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <HandCoins className="w-5 h-5" />
          <span>Cobrar</span>
        </NavLink>

        <NavLink
          to="/flujo-caja"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-semibold transition-colors ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <TrendingUp className="w-5 h-5" />
          <span>Flujo</span>
        </NavLink>
      </nav>
    </>
  );
};
