import React, { useState, useEffect, useRef } from 'react';
import SceneManager from '../utils/SceneManager';
import client from '../api/client';
import { 
  Box, 
  Wind, 
  Car, 
  Activity,
  Play,
  RefreshCw,
  RotateCcw, // Added based on usage
  Factory // Added based on usage
} from 'lucide-react';

const ThreeDSimulation = () => {
  const canvasRef = useRef(null);
  const sceneManagerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    pollution: 45,
    factories: 8,
    traffic: 60,
    wind: 12
  });

  const fetchRealData = async () => {
    try {
      const [logsRes, indRes] = await Promise.all([
        client.get('/public/pollution-data'),
        client.get('/public/industry-status')
      ]);
      
      const { air } = logsRes.data;
      const { stats } = indRes.data;
      
      if (air.length > 0) {
        // Average PM2.5 for pollution parameter
        const avgAir = air.reduce((acc, r) => acc + (r.value?.get('PM2.5') || 45), 0) / air.length;
        
        setParams(prev => ({
          ...prev,
          pollution: Math.min(Math.round(avgAir), 100),
          factories: stats.activeIndustries || 8
        }));
      }
    } catch (error) {
      console.error("Failed to fetch simulation data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealData();
    if (canvasRef.current && !sceneManagerRef.current) {
        sceneManagerRef.current = new SceneManager(canvasRef.current);
    }
  }, []);

  useEffect(() => {
      sceneManagerRef.current?.updatePollution(params.pollution);
  }, [params.pollution]);

  useEffect(() => {
      sceneManagerRef.current?.generateCity(params.factories);
  }, [params.factories]);

  useEffect(() => {
      sceneManagerRef.current?.updateTraffic(params.traffic);
  }, [params.traffic]);

  useEffect(() => {
      sceneManagerRef.current?.updateWind(params.wind);
  }, [params.wind]);

  const handleChange = (name, val) => {
    setParams({ ...params, [name]: parseInt(val) });
  };

  return (
    <div className="flex flex-col h-auto lg:h-[calc(100vh-160px)] space-y-4 md:space-y-6 animate-fade-in pb-10">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/10 gap-6 sm:gap-0">

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
            <Box className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">3D Dispersion Simulation</h1>
            <p className="text-[10px] text-text-muted flex items-center gap-1 font-bold italic uppercase tracking-[0.2em] mt-1">
              <Activity size={12} className="text-emerald-500" /> High-Fidelity Physics Engine
            </p>
          </div>

        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <button 
            onClick={fetchRealData}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
           >
            {loading ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />} 
            <span className="text-sm font-black uppercase tracking-widest">{loading ? 'Syncing...' : 'Sync Live'}</span>
          </button>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-text-muted">
            <RotateCcw size={20} />
          </button>

        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 min-h-0 overflow-visible lg:overflow-hidden">
        {/* Main Simulation View */}
        <div className="lg:col-span-3 h-[400px] md:h-[500px] lg:h-full bg-slate-900 rounded-[2.5rem] relative overflow-hidden ring-1 ring-white/5 shadow-2xl shadow-black/40">
          <canvas ref={canvasRef} className="w-full h-full block" />

          
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2">
             <SimulationMetric label="Particles" value={`${params.pollution * 10}k`} />
             <SimulationMetric label="Wind" value={`${params.wind}m/s`} />
             <SimulationMetric label="Resolution" value="256px" />
          </div>

          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[9px] text-white/80 pointer-events-none hidden xs:block font-medium">
             Orbit/Zoom Enabled • Touch & Swipe Supported
          </div>
        </div>

        {/* Controls Panel */}
        <div className="glass-morphism rounded-[2.5rem] p-6 md:p-8 space-y-6 md:space-y-8 flex flex-col border border-white/5">
          <h3 className="text-lg font-black flex items-center gap-2 italic text-white uppercase tracking-tight">
            <Activity size={18} className="text-emerald-400" /> Parameters
          </h3>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
            <ControlSlider 
              icon={Wind} 
              label="Inversion Strength" 
              name="pollution" 
              value={params.pollution} 
              onChange={handleChange} 
              color="text-amber-500"
            />
            <ControlSlider 
              icon={Factory} 
              label="Industrial Output" 
              name="factories" 
              value={params.factories} 
              max={50}
              onChange={handleChange} 
              color="text-rose-500"
            />
            <ControlSlider 
              icon={Car} 
              label="Vehicle Density" 
              name="traffic" 
              value={params.traffic} 
              onChange={handleChange} 
              color="text-secondary"
            />

            <ControlSlider 
              icon={RotateCcw} 
              label="Wind Speed" 
              name="wind" 
              value={params.wind} 
              max={40}
              onChange={handleChange} 
              color="text-emerald-500"
            />
          </div>

          <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
             <div className="bg-white/5 p-4 rounded-2xl space-y-2">
                <p className="text-[10px] font-black uppercase text-text-muted">Environmental Risk</p>
                <div className="flex justify-between items-end">
                   <p className="text-2xl font-black">{((params.pollution * 0.6 + params.traffic * 0.4) / 10).toFixed(1)}</p>
                   <span className={`text-[10px] font-bold mb-1 ${params.pollution > 70 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {params.pollution > 70 ? 'CRITICAL' : 'STABLE'}
                   </span>
                </div>
             </div>
             <button 
                onClick={() => setParams({ pollution: 45, factories: 8, traffic: 60, wind: 12 })}
                className="w-full py-4 glass-morphism border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500 hover:text-white transition-all"
             >
                Reset Physics
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimulationMetric = ({ label, value }) => (
  <div className="px-4 py-2 glass-morphism-heavy rounded-xl border border-white/10 text-[10px] font-bold">
    <span className="text-text-muted mr-2 uppercase tracking-tight">{label}:</span>
    <span className="text-white">{value}</span>
  </div>
);

const ControlSlider = ({ icon: Icon, label, name, value, max=100, onChange, color }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Icon size={14} className={color} />
        <span className="text-xs font-bold text-text-muted">{label}</span>
      </div>
      <span className="text-xs font-black">{value}</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max={max} 
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-white/5 shadow-inner"
    />

  </div>
);

export default ThreeDSimulation;
