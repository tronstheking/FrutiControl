import React from 'react';
import { Citrus } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900/60 border-t border-slate-800/80 py-6 px-4 mt-auto text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Citrus className="w-5 h-5 text-emerald-400" />
          <span className="font-extrabold text-white">FrutiControl VE</span>
        </div>
        <p className="font-medium text-slate-400">
          © 2026 Carrito Multi-Producto, Pago Móvil, Zelle & BCV.
        </p>
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-emerald"></span>
          <span className="font-semibold text-slate-300">Sistema POS En Línea</span>
        </div>
      </div>
    </footer>
  );
};
