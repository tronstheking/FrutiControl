import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { LayoutGrid, Truck, Package, Wallet, BookMarked, Zap } from 'lucide-react';

export const MobileBottomNav = React.memo(() => {
  const { openModal } = useStore();
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Inicio', icon: LayoutGrid },
    { to: '/inventario', label: 'Stock', icon: Package },
    { to: '/flujo-caja', label: 'Caja', icon: Wallet },
    { to: '/fiados', label: 'Fiados', icon: BookMarked },
    { to: '/proveedores', label: 'Proveedores', icon: Truck },
  ];

  return (
    <>
      {/* FAB — Nueva Venta */}
      <button
        onClick={() => openModal('pos')}
        className="fab md:hidden"
        aria-label="Nueva Venta Rápida"
      >
        <Zap className="w-4 h-4 fill-white" />
        <span>Nueva Venta</span>
      </button>

      {/* Bottom Navigation */}
      <nav className="bottom-nav md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-item-icon">
                <Icon className="w-5 h-5" />
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
});
