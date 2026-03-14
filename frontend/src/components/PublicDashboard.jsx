import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Wind, 
  Droplets, 
  Volume2, 
  ChevronRight,
  TrendingUp,
  MapPin,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import MonitoringMap from '../components/MonitoringMap';
import axios from 'axios';

const PublicDashboard = () => {
  const [readings, setReadings] = useState([]);
  
  useEffect(() => {
    const fetchReadings = async () => {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';
      try {
        const response = await axios.get(`${API_BASE}/pollution`);
        setReadings(response.data.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch public readings", error);
      }
    };
    fetchReadings();
  }, []);

  return (
    <section id="dashboard" className="py-24 px-8 max-w-7xl mx-auto space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Stats & Alerts */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 italic">Live Snapshots</h2>
            <p className="text-text-muted">Real-time environmental data for Raipur.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AQICard type="Air" value="142" status="Moderate" icon={Wind} color="text-amber-500" />
            <AQICard type="Water" value="6.8" status="Optimal" icon={Droplets} color="text-primary" />
            <AQICard type="Noise" value="72" status="Elevated" icon={Volume2} color="text-rose-500" />
          </div>

          <div className="glass-morphism rounded-3xl p-6 border border-white/5">
            <h3 className="font-bold mb-6 flex items-center justify-between uppercase text-xs tracking-widest">
              Emergency Alerts
              <span className="bg-rose-500/20 text-rose-500 text-[8px] px-2 py-0.5 rounded-full">Active</span>
            </h3>
            <div className="space-y-4">
              <AlertItem title="Industrial Over-emission" loc="Urla Area" time="5m ago" />
              <AlertItem title="Water Quality Warning" loc="Kharun River" time="22m ago" />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Map */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">Geo-Environmental Awareness</h2>
              <p className="text-text-muted">Explore active monitoring telemetry across Chhattisgarh.</p>
            </div>
          </div>
          <div className="h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
             <MonitoringMap />
          </div>
        </div>
      </div>

      {/* Trend Analysis Section */}
      <div className="glass-morphism rounded-[3rem] p-10 border border-white/5">
         <div className="flex items-center justify-between mb-10">
            <div>
               <h3 className="text-2xl font-bold flex items-center gap-3">
                  <BarChart3 className="text-primary" /> 7-Day Pollution Trends
               </h3>
               <p className="text-text-muted text-sm mt-1">Holistic view of state environmental health progression.</p>
            </div>
            <button className="px-6 py-3 bg-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all border border-white/5 uppercase tracking-widest">
               Download CSV
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <TrendCard label="Raipur AQI" value="142" trend="down" />
            <TrendCard label="Bhilai AQI" value="118" trend="up" />
            <TrendCard label="Durg AQI" value="85" trend="down" />
            <TrendCard label="Bilaspur AQI" value="110" trend="up" />
         </div>

         <div className="mt-12 h-40 bg-white/5 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center relative group overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-between px-10 pb-4 opacity-10 transition-opacity group-hover:opacity-30">
               {[40, 70, 45, 90, 65, 80, 50, 40, 60].map((h, i) => (
                  <div key={i} className="w-8 bg-primary rounded-t-lg" style={{ height: `${h}%` }}></div>
               ))}
            </div>
            <div className="z-10 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
              <p className="text-[10px] font-bold text-primary italic uppercase tracking-[0.2em]">Predictive Modeling Active: Stable Trend Forecasted</p>
            </div>
         </div>

      </div>
    </section>
  );
};

const AQICard = ({ type, value, status, icon: Icon, color }) => (
  <div className="glass-morphism p-5 rounded-2xl flex items-center justify-between hover:border-primary/20 transition-all group border border-white/5">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110`}>
        <Icon className={color} size={24} />
      </div>
      <div>
        <p className="text-[10px] text-text-muted font-black uppercase mb-1 tracking-widest">{type} Status</p>
        <p className="text-xl font-black">{value}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-[10px] font-black uppercase tracking-tighter ${color}`}>{status}</p>
      <TrendingUp size={14} className="text-text-muted mt-1 ml-auto" />
    </div>
  </div>
);

const AlertItem = ({ title, loc, time }) => (
  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group cursor-pointer border border-transparent hover:border-rose-500/20">
    <div className="mt-1">
      <AlertTriangle className="text-rose-500" size={16} />
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold group-hover:text-primary transition-colors">{title}</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-[10px] text-text-muted uppercase font-bold">{loc}</p>
        <p className="text-[10px] text-text-muted italic">{time}</p>
      </div>
    </div>
  </div>
);

const TrendCard = ({ label, value, trend }) => (
  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
     <p className="text-[10px] font-bold text-text-muted uppercase mb-2 tracking-widest">{label}</p>
     <div className="flex items-end justify-between">
        <p className="text-2xl font-black">{value}</p>
        {trend === 'down' ? <TrendingDown className="text-emerald-500" size={20} /> : <TrendingUp className="text-rose-500" size={20} />}
     </div>
  </div>
);

export default PublicDashboard;
