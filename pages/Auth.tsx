
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ShieldIcon, GlobeIcon } from '../constants';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real system, this would call the PHP backend.
    // Here we simulate successful auth.
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Client User',
      email: formData.email,
      role: formData.email.includes('admin') ? UserRole.SUPER_ADMIN : UserRole.CLIENT
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1974" 
          alt="Abstract" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden relative z-10 animate-fade-in">
        <div className="bg-[#002147] p-8 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-4">
            <ShieldIcon className="text-[#B8860B] w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white tracking-tight uppercase">
            Apex Secure Access
          </h2>
          <p className="text-slate-400 text-xs tracking-widest uppercase mt-2">Enterprise Client Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Legal Name</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-[#002147] transition-all outline-none"
                placeholder="Johnathan Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-[#002147] transition-all outline-none"
              placeholder="consultancy@apex.glb"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Access Password</label>
            <input 
              required
              type="password" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-[#002147] transition-all outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#002147] text-white font-bold rounded hover:bg-slate-800 transition-all shadow-lg text-sm tracking-widest uppercase"
          >
            {isLogin ? 'Establish Session' : 'Register Identity'}
          </button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-slate-500 hover:text-[#002147] transition-colors"
            >
              {isLogin ? "Need access? Register your case profile." : "Already registered? Login to portal."}
            </button>
          </div>
        </form>

        <div className="bg-slate-50 p-4 text-[10px] text-center text-slate-400 border-t border-slate-100 uppercase tracking-[0.2em]">
          End-to-End Encrypted Session • TLS 1.3 Certified
        </div>
      </div>
    </div>
  );
};

export default Auth;
