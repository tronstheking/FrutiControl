export const formatUSD = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0);
};

export const formatBs = (amountUSD, bcvRate) => {
  const amountBs = (amountUSD || 0) * (bcvRate || 36.5);
  return new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amountBs) + " Bs.";
};

export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDate = (dateInput) => {
  if (!dateInput) return "-";
  let str = String(dateInput);
  if (typeof dateInput === 'number' || dateInput instanceof Date) {
    try {
      str = new Date(dateInput).toISOString().split("T")[0];
    } catch (e) {
      return "-";
    }
  }
  if (!str.includes("-")) return str;
  const parts = str.split("T")[0].split("-");
  if (parts.length < 3) return str;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

export const MONTH_NAMES_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const getCurrentMonthKey = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const getPreviousMonthKey = () => {
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth(); // 0-based: if 0 (Jan), prev month is 12 (Dec) of year - 1
  if (month === 0) {
    month = 12;
    year -= 1;
  }
  return `${year}-${String(month).padStart(2, '0')}`;
};

export const formatMonthYear = (monthKey) => {
  if (!monthKey || !monthKey.includes('-')) return monthKey || '';
  const [yearStr, monthStr] = monthKey.split('-');
  const monthIdx = parseInt(monthStr, 10) - 1;
  if (monthIdx >= 0 && monthIdx < 12) {
    return `${MONTH_NAMES_ES[monthIdx]} ${yearStr}`;
  }
  return monthKey;
};

export const getFruitEmoji = (name = "") => {
  const n = name.toLowerCase();
  // Containers / Envases / Tobos / Cajas / Empaques / Botellas / Vasos / Potes
  if (n.includes("envase") || n.includes("pote") || n.includes("tobo") || n.includes("caja") || n.includes("frasco") || n.includes("empaque") || n.includes("contenedor") || n.includes("vaso") || n.includes("botella") || n.includes("garrafa")) return "🫙";
  // Bags / Sacos
  if (n.includes("bolsa") || n.includes("saco") || n.includes("bolsita")) return "🛍️";
  // Fruits
  if (n.includes("cambur") || n.includes("banano")) return "🍌";
  if (n.includes("parchita") || n.includes("maracuyá")) return "🍈";
  if (n.includes("patilla") || n.includes("sandía")) return "🍉";
  if (n.includes("aguacate")) return "🥑";
  if (n.includes("fresa") || n.includes("frutilla")) return "🍓";
  if (n.includes("naranja") || n.includes("mandarina")) return "🍊";
  if (n.includes("mango")) return "🥭";
  if (n.includes("lechosa") || n.includes("papaya")) return "🍈";
  if (n.includes("limon") || n.includes("limón")) return "🍋";
  if (n.includes("piña")) return "🍍";
  if (n.includes("uva")) return "🍇";
  if (n.includes("manzana")) return "🍎";
  if (n.includes("pera")) return "🍐";
  if (n.includes("durazno") || n.includes("melocotón")) return "🍑";
  if (n.includes("coco")) return "🥥";
  if (n.includes("melón") || n.includes("melon")) return "🍈";
  if (n.includes("ciruela") || n.includes("cereza")) return "🍒";
  if (n.includes("guayaba")) return "🍎";
  return "🍎";
};

