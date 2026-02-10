
import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole, VisaApplication, ApplicationStatus } from '../types';
import { GlobeIcon, ShieldIcon, ScaleIcon } from '../constants';
import { getImmigrationAdvice } from '../services/gemini';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

interface MockDocument {
  name: string;
  cat: string;
  status: string;
  date: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [aiAdvice, setAiAdvice] = useState<string>('Requesting latest regulatory intelligence...');
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'appointments' | 'billing'>('overview');
  
  // Document Upload States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [documents, setDocuments] = useState<MockDocument[]>([
    { name: 'Passport_Copy_Main.pdf', cat: 'Identity', status: 'VERIFIED', date: '2023-11-15' },
    { name: 'University_Degree_WES.pdf', cat: 'Education', status: 'VERIFIED', date: '2023-11-16' },
    { name: 'Bank_Statement_6M.pdf', cat: 'Financial', status: 'PENDING', date: '2023-11-20' },
    { name: 'Police_Clearance_Cert.pdf', cat: 'Security', status: 'REJECTED', date: '2023-11-12' },
  ]);

  useEffect(() => {
    // Mock initial data
    setApplications([
      {
        id: 'APP-7721',
        clientId: user.id,
        country: 'Canada',
        visaType: 'Skilled Worker (EE)',
        status: ApplicationStatus.IN_REVIEW,
        createdAt: '2023-10-12',
        updatedAt: '2023-11-20',
        progress: 65
      },
      {
        id: 'APP-9012',
        clientId: user.id,
        country: 'Australia',
        visaType: 'Investor Visa (188)',
        status: ApplicationStatus.DOCUMENTS_REQUIRED,
        createdAt: '2023-11-01',
        updatedAt: '2023-11-21',
        progress: 40
      }
    ]);

    // Initial AI fetch
    getImmigrationAdvice("High-level overview of Express Entry 2024 changes", "Canada").then(setAiAdvice);
  }, [user.id]);

  const isAdmin = user.role === UserRole.SUPER_ADMIN || user.role === UserRole.CASE_OFFICER;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsUploadModalOpen(true);
    }
  };

  const finalizeUpload = () => {
    if (!selectedFile || !isConfirmed) return;
    
    setIsUploading(true);
    // Simulate network latency for enterprise-grade file ingestion
    setTimeout(() => {
      const newDoc: MockDocument = {
        name: selectedFile.name,
        cat: 'Uncategorized',
        status: 'PENDING',
        date: new Date().toISOString().split('T')[0]
      };
      setDocuments(prev => [newDoc, ...prev]);
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setIsConfirmed(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#002147] text-white flex flex-col fixed h-full z-30">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <GlobeIcon className="text-[#B8860B] w-6 h-6" />
            <span className="text-xl font-serif font-bold tracking-tight">APEX HUB</span>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded transition-all ${activeTab === 'overview' ? 'bg-[#B8860B] text-white' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-sm font-medium">Global Overview</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded transition-all ${activeTab === 'documents' ? 'bg-[#B8860B] text-white' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span className="text-sm font-medium">Compliance Vault</span>
          </button>

          <button 
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded transition-all ${activeTab === 'appointments' ? 'bg-[#B8860B] text-white' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-sm font-medium">Advisory Calendar</span>
          </button>

          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded transition-all ${activeTab === 'billing' ? 'bg-[#B8860B] text-white' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-sm font-medium">Financial Records</span>
          </button>
        </nav>

        <div className="p-6 border-t border-white/10 mt-auto">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded bg-[#B8860B] flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold truncate w-32 uppercase">{user.name}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full py-2 border border-white/20 text-xs font-bold uppercase rounded hover:bg-white/10 transition-all"
          >
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-grow p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#002147]">
              {isAdmin ? 'Advisory Command Centre' : `Welcome back, ${user.name.split(' ')[0]}`}
            </h1>
            <p className="text-slate-500 text-sm mt-1">Unified Intelligence Platform • {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center space-x-4">
             <div className="px-4 py-2 bg-white rounded shadow-sm border border-slate-200 text-xs flex items-center space-x-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span className="font-bold text-slate-600 uppercase tracking-widest">Global Server: ACTIVE</span>
             </div>
          </div>
        </header>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* AI Insights Card */}
            <div className="bg-[#002147] text-white p-8 rounded-xl shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <ShieldIcon className="w-32 h-32" />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center space-x-2 mb-4">
                    <span className="px-2 py-0.5 bg-[#B8860B] text-[10px] font-bold uppercase rounded">Apex Intelligence</span>
                    <h3 className="text-lg font-serif italic">AI-Powered Regulatory Insight</h3>
                 </div>
                 <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-4xl">
                   {aiAdvice}
                 </p>
                 <button className="text-[#B8860B] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                   Read Full Legal Bulletin &rarr;
                 </button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Applications List */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-serif font-bold text-[#002147]">Active Case Portfolio</h3>
                {applications.map(app => (
                  <div key={app.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Case ID: {app.id}</span>
                        <h4 className="text-lg font-bold text-[#002147]">{app.country}: {app.visaType}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${
                        app.status === ApplicationStatus.APPROVED ? 'bg-green-100 text-green-700' :
                        app.status === ApplicationStatus.DOCUMENTS_REQUIRED ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Filing Progress</span>
                        <span>{app.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#B8860B] transition-all duration-1000" 
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center text-xs">
                       <span className="text-slate-400 italic">Last modification: {app.updatedAt}</span>
                       <button className="text-[#002147] font-bold uppercase hover:underline">Manage Dossier</button>
                    </div>
                  </div>
                ))}

                <button className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-400 rounded-lg hover:border-[#B8860B] hover:text-[#B8860B] transition-all font-bold uppercase tracking-widest text-sm">
                  + Initiate New Application Profile
                </button>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h4 className="text-sm font-bold text-[#002147] uppercase tracking-widest mb-4">Strategic Timeline</h4>
                    <div className="space-y-6">
                       {[
                         { date: 'Oct 24', event: 'Initial Consultation Completed', status: 'done' },
                         { date: 'Oct 30', event: 'Document Verification Level 1', status: 'done' },
                         { date: 'Nov 12', event: 'Case Filing Strategy Finalized', status: 'done' },
                         { date: 'TBD', event: 'Government Submission', status: 'pending' },
                       ].map((item, i) => (
                         <div key={i} className="flex space-x-4">
                           <div className="flex flex-col items-center">
                             <div className={`w-3 h-3 rounded-full ${item.status === 'done' ? 'bg-[#B8860B]' : 'bg-slate-200'}`}></div>
                             {i < 3 && <div className="w-0.5 flex-grow bg-slate-100"></div>}
                           </div>
                           <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</p>
                             <p className="text-sm font-medium text-[#002147]">{item.event}</p>
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-[#B8860B] text-white p-6 rounded-lg shadow-xl">
                    <ScaleIcon className="w-8 h-8 mb-4" />
                    <h4 className="text-lg font-serif font-bold mb-2">Legal Retainer Status</h4>
                    <p className="text-xs text-white/80 mb-6 leading-relaxed">Your professional engagement is fully funded for current milestones. Milestone 3 (Submission) will be invoiced upon dossier completion.</p>
                    <button className="w-full py-2 bg-white text-[#B8860B] font-bold text-xs uppercase rounded hover:bg-slate-100 transition-all">
                      Review Invoice History
                    </button>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Simplified Document Tab Content */}
        {activeTab === 'documents' && (
          <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 animate-fade-in relative">
             <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-serif font-bold text-[#002147]">Compliance Vault</h2>
                <div className="flex space-x-2">
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-[#002147] text-white text-xs font-bold uppercase rounded shadow-lg hover:bg-slate-800 transition-all"
                  >
                    Upload Credentials
                  </button>
                </div>
             </div>

             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400">
                     <th className="pb-4 font-bold">Document Title</th>
                     <th className="pb-4 font-bold">Category</th>
                     <th className="pb-4 font-bold">Verification Status</th>
                     <th className="pb-4 font-bold">Timestamp</th>
                     <th className="pb-4 font-bold">Action</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {documents.map((doc, i) => (
                     <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                       <td className="py-4 font-medium text-[#002147]">{doc.name}</td>
                       <td className="py-4 text-slate-500">{doc.cat}</td>
                       <td className="py-4">
                         <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold ${
                           doc.status === 'VERIFIED' ? 'bg-green-100 text-green-700' :
                           doc.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                           'bg-red-100 text-red-700'
                         }`}>
                           {doc.status}
                         </span>
                       </td>
                       <td className="py-4 text-slate-400 text-xs">{doc.date}</td>
                       <td className="py-4">
                         <button className="text-[#B8860B] hover:text-[#002147] font-bold uppercase text-[10px]">Inspect</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>

             {/* Confirmation Modal */}
             {isUploadModalOpen && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                 <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
                   <div className="bg-[#002147] p-6 text-center text-white">
                     <ShieldIcon className="w-10 h-10 text-[#B8860B] mx-auto mb-3" />
                     <h3 className="text-xl font-serif font-bold">Dossier Ingestion Confirmation</h3>
                     <p className="text-[10px] tracking-widest uppercase text-slate-400 mt-1">High-Security Protocol Active</p>
                   </div>
                   
                   <div className="p-8">
                     <div className="bg-slate-50 border border-slate-200 p-4 rounded mb-6">
                        <div className="flex items-center space-x-3">
                           <div className="p-2 bg-white rounded border border-slate-200">
                              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                           </div>
                           <div className="flex-grow min-w-0">
                              <p className="text-sm font-bold text-[#002147] truncate">{selectedFile?.name}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-tight">
                                {(selectedFile?.size ? (selectedFile.size / 1024 / 1024).toFixed(2) : '0')} MB • {selectedFile?.type.split('/')[1].toUpperCase()}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4 mb-8">
                       <label className="flex items-start space-x-3 cursor-pointer group">
                         <div className="pt-0.5">
                           <input 
                             type="checkbox" 
                             className="w-4 h-4 rounded border-slate-300 text-[#002147] focus:ring-[#002147]" 
                             checked={isConfirmed}
                             onChange={(e) => setIsConfirmed(e.target.checked)}
                           />
                         </div>
                         <p className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                           I confirm that this document is a clear, legible, and accurate copy of the original credential. I understand that submitting fraudulent or inaccurate documentation will lead to immediate case termination and potential legal escalation.
                         </p>
                       </label>
                     </div>

                     <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <button 
                          disabled={isUploading}
                          onClick={() => { setIsUploadModalOpen(false); setSelectedFile(null); setIsConfirmed(false); }}
                          className="flex-grow py-3 border border-slate-200 text-slate-600 font-bold text-xs uppercase rounded hover:bg-slate-50 transition-all disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button 
                          disabled={!isConfirmed || isUploading}
                          onClick={finalizeUpload}
                          className="flex-grow py-3 bg-[#002147] text-white font-bold text-xs uppercase rounded shadow-lg hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {isUploading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Ingesting...
                            </>
                          ) : 'Finalize Ingestion'}
                        </button>
                     </div>
                   </div>
                 </div>
               </div>
             )}
          </div>
        )}

        {/* Other tabs follow similar high-end structure */}
        {(activeTab === 'appointments' || activeTab === 'billing') && (
          <div className="bg-white p-20 rounded-xl shadow-sm border border-slate-200 text-center animate-fade-in">
             <ScaleIcon className="w-16 h-16 text-slate-200 mx-auto mb-6" />
             <h3 className="text-2xl font-serif font-bold text-[#002147] mb-2">Extended Module Under Verification</h3>
             <p className="text-slate-500 max-w-md mx-auto">This enterprise module is undergoing annual security audit. Full access will resume momentarily. For urgent inquiries, contact your assigned Case Officer.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
