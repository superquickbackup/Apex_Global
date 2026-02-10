
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobeIcon, COLORS } from '../constants';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-[#002147] p-2 rounded">
              <GlobeIcon className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#002147] font-serif uppercase">Apex Global</span>
              <span className="text-[10px] tracking-widest text-slate-500 font-sans uppercase -mt-1">Immigration Advisory</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-700">
            <Link to="/" className="hover:text-[#B8860B] transition-colors">Strategic Advisory</Link>
            <div className="relative group">
              <button className="flex items-center hover:text-[#B8860B] transition-colors">
                Jurisdictions
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {/* Mega menu placeholder logic */}
              <div className="absolute top-full left-0 hidden group-hover:block w-64 pt-4">
                <div className="bg-white shadow-2xl border border-slate-100 p-4 rounded-lg">
                  {['Canada', 'Australia', 'United Kingdom', 'United States', 'European Union'].map(c => (
                    <Link key={c} to="#" className="block px-4 py-2 hover:bg-slate-50 rounded transition-colors text-slate-600">{c}</Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="#" className="hover:text-[#B8860B] transition-colors">Compliance</Link>
            <Link to="#" className="hover:text-[#B8860B] transition-colors">Insights</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to="/auth" 
              className="px-6 py-2.5 bg-[#002147] text-white text-sm font-semibold rounded hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
