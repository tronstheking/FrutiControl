import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { auth, signInWithEmailAndPassword } from '../../firebase/config';
import { LogIn, Citrus, KeyRound, Mail, AlertTriangle, ShieldCheck } from 'lucide-react';

export const LoginOverlay = () => {
  const { user, setUser, addToast } = useStore();
  const [email, setEmail] = useState('demo@fruticontrol.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (user) return null; // Logged in

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      addToast(`¡Bienvenido a FrutiControl! (${userCredential.user.email})`, "success");
    } catch (err) {
      console.warn("Firebase Auth fallback local user", err);
      // Fallback local demo login if firebase credentials fail or offline
      if (email && password) {
        setUser({ uid: 'demo-local-user', email, isAnonymous: false });
        addToast(`Sesión iniciada en Modo Local/Offline (${email})`, "info");
      } else {
        setErrorMsg("Error de credenciales. Verifica tu correo y contraseña.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBypassDemo = () => {
    setUser({ uid: 'demo-local-user', email: 'demo@fruticontrol.com', isAnonymous: false });
    addToast("¡Modo Demostración Activado!", "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-md glass-modal rounded-3xl p-8 border border-slate-700/80 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Citrus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            FrutiControl <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">VE 🇻🇪</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Sistema POS & Gestión Frutícola BCV</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl text-xs font-semibold text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" /> Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@fruticontrol.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" /> Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Demo Fast Access */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-2">
          <button
            onClick={handleBypassDemo}
            type="button"
            className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-colors border border-slate-700/60 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Acceso Directo de Prueba (Modo Local)
          </button>
        </div>
      </div>
    </div>
  );
};
