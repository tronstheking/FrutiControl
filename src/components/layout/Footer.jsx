import React from 'react';
import { Citrus } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-4 mt-auto text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Citrus className="w-5 h-5 text-[#047857]" />
          <span className="font-black text-[#047857]">FrutiControl VE</span>
        </div>
        <p className="font-semibold text-slate-500">
          © 2026 Carrito Multi-Producto, Pago Móvil, Zelle & BCV.
        </p>
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
          <span className="font-bold text-[#047857]">Sistema POS En Línea</span>
        </div>
      </div>
    </footer>
  );
};
