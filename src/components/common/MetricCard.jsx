import React from 'react';
import { formatUSD, formatBs } from '../../utils/formatters';

export const MetricCard = ({ title, amountUsd, bcvRate, icon: Icon, badgeText, badgeColor = 'emerald', subtitle }) => {
  const badgeClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    slate: 'bg-slate-800 text-slate-300 border-slate-700'
  };

  const iconBgClasses = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    rose: 'bg-rose-500/20 text-rose-400',
    blue: 'bg-blue-500/20 text-blue-400',
    slate: 'bg-slate-800 text-slate-300'
  };

  return (
    <div className="glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-slate-700 hover:shadow-xl group">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
          <h3 className="text-2xl font-black text-white mt-1 group-hover:text-emerald-400 transition-colors">
            {formatUSD(amountUsd)}
          </h3>
          <p className="text-sm font-semibold text-emerald-400/90 mt-0.5">
            {formatBs(amountUsd, bcvRate)}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${iconBgClasses[badgeColor] || iconBgClasses.emerald} shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80">
        {badgeText && (
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeClasses[badgeColor] || badgeClasses.emerald}`}>
            {badgeText}
          </span>
        )}
        {subtitle && (
          <span className="text-xs text-slate-400 font-medium ml-auto">{subtitle}</span>
        )}
      </div>
    </div>
  );
};
