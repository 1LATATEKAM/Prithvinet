import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Activity, 
  AlertTriangle,
  Download,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Factory,
  ChevronRight
} from 'lucide-react';
import api from '../api/client';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const IndustryDashboard = () => {
  const [industryData, setIndustryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/industries/my-profile'); 
        setIndustryData(res.data);
      } catch (error) {
        console.error('Industry data load failed:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const complianceData = [
    { month: 'Oct', pm25: 45, limit: 60 },
    { month: 'Nov', pm25: 48, limit: 60 },
    { month: 'Dec', pm25: 55, limit: 60 },
    { month: 'Jan', pm25: 62, limit: 60 },
    { month: 'Feb', pm25: 58, limit: 60 },
    { month: 'Mar', pm25: 52, limit: 60 },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
       <Loader2 className="animate-spin text-primary mb-6" size={56} />
       <p className="text-text-muted font-black italic text-xs tracking-[0.4em] uppercase animate-pulse">Accessing Node Profile...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in p-2">
      {/* Industry Header */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
         <div className="flex-1 glass-morphism border border-white/5 p-12 rounded-[3.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">
               <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl group-hover:border-primary/50 transition-all">
                  <Factory className="text-primary" size={48} />
               </div>
               <div>
                  <div className="flex items-center gap-4 mb-3">
                     <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">{industryData?.industryName || 'Global Industrial Node'}</h1>
                     <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={12} /> Live Compliance
                     </div>
                  </div>
                  <p className="text-text-muted font-black uppercase tracking-[0.4em] text-[10px] italic flex items-center gap-4">
                     <MapPin size={14} className="text-primary" /> Sector 7 Raipur Grid • <Building2 size={14} className="text-primary" /> White Category Protocol
                  </p>
               </div>
            </div>
         </div>
         
         <div className="lg:w-[350px] bg-primary/10 border border-primary/20 p-10 rounded-[3.5rem] flex flex-col justify-between group cursor-pointer hover:bg-primary/20 transition-all shadow-2xl shadow-primary/5">
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 italic">Next Regulatory Audit</p>
               <h3 className="text-3xl font-black italic tracking-tight text-white uppercase italic">12 May 2026</h3>
            </div>
            <button className="flex items-center gap-3 text-[10px] font-black uppercase italic tracking-widest text-primary hover:text-white transition-colors transform group-hover:translate-x-2">
               Download Schedule <Download size={16} />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Compliance Trends */}
         <div className="lg:col-span-8 glass-morphism border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-4">
                     <TrendingUp className="text-primary" size={24} /> Emission Trends (PM2.5)
                  </h3>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Industrial node sensor telemetry vs Board standards</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-primary shadow-lg border border-white/5">
                     <div className="w-2 h-2 rounded-full bg-primary"></div> Your Level
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-rose-500 shadow-lg border border-white/5">
                     <div className="w-2 h-2 rounded-full bg-rose-500"></div> CECB Limit
                  </div>
               </div>
            </div>
            
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={complianceData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                     <XAxis dataKey="month" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                     <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} domain={[0, 80]} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px', fontSize: '10px' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ stroke: '#ffffff10' }}
                     />
                     <Line type="monotone" dataKey="pm25" stroke="#00f2fe" strokeWidth={4} dot={{ fill: '#00f2fe', r: 6 }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} />
                     <Line type="monotone" dataKey="limit" stroke="#f43f5e" strokeWidth={2} strokeDasharray="10 10" dot={false} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Sidebar Actions */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-[#0a0a0c] border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between h-full group transition-all hover:border-primary/30 shadow-2xl">
               <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight mb-8">Official Filings</h3>
                  <div className="space-y-4">
                     {[
                       { label: 'Annual Compliance Report', date: '2023-24', status: 'Submitted' },
                       { label: 'Water Discharge Logs', date: 'Mar 2026', status: 'Pending' },
                       { label: 'Hazardous Waste Audit', date: 'Biannual', status: 'Approved' }
                     ].map((doc, i) => (
                        <div key={i} className="flex justify-between items-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl group/item hover:bg-white/5 transition-all cursor-pointer">
                           <div>
                              <p className="text-xs font-black uppercase italic text-white group-hover/item:text-primary transition-colors">{doc.label}</p>
                              <p className="text-[9px] text-text-muted uppercase tracking-widest font-black mt-1">{doc.date}</p>
                           </div>
                           <FileText size={20} className="text-white/10 group-hover/item:text-primary transition-all" />
                        </div>
                     ))}
                  </div>
               </div>
               <button className="mt-10 w-full py-5 bg-primary text-black rounded-2xl font-black uppercase italic tracking-widest text-xs shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-3">
                  Upload Compliance Node <Activity size={18} />
               </button>
            </div>
            
            <div className="bg-[#0a0a0c] border border-white/10 rounded-[3rem] p-10 flex flex-col gap-6 group hover:border-amber-500/30 transition-all cursor-pointer">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xl shadow-amber-500/5">
                     <AlertTriangle size={24} />
                  </div>
                  <div>
                     <h4 className="font-black text-white italic uppercase tracking-tight">Active Alerts</h4>
                     <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest mt-1">02 Security Notifications</p>
                  </div>
               </div>
               <button className="flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest text-text-muted group-hover:text-white transition-colors">
                  Investigate Protocol <ChevronRight size={18} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default IndustryDashboard;
