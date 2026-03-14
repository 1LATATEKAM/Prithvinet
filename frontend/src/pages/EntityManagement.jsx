import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Plus, 
  Search, 
  Activity, 
  Loader2, 
  Trash2, 
  RefreshCw, 
  X,
  Shield,
  Briefcase
} from 'lucide-react';
import { getEntities, createEntity, deleteEntity } from '../api/monitoring';
import CreateEntityForm from '../components/forms/CreateEntityForm';

const EntityManagement = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEntities = async () => {
    setRefreshing(true);
    try {
      const res = await getEntities();
      setEntities(res.data);
    } catch (error) {
      console.error('Error fetching entities:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createEntity(formData);
      setShowForm(false);
      fetchEntities();
    } catch (error) {
      console.error('Creation failed:', error);
      alert('Failed to create entity: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this organization entity?')) {
      try {
        await deleteEntity(id);
        fetchEntities();
      } catch (error) {
        console.error('Deletion failed:', error);
      }
    }
  };

  const filteredEntities = entities.filter(ent => 
    ent.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ent.entityType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in relative min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-blue-500/10 p-10 rounded-[3rem] border border-blue-500/20 shadow-2xl shadow-blue-500/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/30">
            <Building2 className="text-white" size={36} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Entity Control</h1>
            <p className="text-text-muted text-[10px] font-black italic uppercase tracking-[0.4em] flex items-center gap-2 mt-2">
              <Shield size={14} className="text-blue-500 animate-pulse" /> Organizational Asset Management
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Find Organization..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-12 pr-6 text-sm font-black focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-72 transition-all uppercase italic placeholder:text-white/20"
              />
           </div>
           <button 
             onClick={() => setShowForm(true)}
             className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all uppercase italic tracking-widest text-sm"
           >
             <Plus size={24} /> New Entity
           </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[500px]">
          <Loader2 className="animate-spin text-blue-600 mb-8" size={64} />
          <p className="text-text-muted font-black italic tracking-[0.6em] uppercase text-[10px] animate-pulse">Syncing Organizational Grid...</p>
        </div>
      ) : (
        <div className="glass-morphism rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl pb-10">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="bg-white/[0.03] text-text-muted text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                  <th className="py-8 px-10">Organization Identity</th>
                  <th className="py-8 px-10">Classification</th>
                  <th className="py-8 px-10">Registration No.</th>
                  <th className="py-8 px-10">Custodian</th>
                  <th className="py-8 px-10 text-right">Ops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEntities.length > 0 ? (
                  filteredEntities.map(entity => (
                    <tr key={entity._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-text-muted group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all shadow-inner border border-white/5">
                            <Building2 size={22} />
                          </div>
                          <div>
                            <p className="font-black text-lg text-white tracking-tight uppercase italic">{entity.entityName}</p>
                            <p className="text-[9px] text-text-muted font-black uppercase tracking-[0.2em] mt-1">{entity.city}, {entity.state}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-10">
                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-blue-400 transition-colors">
                          {entity.entityType}
                        </span>
                      </td>
                      <td className="py-8 px-10 text-xs font-black text-white/60 tracking-widest">
                        {entity.registrationNumber}
                      </td>
                      <td className="py-8 px-10">
                         <div>
                            <p className="text-sm font-black text-blue-400 uppercase italic">{entity.contactPerson}</p>
                            <p className="text-[10px] text-text-muted font-bold">{entity.contactEmail}</p>
                         </div>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <button 
                          onClick={() => handleDelete(entity._id)}
                          className="p-4 bg-white/5 rounded-2xl text-rose-500/50 hover:bg-rose-500 hover:text-white transition-all shadow-xl group/btn"
                        >
                          <Trash2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-32 text-center text-text-muted italic font-black uppercase tracking-[0.4em] text-xs">
                       Initialization pending. No active entities detected.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Creation Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-3xl bg-black/80 animate-in fade-in zoom-in duration-500">
           <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar">
              <CreateEntityForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
           </div>
        </div>
      )}
    </div>
  );
};

export default EntityManagement;
