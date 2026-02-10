
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('apex_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('apex_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apex_user');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-white text-xl font-serif">Initializing Secure Environment...</div>
    </div>
  );

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        {!user && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <Auth onLogin={login} />} />
            <Route 
              path="/dashboard/*" 
              element={user ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/auth" />} 
            />
          </Routes>
        </main>
        {!user && <Footer />}
      </div>
    </HashRouter>
  );
};

export default App;
