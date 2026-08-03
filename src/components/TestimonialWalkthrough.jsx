import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    quote: "UniteAll completely changed how our weekend football group organizes matches. It's a game-changer!",
    author: "Tanmay Butta",
    role: "Sports Enthusiast",
    trigger: 0.25, // Maps to 25% down the SVG
    xPos: 10,      // Maps to 10% on the X axis of SVG (Left side)
    align: "left", 
  },
  {
    id: 2,
    quote: "The AI description generator saves me so much time. Posting an event takes literally seconds now.",
    author: "Sabeeh Ahsan",
    role: "Event Organizer",
    trigger: 0.50, // Maps to 50% down the SVG
    xPos: 90,      // Maps to 90% on the X axis of SVG (Right side)
    align: "right",
  },
  {
    id: 3,
    quote: "Finally, an app that actually makes it easy to find local games. The UI is stunning.",
    author: "Abhinav Singh",
    role: "Community Leader",
    trigger: 0.75, // Maps to 75% down the SVG
    xPos: 10,      // Maps to 10% on the X axis of SVG (Left side)
    align: "left",
  }
];

const TestimonialWalkthrough = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-dark-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ opacity: sectionOpacity }} className="absolute inset-0 w-full h-full max-w-7xl mx-auto px-6">
          
          {/* Section Heading - Fixed overlap with top-32 */}
          <div className="absolute top-32 left-0 right-0 text-center z-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              What Our Users Say
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Real stories from communities building on UniteAll.
            </p>
          </div>

          {/* ── SVG Zigzag Track Container ── */}
          <div className={`absolute top-[38vh] bottom-[5vh] z-10 pointer-events-none ${isMobile ? 'left-4 w-[20px]' : 'left-1/2 -translate-x-1/2 w-[200px] md:w-[400px]'}`}>
            
            {/* The SVG Line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Dim background line */}
              <path
                d={isMobile ? "M 50 0 L 50 100" : "M 50 0 L 10 25 L 90 50 L 10 75 L 50 100"}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Animated fill line */}
              <motion.path
                d={isMobile ? "M 50 0 L 50 100" : "M 50 0 L 10 25 L 90 50 L 10 75 L 50 100"}
                fill="none"
                stroke="url(#zigzagGrad)"
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: scrollYProgress }}
              />
              <defs>
                <linearGradient id="zigzagGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Checkpoints & Cards positioned exactly on the SVG nodes */}
            {testimonials.map((testimonial) => (
              <CheckpointCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                scrollYProgress={scrollYProgress} 
                isMobile={isMobile}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

/* ── Individual Checkpoint & Card Component ── */
const CheckpointCard = ({ testimonial, scrollYProgress, isMobile }) => {
  const trigger = testimonial.trigger;
  const xPos = isMobile ? 50 : testimonial.xPos;
  const align = isMobile ? 'right' : testimonial.align;
  
  // Glowing checkpoint dot
  const circleScale = useTransform(
    scrollYProgress,
    [trigger - 0.05, trigger],
    [0.5, 1]
  );
  const circleBg = useTransform(
    scrollYProgress,
    [trigger - 0.05, trigger],
    ["rgba(255,255,255,0.1)", "rgba(59,130,246,1)"] 
  );
  const circleBorder = useTransform(
    scrollYProgress,
    [trigger - 0.05, trigger],
    ["rgba(255,255,255,0.2)", "rgba(59,130,246,0.5)"]
  );

  // FADE IN AND FADE OUT — This guarantees cards NEVER overlap!
  const cardOpacity = useTransform(
    scrollYProgress,
    [trigger - 0.05, trigger + 0.05, trigger + 0.15, trigger + 0.25],
    [0, 1, 1, 0]
  );
  
  // Slide effect
  const slideDirection = align === 'left' ? 40 : -40;
  const cardX = useTransform(
    scrollYProgress,
    [trigger - 0.05, trigger + 0.05],
    [slideDirection, 0]
  );

  return (
    <div 
      className="absolute flex pointer-events-none"
      style={{ 
        top: `${trigger * 100}%`, 
        left: `${xPos}%`,
        transform: 'translate(-50%, -50%)' // Center the dot on the exact coordinate
      }}
    >
      {/* The glowing checkpoint dot */}
      <motion.div 
        className="relative w-6 h-6 rounded-full border-4 z-20 shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-dark-950"
        style={{ 
          scale: circleScale,
          backgroundColor: circleBg,
          borderColor: circleBorder
        }}
      />

      {/* The Card - Positioned relative to the dot */}
      <motion.div 
        className={`absolute top-1/2 -translate-y-1/2 w-[82vw] md:w-[35vw] max-w-[450px] pointer-events-auto ${align === 'left' ? 'right-full mr-4 md:mr-8' : 'left-full ml-4 md:ml-8'}`}
        style={{ 
          opacity: cardOpacity, 
          x: cardX,
        }}
      >
        <div className="bg-dark-card/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 relative shadow-2xl">
          <div className="absolute top-4 right-6 text-white/5 text-6xl font-serif">&ldquo;</div>
          <div className="flex text-yellow-500 mb-4 text-sm gap-1">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p className="text-gray-200 text-base md:text-lg mb-6 leading-relaxed italic relative z-10">&ldquo;{testimonial.quote}&rdquo;</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-white">{testimonial.author}</h4>
              <span className="text-xs text-primary-500 font-bold uppercase tracking-widest">{testimonial.role}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialWalkthrough;
