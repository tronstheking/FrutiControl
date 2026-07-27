import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
          <div className="max-w-md glass-panel p-8 rounded-3xl border border-rose-500/40 space-y-4 shadow-2xl">
            <AlertTriangle className="w-14 h-14 text-rose-500 mx-auto animate-pulse" />
            <h2 className="text-xl font-black text-white">¡Ha ocurrido un inconveniente!</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              El sistema detectó una excepción. No te preocupes, tus datos locales están a salvo.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Recargar Aplicación
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
