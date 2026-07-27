import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from './Modal';
import { Calculator, ArrowRightLeft, Building2 } from 'lucide-react';
import { formatUSD, formatBs } from '../../utils/formatters';

export const BcvCalculatorModal = () => {
  const { activeModal, closeModal, bcvRate } = useStore();
  const [usdVal, setUsdVal] = useState('');
  const [bsVal, setBsVal] = useState('');

  const isOpen = activeModal === 'bcvCalc';

  const handleUsdChange = (val) => {
    setUsdVal(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setBsVal((num * bcvRate).toFixed(2));
    } else {
      setBsVal('');
    }
  };

  const handleBsChange = (val) => {
    setBsVal(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0 && bcvRate > 0) {
      setUsdVal((num / bcvRate).toFixed(2));
    } else {
      setUsdVal('');
    }
  };

  const parsedUsd = parseFloat(usdVal) || 0;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="🧮 Calculadora Express BCV">
      <div className="space-y-4">
        {/* Tasa Badge */}
        <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3 text-center">
          <span className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
            <Building2 className="w-4 h-4" /> Tasa Oficial BCV: <strong className="text-white text-sm">{bcvRate.toFixed(2)} Bs. / USD</strong>
          </span>
        </div>

        {/* USD Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Monto en Dólares ($ USD)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ej: 10.00"
            value={usdVal}
            onChange={(e) => handleUsdChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="flex justify-center my-1">
          <ArrowRightLeft className="w-5 h-5 text-slate-500" />
        </div>

        {/* Bs Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Monto en Bolívares (Bs.)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ej: 365.00"
            value={bsVal}
            onChange={(e) => handleBsChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Result Preview Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" /> Conversión Equivalente:
          </span>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <small className="text-[10px] uppercase font-bold text-slate-500 block">Dólares ($)</small>
              <span className="text-lg font-black text-emerald-400">{formatUSD(parsedUsd)}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <small className="text-[10px] uppercase font-bold text-slate-500 block">Bolívares (Bs.)</small>
              <span className="text-lg font-black text-white">{formatBs(parsedUsd, bcvRate)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={closeModal}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
        >
          Cerrar Calculadora
        </button>
      </div>
    </Modal>
  );
};
