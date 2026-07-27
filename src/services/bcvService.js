const BCV_CACHE_KEY = "freshcontrol_bcv_cache_v1";
const BCV_CACHE_TTL = 3600000; // 1 Hour

export const fetchBcvRate = async (forceRefresh = false) => {
  if (!forceRefresh) {
    const cached = localStorage.getItem(BCV_CACHE_KEY);
    if (cached) {
      try {
        const cacheData = JSON.parse(cached);
        const isExpired = (Date.now() - cacheData.timestamp) > BCV_CACHE_TTL;
        if (!isExpired && cacheData.rate) {
          return {
            rate: cacheData.rate,
            timeStr: cacheData.timeStr || 'Reciente',
            isFallback: false
          };
        }
      } catch (err) {
        console.warn("Caché BCV no válido:", err);
      }
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

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
      const parsedRate = parseFloat(rate);
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

      localStorage.setItem(BCV_CACHE_KEY, JSON.stringify({
        rate: parsedRate,
        timestamp: Date.now(),
        timeStr: timeStr
      }));

      return {
        rate: parsedRate,
        timeStr,
        isFallback: false
      };
    } else {
      throw new Error("Respuesta BCV inválida");
    }
  } catch (error) {
    console.warn("No se pudo obtener tasa BCV en tiempo real, usando respaldo:", error);
    const cached = localStorage.getItem(BCV_CACHE_KEY);
    if (cached) {
      try {
        const cacheData = JSON.parse(cached);
        return {
          rate: cacheData.rate || 36.50,
          timeStr: cacheData.timeStr || 'Offline',
          isFallback: true
        };
      } catch (e) {
        // ignore
      }
    }
    return {
      rate: 36.50,
      timeStr: 'Offline',
      isFallback: true
    };
  }
};
