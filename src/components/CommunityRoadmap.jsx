import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaGraduationCap, FaRunning, FaBriefcase,
  FaHome, FaLaptopCode, FaGlobeAmericas, FaHandHoldingHeart,
} from "react-icons/fa";

/* ── Community data ── */
const communities = [
  {
    icon: <FaGraduationCap />,
    title: "Campus Hubs",
    headline: "Automate Campus Chaos",
    desc: "No more messy Google Forms. Clubs and student bodies use UniteAll to manage events, track attendance, and build a vibrant campus culture instantly.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: <FaRunning />,
    title: "Sports Leagues",
    headline: "Fill Every Slot. Fast.",
    desc: "Sunday league? Marathon group? Find players nearby and ensure no game is ever cancelled due to lack of numbers.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: <FaBriefcase />,
    title: "Corporate Culture",
    headline: "Beyond the Email Chain",
    desc: "Transform boring office events into engaging experiences. From team offsites to Friday fun, connection made seamless.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: <FaHome />,
    title: "Neighborhoods",
    headline: "Your Digital Square",
    desc: "Plan festivals, potlucks, and society meetings on a platform built for community management.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: <FaLaptopCode />,
    title: "Tech Ecosystems",
    headline: "Code. Connect. Create.",
    desc: "The professional infrastructure for hackathons, bootcamps, and meetups. Networking like a pro.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: <FaGlobeAmericas />,
    title: "City Explorers",
    headline: "Find Your Tribe",
    desc: "New in town? Find your badminton buddy, chess group, or hiking squad from day one.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Social Impact",
    headline: "Power Your Cause",
    desc: "Organize charity drives and volunteer programs with tools that amplify your reach and impact.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop",
  },
];

/* ── Animation constants ── */
const TOTAL = communities.length;
const CARD_SEGMENT = 0.10;
const STACK_SCALE = 0.42;
const GRID_SCALE = 0.48;
const REARRANGE_START = 0.82;
const REARRANGE_END = 0.95;

/* ── Stack positions: using vw/vh so they stay on screen safely ── */
const stackPositions = [
  { x: "-36vw", y: "-10vh" },
  { x: "-36vw", y: "15vh" },
  { x: "-36vw", y: "40vh" },
  { x: "36vw",  y: "-10vh" },
  { x: "36vw",  y: "15vh" },
  { x: "36vw",  y: "40vh" },
  { x: "0vw",   y: "0vh" },
];

/* ── Final grid positions: tightly packed using vw/vh, shifted down to clear heading ── */
const gridPositions = [
  { x: "-32vw", y: "-10vh" },
  { x: "0vw",   y: "-10vh" },
  { x: "32vw",  y: "-10vh" },
  { x: "-32vw", y: "15vh" },
  { x: "0vw",   y: "15vh" },
  { x: "32vw",  y: "15vh" },
  { x: "-32vw", y: "40vh" },
];

/* ── Mobile Layouts (2 cards per row instead of 3) ── */
const mobileStackPositions = [
  { x: "-26vw", y: "-18vh" },
  { x: "-26vw", y: "5vh" },
  { x: "-26vw", y: "28vh" },
  { x: "26vw",  y: "-18vh" },
  { x: "26vw",  y: "5vh" },
  { x: "26vw",  y: "28vh" },
  { x: "0vw",   y: "0vh" },
];

const mobileGridPositions = [
  { x: "-24vw", y: "-18vh" },
  { x: "24vw",  y: "-18vh" },
  { x: "-24vw", y: "5vh" },
  { x: "24vw",  y: "5vh" },
  { x: "-24vw", y: "28vh" },
  { x: "24vw",  y: "28vh" },
  { x: "0vw",   y: "51vh" },
];

/* ── Single card with 3-phase animation: appear → stack → grid ── */
const StackCard = ({ community, progress, index, isMobile }) => {
  const isLastCard = index === 6;

  /* Timing */
  const start = isLastCard ? 0.68 : 0.06 + index * CARD_SEGMENT;
  const fadeInEnd = isLastCard ? 0.72 : start + CARD_SEGMENT * 0.25;
  const stayEnd = isLastCard ? 0.76 : start + CARD_SEGMENT * 0.55;
  const shrinkEnd = isLastCard ? 0.82 : start + CARD_SEGMENT;

  /* Stack vs center for last card */
  const sScale = isLastCard ? 1 : STACK_SCALE;
  const sX = isLastCard ? "0%" : (isMobile ? mobileStackPositions[index].x : stackPositions[index].x);
  const sY = isLastCard ? "0%" : (isMobile ? mobileStackPositions[index].y : stackPositions[index].y);
  const gX = isMobile ? mobileGridPositions[index].x : gridPositions[index].x;
  const gY = isMobile ? mobileGridPositions[index].y : gridPositions[index].y;

  /* Fade in — stays visible forever */
  const opacity = useTransform(progress, [start, fadeInEnd], [0, 1]);

  /* Scale: enter → full → hold → stack → hold → grid */
  const scale = useTransform(
    progress,
    [start, fadeInEnd, stayEnd, shrinkEnd, REARRANGE_START, REARRANGE_END],
    [0.85, 1, 1, sScale, sScale, GRID_SCALE]
  );

  /* X: center → stack → grid */
  const x = useTransform(
    progress,
    [stayEnd, shrinkEnd, REARRANGE_START, REARRANGE_END],
    ["0%", sX, sX, gX]
  );

  /* Y: center → stack → grid */
  const y = useTransform(
    progress,
    [stayEnd, shrinkEnd, REARRANGE_START, REARRANGE_END],
    ["0%", sY, sY, gY]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        x,
        y,
        zIndex: index + 1,
        willChange: "transform, opacity",
      }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      {/* Added bg-dark-950 to prevent transparency of overlapping cards */}
      <div className="relative w-[92vw] md:w-[60vw] max-w-[1000px] h-[45vh] md:h-[50vh] bg-dark-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Background image — brighter and clear */}
        <img
          src={community.image}
          alt={community.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          loading="lazy"
        />
        {/* Light gradient for text contrast at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

        {/* Content */}
        <div className="relative h-full p-8 md:p-12 flex flex-col justify-end z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-white mb-4 w-fit">
            {community.icon} {community.title}
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 leading-tight">
            {community.headline}
          </h3>
          <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
            {community.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────── */

const CommunityRoadmap = () => {
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
    offset: ["start start", "end end"],
  });

  /* Heading: visible immediately, hides during cards, reappears at grid */
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.06, REARRANGE_START, REARRANGE_START + 0.03],
    [1, 1, 0, 0, 1]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.03],
    [10, 0]
  );

  return (
    <section ref={containerRef} className="relative h-[900vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Heading ── */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="absolute top-0 left-0 right-0 text-center pt-16 z-30"
        >
          <span className="text-primary-500 font-bold tracking-widest uppercase mb-2 block text-xs">
            Built for every community
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">
            One Platform.{" "}
            <span className="gradient-text">Infinite Communities.</span>
          </h2>
        </motion.div>

        {/* ── Stacking Cards ── */}
        <div key={isMobile ? 'mobile' : 'desktop'}>
          {communities.slice(0, isMobile ? 6 : communities.length).map((community, i) => (
            <StackCard
              key={i}
              community={community}
              progress={scrollYProgress}
              index={i}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityRoadmap;
