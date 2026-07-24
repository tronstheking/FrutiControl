/**
 * FrutiControl Venezuela - POS Terminal Avanzado & App Móvil Frutícola BCV
 * Stack: Vanilla JavaScript (ES6+), Multi-item Cart, Payment Methods, Change Calculator
 */

const STORAGE_KEY = "freshcontrol_ve_db_v1";
const BCV_CACHE_KEY = "freshcontrol_bcv_cache_v1";
const BCV_CACHE_TTL = 3600000; // 1 Hora

const defaultData = {
  capitalInicial: 0.00,
  inventory: [],
  suppliers: [],
  receivables: [],
  payables: [],
  transactions: []
};

const sampleFruitCatalog = [
  { id: 101, name: "Fresa de Colonia Tovar", kg: 50, priceKg: 4.80, costKg: 3.00, supplier: "Frutícola Los Andes" },
  { id: 102, name: "Cambur Criollo", kg: 120, priceKg: 0.80, costKg: 0.50, supplier: "Mayorista Mercado de Coche" },
  { id: 103, name: "Parchita Silvestre", kg: 25, priceKg: 2.50, costKg: 1.50, supplier: "Frutícola Los Andes" },
  { id: 104, name: "Patilla Dulce", kg: 200, priceKg: 0.60, costKg: 0.35, supplier: "Comercializadora Barquisimeto" },
  { id: 105, name: "Mango de Hilacha", kg: 90, priceKg: 0.90, costKg: 0.55, supplier: "Mayorista Mercado de Coche" },
  { id: 106, name: "Aguacate Hass", kg: 45, priceKg: 3.50, costKg: 2.10, supplier: "Frutícola Los Andes" },
  { id: 107, name: "Lechosa Maradol", kg: 80, priceKg: 1.20, costKg: 0.75, supplier: "Distribuidora La Guaira" },
  { id: 108, name: "Naranja Criolla", kg: 150, priceKg: 0.70, costKg: 0.40, supplier: "Comercializadora Barquisimeto" }
];

// State Object
let state = loadState();
let currentBcvRate = 36.50; // Fallback por defecto

// Active POS Shopping Cart State
let posCart = [];

// Emoji Helper for Venezuela Fruits
function getFruitEmoji(name) {
  const n = name.toLowerCase();
  if (n.includes("cambur")) return "🍌";
  if (n.includes("parchita")) return "🍈";
  if (n.includes("patilla")) return "🍉";
  if (n.includes("aguacate")) return "🥑";
  if (n.includes("fresa")) return "🍓";
  if (n.includes("naranja")) return "🍊";
  if (n.includes("mango")) return "🥭";
  if (n.includes("lechosa")) return "🍈";
  return "🍎";
}

// ==========================================
// 2. LOCALSTORAGE STATE ENGINE
// ==========================================
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  let stateObj = JSON.parse(JSON.stringify(defaultData));
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        stateObj = { ...stateObj, ...parsed };
      }
    } catch (e) {
      console.error("Error cargando localStorage, usando estructura limpia.", e);
    }
  }

  // Garantizar que siempre existan arreglos válidos
  stateObj.inventory = Array.isArray(stateObj.inventory) ? stateObj.inventory : [];
  stateObj.suppliers = Array.isArray(stateObj.suppliers) ? stateObj.suppliers : [];
  stateObj.receivables = Array.isArray(stateObj.receivables) ? stateObj.receivables : [];
  stateObj.payables = Array.isArray(stateObj.payables) ? stateObj.payables : [];
  stateObj.transactions = Array.isArray(stateObj.transactions) ? stateObj.transactions : [];
  stateObj.capitalInicial = Number(stateObj.capitalInicial) || 0;

  return stateObj;
}

function saveStateToStorage(dataToSave = state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  
  // Sincronizar automáticamente en la nube (Firestore Cloud Database)
  if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0 && typeof firebaseConfig !== 'undefined' && firebaseConfig.apiKey !== "TU_API_KEY") {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.firestore().collection("user_data").doc(currentUser.uid).set(dataToSave, { merge: true })
        .catch(err => console.warn("Aviso Firestore Sync:", err));
    }
  }
}

function clearAllSystemData() {
  if (confirm("¿Deseas BORRAR TODOS LOS DATOS para empezar las pruebas desde cero (0)?")) {
    state = JSON.parse(JSON.stringify(defaultData));
    saveStateToStorage(state);
    refreshAppUI();
    showToast("🧹 Sistema 100% limpio en cero (0). ¡Listo para tus pruebas!");
  }
}

function loadSampleFruits() {
  state.inventory = JSON.parse(JSON.stringify(sampleFruitCatalog));
  saveStateToStorage(state);
  refreshAppUI();
  showToast("🍎 Frutas de prueba cargadas correctamente en tu inventario.");
}

function resetToDefaultData() {
  clearAllSystemData();
}

// ==========================================
// 3. INTEGRACIÓN TASA BCV EN TIEMPO REAL
// ==========================================
async function fetchBcvRate(forceRefresh = false) {
  const spinIcon = document.getElementById("bcv-spin-icon");
  const rateDisplay = document.getElementById("bcv-rate-display");
  const updateDisplay = document.getElementById("bcv-update-display");

  if (spinIcon) spinIcon.classList.add("spin-anim");
  if (rateDisplay) rateDisplay.textContent = "Cargando...";

  const cached = localStorage.getItem(BCV_CACHE_KEY);
  if (!forceRefresh && cached) {
    try {
      const cacheData = JSON.parse(cached);
      const isExpired = (Date.now() - cacheData.timestamp) > BCV_CACHE_TTL;
      
      if (!isExpired && cacheData.rate) {
        currentBcvRate = cacheData.rate;
        if (rateDisplay) rateDisplay.textContent = `${currentBcvRate.toFixed(2)} Bs.`;
        if (updateDisplay) updateDisplay.textContent = `Actualizado: ${cacheData.timeStr || 'Reciente'}`;
        if (spinIcon) spinIcon.classList.remove("spin-anim");
        refreshAppUI();
        return;
      }
    } catch (err) {
      console.warn("Caché BCV no válido:", err);
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch("https://ve.dolarapi.com/v1/dolares/oficial", {
      method: "GET",
      headers: { "Accept": "application/json" },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    
    const data = await response.json();
    const rate = data.promedio || data.precio || data.monto;

    if (rate && !isNaN(rate)) {
      currentBcvRate = parseFloat(rate);
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

      localStorage.setItem(BCV_CACHE_KEY, JSON.stringify({
        rate: currentBcvRate,
        timestamp: Date.now(),
        timeStr: timeStr
      }));

      if (rateDisplay) rateDisplay.textContent = `${currentBcvRate.toFixed(2)} Bs.`;
      if (updateDisplay) updateDisplay.textContent = `BCV (${timeStr})`;
      if (forceRefresh) showToast(`Tasa BCV actualizada a ${currentBcvRate.toFixed(2)} Bs.`);
    } else {
      throw new Error("Estructura de respuesta no válida");
    }

  } catch (error) {
    console.warn("No se pudo conectar con la API BCV, usando caché/fallback:", error);
    if (cached) {
      try {
        const cacheData = JSON.parse(cached);
        currentBcvRate = cacheData.rate || 36.50;
      } catch (parseErr) {
        console.warn("Caché BCV corrupto, usando fallback.", parseErr);
        currentBcvRate = 36.50;
      }
    }
    if (rateDisplay) rateDisplay.textContent = `${currentBcvRate.toFixed(2)} Bs. (Offline)`;
    if (updateDisplay) updateDisplay.textContent = `Sin conexión`;
    if (forceRefresh) showToast("Error de red. Usando tasa guardada.");
  } finally {
    if (spinIcon) spinIcon.classList.remove("spin-anim");
    refreshAppUI();
  }
}

// ==========================================
// 4. FORMATTERS & MONEDA DUAL
// ==========================================
const formatUSD = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0);
};

const formatBs = (amountUSD) => {
  const amountBs = (amountUSD || 0) * currentBcvRate;
  return new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amountBs) + " Bs.";
};

const formatDualCurrencyHTML = (amountUSD) => {
  const usdText = formatUSD(amountUSD);
  const bsText = formatBs(amountUSD);
  return `
    <div class="dual-currency">
      <span class="usd-val">${usdText}</span>
      <span class="bs-val">${bsText}</span>
    </div>
  `;
};

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

function calculateMetrics() {
  const todayStr = getTodayDateString();

  const todayIncomeTransactions = state.transactions.filter(t => t.type === 'Ingreso' && t.date === todayStr);
  const todaySalesUSD = todayIncomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const todaySalesCount = todayIncomeTransactions.length;

  const totalIncome = state.transactions
    .filter(t => t.type === 'Ingreso')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = state.transactions
    .filter(t => t.type === 'Egreso')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const currentCapital = state.capitalInicial + totalIncome - totalExpense;

  const inventoryValue = state.inventory.reduce((sum, item) => sum + (Number(item.kg) * Number(item.priceKg)), 0);

  const totalReceivables = state.receivables
    .filter(r => r.status === 'Pendiente')
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const totalPayables = state.payables
    .filter(p => p.status === 'Pendiente')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return {
    todaySalesUSD,
    todaySalesCount,
    totalIncome,
    totalExpense,
    currentCapital,
    inventoryValue,
    totalReceivables,
    totalPayables,
    netProfit: totalIncome - totalExpense
  };
}

// ==========================================
// 5. RENDER ENGINE (DYNAMIC DUAL UI UPDATES)
// ==========================================
function refreshAppUI() {
  const metrics = calculateMetrics();

  const kpiTodayUSD = document.getElementById("kpi-today-sales");
  const kpiTodayBs = document.getElementById("kpi-today-sales-bs");
  const kpiTodayCount = document.getElementById("kpi-today-sales-count");

  if (kpiTodayUSD) kpiTodayUSD.textContent = formatUSD(metrics.todaySalesUSD);
  if (kpiTodayBs) kpiTodayBs.textContent = formatBs(metrics.todaySalesUSD);
  if (kpiTodayCount) kpiTodayCount.innerHTML = `<i class="fa-solid fa-bolt"></i> ${metrics.todaySalesCount} venta${metrics.todaySalesCount === 1 ? '' : 's'} hoy`;

  document.getElementById("kpi-capital").textContent = formatUSD(metrics.currentCapital);
  document.getElementById("kpi-capital-bs").textContent = formatBs(metrics.currentCapital);

  document.getElementById("kpi-inventory").textContent = formatUSD(metrics.inventoryValue);
  document.getElementById("kpi-inventory-bs").textContent = formatBs(metrics.inventoryValue);
  document.getElementById("kpi-inventory-count").textContent = `${state.inventory.length} variedades`;

  document.getElementById("kpi-receivables").textContent = formatUSD(metrics.totalReceivables);
  document.getElementById("kpi-receivables-bs").textContent = formatBs(metrics.totalReceivables);
  const pendingRecCount = state.receivables.filter(r => r.status === 'Pendiente').length;
  document.getElementById("kpi-receivables-count").textContent = `${pendingRecCount} fiados pendientes`;

  document.getElementById("kpi-payables").textContent = formatUSD(metrics.totalPayables);
  document.getElementById("kpi-payables-bs").textContent = formatBs(metrics.totalPayables);
  const pendingPayCount = state.payables.filter(p => p.status === 'Pendiente').length;
  document.getElementById("kpi-payables-count").textContent = `${pendingPayCount} pendientes`;

  document.getElementById("stat-total-income").textContent = formatUSD(metrics.totalIncome);
  document.getElementById("stat-total-income-bs").textContent = formatBs(metrics.totalIncome);

  document.getElementById("stat-total-expense").textContent = formatUSD(metrics.totalExpense);
  document.getElementById("stat-total-expense-bs").textContent = formatBs(metrics.totalExpense);

  document.getElementById("stat-net-balance").textContent = formatUSD(metrics.netProfit);
  document.getElementById("stat-net-balance-bs").textContent = formatBs(metrics.netProfit);

  renderInventoryTable();
  renderSuppliersGrid();
  renderReceivablesTable();
  renderPayablesTable();
  renderCashflowTable();
  renderPosInlineGrid();

  updateCashflowChart(metrics.totalIncome, metrics.totalExpense);
}

// Render POS Fruit Touch Grid
function renderPosInlineGrid() {
  const grid = document.getElementById("pos-inline-fruit-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (!state.inventory || state.inventory.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem 1rem; background: #FAFAFA; border: 2px dashed var(--border-color); border-radius: var(--border-radius-md);">
        <i class="fa-solid fa-lemon" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 0.75rem; display: block;"></i>
        <h4 style="font-weight: 800; color: var(--navy-dark); margin-bottom: 0.25rem;">Tu Inventario está Limpio</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">No hay frutas registradas en el catálogo de la caja registradora.</p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="openFruitModal()">
            <i class="fa-solid fa-plus"></i> + Agregar Fruta Manual
          </button>
        </div>
      </div>
    `;
    return;
  }

  state.inventory.forEach(f => {
    const emoji = getFruitEmoji(f.name);
    const isLowStock = Number(f.kg) <= 10;
    const card = document.createElement("div");
    card.className = `pos-fruit-card ${isLowStock ? 'low-stock-card' : ''}`;
    card.onclick = () => openQuickSaleModal(f.id);
    card.innerHTML = `
      <div style="font-size:1.6rem;">${emoji}</div>
      <span class="fruit-touch-name">${f.name}</span>
      <span class="fruit-price-tag">${formatUSD(f.priceKg)}/kg</span>
      <small style="font-size:0.675rem; color:${isLowStock ? 'var(--ruby-red)' : 'var(--text-muted)'}; font-weight:${isLowStock ? '900' : '600'}; display:flex; align-items:center; gap:0.2rem;">
        ${isLowStock ? '<i class="fa-solid fa-triangle-exclamation"></i>' : ''} ${f.kg} kg disp.
      </small>
    `;
    grid.appendChild(card);
  });
}

// Render Inventory Table & Margins Summary
function renderInventoryTable() {
  const tbody = document.getElementById("inventory-table-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  // 1. Calculate Totals for Summary Bar
  let totalCostUSD = 0;
  let totalSalesUSD = 0;

  state.inventory.forEach(item => {
    const kg = Number(item.kg) || 0;
    const priceKg = Number(item.priceKg) || 0;
    const costKg = Number(item.costKg) || (priceKg * 0.7);

    totalCostUSD += kg * costKg;
    totalSalesUSD += kg * priceKg;
  });

  const potentialProfitUSD = totalSalesUSD - totalCostUSD;
  const avgMarginPct = totalCostUSD > 0 ? ((potentialProfitUSD / totalCostUSD) * 100).toFixed(1) : 0;

  const costElem = document.getElementById("inv-total-cost");
  const costBsElem = document.getElementById("inv-total-cost-bs");
  const salesElem = document.getElementById("inv-total-sales");
  const salesBsElem = document.getElementById("inv-total-sales-bs");
  const profitElem = document.getElementById("inv-potential-profit");
  const marginElem = document.getElementById("inv-potential-margin");

  if (costElem) costElem.textContent = formatUSD(totalCostUSD);
  if (costBsElem) costBsElem.textContent = formatBs(totalCostUSD);
  if (salesElem) salesElem.textContent = formatUSD(totalSalesUSD);
  if (salesBsElem) salesBsElem.textContent = formatBs(totalSalesUSD);
  if (profitElem) profitElem.textContent = formatUSD(potentialProfitUSD);
  if (marginElem) marginElem.textContent = `+${avgMarginPct}% Margen Prom.`;

  // 2. Render Filtered Table Rows
  const searchInput = document.getElementById("inventory-search");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filtered = state.inventory.filter(i => i.name.toLowerCase().includes(query) || (i.supplier && i.supplier.toLowerCase().includes(query)));

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 2rem; color: var(--text-muted);">
          <p style="margin-bottom:0.75rem;">No hay frutas registradas en el inventario.</p>
          <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm" onclick="openFruitModal()"><i class="fa-solid fa-plus"></i> + Agregar Fruta Manual</button>
          </div>
        </td>
      </tr>`;
    return;
  }

  filtered.forEach(item => {
    const kg = Number(item.kg) || 0;
    const priceKg = Number(item.priceKg) || 0;
    const costKg = Number(item.costKg) || (priceKg * 0.7);

    const totalSalesVal = kg * priceKg;
    const unitProfit = priceKg - costKg;
    const marginPct = costKg > 0 ? ((unitProfit / costKg) * 100).toFixed(0) : 0;

    const isLowStock = kg <= 10;
    const emoji = getFruitEmoji(item.name);

    const tr = document.createElement("tr");
    if (isLowStock) tr.style.backgroundColor = "rgba(220, 38, 38, 0.05)";

    tr.innerHTML = `
      <td>
        <span style="font-size:1.1rem; margin-right:0.3rem;">${emoji}</span>
        <strong>${item.name}</strong>
        ${isLowStock ? '<span class="stock-warning-tag"><i class="fa-solid fa-triangle-exclamation"></i> ¡Quedan pocos kg!</span>' : ''}
        ${item.supplier ? `<small style="display:block; font-size:0.675rem; color:var(--text-muted);">${item.supplier}</small>` : ''}
      </td>
      <td><strong style="font-size:0.95rem; color:${isLowStock ? 'var(--ruby-red)' : 'inherit'};">${kg} kg</strong></td>
      <td>
        <div style="display:flex; flex-direction:column;">
          <span style="font-weight:800; color:var(--navy-dark);">Venta: ${formatUSD(priceKg)}</span>
          <small style="font-size:0.7rem; color:var(--text-muted);">Costo: ${formatUSD(costKg)}</small>
        </div>
      </td>
      <td>
        <span class="badge ${unitProfit >= 0 ? 'badge-paid' : 'badge-pending'}">
          +${formatUSD(unitProfit)}/kg (+${marginPct}%)
        </span>
      </td>
      <td>${formatDualCurrencyHTML(totalSalesVal)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" style="color:var(--emerald-dark); border-color:#A7F3D0; background:#ECFDF5;" onclick="openRestockModal(${item.id})" title="+ Re-surtir kilos"><i class="fa-solid fa-square-plus"></i></button>
          <button class="btn-icon pay" onclick="openQuickSaleModal(${item.id})" title="Vender esta fruta"><i class="fa-solid fa-cart-plus"></i></button>
          <button class="btn-icon edit" onclick="openFruitModal(${item.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon delete" onclick="deleteFruit(${item.id})" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// --- MODAL DE RE-SURTIR STOCK (AGREGAR KILOS RÁPIDO) ---
function openRestockModal(id) {
  const item = state.inventory.find(i => i.id === id);
  if (!item) return;

  const currentCost = item.costKg || (Number(item.priceKg) * 0.7).toFixed(2);
  const emoji = getFruitEmoji(item.name);

  const formHtml = `
    <form onsubmit="saveRestockForm(event, ${id})">
      <div style="background:var(--emerald-light); border:1px solid #A7F3D0; border-radius:var(--border-radius-sm); padding:0.65rem 0.85rem; margin-bottom:0.75rem; font-size:0.775rem; color:var(--emerald-dark); line-height:1.35;">
        <i class="fa-solid fa-boxes-packing"></i> <strong>Re-surtir Stock de ${emoji} ${item.name}</strong><br>
        Actualmente tienes <strong>${item.kg} kg</strong> disponibles.
      </div>

      <div class="form-group">
        <label>Kilos Comprados a Agregar (kg)</label>
        <input type="number" step="0.1" id="restock-kg" placeholder="Ej: 50" oninput="updateRestockPreview(${currentCost})" required>
      </div>

      <div class="form-group">
        <label>Precio Costo al Mayorista / kg ($ USD)</label>
        <input type="number" step="0.01" id="restock-cost" value="${currentCost}" oninput="updateRestockPreview()" required>
      </div>

      <div class="form-group" style="margin-top:0.5rem;">
        <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-weight:700; text-transform:none; font-size:0.8rem; color:var(--navy-dark);">
          <input type="checkbox" id="restock-log-expense" checked style="width:auto;">
          Registrar este pago de compra como Gasto/Egreso de hoy
        </label>
      </div>

      <div style="background:#FAFAFA; border:1px solid var(--border-color); border-radius:var(--border-radius-sm); padding:0.75rem 0.85rem; margin-top:0.75rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.725rem; font-weight:800; color:var(--navy-dark); text-transform:uppercase; display:block;">Total Pagado al Mayorista</span>
          <small style="font-size:0.675rem; color:var(--text-muted);" id="restock-info-text">Se sumará al inventario</small>
        </div>
        <div style="text-align:right;">
          <span style="font-weight:900; color:var(--emerald-dark); font-size:1.2rem;" id="restock-total-usd">$0.00</span>
          <small style="display:block; font-size:0.75rem; color:var(--text-muted); font-weight:700;" id="restock-total-bs">0,00 Bs.</small>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-plus"></i> + Sumar Kilos</button>
      </div>
    </form>
  `;

  openModal(`📦 Re-surtir ${item.name}`, formHtml, false);
}

function updateRestockPreview() {
  const kgInput = document.getElementById("restock-kg");
  const costInput = document.getElementById("restock-cost");
  if (!kgInput || !costInput) return;

  const addedKg = parseFloat(kgInput.value) || 0;
  const costKg = parseFloat(costInput.value) || 0;
  const total = addedKg * costKg;

  const usdElem = document.getElementById("restock-total-usd");
  const bsElem = document.getElementById("restock-total-bs");
  const infoElem = document.getElementById("restock-info-text");

  if (usdElem) usdElem.textContent = formatUSD(total);
  if (bsElem) bsElem.textContent = formatBs(total);
  if (infoElem) infoElem.textContent = `${addedKg} kg nuevos × ${formatUSD(costKg)}/kg`;
}

function saveRestockForm(e, id) {
  e.preventDefault();
  const item = state.inventory.find(i => i.id === id);
  if (!item) return;

  const addedKg = parseFloat(document.getElementById("restock-kg").value);
  const newCostKg = parseFloat(document.getElementById("restock-cost").value);
  const logExpense = document.getElementById("restock-log-expense").checked;

  if (addedKg <= 0) {
    showToast("Los kilos a agregar deben ser mayores a 0.");
    return;
  }

  // 1. Sumar kilos al inventario
  item.kg = (Number(item.kg) + addedKg).toFixed(1);
  item.costKg = newCostKg;

  // 2. Registrar egreso opcionalmente
  const totalCost = addedKg * newCostKg;
  if (logExpense && totalCost > 0) {
    const today = new Date().toISOString().split("T")[0];
    state.transactions.push({
      id: Date.now(),
      date: today,
      description: `Compra de Stock (${addedKg}kg ${item.name} a mayorista)`,
      type: "Egreso",
      amount: totalCost
    });
  }

  saveStateToStorage();
  refreshAppUI();
  closeModal();
  showToast(`📦 ¡Stock actualizado! Se sumaron ${addedKg}kg de ${item.name}.`);
}

// --- REPORTE DE CIERRE DEL DÍA (PARA WHATSAPP) ---
function generateDailyClosureReport() {
  const todayStr = getTodayDateString();
  const dateObj = new Date();
  const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

  const todayTransactions = state.transactions.filter(t => t.date === todayStr);
  const todayIncome = todayTransactions.filter(t => t.type === 'Ingreso').reduce((sum, t) => sum + Number(t.amount), 0);
  const todayExpense = todayTransactions.filter(t => t.type === 'Egreso').reduce((sum, t) => sum + Number(t.amount), 0);
  const todaySalesCount = todayTransactions.filter(t => t.type === 'Ingreso').length;
  const todayNet = todayIncome - todayExpense;

  const todayReceivables = state.receivables.filter(r => r.dueDate === todayStr && r.status === 'Pendiente');
  const lowStockItems = state.inventory.filter(i => Number(i.kg) <= 10);

  const reportText = 
    `📊 *REPORTE DE CIERRE DE CAJA* - FrutiControl 🇻🇪\n` +
    `📅 *Fecha:* ${formattedDate}\n` +
    `💵 *Tasa BCV:* ${currentBcvRate.toFixed(2)} Bs/$\n\n` +
    `🛒 *Ventas del Día:* ${formatUSD(todayIncome)} (${formatBs(todayIncome)})\n` +
    `🔢 *Nº de Ventas Realizadas:* ${todaySalesCount}\n` +
    `💸 *Gastos del Día:* ${formatUSD(todayExpense)} (${formatBs(todayExpense)})\n` +
    `💰 *GANANCIA NETA DEL DÍA:* ${formatUSD(todayNet)} (${formatBs(todayNet)})\n\n` +
    `📓 *Fiados Anotados Hoy:* ${todayReceivables.length} pendiente(s)\n` +
    `⚠️ *Alerta Stock Bajo (Surtir Mercado):*\n` +
    (lowStockItems.length > 0 
      ? lowStockItems.map(i => `  • ${i.name}: quedan solo *${i.kg} kg*`).join("\n") 
      : `  • ¡Inventario completo, no hay faltantes!`) + `\n\n` +
    `¡Cierre de jornada completado sin papel y lápiz! 🚀`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(reportText)}`;

  const modalHtml = `
    <div style="padding:0.25rem;">
      <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--border-radius-sm); padding:0.85rem; font-family:monospace; font-size:0.775rem; white-space:pre-wrap; max-height:240px; overflow-y:auto; color:var(--navy-dark); margin-bottom:1rem;">${reportText}</div>

      <div class="form-actions" style="justify-content:center; gap:0.5rem; flex-wrap:wrap;">
        <button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
        <button class="btn btn-secondary" onclick="copyTextToClipboard(\`${reportText.replace(/`/g, '\\`')}\`)">
          <i class="fa-solid fa-copy"></i> Copiar Texto
        </button>
        <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="text-decoration:none;">
          <i class="fa-brands fa-whatsapp"></i> Enviar por WhatsApp
        </a>
      </div>
    </div>
  `;

  openModal("📊 Cierre de Caja del Día", modalHtml, false);
}

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("¡Resumen de Cierre copiado al portapapeles!");
  }).catch(() => {
    showToast("No se pudo copiar automáticamente.");
  });
}

// Render Suppliers Grid
function renderSuppliersGrid() {
  const container = document.getElementById("suppliers-grid-container");
  container.innerHTML = "";

  if (state.suppliers.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding: 2rem; color: var(--text-muted); grid-column: 1/-1;">No hay proveedores registrados.</p>`;
    return;
  }

  state.suppliers.forEach(supp => {
    const initial = supp.name.charAt(0).toUpperCase();
    const card = document.createElement("div");
    card.className = "supplier-card";
    card.innerHTML = `
      <div class="supplier-card-header">
        <div class="supplier-avatar">${initial}</div>
        <div class="supplier-title">
          <h4>${supp.name}</h4>
          <p><i class="fa-solid fa-location-dot"></i> ${supp.location || 'Venezuela'}</p>
        </div>
      </div>
      <div class="supplier-card-body">
        <p><i class="fa-solid fa-apple-whole"></i> <strong>Frutas:</strong> ${supp.fruit}</p>
        <p><i class="fa-solid fa-phone"></i> <strong>Teléfono:</strong> ${supp.phone}</p>
      </div>
      <div class="supplier-card-footer">
        <button class="btn-icon edit" onclick="openSupplierModal(${supp.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-icon delete" onclick="deleteSupplier(${supp.id})" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Receivables Table (Cuaderno Digital de Fiados)
function renderReceivablesTable() {
  const tbody = document.getElementById("receivables-table-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (state.receivables.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: var(--text-muted);">No hay fiados anotados en el cuaderno.</td></tr>`;
    return;
  }

  const todayObj = new Date();
  todayObj.setHours(0,0,0,0);

  state.receivables.forEach(item => {
    const isPaid = item.status === 'Pagado';
    const remaining = item.remainingAmount !== undefined ? Number(item.remainingAmount) : Number(item.amount);
    const hasAbonos = item.abonos && item.abonos.length > 0;

    // Antigüedad y deudas vencidas
    const dueObj = new Date(item.dueDate || Date.now());
    dueObj.setHours(0,0,0,0);
    const diffDays = Math.floor((todayObj - dueObj) / (1000 * 60 * 60 * 24));
    const isOverdue = !isPaid && diffDays > 3;

    // Teléfono y WhatsApp Directo
    const cleanPhone = item.phone ? item.phone.replace(/\D/g, '') : '';
    const phoneFormatted = cleanPhone.length >= 10 ? (cleanPhone.startsWith('58') ? cleanPhone : `58${cleanPhone.replace(/^0/, '')}`) : '';

    const waMsg = encodeURIComponent(
      `Hola ${item.client}, te saludamos de FrutiControl 🇻🇪.\n` +
      `Te recordamos tu saldo de fiado por *${formatUSD(remaining)}* (${formatBs(remaining)}).\n` +
      `Tasa BCV de hoy: ${currentBcvRate.toFixed(2)} Bs/$.\n` +
      `¡Muchas gracias!`
    );
    const waUrl = phoneFormatted ? `https://wa.me/${phoneFormatted}?text=${waMsg}` : `https://wa.me/?text=${waMsg}`;

    const tr = document.createElement("tr");
    if (isOverdue) tr.style.backgroundColor = "rgba(220, 38, 38, 0.05)";

    tr.innerHTML = `
      <td>
        <strong>${item.client}</strong>
        ${item.phone ? `<small style="display:block; font-size:0.675rem; color:var(--text-muted);"><i class="fa-brands fa-whatsapp"></i> ${item.phone}</small>` : ''}
      </td>
      <td>
        ${item.concept}
        ${hasAbonos ? `<small style="display:block; font-size:0.675rem; color:var(--emerald-dark); font-weight:700;"><i class="fa-solid fa-clock-rotate-left"></i> ${item.abonos.length} abono(s) realizado(s)</small>` : ''}
      </td>
      <td>
        <div>
          <strong style="font-size:0.95rem; color:${isPaid ? 'var(--emerald-dark)' : 'var(--navy-dark)'};">${formatUSD(remaining)}</strong>
          <small style="display:block; font-size:0.7rem; color:var(--text-muted);">${formatBs(remaining)}</small>
          ${hasAbonos && !isPaid ? `<small style="font-size:0.65rem; color:var(--text-muted); text-decoration:line-through;">Deuda inic: ${formatUSD(item.amount)}</small>` : ''}
        </div>
      </td>
      <td>
        ${formatDate(item.dueDate)}
        ${isOverdue ? `<span class="stock-warning-tag" style="display:block; margin-top:0.2rem;"><i class="fa-solid fa-clock"></i> Hace ${diffDays} días</span>` : ''}
      </td>
      <td>
        <span class="badge ${isPaid ? 'badge-paid' : (isOverdue ? 'badge-pending' : 'badge-pending')}" style="${isOverdue ? 'background:#FEF2F2; color:#DC2626; border-color:#FECACA;' : ''}">
          ${isPaid ? 'Pagado' : (isOverdue ? '⚠️ Vencido' : 'Pendiente')}
        </span>
      </td>
      <td>
        <div class="action-btns">
          ${!isPaid ? `<button class="btn-icon pay" onclick="markReceivablePaid(${item.id})" title="Registrar Cobro o Abono"><i class="fa-solid fa-hand-holding-dollar"></i></button>` : ''}
          ${!isPaid ? `<a href="${waUrl}" target="_blank" class="btn-icon" style="color:#25D366; border-color:#86EFAC; text-decoration:none;" title="Enviar WhatsApp a ${item.client}"><i class="fa-brands fa-whatsapp"></i></a>` : ''}
          <button class="btn-icon edit" onclick="openReceivableModal(${item.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon delete" onclick="deleteReceivable(${item.id})" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Payables Table
function renderPayablesTable() {
  const tbody = document.getElementById("payables-table-body");
  tbody.innerHTML = "";

  if (state.payables.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: var(--text-muted);">No hay cuentas por pagar registradas.</td></tr>`;
    return;
  }

  state.payables.forEach(item => {
    const isPaid = item.status === 'Pagado';
    const badgeClass = isPaid ? 'badge-paid' : 'badge-pending';

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.supplier}</strong></td>
      <td>${item.concept}</td>
      <td>${formatDualCurrencyHTML(item.amount)}</td>
      <td>${formatDate(item.dueDate)}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
      <td>
        <div class="action-btns">
          ${!isPaid ? `<button class="btn-icon pay" onclick="markPayablePaid(${item.id})" title="Marcar como Pagado"><i class="fa-solid fa-check"></i></button>` : ''}
          <button class="btn-icon edit" onclick="openPayableModal(${item.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon delete" onclick="deletePayable(${item.id})" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

let currentCashflowFilter = 'Todos';

function setCashflowFilter(filter) {
  currentCashflowFilter = filter;

  const btnAll = document.getElementById("cf-btn-all");
  const btnIngreso = document.getElementById("cf-btn-ingreso");
  const btnEgreso = document.getElementById("cf-btn-egreso");

  if (btnAll) btnAll.classList.toggle("active", filter === 'Todos');
  if (btnIngreso) btnIngreso.classList.toggle("active", filter === 'Ingreso');
  if (btnEgreso) btnEgreso.classList.toggle("active", filter === 'Egreso');

  renderCashflowTable();
}

function setCashflowDatePreset(preset) {
  const dateFromElem = document.getElementById("cf-date-from");
  const dateToElem = document.getElementById("cf-date-to");
  if (!dateFromElem || !dateToElem) return;

  const today = getTodayDateString();

  if (preset === 'hoy') {
    dateFromElem.value = today;
    dateToElem.value = today;
  } else if (preset === 'mes') {
    const d = new Date();
    const firstDayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
    dateFromElem.value = firstDayStr;
    dateToElem.value = today;
  } else if (preset === 'todo') {
    dateFromElem.value = "";
    dateToElem.value = "";
  }

  renderCashflowTable();
}

function clearCashflowDates() {
  const dateFromElem = document.getElementById("cf-date-from");
  const dateToElem = document.getElementById("cf-date-to");
  if (dateFromElem) dateFromElem.value = "";
  if (dateToElem) dateToElem.value = "";
  renderCashflowTable();
}

// Render Cashflow Transactions Table
function renderCashflowTable() {
  const tbody = document.getElementById("cashflow-table-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (state.transactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-muted);">No hay transacciones registradas.</td></tr>`;
    return;
  }

  const searchInput = document.getElementById("cashflow-search");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const dateFrom = document.getElementById("cf-date-from") ? document.getElementById("cf-date-from").value : "";
  const dateTo = document.getElementById("cf-date-to") ? document.getElementById("cf-date-to").value : "";

  let filtered = [...state.transactions];

  // 1. Filtrar por Tipo (Ingresos / Egresos / Todos)
  if (currentCashflowFilter === 'Ingreso') {
    filtered = filtered.filter(t => t.type === 'Ingreso');
  } else if (currentCashflowFilter === 'Egreso') {
    filtered = filtered.filter(t => t.type === 'Egreso');
  }

  // 2. Filtrar por Rango de Fecha (Desde / Hasta)
  if (dateFrom) {
    filtered = filtered.filter(t => t.date >= dateFrom);
  }
  if (dateTo) {
    filtered = filtered.filter(t => t.date <= dateTo);
  }

  // 3. Filtrar por Búsqueda de Texto
  if (query) {
    filtered = filtered.filter(t => t.description.toLowerCase().includes(query) || formatDate(t.date).includes(query));
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-muted);">No se encontraron movimientos con este filtro.</td></tr>`;
    return;
  }

  const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach(t => {
    const isIncome = t.type === 'Ingreso';
    const badgeClass = isIncome ? 'badge-income' : 'badge-expense';

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatDate(t.date)}</td>
      <td><strong>${t.description}</strong></td>
      <td><span class="badge ${badgeClass}">${t.type}</span></td>
      <td>${formatDualCurrencyHTML(t.amount)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon delete" onclick="deleteTransaction(${t.id})" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// 6. CALCULADORA EXPRESA BCV MÓVIL
// ==========================================
function openBcvCalcModal() {
  const formHtml = `
    <div style="text-align: center; margin-bottom: 0.75rem;">
      <span class="badge badge-income" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
        <i class="fa-solid fa-building-columns"></i> Tasa BCV: ${currentBcvRate.toFixed(2)} Bs. / USD
      </span>
    </div>

    <div class="form-group">
      <label>Monto en Dólares ($ USD)</label>
      <input type="number" step="0.01" id="calc-usd" placeholder="Ej: 10.00" oninput="convertUsdToBs()">
    </div>

    <div class="form-group">
      <label>Monto en Bolívares (Bs.)</label>
      <input type="number" step="0.01" id="calc-bs" placeholder="Ej: 365.00" oninput="convertBsToUsd()">
    </div>

    <div class="calc-preview-box" style="margin-top: 0.75rem;">
      <div class="calc-preview-header">
        <i class="fa-solid fa-scale-balanced"></i> Conversión Equivalente:
      </div>
      <div class="calc-preview-amounts">
        <div>
          <small style="font-size: 0.65rem; color: #D1FAE5; display: block;">Resultado USD</small>
          <div class="calc-preview-usd" id="calc-res-usd">$0.00</div>
        </div>
        <div>
          <small style="font-size: 0.65rem; color: #D1FAE5; display: block;">Resultado Bs.</small>
          <div class="calc-preview-bs" id="calc-res-bs">0,00 Bs.</div>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary btn-block" onclick="closeModal()" style="width: 100%;">Cerrar Calculadora</button>
    </div>
  `;

  openModal("🧮 Calculadora Rápida BCV", formHtml, false);
}

function convertUsdToBs() {
  const usd = parseFloat(document.getElementById("calc-usd").value) || 0;
  const bs = usd * currentBcvRate;
  document.getElementById("calc-bs").value = bs ? bs.toFixed(2) : "";
  document.getElementById("calc-res-usd").textContent = formatUSD(usd);
  document.getElementById("calc-res-bs").textContent = formatBs(usd);
}

function convertBsToUsd() {
  const bs = parseFloat(document.getElementById("calc-bs").value) || 0;
  const usd = currentBcvRate ? (bs / currentBcvRate) : 0;
  document.getElementById("calc-usd").value = usd ? usd.toFixed(2) : "";
  document.getElementById("calc-res-usd").textContent = formatUSD(usd);
  document.getElementById("calc-res-bs").textContent = formatBs(usd);
}

// ==========================================
// 7. PUNTO DE VENTA (POS) HIGH-END TOUCH SYSTEM
// ==========================================

function openQuickSaleModal(preselectFruitId = null) {
  if (!state.inventory || state.inventory.length === 0) {
    const modalHtml = `
      <div style="text-align: center; padding: 1.25rem 0.5rem;">
        <i class="fa-solid fa-basket-shopping" style="font-size: 2.8rem; color: var(--sapphire-blue); margin-bottom: 0.75rem; display:block;"></i>
        <h4 style="font-weight: 800; color: var(--navy-dark); margin-bottom: 0.4rem;">Sin Frutas en Inventario</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">
          Para registrar ventas en la caja (POS), primero agrega frutas a tu inventario.
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="closeModal(); openFruitModal();">
            <i class="fa-solid fa-plus"></i> + Agregar Fruta
          </button>
        </div>
      </div>
    `;
    openModal("🛒 Punto de Venta (POS)", modalHtml, false);
    return;
  }

  if (posCart.length === 0 && preselectFruitId) {
    const initFruit = state.inventory.find(f => f.id === preselectFruitId);
    if (initFruit) {
      posCart.push({ fruitId: initFruit.id, name: initFruit.name, kg: 1.0, priceKg: initFruit.priceKg });
    }
  }

  renderPosModalUI();
}

function addFruitToCartTouch(fruitId) {
  const fruit = state.inventory.find(f => f.id === fruitId);
  if (!fruit) return;

  const existingIdx = posCart.findIndex(item => item.fruitId === fruitId);
  if (existingIdx !== -1) {
    posCart[existingIdx].kg += 1.0;
  } else {
    posCart.push({ fruitId: fruit.id, name: fruit.name, kg: 1.0, priceKg: fruit.priceKg });
  }

  renderPosModalUI();
}

function filterPosCatalog() {
  const query = document.getElementById("pos-search-input")?.value.toLowerCase().trim() || "";
  const cards = document.querySelectorAll(".pos-touch-card");

  cards.forEach(card => {
    const name = card.getAttribute("data-name") || "";
    if (name.includes(query)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function renderPosModalUI() {
  const totalUSD = posCart.reduce((sum, item) => sum + (item.kg * item.priceKg), 0);
  const totalBsStr = formatBs(totalUSD);

  // Left Touch Catalog Items
  const catalogCardsHtml = state.inventory.map(f => {
    const emoji = getFruitEmoji(f.name);
    return `
      <div class="pos-touch-card" data-name="${f.name.toLowerCase()}" onclick="addFruitToCartTouch(${f.id})">
        <span class="pos-add-badge"><i class="fa-solid fa-plus"></i></span>
        <div class="pos-touch-emoji">${emoji}</div>
        <div class="pos-touch-title">${f.name}</div>
        <div class="pos-touch-price">${formatUSD(f.priceKg)}/kg</div>
        <div class="pos-touch-stock">${f.kg} kg dispon.</div>
      </div>
    `;
  }).join("");

  // Right Ticket Order Rows
  const cartRowsHtml = posCart.map((item, idx) => {
    const emoji = getFruitEmoji(item.name);
    return `
      <div class="pos-ticket-row">
        <div class="pos-item-info">
          <span class="pos-item-name">${emoji} ${item.name}</span>
          <span class="pos-item-unit">${formatUSD(item.priceKg)}/kg</span>
        </div>
        <div class="pos-item-qty">
          <button type="button" class="pos-qty-btn" onclick="updatePosCartItemKg(${idx}, -0.5)">-</button>
          <span style="font-weight:800; width: 42px; text-align:center;">${item.kg.toFixed(1)}kg</span>
          <button type="button" class="pos-qty-btn" onclick="updatePosCartItemKg(${idx}, 0.5)">+</button>
        </div>
        <div class="pos-item-price">${formatUSD(item.kg * item.priceKg)}</div>
        <button type="button" class="btn-icon delete" style="width:24px; height:24px;" onclick="removePosCartItem(${idx})"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;
  }).join("");

  const formHtml = `
    <div class="pos-terminal-wrapper">
      
      <!-- IZQUIERDA: Catálogo Táctil Frutícola -->
      <div class="pos-catalog-panel">
        <div class="pos-search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="pos-search-input" class="pos-search-input" placeholder="🔍 Toca una fruta o busca (ej: Cambur...)" oninput="filterPosCatalog()">
        </div>

        <div class="pos-touch-grid" id="pos-touch-grid-container">
          ${catalogCardsHtml}
        </div>
      </div>

      <!-- DERECHA: Ticket de Orden & Pago Express -->
      <div class="pos-ticket-panel">
        <form onsubmit="processPosCartCheckout(event)" style="display:flex; flex-direction:column; height:100%; justify-between;">
          
          <div class="pos-ticket-header">
            <span class="pos-ticket-title"><i class="fa-solid fa-receipt" style="color:var(--primary);"></i> Orden de Compra</span>
            <span class="badge badge-income" style="font-size:0.7rem;">${posCart.length} Ítems</span>
          </div>

          <!-- Items del Carrito -->
          <div class="pos-ticket-items-list">
            ${cartRowsHtml.length > 0 ? cartRowsHtml : `<div style="text-align:center; padding:2rem 1rem; color:var(--text-muted); font-size:0.8rem;"><i class="fa-solid fa-basket-shopping" style="font-size:1.8rem; margin-bottom:0.4rem; display:block; opacity:0.4;"></i>Toca una fruta del catálogo a la izquierda para añadir al ticket.</div>`}
          </div>

          <!-- Método de Pago & Cliente -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem;">
            <div class="form-group">
              <label><i class="fa-solid fa-wallet" style="color:var(--primary);"></i> Método de Pago</label>
              <select id="pos-pay-method" onchange="onPaymentMethodChange()">
                <option value="Pago Móvil (Bs.)">📱 Pago Móvil (Bs.)</option>
                <option value="Efectivo USD ($)">💵 Efectivo USD ($)</option>
                <option value="Efectivo Bs.">🇻🇪 Efectivo Bs.</option>
                <option value="Zelle ($)">⚡ Zelle ($)</option>
                <option value="Punto de Venta (Bs.)">💳 Punto / Tarjeta</option>
                <option value="Fiado / Crédito">🤝 Fiado (Deuda)</option>
              </select>
            </div>

            <div class="form-group">
              <label>Cliente</label>
              <input type="text" id="pos-client-name" placeholder="Mostrador">
            </div>
          </div>

          <!-- Banner Informativo Fiado -->
          <div id="pos-fiado-info" style="display:none; background:#FEF3C7; border:1px solid #F59E0B; border-radius:var(--border-radius-sm); padding:0.5rem 0.75rem; margin-bottom:0.45rem; font-size:0.75rem; color:#92400E; font-weight:600;">
            <i class="fa-solid fa-book-bookmark"></i> Se registrará como deuda pendiente en el <strong>Cuaderno Digital de Fiados</strong>. Escribe el nombre del cliente.
          </div>

          <!-- Paga Con + Vueltos -->
          <div class="pos-pay-calc-row" id="pos-pay-calc-row">
            <div class="form-group" style="margin-bottom:0;">
              <label>PAGA CON ($ USD O BS.)</label>
              <input type="number" step="0.01" id="pos-paid-amount" placeholder="Ej: 20.00" oninput="calculatePosChange(${totalUSD})">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.2rem; min-width:0;">
              <label style="font-size:0.675rem; font-weight:800; color:var(--text-main); text-transform:uppercase;">VUELTOS / CAMBIO</label>
              <div class="pos-change-box">
                <span class="change-val" id="pos-change-display">$0.00 (0,00 Bs.)</span>
              </div>
            </div>
          </div>

          <!-- Total Neon Card -->
          <div class="calc-preview-box">
            <div class="calc-preview-header">
              <i class="fa-solid fa-calculator"></i> TOTAL A COBRAR:
            </div>
            <div class="calc-preview-amounts">
              <div>
                <small style="font-size: 0.65rem; color: #D1FAE5; display: block;">Total USD ($)</small>
                <div class="calc-preview-usd">${formatUSD(totalUSD)}</div>
              </div>
              <div>
                <small style="font-size: 0.65rem; color: #D1FAE5; display: block;">Bolívares (BCV)</small>
                <div class="calc-preview-bs">${totalBsStr}</div>
              </div>
            </div>
          </div>

          <!-- Acciones -->
          <div class="form-actions" style="display:flex; gap:0.4rem;">
            <button type="button" class="btn btn-secondary" onclick="clearAndCloseModal()">Limpiar</button>
            <button type="button" class="btn" onclick="processPosDirectFiado()" style="background: linear-gradient(135deg, #F59E0B, #D97706); color: #FFFFFF; border:none; font-weight:800; flex:1;" ${posCart.length === 0 ? 'disabled' : ''}>
              🤝 FIADO DIRECTO
            </button>
            <button type="submit" class="btn btn-primary" style="flex:1.2;" ${posCart.length === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-bolt"></i> COBRAR CONTADO
            </button>
          </div>
        </form>
      </div>

    </div>
  `;

  openModal("🛒 Terminal POS Gourmet Frutícola", formHtml, true);
}

function updatePosCartItemKg(index, delta) {
  if (posCart[index]) {
    posCart[index].kg += delta;
    if (posCart[index].kg <= 0) {
      posCart.splice(index, 1);
    }
  }
  renderPosModalUI();
}

function removePosCartItem(index) {
  posCart.splice(index, 1);
  renderPosModalUI();
}

function onPaymentMethodChange() {
  const methodElem = document.getElementById("pos-pay-method");
  if (!methodElem) return;

  const method = methodElem.value;
  const clientInput = document.getElementById("pos-client-name");
  const payCalcRow = document.getElementById("pos-pay-calc-row");
  const fiadoInfo = document.getElementById("pos-fiado-info");

  if (clientInput) {
    if (method === "Fiado / Crédito") {
      clientInput.required = true;
      clientInput.placeholder = "Cliente OBLIGATORIO";
      clientInput.style.borderColor = "#F59E0B";
      clientInput.style.backgroundColor = "#FEF3C7";
      clientInput.focus();
    } else {
      clientInput.required = false;
      clientInput.placeholder = "Mostrador";
      clientInput.style.borderColor = "";
      clientInput.style.backgroundColor = "";
    }
  }

  if (payCalcRow) {
    payCalcRow.style.display = (method === "Fiado / Crédito") ? "none" : "grid";
  }

  if (fiadoInfo) {
    fiadoInfo.style.display = (method === "Fiado / Crédito") ? "block" : "none";
  }

  const totalUSD = posCart.reduce((sum, item) => sum + (item.kg * item.priceKg), 0);
  calculatePosChange(totalUSD);
}

// ==========================================
// CÁLCULO DE VUELTOS UNIFICADO DUAL ($ / Bs.)
// ==========================================
function calculatePosChange(totalUSD) {
  const paidInput = document.getElementById("pos-paid-amount");
  const display = document.getElementById("pos-change-display");

  if (!paidInput || !display) return;

  const paidVal = parseFloat(paidInput.value) || 0;
  const totalBs = totalUSD * currentBcvRate;

  if (paidVal <= 0) {
    display.textContent = "Ingresa monto pagado";
    display.style.color = "#78350F";
    return;
  }

  // Detectar si el monto ingresado es en Bs. o en USD:
  // Si paidVal > totalUSD * 2, asumimos que pagó en Bolívares
  let changeUSD = 0;
  let changeLabel = "";

  if (currentBcvRate > 1 && paidVal > totalUSD * 1.5) {
    // El usuario pagó en Bolívares
    const changeBs = paidVal - totalBs;
    if (changeBs < -0.05) {
      display.textContent = "Insuficiente (Bs.)";
      display.style.color = "#B91C1C";
      return;
    }
    changeUSD = changeBs / currentBcvRate;
    const formattedBsChange = new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2 }).format(Math.max(0, changeBs));
    changeLabel = `${formatUSD(Math.max(0, changeUSD))} (${formattedBsChange} Bs.)`;
  } else {
    // El usuario pagó en USD
    const diffUSD = paidVal - totalUSD;
    if (diffUSD < -0.005) {
      display.textContent = "Insuficiente (USD)";
      display.style.color = "#B91C1C";
      return;
    }
    changeUSD = diffUSD;
    changeLabel = `${formatUSD(Math.max(0, changeUSD))} (${formatBs(Math.max(0, changeUSD))})`;
  }

  display.style.color = "#78350F";
  display.textContent = changeLabel;
}

function processPosDirectFiado() {
  if (posCart.length === 0) {
    showToast("⚠️ El ticket del POS está vacío. Toca alguna fruta primero.");
    return;
  }

  const clientInput = document.getElementById("pos-client-name");
  let clientName = clientInput ? clientInput.value.trim() : "";

  if (!clientName || clientName.toLowerCase() === "mostrador" || clientName === "Cliente Mostrador") {
    const promptedName = prompt("🤝 Ingresa el nombre del cliente para anotar el FIADO:");
    if (!promptedName || !promptedName.trim()) {
      showToast("⚠️ Debes ingresar el nombre del cliente para registrar el fiado.");
      return;
    }
    clientName = promptedName.trim();
    if (clientInput) clientInput.value = clientName;
  }

  const payMethodSelect = document.getElementById("pos-pay-method");
  if (payMethodSelect) payMethodSelect.value = "Fiado / Crédito";

  processPosCartCheckoutExecute(clientName, "Fiado / Crédito");
}

function processPosCartCheckout(e) {
  if (e) e.preventDefault();
  if (posCart.length === 0) return;

  const payMethodSelect = document.getElementById("pos-pay-method");
  const payMethod = payMethodSelect ? payMethodSelect.value : "Efectivo USD ($)";
  const clientInput = document.getElementById("pos-client-name");
  let clientName = clientInput ? clientInput.value.trim() : "";
  if (!clientName) clientName = "Cliente Mostrador";

  if (payMethod === "Fiado / Crédito" && (clientName === "Cliente Mostrador" || clientName === "")) {
    const promptedName = prompt("🤝 Ingresa el nombre del cliente para registrar en el Cuaderno de Fiados:");
    if (!promptedName || !promptedName.trim()) {
      showToast("⚠️ Debes indicar el nombre del cliente para anotar a fiado.");
      return;
    }
    clientName = promptedName.trim();
    if (clientInput) clientInput.value = clientName;
  }

  processPosCartCheckoutExecute(clientName, payMethod);
}

function processPosCartCheckoutExecute(clientName, payMethod) {
  const totalUSD = posCart.reduce((sum, item) => sum + (item.kg * item.priceKg), 0);
  const totalBsStr = formatBs(totalUSD);
  const today = getTodayDateString();

  posCart.forEach(cartItem => {
    const invFruit = state.inventory.find(f => f.id === cartItem.fruitId);
    if (invFruit) {
      invFruit.kg = Math.max(0, invFruit.kg - cartItem.kg);
    }
  });

  if (payMethod === "Fiado / Crédito") {
    const summaryItems = posCart.map(i => `${i.kg}kg ${i.name}`).join(", ");
    state.receivables.push({
      id: Date.now(),
      client: clientName,
      concept: `Fiado POS: ${summaryItems}`,
      amount: totalUSD,
      remainingAmount: totalUSD,
      dueDate: today,
      status: "Pendiente"
    });
    showToast(`🤝 ¡Fiado anotado exitosamente a ${clientName} por ${formatUSD(totalUSD)}! 🎉`);
  } else {
    const summaryItems = posCart.map(i => `${i.kg}kg ${i.name}`).join(", ");
    state.transactions.push({
      id: Date.now(),
      date: today,
      description: `Venta POS (${payMethod}): ${summaryItems} - ${clientName}`,
      type: "Ingreso",
      amount: totalUSD
    });
    showToast(`✅ Venta procesada (${payMethod}) por ${formatUSD(totalUSD)} 🎉`);
  }

  saveStateToStorage();
  refreshAppUI();

  const soldCart = [...posCart];
  posCart = [];

  showMultiItemSaleReceipt({
    ticketNo: Math.floor(100000 + Math.random() * 900000),
    items: soldCart,
    totalUSD,
    totalBsStr,
    payMethod,
    client: clientName,
    date: formatDate(today)
  });
}

function showMultiItemSaleReceipt(data) {
  const itemsText = data.items.map(i => `• ${i.kg} kg de ${i.name} (${formatUSD(i.priceKg)}/kg) = ${formatUSD(i.kg * i.priceKg)}`).join("\n");

  const whatsappText = encodeURIComponent(
    `*RECIBO DE VENTA - FrutiControl VE* 🇻🇪\n` +
    `-----------------------------------\n` +
    `*Nº Ticket:* #${data.ticketNo}\n` +
    `*Fecha:* ${data.date}\n` +
    `*Cliente:* ${data.client}\n` +
    `*Método de Pago:* ${data.payMethod}\n\n` +
    `*PRODUCTOS:*\n${itemsText}\n\n` +
    `*TOTAL PROCESADO:*\n` +
    `💵 *USD:* ${formatUSD(data.totalUSD)}\n` +
    `🇻🇪 *Bolívares (BCV):* ${data.totalBsStr}\n` +
    `*Tasa BCV:* ${currentBcvRate.toFixed(2)} Bs/$\n` +
    `-----------------------------------\n` +
    `_¡Gracias por su compra!_`
  );

  const itemsRowsHtml = data.items.map(i => `
    <div class="receipt-row">
      <span>${getFruitEmoji(i.name)} ${i.kg}kg ${i.name}</span>
      <strong>${formatUSD(i.kg * i.priceKg)}</strong>
    </div>
  `).join("");

  const formHtml = `
    <div class="receipt-card">
      <div class="receipt-header">
        <h4>FrutiControl VE 🇻🇪</h4>
        <p>Ticket de Venta #${data.ticketNo} | ${data.date}</p>
      </div>

      <div class="receipt-row">
        <span>Cliente:</span>
        <strong>${data.client}</strong>
      </div>
      <div class="receipt-row">
        <span>Pago:</span>
        <strong>${data.payMethod}</strong>
      </div>

      <div style="border-top:1px dashed #CBD5E1; border-bottom:1px dashed #CBD5E1; padding: 0.4rem 0; margin: 0.4rem 0;">
        ${itemsRowsHtml}
      </div>

      <div class="receipt-total-box">
        <span style="font-size:0.7rem; color: #D1FAE5; display:block;">TOTAL PAGADO</span>
        <div class="receipt-total-usd">${formatUSD(data.totalUSD)}</div>
        <div class="receipt-total-bs">${data.totalBsStr}</div>
      </div>
    </div>

    <div class="form-actions" style="flex-direction: column; gap: 0.4rem; margin-top: 0.75rem;">
      <a href="https://wa.me/?text=${whatsappText}" target="_blank" class="btn btn-whatsapp" style="width: 100%; text-decoration: none;">
        <i class="fa-brands fa-whatsapp"></i> Compartir Recibo por WhatsApp
      </a>
      <button class="btn btn-secondary" onclick="closeModal()" style="width: 100%;">
        Cerrar Ticket
      </button>
    </div>
  `;

  openModal("✅ ¡Venta Procesada con Éxito!", formHtml, false);
}

// ==========================================
// 8. CRUD CONTROLLERS & MODAL HANDLERS
// ==========================================
function openModal(title, formHtml, isLargePos = false) {
  // modal-box is a class in HTML, not an id — use querySelector
  const modalBox = document.querySelector(".modal-box");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const backdrop = document.getElementById("modal-backdrop");

  if (!modalBox || !modalTitle || !modalBody || !backdrop) {
    console.error("Modal elements not found in DOM.");
    return;
  }

  modalTitle.textContent = title;
  modalBody.innerHTML = formHtml;

  if (isLargePos) {
    modalBox.classList.add("pos-large-mode");
  } else {
    modalBox.classList.remove("pos-large-mode");
  }

  backdrop.classList.add("open");
}

function closeModal() {
  const backdrop = document.getElementById("modal-backdrop");
  if (backdrop) backdrop.classList.remove("open");
}

function clearAndCloseModal() {
  posCart = [];
  closeModal();
}

// --- FRUIT CRUD ---
function openFruitModal(id = null) {
  const item = id ? state.inventory.find(i => i.id === id) : { name: "", kg: "", priceKg: "", costKg: "", supplier: "" };
  const title = id ? "Editar Fruta" : "Agregar Fruta al Inventario";

  const supplierOpts = state.suppliers.map(s => `<option value="${s.name}" ${item.supplier === s.name ? 'selected' : ''}>${s.name}</option>`).join("");
  const defaultCost = item.costKg || (item.priceKg ? (Number(item.priceKg) * 0.7).toFixed(2) : "");

  const formHtml = `
    <form onsubmit="saveFruitForm(event, ${id})">
      <div class="form-group">
        <label>Nombre de la Fruta</label>
        <input type="text" id="fruit-name" value="${item.name}" placeholder="Ej: Cambur Criollo..." required>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
        <div class="form-group">
          <label>Cantidad (kg)</label>
          <input type="number" step="0.1" id="fruit-kg" value="${item.kg}" placeholder="Ej: 150" oninput="updateFruitPreview()" required>
        </div>
        <div class="form-group">
          <label>Precio Venta / kg ($ USD)</label>
          <input type="number" step="0.01" id="fruit-price" value="${item.priceKg}" placeholder="Ej: 0.80" oninput="updateFruitPreview()" required>
        </div>
      </div>
      <div class="form-group">
        <label>Precio Costo de Compra / kg ($ USD)</label>
        <input type="number" step="0.01" id="fruit-cost" value="${defaultCost}" placeholder="Ej: 0.50 (Lo que le pagas al mayorista)" required>
        <small style="font-size:0.675rem; color:var(--text-muted);">Sirve para calcular mermas y ganancias reales.</small>
      </div>

      <div class="calc-preview-box">
        <div class="calc-preview-header">
          <i class="fa-solid fa-calculator"></i> Valor Estimado del Lote (PVP):
        </div>
        <div class="calc-preview-amounts">
          <div>
            <small style="font-size: 0.65rem; color: #D1FAE5; display: block;">Total USD ($)</small>
            <div class="calc-preview-usd" id="fruit-total-usd">$0.00</div>
          </div>
          <div>
            <small style="font-size: 0.65rem; color: #D1FAE5; display: block;">Total Bolívares (BCV)</small>
            <div class="calc-preview-bs" id="fruit-total-bs">0,00 Bs.</div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Proveedor Asignado</label>
        <select id="fruit-supplier">
          <option value="">-- Seleccionar Proveedor --</option>
          ${supplierOpts}
        </select>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar Fruta</button>
      </div>
    </form>
  `;
  openModal(title, formHtml, false);
  updateFruitPreview();
}

function updateFruitPreview() {
  const kg = parseFloat(document.getElementById("fruit-kg")?.value) || 0;
  const price = parseFloat(document.getElementById("fruit-price")?.value) || 0;
  const total = kg * price;

  const usdElem = document.getElementById("fruit-total-usd");
  const bsElem = document.getElementById("fruit-total-bs");

  if (usdElem) usdElem.textContent = formatUSD(total);
  if (bsElem) bsElem.textContent = formatBs(total);
}

function saveFruitForm(e, id) {
  e.preventDefault();
  const name = document.getElementById("fruit-name").value.trim();
  const kg = parseFloat(document.getElementById("fruit-kg").value);
  const priceKg = parseFloat(document.getElementById("fruit-price").value);
  const costKg = parseFloat(document.getElementById("fruit-cost").value) || (priceKg * 0.7);
  const supplier = document.getElementById("fruit-supplier").value;

  if (id) {
    const idx = state.inventory.findIndex(i => i.id === id);
    if (idx !== -1) {
      state.inventory[idx] = { id, name, kg, priceKg, costKg, supplier };
    }
  } else {
    state.inventory.push({ id: Date.now(), name, kg, priceKg, costKg, supplier });
  }

  saveStateToStorage();
  refreshAppUI();
  closeModal();
  showToast(id ? "Fruta actualizada." : "Fruta agregada.");
}

function deleteFruit(id) {
  if (confirm("¿Deseas eliminar esta fruta del inventario?")) {
    state.inventory = state.inventory.filter(i => i.id !== id);
    saveStateToStorage();
    refreshAppUI();
    showToast("Fruta eliminada.");
  }
}

// --- MORMAS Y FRUTA DAÑADA (A PRECIO DE COSTO) ---
function openWasteModal() {
  if (!state.inventory || state.inventory.length === 0) {
    const modalHtml = `
      <div style="text-align: center; padding: 1.25rem 0.5rem;">
        <i class="fa-solid fa-apple-whole" style="font-size: 2.8rem; color: var(--ruby-red); margin-bottom: 0.75rem; display:block;"></i>
        <h4 style="font-weight: 800; color: var(--navy-dark); margin-bottom: 0.4rem;">Sin Frutas en Inventario</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">
          No tienes frutas para registrar mermas o pérdidas. Agrega frutas al inventario.
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="closeModal(); openFruitModal();">
            <i class="fa-solid fa-plus"></i> + Agregar Fruta
          </button>
        </div>
      </div>
    `;
    openModal("🍎 Registrar Merma de Fruta", modalHtml, false);
    return;
  }

  const optionsHtml = state.inventory.map(f => `<option value="${f.id}">${getFruitEmoji(f.name)} ${f.name} (${f.kg} kg disp.)</option>`).join("");

  const formHtml = `
    <form onsubmit="saveWasteForm(event)">
      <div style="background:var(--ruby-light); border:1px solid #FECACA; border-radius:var(--border-radius-sm); padding:0.6rem 0.85rem; margin-bottom:0.75rem; font-size:0.75rem; color:var(--ruby-dark); line-height:1.35;">
        <i class="fa-solid fa-triangle-exclamation"></i> <strong>Descuento por Merma a Precio de Costo:</strong>
        La pérdida se calcula según el <strong>precio de compra al mayorista</strong> (no al precio de venta público) para reflejar exactamente lo que perdiste de tu bolsillo.
      </div>

      <div class="form-group">
        <label>Seleccionar Fruta</label>
        <select id="waste-fruit-id" onchange="updateWastePreview()" required>
          ${optionsHtml}
        </select>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
        <div class="form-group">
          <label>Kilos Dañados (kg)</label>
          <input type="number" step="0.01" id="waste-kg" placeholder="Ej: 1.5" oninput="updateWastePreview()" required>
        </div>
        <div class="form-group">
          <label>Precio Costo / kg ($)</label>
          <input type="number" step="0.01" id="waste-cost-kg" placeholder="Ej: 1.20" oninput="updateWastePreview()" required>
        </div>
      </div>

      <div class="form-group">
        <label>Motivo del Desperdicio</label>
        <div class="expense-preset-grid" style="margin-bottom:0.4rem;">
          <button type="button" class="preset-chip" onclick="setWasteReason('🍓 Fruta Madura / Dañada')">🍓 Fruta Madura</button>
          <button type="button" class="preset-chip" onclick="setWasteReason('📦 Golpeada en Flete')">📦 Golpeada</button>
          <button type="button" class="preset-chip" onclick="setWasteReason('⚖️ Merma de Peso')">⚖️ Merma Peso</button>
          <button type="button" class="preset-chip" onclick="setWasteReason('🍇 Consumo / Degustación')">🍇 Degustación</button>
        </div>
        <input type="text" id="waste-reason" placeholder="Ej: Fruta madura de ayer..." required>
      </div>

      <div style="background:#FEF2F2; border:1px solid #FECACA; border-radius:var(--border-radius-sm); padding:0.75rem 0.85rem; margin-top:0.5rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.725rem; font-weight:800; color:var(--ruby-dark); text-transform:uppercase; display:block;">Pérdida Real a Precio de Costo</span>
          <small style="font-size:0.675rem; color:var(--text-muted);" id="waste-cost-info">Calculado al precio del mayorista</small>
        </div>
        <div style="text-align:right;">
          <span style="font-weight:900; color:var(--ruby-red); font-size:1.2rem;" id="waste-total-usd">$0.00</span>
          <small style="display:block; font-size:0.75rem; color:var(--text-muted); font-weight:700;" id="waste-total-bs">0,00 Bs.</small>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Registrar Merma</button>
      </div>
    </form>
  `;

  openModal("🍓 Registrar Merma (Precio de Costo)", formHtml, false);
  updateWastePreview();
}

function setWasteReason(reason) {
  const input = document.getElementById("waste-reason");
  if (input) input.value = reason;
}

function updateWastePreview() {
  const select = document.getElementById("waste-fruit-id");
  const kgInput = document.getElementById("waste-kg");
  const costInput = document.getElementById("waste-cost-kg");
  if (!select || !kgInput) return;

  const fruitId = parseInt(select.value);
  const wasteKg = parseFloat(kgInput.value) || 0;

  const fruit = state.inventory.find(f => f.id === fruitId);
  if (!fruit) return;

  if (costInput && !costInput.dataset.userEdited) {
    const defaultCost = fruit.costKg || (Number(fruit.priceKg) * 0.7).toFixed(2);
    costInput.value = defaultCost;
  }

  const costKg = parseFloat(costInput ? costInput.value : 0) || Number(fruit.costKg) || (Number(fruit.priceKg) * 0.7);
  const lostVal = wasteKg * costKg;

  const usdElem = document.getElementById("waste-total-usd");
  const bsElem = document.getElementById("waste-total-bs");
  const infoElem = document.getElementById("waste-cost-info");

  if (usdElem) usdElem.textContent = formatUSD(lostVal);
  if (bsElem) bsElem.textContent = formatBs(lostVal);
  if (infoElem) infoElem.textContent = `${wasteKg} kg × ${formatUSD(costKg)}/kg (Costo Mayorista)`;
}

function saveWasteForm(e) {
  e.preventDefault();
  const select = document.getElementById("waste-fruit-id");
  const fruitId = parseInt(select.value);
  const wasteKg = parseFloat(document.getElementById("waste-kg").value);
  const costKg = parseFloat(document.getElementById("waste-cost-kg").value);
  const reason = document.getElementById("waste-reason").value.trim();

  const fruit = state.inventory.find(f => f.id === fruitId);
  if (!fruit) {
    showToast("Fruta no encontrada.");
    return;
  }

  if (wasteKg <= 0) {
    showToast("Los kilos deben ser mayores a 0.");
    return;
  }

  if (wasteKg > Number(fruit.kg)) {
    alert(`No puedes descontar ${wasteKg} kg porque solo tienes ${fruit.kg} kg disponibles de ${fruit.name}.`);
    return;
  }

  // Descontar del inventario
  fruit.kg = (Number(fruit.kg) - wasteKg).toFixed(2);

  // Registrar egreso a PRECIO DE COSTO REAL
  const lostVal = wasteKg * costKg;
  const today = getTodayDateString();

  state.transactions.push({
    id: Date.now(),
    date: today,
    description: `[MERMA A COSTO] ${wasteKg}kg ${fruit.name} (Costo: ${formatUSD(costKg)}/kg) - ${reason}`,
    type: "Egreso",
    amount: lostVal
  });

  saveStateToStorage();
  refreshAppUI();
  closeModal();
  showToast(`🍓 Merma de ${wasteKg}kg de ${fruit.name} registrada a precio de costo (${formatUSD(lostVal)}).`);
}

// --- SUPPLIER CRUD ---
function openSupplierModal(id = null) {
  const item = id ? state.suppliers.find(s => s.id === id) : { name: "", fruit: "", phone: "", location: "" };
  const title = id ? "Editar Proveedor" : "Agregar Proveedor";

  const formHtml = `
    <form onsubmit="saveSupplierForm(event, ${id})">
      <div class="form-group">
        <label>Nombre del Proveedor</label>
        <input type="text" id="supp-name" value="${item.name}" placeholder="Ej: Mayorista Mercado de Coche" required>
      </div>
      <div class="form-group">
        <label>Frutas que Suministra</label>
        <input type="text" id="supp-fruit" value="${item.fruit}" placeholder="Ej: Parchita, Fresa, Mango" required>
      </div>
      <div class="form-group">
        <label>Teléfono de Contacto</label>
        <input type="text" id="supp-phone" value="${item.phone}" placeholder="Ej: +58 414 1234567" required>
      </div>
      <div class="form-group">
        <label>Ubicación / Ciudad</label>
        <input type="text" id="supp-location" value="${item.location}" placeholder="Ej: Caracas, Mérida">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar Proveedor</button>
      </div>
    </form>
  `;
  openModal(title, formHtml, false);
}

function saveSupplierForm(e, id) {
  e.preventDefault();
  const name = document.getElementById("supp-name").value.trim();
  const fruit = document.getElementById("supp-fruit").value.trim();
  const phone = document.getElementById("supp-phone").value.trim();
  const location = document.getElementById("supp-location").value.trim();

  if (id) {
    const idx = state.suppliers.findIndex(s => s.id === id);
    if (idx !== -1) {
      state.suppliers[idx] = { id, name, fruit, phone, location };
    }
  } else {
    state.suppliers.push({ id: Date.now(), name, fruit, phone, location });
  }

  saveStateToStorage();
  refreshAppUI();
  closeModal();
  showToast(id ? "Proveedor actualizado." : "Proveedor registrado.");
}

function deleteSupplier(id) {
  if (confirm("¿Eliminar este proveedor?")) {
    state.suppliers = state.suppliers.filter(s => s.id !== id);
    saveStateToStorage();
    refreshAppUI();
    showToast("Proveedor eliminado.");
  }
}

// --- RECEIVABLES CRUD (Cuaderno Digital de Fiados) ---
function openReceivableModal(id = null) {
  const today = getTodayDateString();
  const item = id ? state.receivables.find(r => r.id === id) : { client: "", phone: "", concept: "", amount: "", dueDate: today, status: "Pendiente" };
  const title = id ? "📝 Editar Fiado" : "📓 Anotar Nuevo Fiado";

  const formHtml = `
    <form onsubmit="saveReceivableForm(event, ${id})">
      <div style="background:var(--sapphire-light); border:1px solid #BFDBFE; border-radius:var(--border-radius-sm); padding:0.6rem 0.85rem; margin-bottom:0.75rem; font-size:0.75rem; color:#1E40AF; line-height:1.35;">
        <i class="fa-solid fa-arrows-rotate"></i> <strong>Ajuste Automático por Tasa BCV:</strong>
        Anota la deuda fijada en dólares ($ USD). Cada día, el sistema recalculará automáticamente cuántos Bolívares debe pagar el cliente según la tasa BCV del día en que realice el pago.
      </div>
      
      <div class="form-group">
        <label>Nombre del Cliente</label>
        <input type="text" id="rec-client" value="${item.client}" placeholder="Ej: Doña Rosa, Pedro..." required>
      </div>

      <div class="form-group">
        <label>¿Qué llevó? (Fruta o detalle)</label>
        <input type="text" id="rec-concept" value="${item.concept}" placeholder="Ej: 3kg Cambur y 1kg Fresa" required>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
        <div class="form-group">
          <label>Monto Deuda ($ USD)</label>
          <input type="number" step="0.01" id="rec-amount" value="${item.amount}" placeholder="Ej: 15.00" required>
        </div>
        <div class="form-group">
          <label>Teléfono WhatsApp (Opcional)</label>
          <input type="text" id="rec-phone" value="${item.phone || ''}" placeholder="Ej: 04141234567">
        </div>
      </div>

      <div class="form-group">
        <label>Fecha de Anotación / Promesa</label>
        <input type="date" id="rec-date" value="${item.dueDate || today}" required>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-bookmark"></i> Guardar en Cuaderno</button>
      </div>
    </form>
  `;
  openModal(title, formHtml, false);
}

function saveReceivableForm(e, id) {
  e.preventDefault();
  const client = document.getElementById("rec-client").value.trim();
  const concept = document.getElementById("rec-concept").value.trim();
  const amount = parseFloat(document.getElementById("rec-amount").value);
  const phone = document.getElementById("rec-phone").value.trim();
  const dueDate = document.getElementById("rec-date").value;

  if (id) {
    const idx = state.receivables.findIndex(r => r.id === id);
    if (idx !== -1) {
      state.receivables[idx] = { 
        ...state.receivables[idx], 
        client, 
        concept, 
        amount, 
        phone, 
        dueDate,
        remainingAmount: state.receivables[idx].remainingAmount !== undefined ? Math.min(state.receivables[idx].remainingAmount, amount) : amount
      };
    }
  } else {
    state.receivables.push({ 
      id: Date.now(), 
      client, 
      concept, 
      amount, 
      remainingAmount: amount, 
      phone, 
      dueDate, 
      status: "Pendiente",
      abonos: [] 
    });
  }

  saveStateToStorage();
  refreshAppUI();
  closeModal();
  showToast("Cuenta por cobrar guardada.");
}

function markReceivablePaid(id) {
  const item = state.receivables.find(r => r.id === id);
  if (!item) return;

  const remaining = item.remainingAmount !== undefined ? Number(item.remainingAmount) : Number(item.amount);
  const bsAmount = (remaining * currentBcvRate).toFixed(2);

  const modalHtml = `
    <div style="padding:0.25rem;">
      <div style="text-align:center; margin-bottom:0.75rem;">
        <h4 style="font-size:1.15rem; font-weight:800; color:var(--navy-dark); margin-bottom:0.15rem;">Cobrar / Abonar Fiado a ${item.client}</h4>
        <p style="font-size:0.775rem; color:var(--text-muted);">Detalle: ${item.concept}</p>
      </div>

      <div style="background:var(--emerald-light); border:1.5px solid #A7F3D0; border-radius:var(--border-radius); padding:0.85rem; margin-bottom:1rem; text-align:center;">
        <span style="font-size:0.675rem; font-weight:800; color:var(--emerald-dark); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">
          ⚡ Saldo Pendiente Hoy (Tasa BCV: ${currentBcvRate.toFixed(2)} Bs/$)
        </span>
        <div style="font-size:1.75rem; font-weight:900; color:var(--navy-dark); line-height:1;">
          ${formatUSD(remaining)}
        </div>
        <div style="font-size:1.25rem; font-weight:900; color:var(--emerald-dark); margin-top:0.2rem;">
          ${formatBs(remaining)}
        </div>
      </div>

      <div class="form-group">
        <label>Forma de Pago Recibida</label>
        <select id="pay-rec-method" style="font-weight:700;">
          <option value="Pago Móvil (Bs)">📲 Pago Móvil (Bs)</option>
          <option value="Efectivo ($ USD)">💵 Efectivo Dólares ($)</option>
          <option value="Efectivo (Bs)">💵 Efectivo Bolívares (Bs)</option>
          <option value="Punto de Venta (Bs)">💳 Punto de Venta (Bs)</option>
          <option value="Zelle ($ USD)">⚡ Zelle ($)</option>
        </select>
      </div>

      <div style="background:#F8FAFC; border:1px solid var(--border-color); border-radius:var(--border-radius-sm); padding:0.75rem 0.85rem; margin-bottom:1rem;">
        <label style="font-size:0.75rem; font-weight:800; color:var(--navy-dark); margin-bottom:0.35rem; display:block;">
          💵 ¿Es un Abono Parcial? (Ingresa el monto pagado hoy)
        </label>
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <input type="number" step="0.01" id="abono-amount-usd" placeholder="Monto abonado en $ USD" style="font-size:0.9rem; font-weight:700;" oninput="updateAbonoPreview(${remaining})">
          <button type="button" class="btn btn-secondary" onclick="setFullAbonoAmount(${remaining})" style="white-space:nowrap; font-size:0.75rem;">Todo ($${remaining.toFixed(2)})</button>
        </div>
        <small style="display:block; margin-top:0.35rem; font-size:0.7rem; color:var(--emerald-dark); font-weight:700;" id="abono-bs-preview">Equivalente en Bs: 0,00 Bs.</small>
      </div>

      <div class="form-actions" style="justify-content:space-between; gap:0.5rem;">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="confirmReceivablePayment(${id})">
          <i class="fa-solid fa-circle-check"></i> Registrar Cobro / Abono
        </button>
      </div>
    </div>
  `;

  openModal("💰 Cobro o Abono de Fiado", modalHtml, false);
}

function updateAbonoPreview(maxRemaining) {
  const input = document.getElementById("abono-amount-usd");
  const preview = document.getElementById("abono-bs-preview");
  if (!input || !preview) return;

  const val = parseFloat(input.value) || 0;
  if (val > 0) {
    preview.textContent = `Equivalente abonado en Bs: ${formatBs(val)} (BCV: ${currentBcvRate.toFixed(2)})`;
  } else {
    preview.textContent = `Pagarás la totalidad: ${formatUSD(maxRemaining)} (${formatBs(maxRemaining)})`;
  }
}

function setFullAbonoAmount(maxRemaining) {
  const input = document.getElementById("abono-amount-usd");
  if (input) {
    input.value = maxRemaining.toFixed(2);
    updateAbonoPreview(maxRemaining);
  }
}

function confirmReceivablePayment(id) {
  const item = state.receivables.find(r => r.id === id);
  if (!item) return;

  const remaining = item.remainingAmount !== undefined ? Number(item.remainingAmount) : Number(item.amount);
  const methodSelect = document.getElementById("pay-rec-method");
  const abonoInput = document.getElementById("abono-amount-usd");
  
  const paymentMethod = methodSelect ? methodSelect.value : "Pago Móvil (Bs)";
  const enteredAbono = abonoInput ? parseFloat(abonoInput.value) : 0;

  // Monto a cobrar hoy (si especifica abono, usa enteredAbono; si no, cobra todo el saldo)
  const amountPaidUSD = (enteredAbono > 0 && enteredAbono < remaining) ? enteredAbono : remaining;
  const isTotalPay = amountPaidUSD >= remaining;

  // Actualizar estado del fiado
  const newRemaining = Math.max(0, remaining - amountPaidUSD);
  item.remainingAmount = newRemaining;

  if (newRemaining <= 0) {
    item.status = "Pagado";
  }

  if (!item.abonos) item.abonos = [];
  const today = getTodayDateString();

  item.abonos.push({
    date: today,
    amountUSD: amountPaidUSD,
    bsAmount: Number((amountPaidUSD * currentBcvRate).toFixed(2)),
    method: paymentMethod
  });

  // Registrar Ingreso en Transacciones
  state.transactions.push({
    id: Date.now(),
    date: today,
    description: isTotalPay 
      ? `Cobro Total Fiado (${paymentMethod}): ${item.client} - ${item.concept}`
      : `Abono Fiado (${paymentMethod}): ${item.client} abonó ${formatUSD(amountPaidUSD)} (Resta ${formatUSD(newRemaining)})`,
    type: "Ingreso",
    amount: amountPaidUSD
  });

  saveStateToStorage();
  refreshAppUI();
  closeModal();

  if (isTotalPay) {
    showToast(`¡Fiado cobrado TOTALMENTE a ${item.client} por ${paymentMethod}! 🎉`);
  } else {
    showToast(`💵 Abono de ${formatUSD(amountPaidUSD)} registrado. Saldo restante: ${formatUSD(newRemaining)}.`);
  }
}

function deleteReceivable(id) {
  if (confirm("¿Eliminar este registro?")) {
    state.receivables = state.receivables.filter(r => r.id !== id);
    saveStateToStorage();
    refreshAppUI();
    showToast("Registro eliminado.");
  }
}

// --- PAYABLES CRUD ---
function openPayableModal(id = null) {
  const item = id ? state.payables.find(p => p.id === id) : { supplier: "", concept: "", amount: "", dueDate: "", status: "Pendiente" };
  const title = id ? "Editar Deuda / Cuenta por Pagar" : "Registrar Deuda a Proveedor";

  const formHtml = `
    <form onsubmit="savePayableForm(event, ${id})">
      <div class="form-group">
        <label>Nombre del Proveedor</label>
        <input type="text" id="pay-supplier" value="${item.supplier}" placeholder="Ej: Mayorista Mercado de Coche" required>
      </div>
      <div class="form-group">
        <label>Concepto / Detalle</label>
        <input type="text" id="pay-concept" value="${item.concept}" placeholder="Ej: Factura #9021 por Parchitas" required>
      </div>
      <div class="form-group">
        <label>Monto ($ USD)</label>
        <input type="number" step="0.01" id="pay-amount" value="${item.amount}" placeholder="Ej: 300.00" required>
      </div>
      <div class="form-group">
        <label>Fecha Límite Pago</label>
        <input type="date" id="pay-date" value="${item.dueDate}" required>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar Deuda</button>
      </div>
    </form>
  `;
  openModal(title, formHtml, false);
}

function savePayableForm(e, id) {
  e.preventDefault();
  const supplier = document.getElementById("pay-supplier").value.trim();
  const concept = document.getElementById("pay-concept").value.trim();
  const amount = parseFloat(document.getElementById("pay-amount").value);
  const dueDate = document.getElementById("pay-date").value;

  if (id) {
    const idx = state.payables.findIndex(p => p.id === id);
    if (idx !== -1) {
      state.payables[idx] = { ...state.payables[idx], supplier, concept, amount, dueDate };
    }
  } else {
    state.payables.push({ id: Date.now(), supplier, concept, amount, dueDate, status: "Pendiente" });
  }

  saveStateToStorage();
  refreshAppUI();
  closeModal();
  showToast("Deuda guardada.");
}

function markPayablePaid(id) {
  const item = state.payables.find(p => p.id === id);
  if (!item) return;

  if (confirm(`¿Marcar la deuda con "${item.supplier}" por ${formatUSD(item.amount)} (${formatBs(item.amount)}) como PAGADA?`)) {
    item.status = "Pagado";

    const today = getTodayDateString();
    state.transactions.push({
      id: Date.now(),
      date: today,
      description: `Pago a ${item.supplier}: ${item.concept}`,
      type: "Egreso",
      amount: item.amount
    });

    saveStateToStorage();
    refreshAppUI();
    showToast("¡Deuda pagada! Registrada en Egresos.");
  }
}

function deletePayable(id) {
  if (confirm("¿Eliminar este registro de deuda?")) {
    state.payables = state.payables.filter(p => p.id !== id);
    saveStateToStorage();
    refreshAppUI();
    showToast("Deuda eliminada.");
  }
}

// --- CASHFLOW TRANSACTIONS CRUD ---
function openQuickExpenseModal() {
  openTransactionModal('Egreso');
}

function setExpensePreset(text) {
  const input = document.getElementById("trans-desc");
  if (input) {
    input.value = text;
    document.getElementById("trans-amount")?.focus();
  }
}

function openTransactionModal(type = 'Ingreso') {
  const title = type === 'Egreso' ? '💸 Anotar Gasto / Salida de Dinero' : `Registrar Nuevo ${type}`;
  const today = getTodayDateString();

  const presetsHtml = type === 'Egreso' ? `
    <div style="margin-bottom: 0.75rem;">
      <label style="font-size: 0.675rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 0.35rem;">
        ⚡ Accesos Rápidos de Gastos (Toca para autocompletar):
      </label>
      <div class="expense-preset-grid">
        <button type="button" class="preset-chip" onclick="setExpensePreset('Bolsas Plásticas')">🛍️ Bolsas</button>
        <button type="button" class="preset-chip" onclick="setExpensePreset('Empaques y Envases')">📦 Empaques</button>
        <button type="button" class="preset-chip" onclick="setExpensePreset('Flete / Transporte')">🚚 Flete</button>
        <button type="button" class="preset-chip" onclick="setExpensePreset('Hielo / Refrigeración')">🧊 Hielo</button>
        <button type="button" class="preset-chip" onclick="setExpensePreset('Almuerzo / Comida')">🥪 Almuerzo</button>
        <button type="button" class="preset-chip" onclick="setExpensePreset('Artículos de Limpieza')">🧹 Limpieza</button>
        <button type="button" class="preset-chip" onclick="setExpensePreset('Compra de Fruta Lote')">🍎 Compra Fruta</button>
        <button type="button" class="preset-chip" onclick="setExpensePreset('Pago Servicio / Local')">💡 Servicios</button>
      </div>
    </div>
  ` : '';

  const formHtml = `
    <form onsubmit="saveTransactionForm(event, '${type}')">
      ${presetsHtml}
      <div class="form-group">
        <label>¿En qué se gastó el dinero?</label>
        <input type="text" id="trans-desc" placeholder="Ej: Bolsas plásticas, Flete Coche..." required>
      </div>
      <div class="form-group">
        <label>Monto del Gasto ($ USD)</label>
        <input type="number" step="0.01" id="trans-amount" placeholder="Ej: 5.00" required>
      </div>
      <div class="form-group">
        <label>Fecha</label>
        <input type="date" id="trans-date" value="${today}" required>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn ${type === 'Ingreso' ? 'btn-primary' : 'btn-danger'}">
          <i class="fa-solid fa-check"></i> Guardar ${type}
        </button>
      </div>
    </form>
  `;
  openModal(title, formHtml, false);
}

function saveTransactionForm(e, type) {
  e.preventDefault();
  const description = document.getElementById("trans-desc").value.trim();
  const amount = parseFloat(document.getElementById("trans-amount").value);
  const date = document.getElementById("trans-date").value;

  state.transactions.push({
    id: Date.now(),
    date,
    description,
    type,
    amount
  });

  saveStateToStorage();
  refreshAppUI();
  closeModal();
  showToast(`${type} registrado: ${formatUSD(amount)}.`);
}

function deleteTransaction(id) {
  if (confirm("¿Eliminar este movimiento del historial?")) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveStateToStorage();
    refreshAppUI();
    showToast("Movimiento eliminado.");
  }
}

// ==========================================
// 9. CHART.JS ENGINE
// ==========================================
let cashflowChart = null;

function initChart() {
  try {
    if (typeof Chart === 'undefined') {
      console.warn("Chart.js no está cargado.");
      return;
    }
    const canvas = document.getElementById("mainCashflowChart");
    if (!canvas) { console.warn("Chart canvas not found."); return; }
    const ctx = canvas.getContext("2d");

    cashflowChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ingresos ($)', 'Egresos ($)'],
        datasets: [{
          label: 'Monto ($)',
          data: [0, 0],
          backgroundColor: ['rgba(5, 150, 105, 0.85)', 'rgba(220, 38, 38, 0.85)'],
          borderColor: ['#059669', '#DC2626'],
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${formatUSD(ctx.raw)} (${formatBs(ctx.raw)})`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#E2E8F0' },
            ticks: { color: '#64748B', callback: (val) => '$' + val }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#0F172A', font: { weight: 'bold' } }
          }
        }
      }
    });
  } catch (err) {
    console.warn("No se pudo inicializar el gráfico de Chart.js:", err);
  }
}

function updateCashflowChart(totalIncome, totalExpense) {
  if (cashflowChart && cashflowChart.data && cashflowChart.data.datasets && cashflowChart.data.datasets[0]) {
    try {
      cashflowChart.data.datasets[0].data = [totalIncome, totalExpense];
      cashflowChart.update();
    } catch (err) {
      console.warn("Error actualizando gráfico:", err);
    }
  }
}

// ==========================================
// 10. NAVIGATION & APP LIFECYCLE
// ==========================================
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-item, .mobile-nav-item");

  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const targetSection = this.getAttribute("data-section");

      if (!targetSection) return;
      e.preventDefault();

      navLinks.forEach(n => n.classList.remove("active"));
      document.querySelectorAll(`[data-section="${targetSection}"]`).forEach(n => n.classList.add("active"));

      document.querySelectorAll(".app-section").forEach(sec => sec.classList.remove("active"));
      const activeSec = document.getElementById(`sec-${targetSection}`);
      if (activeSec) activeSec.classList.add("active");

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10B981;"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Modal Backdrop Click Close
document.addEventListener("click", (e) => {
  const backdrop = document.getElementById("modal-backdrop");
  if (e.target === backdrop) {
    closeModal();
  }
});

// ==========================================================================
// FIREBASE AUTHENTICATION & LOGIN MANAGEMENT
// ==========================================================================
function initAuthSystem() {
  const overlay = document.getElementById("login-overlay");
  const demoNotice = document.getElementById("login-demo-notice");

  // Si no se han ingresado las credenciales reales de Firebase en firebase-config.js
  if (typeof firebase === 'undefined' || !firebase.apps || firebase.apps.length === 0 || typeof firebaseConfig === 'undefined' || firebaseConfig.apiKey === "TU_API_KEY") {
    if (demoNotice) demoNotice.style.display = "block";
    // Ocultar login overlay en modo local/demo si no hay llaves configuradas
    if (overlay) overlay.classList.add("hidden");
    return;
  }

  // Listener de estado de autenticación en Firebase con sincronización de Firestore
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (overlay) overlay.classList.add("hidden");
      showToast(`Bienvenido de nuevo, ${user.email.split('@')[0]}`);

      // Cargar datos reales sincronizados en Cloud Firestore
      firebase.firestore().collection("user_data").doc(user.uid).get()
        .then(doc => {
          if (doc.exists) {
            const cloudData = doc.data();
            if (cloudData && typeof cloudData === 'object') {
              state = { ...defaultData, ...cloudData };
              localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
              refreshAppUI();
              showToast("☁️ Datos sincronizados con Firestore Database.");
            }
          } else {
            // Guardar primer registro en Firestore si es cuenta nueva
            saveStateToStorage(state);
          }
        })
        .catch(err => console.warn("Error leyendo Firestore:", err));
    } else {
      if (overlay) overlay.classList.remove("hidden");
    }
  });
}

function handleFirebaseLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errorAlert = document.getElementById("login-error-alert");
  const submitBtn = document.getElementById("login-submit-btn");
  const btnText = document.getElementById("login-btn-text");

  if (typeof firebase === 'undefined' || !firebase.apps || firebase.apps.length === 0 || typeof firebaseConfig === 'undefined' || firebaseConfig.apiKey === "TU_API_KEY") {
    // Si están probando localmente sin llaves, permitir inicio inmediato
    const overlay = document.getElementById("login-overlay");
    if (overlay) overlay.classList.add("hidden");
    showToast("Sesión iniciada (Modo Local/Demostración).");
    return;
  }

  errorAlert.style.display = "none";
  submitBtn.disabled = true;
  if (btnText) btnText.textContent = "Verificando...";

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = "Iniciar Sesión";
      document.getElementById("login-form").reset();
    })
    .catch((error) => {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = "Iniciar Sesión";
      errorAlert.style.display = "block";
      
      let msg = "Error al iniciar sesión. Inténtalo de nuevo.";
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        msg = "Correo o contraseña incorrectos.";
      } else if (error.code === 'auth/invalid-email') {
        msg = "El formato del correo electrónico no es válido.";
      } else if (error.code === 'auth/too-many-requests') {
        msg = "Demasiados intentos fallidos. Intenta más tarde.";
      }
      errorAlert.textContent = msg;
    });
}

function handleFirebaseLogout() {
  if (confirm("¿Cerrar la sesión de FrutiControl VE?")) {
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0 && typeof firebaseConfig !== 'undefined' && firebaseConfig.apiKey !== "TU_API_KEY") {
      firebase.auth().signOut().then(() => {
        showToast("Sesión cerrada.");
      });
    } else {
      const overlay = document.getElementById("login-overlay");
      if (overlay) overlay.classList.remove("hidden");
      showToast("Sesión cerrada.");
    }
  }
}

// App Startup
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  try {
    initChart();
  } catch (e) {
    console.warn("Chart error:", e);
  }
  refreshAppUI();
  fetchBcvRate();
  initAuthSystem();
});
