import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  MapPin, 
  Activity, 
  Plus, 
  Search, 
  Waves,
  AlertCircle,
  Loader2,
  ChevronRight,
  Trash2,
  RefreshCw,
  X
} from 'lucide-react';
import { getWaterSources, createWaterSource, deleteWaterSource } from '../api/monitoring';
import RegisterWaterSourceForm from '../components/forms/RegisterWaterSourceForm';

const WaterSources = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSources = async () => {
    setRefreshing(true);
    try {
      const res = await getWaterSources();
      setSources(res.data);
    } catch (error) {
      console.error('Error fetching water sources:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleRegister = async (formData) => {
    try {
      await createWaterSource(formData);
      setShowForm(false);
      fetchSources();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register water source: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this water source from active monitoring?')) {
      try {
        await deleteWaterSource(id);
        fetchSources();
      } catch (error) {
        console.error('Deletion failed:', error);
      }
    }
  };

  const filteredSources = sources.filter(s => 
    s.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.sourceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in relative min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-cyan-500/10 p-10 rounded-[3rem] border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
            <Droplets className="text-white" size={36} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Hydro-Registry</h1>
            <p className="text-text-muted text-[10px] font-black italic uppercase tracking-[0.4em] flex items-center gap-2 mt-2">
              <Waves size={14} className="text-cyan-500 animate-pulse" /> Regional Hydro-Grid Assets
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-cyan-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Synchronize Source..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-12 pr-6 text-sm font-black focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-72 transition-all uppercase italic placeholder:text-white/20"
              />
           </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[500px]">
          <Loader2 className="animate-spin text-cyan-500 mb-8" size={64} />
          <p className="text-text-muted font-black italic tracking-[0.6em] uppercase text-[10px] animate-pulse">Mapping Regional Waterways...</p>
        </div>
      ) : filteredSources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {filteredSources.map((source) => (
            <SourceCard key={source._id} source={source} onDelete={() => handleDelete(source._id)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[500px] glass-morphism rounded-[4rem] border-dashed border-2 border-white/10 mx-auto max-w-5xl shadow-2xl">
          <AlertCircle size={80} className="text-white/5 mb-8" />
          <p className="text-text-muted font-black italic uppercase tracking-[0.5em] text-center px-12 leading-loose">No hydrological nodes identified in current coordinate mapping.</p>
        </div>
      )}

      {/* Registration Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-3xl bg-black/80 animate-in slide-in-from-bottom-10 duration-500">
           <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar">
              <RegisterWaterSourceForm onSubmit={handleRegister} onCancel={() => setShowForm(false)} />
           </div>
        </div>
      )}
    </div>
  );
};

const SourceCard = ({ source, onDelete }) => {
  return (
    <div className="group relative glass-morphism rounded-[3rem] p-10 border border-white/5 hover:border-cyan-500/40 transition-all hover:-translate-y-4 overflow-hidden shadow-2xl">
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-cyan-500 rounded-full blur-[60px] opacity-10 transition-all group-hover:opacity-40"></div>

      <div className="flex justify-between items-start mb-8">
        <div className="p-5 rounded-[2rem] bg-cyan-500/10 text-cyan-500 shadow-inner border border-cyan-500/5">
          <Waves size={32} />
        </div>
        <div className="px-5 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400">{source.sourceType}</span>
        </div>
      </div>

      <h3 className="text-3xl font-black mb-2 group-hover:text-cyan-500 transition-all uppercase italic tracking-tighter text-white">{source.sourceName}</h3>
      <div className="flex items-center gap-2 text-text-muted text-[10px] font-black uppercase tracking-widest mb-10 italic">
        <MapPin size={14} className="text-cyan-500" />
        {source.district || 'Regional Grid'}
      </div>

      <div className="space-y-5 pt-8 border-t border-white/5 mb-10">
        <div className="flex justify-between items-center bg-white/5 p-5 rounded-[1.5rem] border border-white/5">
           <div>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Quality Vector</p>
              <p className="text-sm font-black text-emerald-500 uppercase italic tracking-widest">{source.pollutionRiskLevel === 'Low' ? 'OPTIMAL' : source.pollutionRiskLevel.toUpperCase()}</p>
           </div>
           <Activity size={24} className="text-emerald-500 opacity-40 animate-pulse" />
        </div>
        <div className="flex items-center justify-between px-3">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">Resource Usage</span>
            <span className="text-[10px] font-black uppercase text-white bg-white/5 px-3 py-1 rounded-lg">{source.usageType || 'N/A'}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-cyan-500 transition-all shadow-xl group/btn flex items-center justify-center gap-3">
          Hydro-Audit <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
        </button>
        <button 
          onClick={onDelete}
          className="p-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-xl"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default WaterSources;
