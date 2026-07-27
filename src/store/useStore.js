import { create } from 'zustand';
import { fetchBcvRate } from '../services/bcvService';
import { auth, db, doc, setDoc } from '../firebase/config';

const STORAGE_KEY = "freshcontrol_ve_db_v1";

const defaultData = {
  capitalInicial: 0,
  inventory: [
    { id: 101, name: "Manzana Gala", kg: 45, priceKg: 2.50, costKg: 1.50, image: "/fruits/manzana_gala.png", supplier: "Frutícola Los Andes" },
    { id: 102, name: "Naranja Val.", kg: 12, priceKg: 1.20, costKg: 0.70, image: "/fruits/naranja_val.png", supplier: "Comercializadora Barquisimeto" },
    { id: 103, name: "Cambur Banano", kg: 80, priceKg: 0.80, costKg: 0.45, image: "/fruits/cambur_banano.png", supplier: "Mayorista Mercado de Coche" },
    { id: 104, name: "Mango Tommy", kg: 3, priceKg: 1.50, costKg: 0.90, image: "/fruits/mango_tommy.png", supplier: "Mayorista Mercado de Coche" },
    { id: 105, name: "Lechoza", kg: 15, priceKg: 0.95, costKg: 0.55, image: "/fruits/lechoza.png", supplier: "Distribuidora La Guaira" },
    { id: 106, name: "Aguacate Hass", kg: 25, priceKg: 3.00, costKg: 1.80, image: "/fruits/aguacate_hass.png", supplier: "Frutícola Los Andes" }
  ],
  suppliers: [
    { id: 1, name: "Frutícola Los Andes", fruit: "Fresas, Parchitas, Aguacate", phone: "+58 412 5550199", location: "Mérida / Colonia Tovar" },
    { id: 2, name: "Mayorista Mercado de Coche", fruit: "Cambur, Mangos, Cítricos", phone: "+58 414 1112233", location: "Caracas" },
    { id: 3, name: "Comercializadora Barquisimeto", fruit: "Patilla, Melón, Piña", phone: "+58 424 9998877", location: "Lara" }
  ],
  receivables: [],
  payables: [],
  transactions: []
};

const loadInitialState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        capitalInicial: Number(parsed.capitalInicial) || 0,
        inventory: Array.isArray(parsed.inventory) ? parsed.inventory : defaultData.inventory,
        suppliers: Array.isArray(parsed.suppliers) ? parsed.suppliers : defaultData.suppliers,
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

      // Firebase Firestore cloud backup
      const currentUser = auth.currentUser;
      if (currentUser) {
        setDoc(doc(db, "user_data", currentUser.uid), {
          capitalInicial: newState.capitalInicial,
          inventory: newState.inventory,
          suppliers: newState.suppliers,
          receivables: newState.receivables,
          payables: newState.payables,
          transactions: newState.transactions
        }, { merge: true }).catch(err => console.warn("Firestore sync warning:", err));
      }
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  return {
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
      if (user) {
        const userData = { uid: user.uid, email: user.email || 'usuario@fruticontrol.com', isAnonymous: !!user.isAnonymous };
        try { localStorage.setItem('fruticontrol_user_session', JSON.stringify(userData)); } catch (e) {}
        set({ user: userData });
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
    addFruit: (fruitData) => {
      set(state => {
        const newFruit = { id: Date.now(), ...fruitData };
        const updatedInventory = [...state.inventory, newFruit];
        const newState = { ...state, inventory: updatedInventory };
        syncState(newState);
        return { inventory: updatedInventory };
      });
      get().addToast("🍎 Fruta añadida al inventario.", "success");
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
        const updatedInventory = state.inventory.filter(f => f.id !== id);
        const newState = { ...state, inventory: updatedInventory };
        syncState(newState);
        return { inventory: updatedInventory };
      });
      get().addToast("Fruta eliminada.", "warning");
    },

    restockFruit: (id, addedKg, costKg, logAsExpense) => {
      const state = get();
      const fruit = state.inventory.find(f => f.id === id);
      if (!fruit) return;

      const newKg = Number((Number(fruit.kg) + addedKg).toFixed(1));
      const updatedInventory = state.inventory.map(f => f.id === id ? { ...f, kg: newKg, costKg } : f);
      
      let updatedTransactions = state.transactions;
      const totalExpenseUSD = addedKg * costKg;

      if (logAsExpense && totalExpenseUSD > 0) {
        const today = new Date().toISOString().split("T")[0];
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
      const fruit = state.inventory.find(f => f.id === fruitId);
      if (!fruit) return;

      const newKg = Math.max(0, Number((Number(fruit.kg) - wasteKg).toFixed(1)));
      const updatedInventory = state.inventory.map(f => f.id === fruitId ? { ...f, kg: newKg } : f);

      let updatedTransactions = state.transactions;
      const costKg = Number(fruit.costKg) || (Number(fruit.priceKg) * 0.7);
      const lossUSD = wasteKg * costKg;

      if (logAsExpense && lossUSD > 0) {
        const today = new Date().toISOString().split("T")[0];
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
        syncState({ ...state, suppliers: updated });
        return { suppliers: updated };
      });
      get().addToast("Proveedor registrado.", "success");
    },

    editSupplier: (id, supplierData) => {
      set(state => {
        const updated = state.suppliers.map(s => s.id === id ? { ...s, ...supplierData } : s);
        syncState({ ...state, suppliers: updated });
        return { suppliers: updated };
      });
      get().addToast("Proveedor actualizado.", "info");
    },

    deleteSupplier: (id) => {
      set(state => {
        const updated = state.suppliers.filter(s => s.id !== id);
        syncState({ ...state, suppliers: updated });
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
        syncState({ ...state, receivables: updated });
        return { receivables: updated };
      });
      get().addToast("🤝 Fiado registrado en el cuaderno.", "success");
    },

    editReceivable: (id, receivableData) => {
      set(state => {
        const updated = state.receivables.map(r => r.id === id ? { ...r, ...receivableData } : r);
        syncState({ ...state, receivables: updated });
        return { receivables: updated };
      });
      get().addToast("Fiado actualizado.", "info");
    },

    payReceivable: (id, paymentAmount, isFullPayment) => {
      const state = get();
      const rec = state.receivables.find(r => r.id === id);
      if (!rec) return;

      const currentRemaining = rec.remainingAmount !== undefined ? Number(rec.remainingAmount) : Number(rec.amount);
      const paidVal = isFullPayment ? currentRemaining : Math.min(currentRemaining, Number(paymentAmount));
      const newRemaining = Math.max(0, currentRemaining - paidVal);
      const isPaid = newRemaining === 0;

      const today = new Date().toISOString().split("T")[0];
      const abonoEntry = { date: today, amount: paidVal };

      const updatedReceivables = state.receivables.map(r => {
        if (r.id === id) {
          return {
            ...r,
            remainingAmount: newRemaining,
            status: isPaid ? "Pagado" : "Pendiente",
            abonos: [...(r.abonos || []), abonoEntry]
          };
        }
        return r;
      });

      // Register income transaction
      const updatedTransactions = [
        ...state.transactions,
        {
          id: Date.now(),
          date: today,
          description: `Cobro de Fiado (${rec.client} - ${isPaid ? 'Pago Completo' : 'Abono'})`,
          type: "Ingreso",
          amount: paidVal
        }
      ];

      const newState = { ...state, receivables: updatedReceivables, transactions: updatedTransactions };
      syncState(newState);
      set({ receivables: updatedReceivables, transactions: updatedTransactions });
      get().addToast(`💵 ${isPaid ? 'Fiado pagado en su totalidad' : 'Abono registrado'} (${paidVal} USD).`, "success");
    },

    deleteReceivable: (id) => {
      set(state => {
        const updated = state.receivables.filter(r => r.id !== id);
        syncState({ ...state, receivables: updated });
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
        syncState({ ...state, payables: updated });
        return { payables: updated };
      });
      get().addToast("Deuda a proveedor registrada.", "success");
    },

    editPayable: (id, payableData) => {
      set(state => {
        const updated = state.payables.map(p => p.id === id ? { ...p, ...payableData } : p);
        syncState({ ...state, payables: updated });
        return { payables: updated };
      });
      get().addToast("Cuenta por pagar actualizada.", "info");
    },

    markPayablePaid: (id) => {
      const state = get();
      const item = state.payables.find(p => p.id === id);
      if (!item) return;

      const today = new Date().toISOString().split("T")[0];
      const updatedPayables = state.payables.map(p => p.id === id ? { ...p, status: "Pagado" } : p);

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
        const updated = state.payables.filter(p => p.id !== id);
        syncState({ ...state, payables: updated });
        return { payables: updated };
      });
      get().addToast("Cuenta por pagar eliminada.", "warning");
    },

    // Transactions / Cashflow Actions
    addTransaction: (transData) => {
      set(state => {
        const newTrans = { id: Date.now(), ...transData };
        const updated = [newTrans, ...state.transactions];
        syncState({ ...state, transactions: updated });
        return { transactions: updated };
      });
      get().addToast(`Movimiento de ${transData.type} registrado.`, "success");
    },

    deleteTransaction: (id) => {
      set(state => {
        const updated = state.transactions.filter(t => t.id !== id);
        syncState({ ...state, transactions: updated });
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
      const today = new Date().toISOString().split("T")[0];

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
