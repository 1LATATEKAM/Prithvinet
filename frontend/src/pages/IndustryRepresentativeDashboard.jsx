import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  History, 
  AlertCircle,
  TrendingUp,
  Activity,
  ShieldCheck,
  ClipboardList,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

const IndustryRepresentativeDashboard = () => {
  const [showAdvisor, setShowAdvisor] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with AI CTA */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck size={160} />
           </div>
           <div className="relative z-10">
              <h1 className="text-4xl font-extrabold tracking-tight">Jindal Steel Complex</h1>
              <p className="text-text-muted mt-2 max-w-md">Real-time emission oversight and autonomous compliance management for the Raipur facility.</p>
              <div className="flex items-center gap-6 mt-8">
                 <div className="flex items-center gap-2 text-emerald-500 font-bold bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                    <ShieldCheck size={18} /> COMPLIANT
                 </div>
                 <div className="text-xs font-bold text-text-muted flex items-center gap-2">
                    <Clock size={14} /> LAST AUDIT: 12H AGO
                 </div>
              </div>
           </div>
        </div>

        <button 
          onClick={() => setShowAdvisor(!showAdvisor)}
          className="lg:w-80 bg-primary p-8 rounded-[2.5rem] text-white flex flex-col justify-between hover:scale-[1.02] transition-all shadow-2xl shadow-primary/30 text-left"
        >
           <Sparkles size={32} className="mb-4" />
           <div>
              <p className="font-bold text-lg leading-tight mb-2 italic">AI Compliance Advisor</p>
              <p className="text-xs text-white/80 leading-relaxed mb-6">Ask for strategies to optimize stacks or reduce water discharge fees.</p>
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                 Launch Assistant <ArrowRight size={14} />
              </div>
           </div>
        </button>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ActionCard title="Report Emissions" icon={Upload} color="bg-primary" />
        <ActionCard title="Historical Logs" icon={History} color="bg-secondary" />
        <ActionCard title="Sensor Health" icon={Activity} color="bg-emerald-500" />
        <ActionCard title="Legal Permits" icon={FileText} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Advisor Integration (Inline for demo) */}
           {showAdvisor && (
             <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 animate-slide-up">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                      <Sparkles size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold italic">Advisor Analysis</h4>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Active Intelligence Session</p>
                   </div>
                </div>
                <p className="text-sm border-l-2 border-primary pl-4 italic text-white/90 leading-relaxed">
                   "Based on last week's wet scrubber efficiency, you could reduce energy costs by 12% while maintaining current particulate matter levels. Would you like to see the simulation?"
                </p>
                <div className="flex gap-4 mt-6">
                   <button className="px-6 py-2 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">View Strategy</button>
                   <button onClick={() => setShowAdvisor(false)} className="px-6 py-2 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10">Dismiss</button>
                </div>
             </div>
           )}

           <div className="glass-morphism rounded-3xl p-8 border border-white/5">
                <h3 className="text-xl font-bold mb-8 italic flex items-center gap-2">
                   <Activity size={20} className="text-primary" /> Stack CEMS Telemetry
                </h3>
                <div className="aspect-[21/9] flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                   <TrendingUp className="text-text-muted mb-4 opacity-20" size={48} />
                   <p className="text-text-muted italic text-sm">Real-time data visualization connecting...</p>
                </div>
           </div>
        </div>

        <div className="space-y-6">
            <div className="glass-morphism rounded-3xl p-8 border border-white/5">
               <h3 className="text-xl font-bold mb-6 italic">Permit Tracking</h3>
               <div className="space-y-4">
                  <PermitItem name="Air Emission Permit" days={14} color="text-rose-500" />
                  <PermitItem name="CFO (Water) Discharge" days={180} color="text-emerald-500" />
                  <PermitItem name="Hazardous Waste Auth" days={42} color="text-amber-500" />
               </div>
               <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">
                  Request Renewals
               </button>
            </div>

            <div className="glass-morphism rounded-3xl p-6 bg-emerald-500/5 border border-emerald-500/20">
               <h3 className="font-bold flex items-center gap-2 text-emerald-500 italic mb-4">
                  <CheckCircle2 size={18} /> Compliance Score: 98
               </h3>
               <p className="text-xs text-text-muted leading-relaxed">
                  Excellent! You are currently among the top 5% of ESG compliant industries in the Raipur district.
               </p>
            </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ title, icon: Icon, color }) => (
  <button className="glass-morphism p-6 rounded-3xl flex flex-col gap-6 text-left hover:scale-[1.05] hover:border-primary/50 transition-all border border-white/5 group">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 ${color} bg-opacity-20`}>
      <Icon className={color.replace('bg-', 'text-')} size={28} />
    </div>
    <span className="font-bold text-sm leading-tight uppercase tracking-wider">{title}</span>
  </button>
);

const PermitItem = ({ name, days, color }) => (
   <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-all cursor-pointer">
      <div>
         <p className="text-xs font-bold">{name}</p>
         <p className="text-[10px] text-text-muted mt-1 uppercase font-black">EXPIRING IN {days} DAYS</p>
      </div>
      <ChevronRight size={14} className={color} />
   </div>
);

export default IndustryRepresentativeDashboard;
