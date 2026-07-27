import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import { auth, onAuthStateChanged } from './firebase/config';

// Layout & Common
import { Header } from './components/layout/Header';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
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
import { ReceivableDetailsModal } from './components/receivables/ReceivableDetailsModal';
import { PayableModal } from './components/payables/PayableModal';
import { TransactionModal } from './components/cashflow/TransactionModal';

// Code-split pages
const OverviewPage = lazy(() => import('./pages/OverviewPage').then(m => ({ default: m.OverviewPage })));
const PosPage = lazy(() => import('./pages/PosPage').then(m => ({ default: m.PosPage })));
const InventoryPage = lazy(() => import('./pages/InventoryPage').then(m => ({ default: m.InventoryPage })));
const SuppliersPage = lazy(() => import('./pages/SuppliersPage').then(m => ({ default: m.SuppliersPage })));
const ReceivablesPage = lazy(() => import('./pages/ReceivablesPage').then(m => ({ default: m.ReceivablesPage })));
const PayablesPage = lazy(() => import('./pages/PayablesPage').then(m => ({ default: m.PayablesPage })));
const CashflowPage = lazy(() => import('./pages/CashflowPage').then(m => ({ default: m.CashflowPage })));

export default function App() {
  const setUser = useStore(state => state.setUser);
  const refreshBcvRate = useStore(state => state.refreshBcvRate);

  useEffect(() => {
    refreshBcvRate(false);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser, refreshBcvRate]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#f5f5f0]">
        <LoginOverlay />

        {/* Header — mobile sticky top */}
        <Header />

        {/* Main content */}
        <main className="px-3 pt-3 pb-24 max-w-xl mx-auto">
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

        {/* Mobile bottom nav */}
        <MobileBottomNav />

        {/* All Modals */}
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
        <ReceivableDetailsModal />
        <PayableModal />
        <TransactionModal />
      </div>
    </ErrorBoundary>
  );
}
