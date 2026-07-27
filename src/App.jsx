import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import { auth, onAuthStateChanged } from './firebase/config';

// Layout & Common
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingSkeleton } from './components/common/LoadingSkeleton';

// Modals
import { BcvCalculatorModal } from './components/common/BcvCalculatorModal';
import { DailyClosureModal } from './components/common/DailyClosureModal';
import { LoginOverlay } from './components/auth/LoginOverlay';
import { PosTerminalModal } from './components/pos/PosTerminalModal';
import { ReceiptModal } from './components/pos/ReceiptModal';
import { FruitModal } from './components/inventory/FruitModal';
import { RestockModal } from './components/inventory/RestockModal';
import { WasteModal } from './components/inventory/WasteModal';
import { SupplierModal } from './components/suppliers/SupplierModal';
import { ReceivableModal } from './components/receivables/ReceivableModal';
import { PayReceivableModal } from './components/receivables/PayReceivableModal';
import { PayableModal } from './components/payables/PayableModal';
import { TransactionModal } from './components/cashflow/TransactionModal';

// Code-split pages (Lazy loading)
const OverviewPage = lazy(() => import('./pages/OverviewPage').then(m => ({ default: m.OverviewPage })));
const PosPage = lazy(() => import('./pages/PosPage').then(m => ({ default: m.PosPage })));
const InventoryPage = lazy(() => import('./pages/InventoryPage').then(m => ({ default: m.InventoryPage })));
const SuppliersPage = lazy(() => import('./pages/SuppliersPage').then(m => ({ default: m.SuppliersPage })));
const ReceivablesPage = lazy(() => import('./pages/ReceivablesPage').then(m => ({ default: m.ReceivablesPage })));
const PayablesPage = lazy(() => import('./pages/PayablesPage').then(m => ({ default: m.PayablesPage })));
const CashflowPage = lazy(() => import('./pages/CashflowPage').then(m => ({ default: m.CashflowPage })));

export default function App() {
  const { setUser, refreshBcvRate } = useStore();

  useEffect(() => {
    refreshBcvRate(false);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [setUser, refreshBcvRate]);

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen bg-[#f4f7f4] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
        {/* Auth Overlay */}
        <LoginOverlay />

        {/* Sidebar navigation (Desktop) */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
          <Header />

          <main className="flex-1 p-3 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/pos" element={<PosPage />} />
                <Route path="/inventario" element={<InventoryPage />} />
                <Route path="/proveedores" element={<SuppliersPage />} />
                <Route path="/fiados" element={<ReceivablesPage />} />
                <Route path="/por-pagar" element={<PayablesPage />} />
                <Route path="/flujo-caja" element={<CashflowPage />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>

        {/* Mobile Navigation */}
        <MobileBottomNav />

        {/* Modals & Toasts Container */}
        <ToastContainer />
        <BcvCalculatorModal />
        <DailyClosureModal />
        <PosTerminalModal />
        <ReceiptModal />
        <FruitModal />
        <RestockModal />
        <WasteModal />
        <SupplierModal />
        <ReceivableModal />
        <PayReceivableModal />
        <PayableModal />
        <TransactionModal />
      </div>
    </ErrorBoundary>
  );
}
