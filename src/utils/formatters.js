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

export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

export const getFruitEmoji = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("cambur") || n.includes("banano")) return "🍌";
  if (n.includes("parchita") || n.includes("maracuyá")) return "🍈";
  if (n.includes("patilla") || n.includes("sandía")) return "🍉";
  if (n.includes("aguacate")) return "🥑";
  if (n.includes("fresa") || n.includes("frutilla")) return "🍓";
  if (n.includes("naranja")) return "🍊";
  if (n.includes("mango")) return "🥭";
  if (n.includes("lechosa") || n.includes("papaya")) return "🍈";
  if (n.includes("limon") || n.includes("limón")) return "🍋";
  if (n.includes("piña")) return "🍍";
  if (n.includes("uva")) return "🍇";
  if (n.includes("manzana")) return "🍎";
  if (n.includes("pera")) return "🍐";
  if (n.includes("durazno") || n.includes("melocotón")) return "🍑";
  return "🍎";
};
