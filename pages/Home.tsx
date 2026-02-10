
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon, ScaleIcon, GlobeIcon } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072" 
            alt="Global Connectivity" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/30 text-[#B8860B] text-xs font-bold tracking-widest uppercase mb-6">
              <ShieldIcon className="w-4 h-4" />
              <span>Enterprise Grade Compliance</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-8">
              Strategic <span className="text-[#B8860B]">Global</span> Mobility.
            </h1>
            <p className="text-xl text-slate-300 font-light leading-relaxed mb-12 max-w-2xl">
              Apex Global Immigration provides authoritative, compliant advisory for complex visa and immigration landscapes across Canada, Australia, the UK, and the USA.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/auth" className="px-10 py-4 bg-[#B8860B] text-white font-bold rounded shadow-xl hover:bg-[#a67a0a] transition-all transform hover:-translate-y-1 text-center">
                Initiate Consultation
              </Link>
              <Link to="#" className="px-10 py-4 border border-white/30 hover:bg-white/10 transition-all font-bold rounded text-center">
                Strategic Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="text-[#002147] mb-6"><ScaleIcon className="w-12 h-12" /></div>
              <h3 className="text-2xl font-serif font-bold">Uncompromising Integrity</h3>
              <p className="text-slate-600 leading-relaxed">Our legal-tech foundation ensures every application adheres to the strictest jurisdictional compliance standards.</p>
            </div>
            <div className="space-y-4">
              <div className="text-[#002147] mb-6"><GlobeIcon className="w-12 h-12" /></div>
              <h3 className="text-2xl font-serif font-bold">Global Presence</h3>
              <p className="text-slate-600 leading-relaxed">With physical hubs across four continents, our reach provides unparalleled local intelligence and speed.</p>
            </div>
            <div className="space-y-4">
              <div className="text-[#002147] mb-6"><ShieldIcon className="w-12 h-12" /></div>
              <h3 className="text-2xl font-serif font-bold">Secure Asset Protection</h3>
              <p className="text-slate-600 leading-relaxed">Your data and documents are stored within government-grade encrypted silos, exceeding international security norms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Grid - High End */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#002147] mb-4">Core Competencies</h2>
            <div className="w-20 h-1 bg-[#B8860B] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { country: 'Canada', type: 'Express Entry & PNP', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800' },
              { country: 'Australia', type: 'Skilled Independent (189/190)', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800' },
              { country: 'United Kingdom', type: 'Skilled Worker & Innovator', img: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&q=80&w=800' },
              { country: 'USA', type: 'EB-5 & H-1B Specialist', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800' },
              { country: 'European Union', type: 'Golden Visa & Blue Card', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800' },
              { country: 'Global', type: 'Investment Citizenship', img: 'https://images.unsplash.com/photo-1521295121812-320d3f6630a9?auto=format&fit=crop&q=80&w=800' }
            ].map((service, idx) => (
              <div key={idx} className="group relative h-96 overflow-hidden rounded-lg shadow-xl cursor-pointer">
                <img 
                  src={service.img} 
                  alt={service.country} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147] to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-[#B8860B] text-xs font-bold tracking-widest uppercase block mb-2">{service.country}</span>
                  <h4 className="text-2xl font-serif font-bold text-white mb-4">{service.type}</h4>
                  <div className="h-0.5 w-0 bg-[#B8860B] transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
