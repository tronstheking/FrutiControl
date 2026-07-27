import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { RotateCw, Building2, TrendingUp, Menu, X, PlusCircle, MinusCircle, Lock, Calculator, LogOut } from 'lucide-react';
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
    try { await signOut(auth); } catch (e) {}
    setUser(null);
    setMenuOpen(false);
  }, [setUser]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 -ml-2 rounded-xl text-gray-600 active:bg-gray-100 hover:bg-gray-50 transition-colors"
            title="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="text-center">
            <p className="text-[13px] font-bold text-gray-900 leading-none">FrutiControl VE</p>
            <p className="text-[10px] text-gray-500 font-medium">Gestión de Frutas</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="p-2 -mr-2 rounded-xl text-gray-600 active:bg-gray-100 hover:bg-gray-50 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 rotate-90" />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-200 py-1 z-50 text-sm font-medium">
                <button
                  onClick={() => { setMenuOpen(false); openModal('bcvCalc'); }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                >
                  <Calculator className="w-4 h-4 text-emerald-600" /> Calculadora BCV
                </button>
                <div className="border-t border-gray-100 mx-2" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BCV Rate Banner */}
        <button
          onClick={() => openModal('bcvCalc')}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-emerald-600 active:bg-emerald-700 text-white transition-colors"
        >
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Building2 className="w-4 h-4 text-emerald-200" />
            <span>Tasa BCV Oficial: <strong className="font-bold text-white">{bcvRate.toFixed(2)} Bs/$</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); refreshBcvRate(true); }}
              className="p-1 rounded-lg text-emerald-200 active:bg-emerald-500"
            >
              <RotateCw className={`w-3.5 h-3.5 ${bcvLoading ? 'spin-anim' : ''}`} />
            </button>
            <TrendingUp className="w-4 h-4 text-emerald-200" />
          </div>
        </button>

        {/* Quick actions row */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            <button
              onClick={() => openModal('pos')}
              className="flex-shrink-0 flex items-center gap-1.5 bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Venta</span>
            </button>

            <button
              onClick={() => openModal('expense')}
              className="flex-shrink-0 flex items-center gap-1.5 bg-red-50 active:bg-red-100 text-red-600 text-xs font-bold px-3.5 py-2 rounded-xl border border-red-100 transition-colors"
            >
              <MinusCircle className="w-4 h-4" />
              <span>Gasto</span>
            </button>

            <button
              onClick={() => openModal('dailyClosure')}
              className="flex-shrink-0 flex items-center gap-1.5 bg-gray-100 active:bg-gray-200 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-gray-200 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Cerrar Día</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-1.5 border-t border-gray-100 px-4 py-2 bg-gray-50/70 text-xs font-semibold">
          <NavLink to="/" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition-colors ${isActive ? 'bg-emerald-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-200'}`}>Inicio</NavLink>
          <NavLink to="/pos" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition-colors ${isActive ? 'bg-emerald-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-200'}`}>POS</NavLink>
          <NavLink to="/inventario" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition-colors ${isActive ? 'bg-emerald-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-200'}`}>Inventario</NavLink>
          <NavLink to="/proveedores" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition-colors ${isActive ? 'bg-emerald-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-200'}`}>Proveedores</NavLink>
          <NavLink to="/fiados" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition-colors ${isActive ? 'bg-emerald-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-200'}`}>Fiados</NavLink>
          <NavLink to="/por-pagar" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition-colors ${isActive ? 'bg-emerald-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-200'}`}>Por Pagar</NavLink>
          <NavLink to="/flujo-caja" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition-colors ${isActive ? 'bg-emerald-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-200'}`}>Caja</NavLink>
        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
});
