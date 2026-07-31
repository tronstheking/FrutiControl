import { create } from 'zustand';
import { fetchBcvRate } from '../services/bcvService';
import { auth, db, doc, setDoc, collection, onSnapshot, getDocs } from '../firebase/config';
import { getTodayDateString } from '../utils/formatters';

const STORAGE_KEY = "freshcontrol_ve_db_v1";
const SHARED_DOC_ID = "main_store";
let unsubscribeCloud = null;
let hasConsolidatedLegacyDocs = false;

const defaultData = {
  capitalInicial: 0,
  inventory: [],
  suppliers: [],
  receivables: [],
  payables: [],
  transactions: []
};

const mergeItemsById = (targetArr = [], sourceArr = []) => {
  const map = new Map();
  (targetArr || []).forEach(item => {
    if (item && item.id !== undefined) map.set(String(item.id), item);
  });
  (sourceArr || []).forEach(item => {
    if (item && item.id !== undefined) {
      if (!map.has(String(item.id))) {
        map.set(String(item.id), item);
      }
    }
  });
  return Array.from(map.values());
};

const loadInitialState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const mockNames = ['Manzana Gala', 'Naranja Val.', 'Cambur Banano', 'Mango Tommy', 'Lechoza', 'Aguacate Hass'];
      const cleanInventory = Array.isArray(parsed.inventory)
        ? parsed.inventory.filter(item => item && item.name && !mockNames.includes(item.name))
        : [];

      return {
        capitalInicial: Number(parsed.capitalInicial) || 0,
        inventory: cleanInventory,
        suppliers: Array.isArray(parsed.suppliers) ? parsed.suppliers : [],
        receivables: Array.isArray(parsed.receivables) ? parsed.receivables : [],
        payables: Array.isArray(parsed.payables) ? parsed.payables : [],
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      };
    } catch (e) {
      console.warn("Error leyendo localStorage, usando defaults", e);
    }
  }
  return defaultData;
};

export const useStore = create((set, get) => {
  const initial = loadInitialState();

  const syncState = (newState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        capitalInicial: newState.capitalInicial,
        inventory: newState.inventory,
        suppliers: newState.suppliers,
        receivables: newState.receivables,
        payables: newState.payables,
        transactions: newState.transactions
      }));

      // Firebase Firestore cloud backup to SHARED main_store document
      const payload = {
        capitalInicial: newState.capitalInicial,
        inventory: newState.inventory,
        suppliers: newState.suppliers,
        receivables: newState.receivables,
        payables: newState.payables,
        transactions: newState.transactions,
        updatedAt: new Date().toISOString()
      };

      setDoc(doc(db, "user_data", SHARED_DOC_ID), payload).catch(err => console.warn("Firestore main_store sync warning:", err));

      const currentUser = get()?.user || auth.currentUser;
      if (currentUser && currentUser.uid && currentUser.uid !== SHARED_DOC_ID) {
        setDoc(doc(db, "user_data", currentUser.uid), payload).catch(err => console.warn("Firestore user sync warning:", err));
      }
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  return {
    ...initial,

    // Auth & User State
    user: (() => {
      try {
        const saved = localStorage.getItem('fruticontrol_user_session');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        return null;
      }
    })(),

    setUser: (user) => {
      if (unsubscribeCloud) {
        unsubscribeCloud();
        unsubscribeCloud = null;
      }

      if (user && user.uid) {
        const userData = { uid: user.uid, email: user.email || 'usuario@fruticontrol.com', isAnonymous: !!user.isAnonymous };
        try { localStorage.setItem('fruticontrol_user_session', JSON.stringify(userData)); } catch (e) {}
        set({ user: userData });

        // Connect to Firebase Cloud Database on the central main_store document
        try {
          const mainDocRef = doc(db, "user_data", SHARED_DOC_ID);

          unsubscribeCloud = onSnapshot(mainDocRef, async (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              const cleanInv = Array.isArray(data.inventory)
                ? data.inventory.filter(i => i && i.name && !['Manzana Gala', 'Naranja Val.', 'Cambur Banano', 'Mango Tommy', 'Lechoza', 'Aguacate Hass'].includes(i.name))
                : [];

              let cloudCapital = Number(data.capitalInicial) || 0;
              let cloudInventory = cleanInv;
              let cloudSuppliers = Array.isArray(data.suppliers) ? data.suppliers : [];
              let cloudReceivables = Array.isArray(data.receivables) ? data.receivables : [];
              let cloudPayables = Array.isArray(data.payables) ? data.payables : [];
              let cloudTransactions = Array.isArray(data.transactions) ? data.transactions : [];

              // One-time consolidation of existing legacy documents (e.g. H437bymFaAcZQwdfwNUXto3E2PI2) into main_store
              if (!hasConsolidatedLegacyDocs) {
                hasConsolidatedLegacyDocs = true;
                try {
                  const querySnap = await getDocs(collection(db, "user_data"));
                  let needsUpdate = false;
                  querySnap.forEach(d => {
                    if (d.id !== SHARED_DOC_ID) {
                      const legacyData = d.data();
                      if (Array.isArray(legacyData.inventory)) {
                        const beforeCount = cloudInventory.length;
                        const legacyClean = legacyData.inventory.filter(i => i && i.name && !['Manzana Gala', 'Naranja Val.', 'Cambur Banano', 'Mango Tommy', 'Lechoza', 'Aguacate Hass'].includes(i.name));
                        cloudInventory = mergeItemsById(cloudInventory, legacyClean);
                        if (cloudInventory.length > beforeCount) needsUpdate = true;
                      }
                      if (Array.isArray(legacyData.suppliers)) {
                        const before = cloudSuppliers.length;
                        cloudSuppliers = mergeItemsById(cloudSuppliers, legacyData.suppliers);
                        if (cloudSuppliers.length > before) needsUpdate = true;
                      }
                      if (Array.isArray(legacyData.receivables)) {
                        const before = cloudReceivables.length;
                        cloudReceivables = mergeItemsById(cloudReceivables, legacyData.receivables);
                        if (cloudReceivables.length > before) needsUpdate = true;
                      }
                      if (Array.isArray(legacyData.payables)) {
                        const before = cloudPayables.length;
                        cloudPayables = mergeItemsById(cloudPayables, legacyData.payables);
                        if (cloudPayables.length > before) needsUpdate = true;
                      }
                      if (Array.isArray(legacyData.transactions)) {
                        const before = cloudTransactions.length;
                        cloudTransactions = mergeItemsById(cloudTransactions, legacyData.transactions);
                        if (cloudTransactions.length > before) needsUpdate = true;
                      }
                      if (legacyData.capitalInicial) {
                        cloudCapital = Math.max(cloudCapital, Number(legacyData.capitalInicial));
                      }
                    }
                  });

                  if (needsUpdate) {
                    await setDoc(mainDocRef, {
                      capitalInicial: cloudCapital,
                      inventory: cloudInventory,
                      suppliers: cloudSuppliers,
                      receivables: cloudReceivables,
                      payables: cloudPayables,
                      transactions: cloudTransactions,
                      updatedAt: new Date().toISOString()
                    });
                  }
                } catch (err) {
                  console.warn("Legacy docs consolidation note:", err);
                }
              }

              set({
                capitalInicial: cloudCapital,
                inventory: cloudInventory,
                suppliers: cloudSuppliers,
                receivables: cloudReceivables,
                payables: cloudPayables,
                transactions: cloudTransactions
              });

              // Persist locally
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                  capitalInicial: cloudCapital,
                  inventory: cloudInventory,
                  suppliers: cloudSuppliers,
                  receivables: cloudReceivables,
                  payables: cloudPayables,
                  transactions: cloudTransactions
                }));
              } catch (e) {}

              get().addToast("☁️ Datos sincronizados con la nube.", "info");
            } else {
              // Document main_store does not exist yet -> Consolidate all legacy UID documents & local state into main_store
              try {
                const querySnap = await getDocs(collection(db, "user_data"));
                let initInventory = [];
                let initSuppliers = [];
                let initReceivables = [];
                let initPayables = [];
                let initTransactions = [];
                let maxCap = get().capitalInicial || 0;

                querySnap.forEach(d => {
                  const dData = d.data();
                  if (Array.isArray(dData.inventory)) initInventory = mergeItemsById(initInventory, dData.inventory.filter(i => i && i.name && !['Manzana Gala', 'Naranja Val.', 'Cambur Banano', 'Mango Tommy', 'Lechoza', 'Aguacate Hass'].includes(i.name)));
                  if (Array.isArray(dData.suppliers)) initSuppliers = mergeItemsById(initSuppliers, dData.suppliers);
                  if (Array.isArray(dData.receivables)) initReceivables = mergeItemsById(initReceivables, dData.receivables);
                  if (Array.isArray(dData.payables)) initPayables = mergeItemsById(initPayables, dData.payables);
                  if (Array.isArray(dData.transactions)) initTransactions = mergeItemsById(initTransactions, dData.transactions);
                  if (dData.capitalInicial) maxCap = Math.max(maxCap, Number(dData.capitalInicial));
                });

                const currentLocal = get();
                initInventory = mergeItemsById(initInventory, currentLocal.inventory);
                initSuppliers = mergeItemsById(initSuppliers, currentLocal.suppliers);
                initReceivables = mergeItemsById(initReceivables, currentLocal.receivables);
                initPayables = mergeItemsById(initPayables, currentLocal.payables);
                initTransactions = mergeItemsById(initTransactions, currentLocal.transactions);

                const seededData = {
                  capitalInicial: maxCap || currentLocal.capitalInicial,
                  inventory: initInventory,
                  suppliers: initSuppliers,
                  receivables: initReceivables,
                  payables: initPayables,
                  transactions: initTransactions,
                  updatedAt: new Date().toISOString()
                };

                await setDoc(mainDocRef, seededData);
              } catch (err) {
                console.warn("Initial Firestore seed warning:", err);
              }
            }
          }, (err) => {
            console.warn("Snapshot error (Firestore rules/network):", err);
            get().addToast("⚠️ Permisos de Firebase bloqueados.", "warning");
          });
        } catch (e) {
          console.warn("Error subscripting to cloud database:", e);
        }
      } else {
        try { localStorage.removeItem('fruticontrol_user_session'); } catch (e) {}
        set({ user: null });
      }
    },

    // BCV Rate State
    bcvRate: 36.50,
    bcvTimeStr: 'Reciente',
    bcvLoading: false,
    refreshBcvRate: async (force = false) => {
      set({ bcvLoading: true });
      const data = await fetchBcvRate(force);
      set({ bcvRate: data.rate, bcvTimeStr: data.timeStr, bcvLoading: false });
      if (force) {
        get().addToast(`Tasa BCV actualizada: ${data.rate.toFixed(2)} Bs.`);
      }
    },

    // Core Business Data
    capitalInicial: initial.capitalInicial,
    inventory: initial.inventory,
    suppliers: initial.suppliers,
    receivables: initial.receivables,
    payables: initial.payables,
    transactions: initial.transactions,

    // POS Cart State
    posCart: [],

    // Toast Notifications State
    toasts: [],
    addToast: (message, type = 'info') => {
      const id = Date.now() + Math.random();
      set(state => ({ toasts: [...state.toasts, { id, message, type }] }));
      setTimeout(() => {
        set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
      }, 3500);
    },
    removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),

    // Active Modals Control
    activeModal: null, // null | 'pos' | 'expense' | 'restock' | 'waste' | 'fruit' | 'supplier' | 'receivable' | 'payReceivable' | 'payable' | 'bcvCalc' | 'dailyClosure' | 'receipt'
    modalData: null,
    openModal: (modalType, data = null) => set({ activeModal: modalType, modalData: data }),
    closeModal: () => set({ activeModal: null, modalData: null }),

    // POS Cart Actions
    addToPosCart: (fruit) => {
      set(state => {
        const existingIdx = state.posCart.findIndex(item => item.fruitId === fruit.id);
        let updatedCart;
        if (existingIdx !== -1) {
          updatedCart = state.posCart.map((item, idx) => 
            idx === existingIdx ? { ...item, kg: item.kg + 1.0 } : item
          );
        } else {
          updatedCart = [...state.posCart, {
            fruitId: fruit.id,
            name: fruit.name,
            kg: 1.0,
            priceKg: Number(fruit.priceKg)
          }];
        }
        return { posCart: updatedCart };
      });
    },

    updatePosCartQty: (index, delta) => {
      set(state => {
        const updated = [...state.posCart];
        if (updated[index]) {
          updated[index].kg = Math.max(0.1, updated[index].kg + delta);
        }
        return { posCart: updated };
      });
    },

    removePosCartItem: (index) => {
      set(state => ({
        posCart: state.posCart.filter((_, idx) => idx !== index)
      }));
    },

    clearPosCart: () => set({ posCart: [] }),

    // Inventory Actions
    addFruit: (fruitData, logAsExpense = false) => {
      set(state => {
        const newFruit = { id: Date.now(), ...fruitData };
        const updatedInventory = [...state.inventory, newFruit];
        
        let updatedTransactions = state.transactions;
        const totalCostUSD = (Number(fruitData.kg) || 0) * (Number(fruitData.costKg) || 0);

        if (logAsExpense && totalCostUSD > 0) {
          const today = getTodayDateString();
          updatedTransactions = [
            ...state.transactions,
            {
              id: Date.now(),
              date: today,
              description: `Compra Mercancía / Lote (${fruitData.kg}kg ${fruitData.name})`,
              type: "Egreso",
              amount: totalCostUSD
            }
          ];
        }

        const newState = { ...state, inventory: updatedInventory, transactions: updatedTransactions };
        syncState(newState);
        return { inventory: updatedInventory, transactions: updatedTransactions };
      });
      get().addToast("🍎 Producto añadido al inventario.", "success");
    },

    editFruit: (id, fruitData) => {
      set(state => {
        const updatedInventory = state.inventory.map(f => f.id === id ? { ...f, ...fruitData } : f);
        const newState = { ...state, inventory: updatedInventory };
        syncState(newState);
        return { inventory: updatedInventory };
      });
      get().addToast("Fruta actualizada.", "info");
    },

    deleteFruit: (id) => {
      set(state => {
        const updatedInventory = state.inventory.filter(f => String(f.id) !== String(id));
        const newState = { ...state, inventory: updatedInventory };
        syncState(newState);
        return { inventory: updatedInventory };
      });
      get().addToast("Fruta eliminada.", "warning");
    },

    restockFruit: (id, addedKg, costKg, logAsExpense) => {
      const state = get();
      const fruit = state.inventory.find(f => String(f.id) === String(id));
      if (!fruit) return;

      const newKg = Number((Number(fruit.kg) + addedKg).toFixed(1));
      const updatedInventory = state.inventory.map(f => String(f.id) === String(id) ? { ...f, kg: newKg, costKg } : f);
      
      let updatedTransactions = state.transactions;
      const totalExpenseUSD = addedKg * costKg;

      if (logAsExpense && totalExpenseUSD > 0) {
        const today = getTodayDateString();
        updatedTransactions = [
          ...state.transactions,
          {
            id: Date.now(),
            date: today,
            description: `Compra Stock (${addedKg}kg ${fruit.name})`,
            type: "Egreso",
            amount: totalExpenseUSD
          }
        ];
      }

      const newState = { ...state, inventory: updatedInventory, transactions: updatedTransactions };
      syncState(newState);
      set({ inventory: updatedInventory, transactions: updatedTransactions });
      get().addToast(`📦 Re-surtido exitoso (+${addedKg}kg de ${fruit.name}).`, "success");
    },

    registerWaste: (fruitId, wasteKg, reason, logAsExpense) => {
      const state = get();
      const fruit = state.inventory.find(f => String(f.id) === String(fruitId));
      if (!fruit) return;

      const newKg = Math.max(0, Number((Number(fruit.kg) - wasteKg).toFixed(1)));
      const updatedInventory = state.inventory.map(f => String(f.id) === String(fruitId) ? { ...f, kg: newKg } : f);

      let updatedTransactions = state.transactions;
      const costKg = Number(fruit.costKg) || (Number(fruit.priceKg) * 0.7);
      const lossUSD = wasteKg * costKg;

      if (logAsExpense && lossUSD > 0) {
        const today = getTodayDateString();
        updatedTransactions = [
          ...state.transactions,
          {
            id: Date.now(),
            date: today,
            description: `Merma / Fruta Dañada (${wasteKg}kg ${fruit.name} - ${reason})`,
            type: "Egreso",
            amount: lossUSD
          }
        ];
      }

      const newState = { ...state, inventory: updatedInventory, transactions: updatedTransactions };
      syncState(newState);
      set({ inventory: updatedInventory, transactions: updatedTransactions });
      get().addToast(`🍎 Merma registrada (${wasteKg}kg de ${fruit.name}).`, "warning");
    },

    // Suppliers Actions
    addSupplier: (supplierData) => {
      set(state => {
        const newSupplier = { id: Date.now(), ...supplierData };
        const updated = [...state.suppliers, newSupplier];
        const newState = { ...state, suppliers: updated };
        syncState(newState);
        return { suppliers: updated };
      });
      get().addToast("Proveedor registrado.", "success");
    },

    editSupplier: (id, supplierData) => {
      set(state => {
        const updated = state.suppliers.map(s => String(s.id) === String(id) ? { ...s, ...supplierData } : s);
        const newState = { ...state, suppliers: updated };
        syncState(newState);
        return { suppliers: updated };
      });
      get().addToast("Proveedor actualizado.", "info");
    },

    deleteSupplier: (id) => {
      set(state => {
        const updated = state.suppliers.filter(s => String(s.id) !== String(id));
        const newState = { ...state, suppliers: updated };
        syncState(newState);
        return { suppliers: updated };
      });
      get().addToast("Proveedor eliminado.", "warning");
    },

    // Receivables (Fiados) Actions
    addReceivable: (receivableData) => {
      set(state => {
        const newRec = {
          id: Date.now(),
          status: "Pendiente",
          remainingAmount: receivableData.amount,
          abonos: [],
          ...receivableData
        };
        const updated = [...state.receivables, newRec];
        const newState = { ...state, receivables: updated };
        syncState(newState);
        return { receivables: updated };
      });
      get().addToast("🤝 Fiado registrado en el cuaderno.", "success");
    },

    editReceivable: (id, receivableData) => {
      set(state => {
        const updated = state.receivables.map(r => String(r.id) === String(id) ? { ...r, ...receivableData } : r);
        const newState = { ...state, receivables: updated };
        syncState(newState);
        return { receivables: updated };
      });
      get().addToast("Fiado actualizado.", "info");
    },

    payReceivable: (id, paymentAmount, isFullPayment, paymentMethod = '📱 Pago Móvil') => {
      const state = get();
      const rec = state.receivables.find(r => String(r.id) === String(id));
      if (!rec) return;

      const currentRemaining = rec.remainingAmount !== undefined ? Number(rec.remainingAmount) : Number(rec.amount);
      const paidVal = isFullPayment ? currentRemaining : Math.min(currentRemaining, Number(paymentAmount));
      const newRemaining = Math.max(0, currentRemaining - paidVal);
      const isPaid = newRemaining === 0;

      const today = getTodayDateString();
      const abonoEntry = { 
        id: Date.now(),
        date: today, 
        amount: paidVal,
        method: paymentMethod
      };

      const updatedReceivables = state.receivables.map(r => {
        if (String(r.id) === String(id)) {
          return {
            ...r,
            remainingAmount: newRemaining,
            status: isPaid ? "Pagado" : "Pendiente",
            abonos: [...(r.abonos || []), abonoEntry]
          };
        }
        return r;
      });

      // Register income transaction with payment method
      const updatedTransactions = [
        ...state.transactions,
        {
          id: Date.now(),
          date: today,
          description: `Cobro de Fiado [${paymentMethod}] (${rec.client} - ${isPaid ? 'Pago Completo' : 'Abono'})`,
          type: "Ingreso",
          amount: paidVal,
          method: paymentMethod
        }
      ];

      const newState = { ...state, receivables: updatedReceivables, transactions: updatedTransactions };
      syncState(newState);
      set({ receivables: updatedReceivables, transactions: updatedTransactions });
      get().addToast(`💵 Abono de $${paidVal.toFixed(2)} (${paymentMethod}) registrado.`, "success");
    },

    deleteReceivable: (id) => {
      set(state => {
        const updated = state.receivables.filter(r => String(r.id) !== String(id));
        const newState = { ...state, receivables: updated };
        syncState(newState);
        return { receivables: updated };
      });
      get().addToast("Fiado eliminado.", "warning");
    },

    // Payables Actions
    addPayable: (payableData) => {
      set(state => {
        const newPayable = {
          id: Date.now(),
          status: "Pendiente",
          ...payableData
        };
        const updated = [...state.payables, newPayable];
        const newState = { ...state, payables: updated };
        syncState(newState);
        return { payables: updated };
      });
      get().addToast("Deuda a proveedor registrada.", "success");
    },

    editPayable: (id, payableData) => {
      set(state => {
        const updated = state.payables.map(p => String(p.id) === String(id) ? { ...p, ...payableData } : p);
        const newState = { ...state, payables: updated };
        syncState(newState);
        return { payables: updated };
      });
      get().addToast("Cuenta por pagar actualizada.", "info");
    },

    markPayablePaid: (id) => {
      const state = get();
      const item = state.payables.find(p => String(p.id) === String(id));
      if (!item) return;

      const today = getTodayDateString();
      const updatedPayables = state.payables.map(p => String(p.id) === String(id) ? { ...p, status: "Pagado" } : p);

      const updatedTransactions = [
        ...state.transactions,
        {
          id: Date.now(),
          date: today,
          description: `Pago de Deuda Proveedor (${item.supplier} - ${item.concept})`,
          type: "Egreso",
          amount: Number(item.amount)
        }
      ];

      const newState = { ...state, payables: updatedPayables, transactions: updatedTransactions };
      syncState(newState);
      set({ payables: updatedPayables, transactions: updatedTransactions });
      get().addToast("Deuda a proveedor cancelada.", "success");
    },

    deletePayable: (id) => {
      set(state => {
        const updated = state.payables.filter(p => String(p.id) !== String(id));
        const newState = { ...state, payables: updated };
        syncState(newState);
        return { payables: updated };
      });
      get().addToast("Cuenta por pagar eliminada.", "warning");
    },

    // Transactions / Cashflow Actions
    addTransaction: (transData) => {
      set(state => {
        const newTrans = { id: Date.now(), ...transData };
        const updated = [newTrans, ...state.transactions];
        const newState = { ...state, transactions: updated };
        syncState(newState);
        return { transactions: updated };
      });
      get().addToast(`Movimiento de ${transData.type} registrado.`, "success");
    },

    deleteTransaction: (id) => {
      set(state => {
        const updated = state.transactions.filter(t => String(t.id) !== String(id));
        const newState = { ...state, transactions: updated };
        syncState(newState);
        return { transactions: updated };
      });
      get().addToast("Movimiento eliminado.", "warning");
    },

    // Checkout POS Cart
    processPosCheckout: (clientName, payMethod) => {
      const state = get();
      const cart = state.posCart;
      if (cart.length === 0) return null;

      const totalUSD = cart.reduce((sum, item) => sum + (item.kg * item.priceKg), 0);
      const today = getTodayDateString();

      // 1. Subtract inventory kg
      const updatedInventory = state.inventory.map(fruit => {
        const cartItem = cart.find(c => c.fruitId === fruit.id);
        if (cartItem) {
          return { ...fruit, kg: Math.max(0, Number((fruit.kg - cartItem.kg).toFixed(1))) };
        }
        return fruit;
      });

      let updatedReceivables = state.receivables;
      let updatedTransactions = state.transactions;

      const itemsSummary = cart.map(i => `${i.kg}kg ${i.name}`).join(", ");

      if (payMethod === "Fiado / Crédito") {
        const newRec = {
          id: Date.now(),
          client: clientName || "Cliente Mostrador",
          concept: `Fiado POS: ${itemsSummary}`,
          amount: totalUSD,
          remainingAmount: totalUSD,
          dueDate: today,
          status: "Pendiente",
          abonos: []
        };
        updatedReceivables = [...state.receivables, newRec];
      } else {
        const newTrans = {
          id: Date.now(),
          date: today,
          description: `Venta POS (${payMethod}): ${itemsSummary} - ${clientName || 'Mostrador'}`,
          type: "Ingreso",
          amount: totalUSD
        };
        updatedTransactions = [newTrans, ...state.transactions];
      }

      const newState = {
        ...state,
        inventory: updatedInventory,
        receivables: updatedReceivables,
        transactions: updatedTransactions
      };
      syncState(newState);

      const receiptData = {
        ticketNo: Math.floor(100000 + Math.random() * 900000),
        items: [...cart],
        totalUSD,
        payMethod,
        client: clientName || "Cliente Mostrador",
        date: today
      };

      set({
        inventory: updatedInventory,
        receivables: updatedReceivables,
        transactions: updatedTransactions,
        posCart: [],
        activeModal: 'receipt',
        modalData: receiptData
      });

      get().addToast(`✅ Venta procesada (${payMethod}) por $${totalUSD.toFixed(2)}`, "success");
      return receiptData;
    },

    // Reset System Data
    resetToDefaultData: () => {
      syncState(defaultData);
      set({
        capitalInicial: defaultData.capitalInicial,
        inventory: defaultData.inventory,
        suppliers: defaultData.suppliers,
        receivables: [],
        payables: [],
        transactions: []
      });
      get().addToast("🧹 Sistema restablecido a datos base.", "info");
    }
  };
});
