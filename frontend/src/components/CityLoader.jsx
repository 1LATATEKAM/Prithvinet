import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CityLoader = ({ onAnimationComplete }) => {

  const [inited, setInited] = useState(false);

  useEffect(() => {
    // Inject the bundled simulation script from root to help with asset path resolution
    const script = document.createElement('script');
    script.src = '/main.js';
    script.type = 'module';
    script.onload = () => {
      console.log('InfiniTown loaded');
      // Delay to allow Three.js initialization before hiding the splash
      setTimeout(() => setInited(true), 1500);
    };

    document.body.appendChild(script);

    // Trigger camera animation once sceneManager is available
    const checkInterval = setInterval(() => {
      if (window.sceneManager && window.sceneManager.cameraController) {
        clearInterval(checkInterval);
        
        // Start the cinematic transition after a short delay
        setTimeout(() => {
          const cc = window.sceneManager.cameraController;
          // Transition to lower, more cinematic height (matching 2nd image)
          if (cc.updateHeight) {
            cc.updateHeight(-80); // Lower from 120/140 to ~40-60
          }
          
          // Signal that animation is done after it settles (~2 seconds)
          setTimeout(() => {
            if (onAnimationComplete) onAnimationComplete();
          }, 2000);
          
          if (cc.controls) {

            // cc.controls is OrbitControls
            // The 2nd image shows a low pitch (looking towards horizon)
          }
        }, 1000);
      }
    }, 500);

    // Style override to ensure the canvas takes full screen and removes InfiniTown default status bars if they appear
    const styleElem = document.createElement('style');
    styleElem.innerHTML = `
      #app { width: 100vw; height: 100vh; overflow: hidden; background: black; }
      canvas { display: block; }
      .ui-overlay, .status-bar { display: none !important; } /* Hide internal simulation UI */
      div[style*="z-index: 100"], div[style*="zIndex: 100"] { display: none !important; }
      button { display: none !important; } /* Hide any buttons injected by simulation */
    `;
    document.head.appendChild(styleElem);


    return () => {
      clearInterval(checkInterval);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(styleElem)) {
        document.head.removeChild(styleElem);
      }
      const appElem = document.getElementById('app');
      if (appElem) appElem.innerHTML = '';
      delete window.sceneManager;
    };

  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black">
      {/* The simulation mounts to #app */}
      <div id="app" className="w-full h-full"></div>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
      
      {/* Minimal Initial Splash */}
      <AnimatePresence>
        {!inited && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center"
          >
            <div className="w-24 h-24 relative mb-8">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="w-full h-full border-t-2 border-primary rounded-full animate-spin"></div>
            </div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/40 text-xs font-black tracking-[1em] uppercase"
            >
              Loading Town
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CityLoader;
