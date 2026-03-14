import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Map as MapIcon, 
  Users, 
  Activity, 
  Waves, 
  Volume2, 
  TrendingUp, 
  Building2, 
  Search,
  ChevronRight,
  Plus,
  Loader2,
  AlertTriangle,
  ClipboardList
} from 'lucide-react';
import api from '../api/client';
import PageBranding from '../components/PageBranding';

const RegionalOfficerDashboard = () => {
  const [industries, setIndustries] = useState([]);
  const [office, setOffice] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indRes, logRes, officeRes] = await Promise.all([
          api.get('/regional/industries'),
          api.get('/monitoring/logs'),
          api.get('/regional/office')
        ]);
        setIndustries(indRes.data);
        setLogs(logRes.data);
        setOffice(officeRes.data);
      } catch (error) {
        console.error('Regional data sync failed:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
       <Loader2 className="animate-spin text-blue-500 mb-6" size={56} />
       <p className="text-text-muted font-black italic text-xs tracking-[0.4em] uppercase animate-pulse">Syncing Jurisdictional Uplink...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in">
      <PageBranding title="Regional Intelligence Hub" />
       {/* Regional Header */}
       <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="flex-1 bg-blue-500/10 border border-blue-500/20 p-10 rounded-[3rem] relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10">
                <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase mb-4">Regional <br/><span className="text-blue-500">Jurisdiction Map</span></h1>
                <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.4em] italic mb-8">{office ? `${office.office_name} - ${office.district} Grid Oversight` : 'Syncing Jurisdictional Context...'}</p>
                <div className="flex gap-4">
                   <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase italic tracking-widest text-xs shadow-xl shadow-blue-600/20 hover:scale-105 transition-all">Mobilize Teams</button>
                   <button className="px-8 py-3 bg-white/5 text-text-muted rounded-2xl font-black uppercase italic tracking-widest text-xs hover:bg-white/10 transition-all border border-white/5">Site Inspections</button>
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 lg:w-[400px]">
             {[
               { label: 'Active Industries', value: industries.length, icon: Building2, color: 'text-blue-500' },
               { label: 'Field Teams', value: '04', icon: Users, color: 'text-emerald-500' },
               { label: 'Pending Logs', value: '12', icon: Activity, color: 'text-amber-500' },
               { label: 'Alert Responses', value: '02', icon: AlertTriangle, color: 'text-rose-500' },
             ].map((s, i) => (
                <div key={i} className="glass-morphism border border-white/5 p-6 rounded-[2rem] flex flex-col justify-between hover:bg-white/5 transition-all">
                   <s.icon className={`${s.color} opacity-40`} size={24} />
                   <div className="mt-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-1">{s.label}</p>
                      <p className="text-xl font-black italic text-white">{s.value}</p>
                   </div>
                </div>
             ))}
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Recent Monitoring Logs */}
          <div className="lg:col-span-8 space-y-8">
             <div className="glass-morphism border border-white/5 rounded-[3rem] p-10">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-4">
                      <Activity className="text-blue-500" size={24} /> Live Telemetry
                   </h3>
                   <button className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors italic">View Timeline Grid</button>
                </div>
                
                <div className="space-y-4">
                   {logs.length > 0 ? logs.map((log, i) => (
                      <div key={i} className="group p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/5 transition-all flex items-center justify-between">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                               {log.monitoring_type === 'Air' ? <Activity size={24} /> : log.monitoring_type === 'Water' ? <Waves size={24} /> : <Volume2 size={24} />}
                            </div>
                            <div>
                               <p className="font-black text-white italic uppercase tracking-tight">{log.monitoring_type} Inspection</p>
                               <p className="text-[10px] text-text-muted uppercase tracking-widest font-black">Logged by {log.submitted_by?.name} • 5 mins ago</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-xl font-black italic text-blue-500">{Object.values(log.value)[0] || 0}</p>
                            <p className="text-[9px] text-text-muted font-black uppercase tracking-widest">Standard Units</p>
                         </div>
                      </div>
                   )) : (
                      <div className="py-20 text-center opacity-30">
                         <Activity size={48} className="mx-auto mb-4" />
                         <p className="font-black italic uppercase tracking-[0.3em] text-xs">No active telemetry in grid.</p>
                      </div>
                   )}
                </div>
             </div>
          </div>

          {/* Monitoring Teams Management */}
          <div className="lg:col-span-4 space-y-8">
             <div className="glass-morphism border border-white/5 rounded-[3rem] p-10 flex flex-col h-full bg-emerald-500/5">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-4">
                      <Users className="text-emerald-500" size={24} /> Field Units
                   </h3>
                   <button className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 hover:scale-110 transition-all">
                      <Plus size={20} />
                   </button>
                </div>
                
                <div className="space-y-6 flex-1">
                   {[
                     { name: 'Unit Alpha', status: 'Online', members: 4 },
                     { name: 'Unit Bravo', status: 'In-Field', members: 3 },
                     { name: 'Unit Delta', status: 'Standby', members: 4 },
                   ].map((team, i) => (
                      <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-emerald-500/50 transition-all cursor-pointer">
                         <div className="flex justify-between items-start mb-4">
                            <h4 className="font-black text-white uppercase italic tracking-tight">{team.name}</h4>
                            <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${team.status === 'In-Field' ? 'bg-amber-500/20 text-amber-500 animate-pulse' : 'bg-emerald-500/20 text-emerald-500'}`}>
                               {team.status}
                            </div>
                         </div>
                         <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{team.members} Registered Personnel</p>
                      </div>
                   ))}
                </div>
                
                <button className="mt-10 w-full py-5 border border-white/10 rounded-2xl text-[10px] font-black uppercase italic tracking-widest text-text-muted hover:bg-white/5 hover:text-white transition-all">
                   Full Personnel Grid
                </button>
             </div>
          </div>

       </div>
    </div>
  );
};

export default RegionalOfficerDashboard;
