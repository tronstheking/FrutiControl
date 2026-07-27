import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none md:bottom-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
              : toast.type === 'warning'
              ? 'bg-amber-950/90 border-amber-500/50 text-amber-100'
              : 'bg-slate-900/90 border-slate-700 text-slate-100'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-400" />
            ) : (
              <Info className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div className="text-sm font-medium leading-snug flex-1">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors p-0.5 rounded-md hover:bg-slate-800/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
