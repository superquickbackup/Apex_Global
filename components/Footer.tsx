
import React from 'react';
import { Link } from 'react-router-dom';
import { GlobeIcon } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002147] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <GlobeIcon className="text-[#B8860B] w-8 h-8" />
              <span className="text-2xl font-serif font-bold tracking-tight uppercase">Apex Global</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Providing elite immigration consultancy and global mobility solutions for high-net-worth individuals, investors, and enterprise organizations worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-6 border-b border-slate-700 pb-2">Global Practices</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="#" className="hover:text-[#B8860B] transition-colors">Investor Migration</Link></li>
              <li><Link to="#" className="hover:text-[#B8860B] transition-colors">Corporate Mobility</Link></li>
              <li><Link to="#" className="hover:text-[#B8860B] transition-colors">Family Reunification</Link></li>
              <li><Link to="#" className="hover:text-[#B8860B] transition-colors">Skilled Professional Entry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-6 border-b border-slate-700 pb-2">Compliance</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="#" className="hover:text-[#B8860B] transition-colors">Privacy Policy (GDPR)</Link></li>
              <li><Link to="#" className="hover:text-[#B8860B] transition-colors">Terms of Engagement</Link></li>
              <li><Link to="#" className="hover:text-[#B8860B] transition-colors">Regulatory Status</Link></li>
              <li><Link to="#" className="hover:text-[#B8860B] transition-colors">Data Security Protocols</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-6 border-b border-slate-700 pb-2">Global Presence</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              London • New York • Dubai • Islamabad • Toronto • Sydney<br/><br/>
              Support: 24/7 Global Client Services<br/>
              Hotline: +1 (800) APEX-GLB
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest uppercase text-slate-500">
          <span>&copy; {new Date().getFullYear()} Apex Global Immigration Advisory. All rights reserved.</span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Security Audit</Link>
            <Link to="#" className="hover:text-white transition-colors">Certifications</Link>
            <Link to="#" className="hover:text-white transition-colors">Legal Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
