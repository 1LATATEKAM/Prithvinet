import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Plus, 
  RefreshCw, 
  Radio, 
  Signal, 
  Loader2, 
  AlertCircle,
  Trash2,
  Edit,
  X
} from 'lucide-react';
import { getStations, createStation, deleteStation } from '../api/monitoring';
import DeployStationForm from '../components/forms/DeployStationForm';
import MonitoringStationDetails from '../components/modals/MonitoringStationDetails';

const Stations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchStations = async () => {
    setRefreshing(true);
    try {
      const res = await getStations();
      setStations(res.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleDeploy = async (formData) => {
    try {
      await createStation(formData);
      setShowForm(false);
      fetchStations();
    } catch (error) {
      console.error('Deployment failed:', error);
      alert('Failed to deploy station: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to decommission this station?')) {
      try {
        await deleteStation(id);
        fetchStations();
      } catch (error) {
        console.error('Deletion failed:', error);
      }
    }
  };

  const filteredStations = stations.filter(s => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'CECB Offices') {
      return s.stationType === 'Head Office' || s.stationType === 'Regional Office';
    }
    return s.stationType.includes(activeFilter);
  });

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative min-h-screen">
      {/* Responsive Header */}
      <div className="flex flex-col gap-6 bg-emerald-500/5 p-6 md:p-8 rounded-[2rem] border border-emerald-500/10 shadow-2xl shadow-emerald-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
              <Radio className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase italic">Monitoring Network</h1>
              <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                <Signal size={12} className="text-emerald-500 animate-pulse" /> Live Telemetry Feed
              </p>
            </div>
          </div>

          <div className="flex gap-3">
             <button 
               onClick={fetchStations}
               className="p-4 bg-white/5 text-white/50 rounded-2xl hover:bg-white/10 transition-all border border-white/10"
             >
               <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
             </button>
          </div>
        </div>
      </div>

      {/* Filter strip */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'CECB Offices', 'Air Quality', 'Water Quality', 'Noise Monitoring'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap shadow-xl ${
              activeFilter === filter 
              ? 'bg-emerald-500 text-white shadow-emerald-500/20 scale-105' 
              : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid of Stations */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <Loader2 className="animate-spin text-emerald-500 mb-6" size={56} />
          <p className="text-text-muted font-bold italic text-sm tracking-widest uppercase animate-pulse">Synchronizing Global Grid...</p>
        </div>
      ) : filteredStations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {filteredStations.map((station) => (
            <StationCard 
              key={station._id} 
              station={station} 
              onDelete={(e) => { e.stopPropagation(); handleDelete(station._id); }} 
              onClick={() => { setSelectedStation(station); setShowDetails(true); }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] glass-morphism rounded-[3rem] border-dashed border-2 border-white/10 mx-auto max-w-4xl shadow-2xl">
          <AlertCircle size={64} className="text-white/10 mb-6" />
          <p className="text-text-muted font-black italic text-lg text-center px-8 uppercase tracking-widest">No nodes detected in the "{activeFilter}" sector.</p>
        </div>
      )}

      {/* Deployment Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/60 animate-in fade-in duration-300">
           <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
              <DeployStationForm onSubmit={handleDeploy} onCancel={() => setShowForm(false)} />
           </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/70 animate-in fade-in duration-300">
           <MonitoringStationDetails 
              station={selectedStation} 
              onClose={() => setShowDetails(false)} 
           />
        </div>
      )}
    </div>
  );
};

const StationCard = ({ station, onDelete, onClick }) => {
  const isOnline = station.status === 'Active';
  const isOffice = ['Head Office', 'Regional Office'].includes(station.stationType);
  
  return (
    <div 
      onClick={onClick}
      className="group relative glass-morphism rounded-[2.5rem] p-8 border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-3 overflow-hidden shadow-2xl cursor-pointer"
    >
      <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full blur-[50px] opacity-10 transition-all group-hover:opacity-30 ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

      <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
        <div className={`p-4 rounded-2xl ${isOnline ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} shadow-inner`}>
          <Radio size={28} />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{station.status}</span>
        </div>
      </div>

      <h3 className="text-2xl font-black mb-1 group-hover:text-emerald-500 transition-colors uppercase italic tracking-tighter text-white">{station.stationName}</h3>
      <div className="flex items-center gap-2 text-text-muted text-[10px] font-black uppercase tracking-widest mb-8 italic">
        <MapPin size={12} className="text-emerald-500" />
        {station.regionalOffice}
      </div>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5 mb-8">
        <div className="space-y-1">
          <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">
            {isOffice ? 'Contact Details' : 'Telemetry Link'}
          </p>
          <p className="text-xs font-black text-white truncate italic">
            {isOffice ? 'Official Protocol' : (station.iotDeviceId || 'SEC-00XD')}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Protocol</p>
          <p className="text-xs font-black text-emerald-500 uppercase italic">
            {isOffice ? 'Official' : 'LORA-WAN'}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:bg-emerald-500 hover:text-white hover:border-transparent transition-all shadow-xl">
          {isOffice ? 'Regional Office Info' : 'Live Data'}
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(e); }}
          className="p-4 bg-white/5 border border-white/10 rounded-2xl text-rose-500/50 hover:bg-rose-500 hover:text-white hover:border-transparent transition-all shadow-xl"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default Stations;
