import React, { useState, useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Menu, 
  RotateCw, 
  MoreVertical, 
  PlusCircle, 
  MinusCircle, 
  Lock, 
  TrendingUp,
  Building2,
  Calculator,
  LogOut
} from 'lucide-react';
import { auth, signOut } from '../../firebase/config';
import { MobileDrawer } from './MobileDrawer';

export const Header = React.memo(() => {
  const bcvRate = useStore(state => state.bcvRate);
  const bcvLoading = useStore(state => state.bcvLoading);
  const refreshBcvRate = useStore(state => state.refreshBcvRate);
  const openModal = useStore(state => state.openModal);
  const setUser = useStore(state => state.setUser);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setUser(null);
  }, [setUser]);

  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 space-y-3 shadow-xs">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Menú Principal"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                FrutiControl VE
              </h1>
              <p className="text-[11px] font-medium text-slate-500">POS & Gestión Frutícola</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => refreshBcvRate(true)}
              title="Actualizar Tasa BCV"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <RotateCw className={`w-4 h-4 ${bcvLoading ? 'spin-anim text-emerald-600' : ''}`} />
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-fadeIn text-xs font-medium">
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

        {/* BCV Green Banner */}
        <div
          onClick={() => openModal('bcvCalc')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center justify-between font-semibold text-xs shadow-xs cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>Tasa Oficial BCV: <strong className="font-bold">{bcvRate.toFixed(2)} Bs./$</strong></span>
          </div>
          <TrendingUp className="w-4 h-4 text-emerald-200 shrink-0" />
        </div>

        {/* Quick Actions Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 text-xs">
          <button
            onClick={() => openModal('pos')}
            className="btn-primary shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> + POS Venta
          </button>

          <button
            onClick={() => openModal('expense')}
            className="btn-secondary shrink-0"
          >
            <MinusCircle className="w-4 h-4 text-rose-500" /> Anotar Gasto
          </button>

          <button
            onClick={() => openModal('dailyClosure')}
            className="btn-secondary shrink-0"
          >
            <Lock className="w-4 h-4 text-slate-500" /> Cerrar Día
          </button>
        </div>
      </header>

      {/* Slide Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={handleCloseDrawer} />
    </>
  );
});
