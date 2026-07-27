import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from './Modal';
import { ArrowRightLeft, Building2 } from 'lucide-react';
import { formatUSD, formatBs } from '../../utils/formatters';

export const BcvCalculatorModal = () => {
  const { activeModal, closeModal, bcvRate } = useStore();
  const [usdVal, setUsdVal] = useState('');
  const [bsVal, setBsVal] = useState('');

  const isOpen = activeModal === 'bcvCalc';

  const handleUsdChange = (val) => {
    setUsdVal(val);
    const num = parseFloat(val);
    setBsVal(!isNaN(num) && num >= 0 ? (num * bcvRate).toFixed(2) : '');
  };

  const handleBsChange = (val) => {
    setBsVal(val);
    const num = parseFloat(val);
    setUsdVal(!isNaN(num) && num >= 0 && bcvRate > 0 ? (num / bcvRate).toFixed(2) : '');
  };

  const parsedUsd = parseFloat(usdVal) || 0;
  const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-semibold text-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors placeholder-gray-300";

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="🧮 Calculadora BCV">
      <div className="space-y-4">
        {/* Rate badge */}
        <div className="bg-emerald-600 rounded-2xl p-4 text-center text-white">
          <div className="flex items-center justify-center gap-2 text-emerald-100 text-sm font-semibold">
            <Building2 className="w-4 h-4" /> Tasa Oficial BCV
          </div>
          <p className="text-3xl font-black mt-1">{bcvRate.toFixed(2)} <span className="text-lg font-semibold text-emerald-200">Bs/$</span></p>
        </div>

        {/* USD */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Dólares ($ USD)</label>
          <input type="number" step="0.01" placeholder="0.00" value={usdVal}
            onChange={(e) => handleUsdChange(e.target.value)} className={inputCls} />
        </div>

        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ArrowRightLeft className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Bs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Bolívares (Bs.)</label>
          <input type="number" step="0.01" placeholder="0.00" value={bsVal}
            onChange={(e) => handleBsChange(e.target.value)} className={inputCls} />
        </div>

        {/* Result */}
        <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="text-center">
            <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Dólares</span>
            <span className="text-xl font-black text-emerald-600">{formatUSD(parsedUsd)}</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Bolívares</span>
            <span className="text-xl font-black text-gray-900">{formatBs(parsedUsd, bcvRate)}</span>
          </div>
        </div>

        <button onClick={closeModal}
          className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
          Cerrar
        </button>
      </div>
    </Modal>
  );
};
