import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Menu, 
  RotateCw, 
  MoreVertical, 
  ShoppingCart, 
  Edit3, 
  Lock, 
  TrendingUp,
  Building2,
  Calculator,
  LogOut
} from 'lucide-react';
import { auth, signOut } from '../../firebase/config';
import { MobileDrawer } from './MobileDrawer';

export const Header = () => {
  const { bcvRate, bcvLoading, refreshBcvRate, openModal, setUser } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setUser(null);
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 p-3 sm:p-4 space-y-2.5 shadow-sm">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 min-w-[40px] min-h-[40px] flex items-center justify-center"
              title="Menú"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#047857] leading-none tracking-tight">
                FrutiControl VE
              </h1>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">POS & Gestión</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refreshBcvRate(true)}
              title="Refrescar BCV"
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <RotateCw className={`w-5 h-5 ${bcvLoading ? 'spin-anim text-emerald-600' : ''}`} />
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn text-xs font-semibold">
                  <button
                    onClick={() => { setMenuOpen(false); openModal('bcvCalc'); }}
                    className="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-emerald-600" /> Calculadora BCV
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    className="w-full px-4 py-2.5 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BCV Green Full-Width Banner Pill */}
        <div
          onClick={() => openModal('bcvCalc')}
          className="w-full bg-[#059669] hover:bg-[#047857] text-white px-4 py-2.5 rounded-2xl flex items-center justify-between font-bold text-xs shadow-sm cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>BCV HOY: {bcvRate.toFixed(2)} Bs.</span>
          </div>
          <TrendingUp className="w-4 h-4 text-emerald-200 shrink-0" />
        </div>

        {/* Scrollable Quick Action Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-bold">
          <button
            onClick={() => openModal('pos')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <ShoppingCart className="w-4 h-4 text-slate-700" /> + POS Venta
          </button>

          <button
            onClick={() => openModal('expense')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <Edit3 className="w-4 h-4 text-slate-700" /> Anotar Gasto
          </button>

          <button
            onClick={() => openModal('dailyClosure')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <Lock className="w-4 h-4 text-slate-700" /> Cerrar Día
          </button>
        </div>
      </header>

      {/* Slide Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
