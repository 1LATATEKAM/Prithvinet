import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-xs font-black text-primary uppercase tracking-[0.3em] mb-12 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        >
          <Activity size={14} className="animate-pulse" />
          Live Decentralized Environment Node
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none mb-10 drop-shadow-2xl text-white"
        >
          PRITHVI<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 drop-shadow-[0_0_35px_rgba(16,185,129,0.6)]">NET</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-16 leading-relaxed font-bold drop-shadow-lg"
        >
          Your window into the state's environmental pulse. Real-time monitoring, AI analytics, and total transparency.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <Link to="/login" className="group w-full sm:w-auto px-14 py-7 bg-primary text-white rounded-[2rem] text-xl font-black shadow-[0_30px_70px_-15px_rgba(16,185,129,0.6)] hover:-translate-y-2 transition-all flex items-center justify-center gap-4 active:scale-95">
            ACCESS TERMINAL 
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link to="/login" className="w-full sm:w-auto px-14 py-7 bg-white/10 backdrop-blur-xl rounded-[2rem] text-xl font-black border border-white/10 hover:bg-white/20 transition-all active:scale-95 shadow-2xl">
            PUBLIC DATA
          </Link>
        </motion.div>
      </div>

      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full pointer-events-none"></div>
    </section>
  );
};


export default HeroSection;
