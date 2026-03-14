import React from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Radio, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

const MonitoringStationDetails = ({ station, onClose }) => {
  if (!station) return null;

  const isOffice = ['Head Office', 'Regional Office'].includes(station.stationType);

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300 max-w-2xl w-full">
      <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center border-b border-white/5">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
        >
          <X size={20} />
        </button>
        <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
          <Radio className="text-white" size={48} />
        </div>
      </div>

      <div className="p-10 space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
              ${station.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
              {station.status}
            </span>
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted">
              {station.stationType}
            </span>
          </div>
          <h2 className="text-4xl font-black text-white italic tracking-tight uppercase leading-none">{station.stationName}</h2>
          <p className="text-text-muted text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 mt-2">
            <MapPin size={14} className="text-emerald-500" /> {station.regionalOffice} Jurisdiction
          </p>
        </div>

        {isOffice ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {station.address && (
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                  <MapPin size={16} /> Location Details
                </div>
                <p className="text-sm font-bold text-white/80 leading-relaxed italic">{station.address}</p>
              </div>
            )}
            
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
               <div className="flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-widest">
                  <Phone size={16} /> Contact Support
               </div>
               <div className="space-y-3">
                  {station.phone && (
                    <div className="flex items-center gap-3 text-sm font-bold text-white/80 italic">
                      <Phone size={14} className="text-white/20" /> {station.phone}
                    </div>
                  )}
                  {station.email && (
                    <div className="flex items-center gap-3 text-sm font-bold text-white/80 italic">
                      <Mail size={14} className="text-white/20" /> {station.email}
                    </div>
                  )}
                  {station.website && (
                    <div className="flex items-center gap-3 text-sm font-bold text-white/80 italic">
                      <Globe size={14} className="text-white/20" /> {station.website}
                    </div>
                  )}
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center gap-3">
                <Clock className="text-emerald-500" size={24} />
                <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Active Since</p>
                <p className="font-black text-white italic">{new Date(station.installationDate).toLocaleDateString()}</p>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center gap-3">
                <Radio className="text-blue-500" size={24} />
                <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Sensor Path</p>
                <p className="font-black text-white italic">{station.sensorType || 'LORA-Grid'}</p>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center gap-3">
                <ExternalLink className="text-purple-500" size={24} />
                <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Node ID</p>
                <p className="font-black text-white italic uppercase">{station.iotDeviceId}</p>
             </div>
          </div>
        )}
        {isOffice && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 space-y-4">
             <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                <CheckCircle2 size={16} /> Monitor Access Node
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Login Identifier</p>
                 <p className="text-xs font-black text-white italic truncate">{station.email || `${station.iotDeviceId.toLowerCase()}@cecb.gov.in`}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Secure Passcode</p>
                 <p className="text-xs font-black text-emerald-500 italic">CECB@{station.iotDeviceId.split('-').pop()}</p>
               </div>
             </div>
          </div>
        )}

        <div className="flex gap-4">
          {!isOffice && (
            <button 
              className="flex-1 py-5 bg-emerald-500 text-white rounded-2xl font-black shadow-2xl shadow-emerald-500/30 hover:scale-[1.02] transition-all uppercase italic tracking-widest"
            >
              Launch Diagnostic
            </button>
          )}
          <button 
             onClick={onClose}
             className="px-10 py-5 bg-white/5 border border-white/10 text-white/50 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white/10 transition-all"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringStationDetails;
