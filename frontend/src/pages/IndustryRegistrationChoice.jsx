import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus, 
  Upload, 
  ShieldCheck, 
  ArrowRight, 
  Info,
  ExternalLink,
  ClipboardCheck,
  Building
} from 'lucide-react';

const IndustryRegistrationChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500"></div>
      
      <div className="w-full max-w-6xl relative z-10 animate-fade-in">
        <div className="text-center mb-16">
           <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none text-white">
              Industry Registration <span className="text-primary">Gateway</span>
           </h1>
           <p className="text-text-muted font-bold tracking-[0.2em] uppercase text-sm max-w-2xl mx-auto leading-relaxed">
              Official portal for White Category industry intimation to CECB. Choose your protocol to proceed.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {/* Option 1: Create New Form */}
           <div 
             onClick={() => navigate('/register-industry/new')}
             className="group bg-[#0a0a0c] border border-white/10 rounded-[4rem] p-12 lg:p-16 hover:border-emerald-500/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-full shadow-2xl"
           >
              <div>
                 <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-10 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-500">
                    <FilePlus size={40} />
                 </div>
                 <h2 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase mb-6 text-white">Create New <br/><span className="text-emerald-500">Form</span></h2>
                 <p className="text-text-muted font-bold tracking-widest uppercase text-xs mb-8 leading-relaxed">
                    Generate the official White Category industry intimation document.
                 </p>
              </div>

              <div className="flex items-center justify-between">
                 <span className="text-xs font-black uppercase italic tracking-widest text-emerald-500">Start Registration</span>
                 <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-all text-white">
                    <ArrowRight size={24} />
                 </div>
              </div>
           </div>

           {/* Option 2: Submit Official Form */}
           <div 
             onClick={() => navigate('/register-industry/submit')}
             className="group bg-[#0a0a0c] border border-white/10 rounded-[4rem] p-12 lg:p-16 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-full shadow-2xl"
           >
              <div>
                 <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-10 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all text-primary">
                    <Upload size={40} />
                 </div>
                 <h2 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase mb-6 text-white">Submit Official <br/><span className="text-primary">Form</span></h2>
                 <p className="text-text-muted font-bold tracking-widest uppercase text-xs mb-8 leading-relaxed">
                    Upload your signed and stamped official document for final authorization.
                 </p>
              </div>

              <div className="flex items-center justify-between">
                 <span className="text-xs font-black uppercase italic tracking-widest text-primary">Upload Documentation</span>
                 <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all text-white">
                    <ArrowRight size={24} />
                 </div>
              </div>
           </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-16 mx-auto block text-text-muted hover:text-white transition-colors font-black uppercase italic tracking-widest text-xs"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default IndustryRegistrationChoice;
