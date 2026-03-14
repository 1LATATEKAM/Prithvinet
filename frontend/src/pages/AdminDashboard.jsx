import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  UserPlus, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  MapPin, 
  Users, 
  Activity,
  FileSearch,
  ChevronRight,
  Loader2,
  TrendingUp,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import api from '../api/client';
import PageBranding from '../components/PageBranding';

const AdminDashboard = () => {
  const [pendingIndustries, setPendingIndustries] = useState([]);
  const [regionalOfficers, setRegionalOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Approvals');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indRes, userRes] = await Promise.all([
          api.get('/admin/industries'),
          api.get('/users?role=Regional Officer') // Reusing general user endpoint
        ]);
        setPendingIndustries(indRes.data);
        setRegionalOfficers(userRes.data || []);
      } catch (error) {
        console.error('Data sync failed:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

    const [selectedRO, setSelectedRO] = useState({});

  const handleApprove = async (id, status) => {
    try {
      const roId = selectedRO[id];
      if (status === 'Approved' && !roId) {
        alert('Please assign a Regional Officer for approval.');
        return;
      }
      const res = await api.post('/admin/approve-industry', { 
         industryId: id, 
         status,
         regionalOfficerId: roId
      });
      setPendingIndustries(prev => prev.filter(p => p._id !== id));
      
      if (res.data.credentials) {
        const { email, temporaryPassword } = res.data.credentials;
        alert(`Industry Approved!\nCredentials generated:\nEmail: ${email}\nPassword: ${temporaryPassword}\nPlease share these with the industry representative.`);
      } else {
        alert(`Industry ${status} and assigned successfully.`);
      }
    } catch (error) {
      alert('Action failed: ' + error.message);
    }
  };

  const handleROChange = (industryId, roId) => {
    setSelectedRO(prev => ({ ...prev, [industryId]: roId }));
  };

  const stats = [
    { label: 'Pending Approvals', value: pendingIndustries.length, icon: FileSearch, color: 'text-amber-500' },
    { label: 'Active Regions', value: 'Bilaspur, Durg...', icon: MapPin, color: 'text-blue-500' },
    { label: 'Active Industries', value: '1,240+', icon: Building2, color: 'text-emerald-500' },
    { label: 'System Integrity', value: 'Level 5', icon: ShieldCheck, color: 'text-primary' },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
       <Loader2 className="animate-spin text-primary mb-6" size={56} />
       <p className="text-text-muted font-black italic text-xs tracking-[0.4em] uppercase animate-pulse">Synchronizing Admin Grid...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in p-2">
      <PageBranding title="Industrial Node Profile" />
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
         <div className="flex-1 bg-primary/10 border border-primary/20 p-10 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
               <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase mb-4 text-glow">Admin <br/><span className="text-primary">Oversight Grid</span></h1>
               <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.4em] italic mb-8">Central Command Interface - Chhattisgarh Env Board</p>
               <div className="flex gap-4">
                  <button onClick={() => setActiveTab('Approvals')} className={`px-8 py-3 rounded-2xl font-black uppercase italic tracking-widest text-xs transition-all ${activeTab === 'Approvals' ? 'bg-primary text-black' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}>Industrial Approvals</button>
                  <button onClick={() => setActiveTab('Officers')} className={`px-8 py-3 rounded-2xl font-black uppercase italic tracking-widest text-xs transition-all ${activeTab === 'Officers' ? 'bg-primary text-black' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}>Official Provisioning</button>
               </div>
            </div>
         </div>
         
         <div className="grid grid-cols-2 gap-6 lg:w-[400px]">
            {stats.map((s, i) => (
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

      {activeTab === 'Approvals' ? (
         <div className="glass-morphism border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-white/5 flex justify-between items-center">
               <div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight">Registration Queue</h3>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Industrial filing verification required</p>
               </div>
               <div className="px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 text-[10px] font-black uppercase italic tracking-widest flex items-center gap-2">
                  <Activity size={14} className="animate-pulse" /> Pending Sync
               </div>
            </div>
            
            <div className="overflow-x-auto no-scrollbar">
               <table className="w-full text-left min-w-[1000px]">
                  <thead>
                     <tr className="bg-white/[0.02] text-text-muted text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                        <th className="py-8 px-10">Entity & Industry</th>
                        <th className="py-8 px-10">District Grid</th>
                        <th className="py-8 px-10">Jurisdiction Assignment</th>
                        <th className="py-8 px-10">Legal Credentials</th>
                        <th className="py-8 px-10 text-right">Verification Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {pendingIndustries.length > 0 ? pendingIndustries.map(ind => (
                        <tr key={ind._id} className="hover:bg-white/5 transition-colors group">
                           <td className="py-8 px-10">
                              <div className="flex items-center gap-5">
                                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Building2 size={24} />
                                 </div>
                                 <div>
                                    <p className="font-black text-lg italic uppercase tracking-tight text-white">{ind.industryName}</p>
                                    <p className="text-[10px] text-text-muted font-black tracking-widest uppercase">{ind.industryType || 'White Category'}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="py-8 px-10">
                              <span className="text-xs font-black uppercase italic tracking-widest text-text-muted flex items-center gap-2">
                                 <MapPin size={14} className="text-primary" /> {ind.district}
                              </span>
                           </td>
                           <td className="py-8 px-10">
                              <select 
                                value={selectedRO[ind._id] || ''} 
                                onChange={(e) => handleROChange(ind._id, e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase italic tracking-widest text-white/70 outline-none focus:border-primary transition-all"
                              >
                                 <option value="" className="bg-background">Select RO</option>
                                 {regionalOfficers.map(ro => (
                                    <option key={ro._id} value={ro._id} className="bg-background">{ro.name} ({ro.region || ro.district})</option>
                                 ))}
                              </select>
                           </td>
                           <td className="py-8 px-10">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">PAN: {ind.panNumber}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 italic">GST: {ind.gstNumber || 'N/A'}</p>
                           </td>
                           <td className="py-8 px-10 text-right">
                              <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                 <button className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 text-text-muted transition-all"><FileSearch size={20} /></button>
                                 <button onClick={() => handleApprove(ind._id, 'Rejected')} className="p-4 bg-white/5 rounded-2xl hover:bg-rose-500 text-white transition-all"><XCircle size={20} /></button>
                                 <button onClick={() => handleApprove(ind._id, 'Approved')} className="p-4 bg-white/5 rounded-2xl hover:bg-emerald-500 text-white transition-all shadow-xl shadow-emerald-500/20"><CheckCircle2 size={20} /></button>
                              </div>
                           </td>
                        </tr>
                     )) : (
                        <tr>
                           <td colSpan="5" className="py-32 text-center">
                              <Activity size={48} className="text-white/5 mx-auto mb-6" />
                              <p className="text-text-muted font-black italic uppercase tracking-[0.4em] text-xs">Queue Clean. All identities verified.</p>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      ) : (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Officers List */}
            <div className="glass-morphism border border-white/5 rounded-[3rem] p-10">
               <h3 className="text-2xl font-black uppercase italic tracking-tight mb-10 pb-6 border-b border-white/5 flex items-center justify-between">
                  Board Personnel 
                  <button className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-black uppercase italic tracking-widest hover:bg-primary hover:text-black transition-all">
                     <UserPlus size={14} className="inline mr-2 outline-none" /> Provision New
                  </button>
               </h3>
               <div className="space-y-6">
                  {regionalOfficers.map((ro, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/5 transition-all group">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                              <Users size={24} />
                           </div>
                           <div>
                              <p className="font-black text-white italic tracking-tighter uppercase">{ro.name}</p>
                              <p className="text-[10px] text-text-muted uppercase tracking-widest font-black">{ro.region || 'Assigned Region Name'}</p>
                           </div>
                        </div>
                        <ChevronRight size={20} className="text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                     </div>
                  ))}
               </div>
            </div>
            
            {/* Integration Note */}
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-[3rem] p-12 flex flex-col justify-between">
               <div>
                  <div className="w-16 h-16 bg-rose-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-500/30 mb-10">
                     <AlertCircle className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tight mb-4">Security Protocol Level 4</h3>
                  <p className="text-text-muted font-bold tracking-widest uppercase text-xs leading-relaxed mb-8">
                     provisioning official personnel accounts grants full jurisdictional access to regional environmental data, monitoring teams, and industrial oversight. verify credentials before authorization.
                  </p>
               </div>
               <button className="w-full py-6 bg-rose-600 text-white rounded-2xl font-black uppercase italic tracking-widest text-sm shadow-xl shadow-rose-600/20 hover:scale-[1.02] transition-all">Revoke Board Access</button>
            </div>
         </div>
      )}
    </div>
  );
};

export default AdminDashboard;
