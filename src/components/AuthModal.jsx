import React, { useState } from 'react';
import { Lock, Mail, User, Phone, ShieldCheck, X } from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('ananya@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Ananya Verma');
  const [phone, setPhone] = useState('+91 98765-43210');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await loginUser(email, password);
      } else {
        res = await registerUser(name, email, password, phone);
      }

      if (res.success) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      } else {
        setError(res.error || 'Authentication failed');
      }
    } catch {
      setError('Connection to backend server failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-pink-500/10 text-pink-400 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {isLogin ? 'Sign In to SurakshaOne' : 'Create SurakshaOne Account'}
            </h2>
            <p className="text-xs text-zinc-400">JWT Token Encrypted Authentication</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {!isLogin && (
            <div>
              <label className="text-zinc-400 block mb-1">Full Name</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl">
                <User className="w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent flex-1 text-white focus:outline-none"
                  placeholder="Ananya Verma"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-zinc-400 block mb-1">Email Address</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl">
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent flex-1 text-white focus:outline-none"
                placeholder="ananya@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">Password</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl">
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent flex-1 text-white focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-zinc-400 block mb-1">Mobile Phone Number</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl">
                <Phone className="w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent flex-1 text-white focus:outline-none"
                  placeholder="+91 98765-43210"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-600/20 text-xs transition"
          >
            {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-zinc-800">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-pink-400 hover:underline font-medium"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
