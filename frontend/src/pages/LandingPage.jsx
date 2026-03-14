import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import CityLoader from '../components/CityLoader';
import PageBranding from '../components/PageBranding';

const LandingPage = () => {
  const [showHero, setShowHero] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative select-none">
      <PageBranding title="Environmental Intelligence" />
      
      {/* Pure 3D Experience (InfiniTownTS) */}
      <CityLoader onAnimationComplete={() => setShowHero(true)} />

      {/* Cinematic Hero Overlay */}
      <AnimatePresence>
        {showHero && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex flex-col bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.9)_100%)] backdrop-blur-[3px]"
          >

            {/* Top Navigation Bar */}
            <nav className="w-full px-12 py-8 flex items-center justify-between pointer-events-none sticky top-0">
              <div className="flex items-center gap-4 pointer-events-auto">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <Shield className="text-white" size={22} />
                </div>
                <span className="font-black text-lg tracking-tighter uppercase italic text-white/90">PrithviNet</span>
              </div>

              <div className="hidden lg:flex items-center gap-8 pointer-events-auto">
                {[
                  { label: 'Transparency', to: '/public-dashboard' },
                  { label: 'Global Map', to: '/map' },
                  { label: 'Industry Hub', to: '/register-industry' },
                  { label: 'AI Copilot', to: '/ai-copilot' },
                  { label: '3D Simulation', to: '/simulation' },
                  { label: 'Login', to: '/login' }
                ].map((item) => (
                  <Link 
                    key={item.label} 
                    to={item.to} 
                    className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link 
                  to="/login"
                  className="px-6 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all shadow-xl"
                >
                  Access
                </Link>
              </div>
            </nav>

            {/* Main Hero Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-pulse">
                    AI-Powered Environmental Intelligence
                  </span>
                </div>

                <h1 className="text-7xl md:text-9xl font-black tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 mb-6 italic">
                  PRITHVINET
                </h1>

                <p className="max-w-2xl text-white/50 text-base md:text-lg font-medium leading-relaxed tracking-wide mb-12">
                  Real-time monitoring, AI compliance assistance, and pollution<br />
                  forecasting for a sustainable environmental future.
                </p>

                <div className="flex flex-col md:flex-row items-center gap-6 pointer-events-auto">
                  <Link 
                    to="/dashboard"
                    className="group relative px-10 py-5 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_20px_60px_-15px_rgba(16,185,129,0.7)] hover:-translate-y-1.5 transition-all flex items-center gap-3"
                  >
                    Explore Dashboard
                    <div className="w-4 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </Link>
                  <Link 
                    to="/public"
                    className="px-10 py-5 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-3xl text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:-translate-y-1.5 transition-all"
                  >
                    Public Data View
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Bottom Credits */}
            <div className="w-full px-12 py-10 flex justify-between items-end pointer-events-none">
              <div className="flex flex-col gap-1 opacity-40">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">System Active | 2026 CECB</span>
                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white">Lat: 21.25° N | Lon: 81.63° E</span>
              </div>
              
              <div className="opacity-40 animate-pulse text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white italic">Live Feed Connected</span>
                <div className="text-[8px] text-white/60 uppercase tracking-widest mt-1">Status: Stable</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback Hidden Link for accessibility before animation ends */}
      {!showHero && (
        <Link 
          to="/login" 
          className="absolute inset-0 z-10 block cursor-pointer"
        >
          <span className="sr-only">Enter PrithviNet</span>
        </Link>
      )}
    </div>
  );
};

export default LandingPage;
