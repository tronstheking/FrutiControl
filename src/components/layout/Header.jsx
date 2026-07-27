import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Citrus, 
  Building2, 
  RotateCw, 
  Calculator, 
  LogOut, 
  ShoppingCart, 
  MinusCircle, 
  MessageSquareCode, 
  Apple,
  RotateCcw,
  Menu
} from 'lucide-react';
import { auth, signOut } from '../../firebase/config';
import { MobileDrawer } from './MobileDrawer';

export const Header = () => {
  const { bcvRate, bcvLoading, refreshBcvRate, openModal, setUser, resetToDefaultData } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setUser(null);
  };

  return (
    <>
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 p-3 sm:p-4 space-y-3">
        {/* Header Top Bar */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* Hamburger Menu (Mobile/Tablet) + Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white md:hidden shrink-0 border border-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Abrir Menú Navegación"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/30 shrink-0">
                <Citrus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white leading-none flex items-center gap-1">
                  FrutiControl <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">VE 🇻🇪</span>
                </h2>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-0.5">POS & Gestión Frutícola</p>
              </div>
            </div>
          </div>

          {/* BCV Badge & Utility Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* BCV Pill */}
            <button
              onClick={() => refreshBcvRate(true)}
              title="Tasa Oficial BCV - Toca para actualizar"
              className="flex items-center gap-1.5 sm:gap-2 bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all group min-h-[44px]"
            >
              <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left hidden sm:block">
                <span className="text-[9px] font-bold uppercase text-slate-400 block leading-none">BCV Hoy</span>
                <span className="text-xs font-extrabold text-white">{bcvRate.toFixed(2)} Bs.</span>
              </div>
              <span className="text-xs font-extrabold text-white sm:hidden">{bcvRate.toFixed(2)} Bs.</span>
              <RotateCw className={`w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 ${bcvLoading ? 'spin-anim' : ''}`} />
            </button>

            {/* Calculator Modal Toggle */}
            <button
              onClick={() => openModal('bcvCalc')}
              title="Calculadora BCV"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Calculator className="w-4 h-4" />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title="Cerrar Sesión"
              className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-500/30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Symmetrical Quick Action Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => openModal('pos')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95 min-h-[44px]"
          >
            <ShoppingCart className="w-4 h-4 shrink-0" /> + POS Venta
          </button>

          <button
            onClick={() => openModal('expense')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-bold text-xs rounded-xl border border-rose-500/40 transition-all active:scale-95 min-h-[44px]"
          >
            <MinusCircle className="w-4 h-4 shrink-0" /> - Anotar Gasto
          </button>

          <button
            onClick={() => openModal('dailyClosure')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-xl border border-slate-700 transition-all active:scale-95 min-h-[44px]"
          >
            <MessageSquareCode className="w-4 h-4 shrink-0" /> Cerrar Día
          </button>

          <button
            onClick={() => openModal('waste')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 transition-all active:scale-95 min-h-[44px]"
          >
            <Apple className="w-4 h-4 shrink-0" /> - Merma
          </button>
        </div>
      </header>

      {/* Slide Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
