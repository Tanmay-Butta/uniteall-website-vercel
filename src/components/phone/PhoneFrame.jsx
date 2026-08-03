import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhoneFrame = ({ activeScreen = 'events', screenComponent = null }) => {
  return (
    <div className="relative">
      {/* Glow halo — stable, pulses subtly */}
      <div className="absolute inset-0 scale-110">
        <div className="absolute inset-0 bg-primary-500/25 blur-[80px] rounded-full" />
        <div className="absolute inset-0 bg-secondary-500/15 blur-[100px] rounded-full translate-x-8" />
      </div>

      {/* Phone shell — never moves */}
      <div className="relative w-[260px] sm:w-[280px] md:w-[300px] mx-auto">
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
        <div className="absolute -right-[3px] top-28 w-[3px] h-16 bg-gray-700 rounded-r-sm" />

        <div className="relative bg-gray-950 rounded-[2.75rem] p-[10px] shadow-2xl shadow-primary-500/20 border border-gray-800/80">
          {/* Dynamic island */}
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-full z-20" />

          {/* Screen bezel */}
          <div className="relative bg-black rounded-[2.2rem] overflow-hidden aspect-[9/19.5]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, scale: 0.97, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {screenComponent}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
