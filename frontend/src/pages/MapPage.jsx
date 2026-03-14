import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map3D from '../components/Map3D';
import MapErrorBoundary from '../components/MapErrorBoundary';
import { Activity, Wind, Droplets, Volume2, Factory, Search, X } from 'lucide-react';

const MapPage = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [stations, setStations] = useState({ air: [], water: [], noise: [] });
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

  const handleLocationClick = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/map/details?lat=${lat}&lon=${lon}`);
      setSelectedData({
        lat,
        lon,
        ...response.data
      });
      setSidebarOpen(true);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch Industries
        const indRes = await axios.get(`${API_BASE}/map/industries`);
        setIndustries(indRes.data.map(i => ({
          name: i.industryName,
          type: i.industryType,
          location: i.location,
          emission_factor: i.emissionFactor
        })));

        // Fetch all Stations for Heatmap and Markers
        const envRes = await axios.get(`${API_BASE}/map/environmental-data`);
        setStations(envRes.data);
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };
    fetchInitialData();
  }, [API_BASE]);

  return (
    <div className="relative w-screen h-screen bg-slate-950 text-white overflow-hidden font-['Space_Grotesk']">
      {/* Map Layer */}
      <div className="absolute inset-0">
        <MapErrorBoundary>
          <Map3D 
            onLocationClick={handleLocationClick} 
            industries={industries}
            stations={stations}
          />
        </MapErrorBoundary>
      </div>

      {/* Header Overlay */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            PrithviNet Environmental Intelligence
          </h1>
          <p className="text-slate-400 text-sm">State Monitoring System - Chhattisgarh</p>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="absolute top-0 right-0 w-[400px] h-full bg-slate-900/40 backdrop-blur-xl border-l border-white/10 p-8 shadow-2xl transition-all duration-500 overflow-y-auto z-20">
          <button 
            onClick={() => setSidebarOpen(false)}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold mb-8 flex items-center gap-2">
            <Activity className="text-emerald-400" /> Location Metrics
          </h2>

          {!selectedData ? (
            <div className="flex flex-col items-center justify-center h-[60%] text-center space-y-4">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center animate-pulse">
                <Search className="text-slate-500" />
              </div>
              <p className="text-slate-400 font-medium">Click anywhere on the map to<br/>analyze environmental data</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* AQI Section */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium tracking-wide text-sm uppercase">
                    <Wind size={18} /> Air Quality
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedData.metrics.air?.aqi < 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {selectedData.metrics.air?.status || 'No Station'}
                  </span>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {selectedData.metrics.air?.aqi || '--'}
                  <span className="text-sm text-slate-500 font-normal ml-2 tracking-normal uppercase">AQI Index</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">PM2.5</div>
                    <div className="font-semibold">{selectedData.metrics.air?.pm25 || '--'} µg/m³</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">PM10</div>
                    <div className="font-semibold">{selectedData.metrics.air?.pm10 || '--'} µg/m³</div>
                  </div>
                </div>
              </div>

              {/* Water Section */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-cyan-400 font-medium mb-4 tracking-wide text-sm uppercase">
                  <Droplets size={18} /> Water Quality
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold">{selectedData.metrics.water?.ph_level || '--'}</div>
                    <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">pH Level</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{selectedData.metrics.water?.contamination_index || '--'}%</div>
                    <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Contamination</div>
                  </div>
                </div>
              </div>

              {/* Nearby Industries */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-rose-400 font-medium mb-6 tracking-wide text-sm uppercase">
                  <Factory size={18} /> Nearby Industries (10km)
                </div>
                <div className="space-y-4">
                  {selectedData.nearbyIndustries.length > 0 ? (
                    selectedData.nearbyIndustries.map((ind, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-white/5">
                        <div>
                          <div className="font-medium text-sm">{ind.name}</div>
                          <div className="text-xs text-slate-500">{ind.type}</div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          ind.emission_factor > 0.7 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-emerald-500'
                        }`} />
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-slate-500 italic text-center py-4">No major industries detected</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toggle Sidebar Button */}
      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="absolute top-6 right-6 z-10 p-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl hover:bg-slate-800 transition-all shadow-xl"
        >
          <Activity size={24} className="text-emerald-400" />
        </button>
      )}

      {/* Legend / Stats Footer */}
      <div className="absolute bottom-10 left-6 flex gap-3 z-10 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full" />
          <span className="text-xs font-medium uppercase tracking-wider">Safe</span>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="text-xs font-medium uppercase tracking-wider">Moderate</span>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl flex items-center gap-2">
          <div className="w-3 h-3 bg-rose-500 rounded-full" />
          <span className="text-xs font-medium uppercase tracking-wider">High Risk</span>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
