import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import worldMap from "../assets/world_map_clean.png";

const FadeInCard = ({ progress, start, end, child }) => {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [50, 0]);

  return (
    <motion.div style={{ opacity, y }} className="h-full">
      {child}
    </motion.div>
  );
};

const MapZoomHero = ({ children }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ZOOM ANIMATION: Scale up from 1 to 4x for a cinematic 'push-in'.
  // This avoids the destructive pixelation of a 20x macro zoom while still giving the feeling of flying into India.
  const mapScale = useTransform(scrollYProgress, [0, 0.4], [1, 4]);
  
  // MARKER FADE OUT: Fades out as we push in
  const markerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // DARKEN OVERLAY: Fades in as zoom completes
  const overlayOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 0.85]);

  // TEXT REVEAL: Fades in and slides up
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.35, 0.45], [40, 0]);

  // Adjust these coordinates to precisely hit Delhi based on the new image
  const zoomX = "71%";
  const zoomY = "42%";

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* WORLD MAP IMAGE - Hardware Accelerated for 60fps */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ 
            scale: mapScale,
            transformOrigin: `${zoomX} ${zoomY}`,
            willChange: "transform"
          }}
        >
          {/* Pristine clean map image (no built-in markers to get pixelated) */}
          <img 
            src={worldMap} 
            alt="World Map" 
            className="w-full h-full object-cover opacity-80"
          />

          {/* HTML-based Glowing Marker at Delhi */}
          {/* This sits perfectly on top of the image and fades out as we zoom in */}
          <motion.div 
            className="absolute z-10"
            style={{ 
              left: zoomX, 
              top: zoomY, 
              opacity: markerOpacity,
              transform: "translate(-50%, -50%)" 
            }}
          >
            <div className="relative flex items-center justify-center">
               <div className="absolute w-12 h-12 bg-primary-500 rounded-full opacity-30 animate-ping" />
               <div className="w-3 h-3 bg-primary-500 rounded-full shadow-[0_0_20px_rgba(14,165,233,1)] border border-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* GLOWING ORB BEHIND TEXT */}
        <motion.div 
          className="absolute bg-primary-500 rounded-full blur-[100px] pointer-events-none"
          style={{ 
            width: "50vw", 
            height: "50vw",
            left: "50%", 
            top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: useTransform(scrollYProgress, [0.25, 0.35], [0, 0.15])
          }}
        />

        {/* DARKENING & BLURRING OVERLAY - Covers up the pixelation smoothly! */}
        <motion.div 
          className="absolute inset-0 bg-[#070b14]/80 backdrop-blur-2xl pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        {/* FOREGROUND CONTENT */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center pointer-events-none">
          
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="text-center mb-16 pointer-events-auto"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
              Why Choose UniteAll?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-xl">
              We&apos;ve redesigned the event experience from the ground up to be smarter, simpler, and more social.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl pointer-events-auto">
            {React.Children.map(children, (child, index) => {
              const start = 0.45 + index * 0.1;
              const end = start + 0.1;
              return (
                <FadeInCard 
                  key={index} 
                  progress={scrollYProgress} 
                  start={start} 
                  end={end} 
                  child={child} 
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MapZoomHero;
