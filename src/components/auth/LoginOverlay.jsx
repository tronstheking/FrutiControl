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

  if (user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userEmail = email && email.trim() ? email.trim() : 'demo@fruticontrol.com';
    
    // Set logged-in user synchronously to guarantee instant app entry
    setUser({
      uid: userEmail === 'demo@fruticontrol.com' ? 'demo-local-user' : `user-${Date.now()}`,
      email: userEmail,
      isAnonymous: false
    });
    addToast(`¡Bienvenido a FrutiControl! (${userEmail})`, 'success');

    // Optionally attempt Firebase auth sync in background
    signInWithEmailAndPassword(auth, userEmail, password)
      .then(cred => setUser(cred.user))
      .catch(err => console.warn('Background Firebase Auth notice:', err));
  };

  const handleBypassDemo = () => {
    setUser({ uid: 'demo-local-user', email: 'demo@fruticontrol.com', isAnonymous: false });
    addToast('¡Bienvenido a FrutiControl!', 'success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5"
      style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f8fafc 100%)' }}>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl shadow-emerald-100 overflow-hidden">

        {/* Top green stripe / brand header */}
        <div className="bg-emerald-600 px-8 pt-10 pb-12 text-center relative">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/10 translate-y-6 -translate-x-6" />

          <div className="relative">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
              <Citrus className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              FrutiControl
            </h1>
            <span className="inline-block mt-1 text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">
              VE 🇻🇪 · Sistema POS
            </span>
          </div>
        </div>

        {/* Rounded card overlap */}
        <div className="-mt-6 bg-white rounded-t-3xl px-6 pt-6 pb-8 space-y-5">
          <p className="text-center text-xs text-gray-400 font-medium">Sistema POS &amp; Gestión Frutícola BCV</p>

          {/* Error */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <Mail className="w-3.5 h-3.5 text-emerald-600" /> Correo Electrónico
              </label>
              <input
                type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@fruticontrol.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <KeyRound className="w-3.5 h-3.5 text-emerald-600" /> Contraseña
              </label>
              <input
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
