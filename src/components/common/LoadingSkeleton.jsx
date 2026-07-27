import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse p-2">
      <div className="h-24 bg-slate-900/80 rounded-2xl border border-slate-800/60" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800/60" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-72 bg-slate-900/80 rounded-2xl border border-slate-800/60" />
        <div className="lg:col-span-4 h-72 bg-slate-900/80 rounded-2xl border border-slate-800/60" />
      </div>
    </div>
  );
};
