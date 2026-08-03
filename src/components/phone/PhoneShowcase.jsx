import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import {
  EventsScreen,
  CreateEventScreen,
  ChatsScreen,
  NotificationsScreen,
  ProfileScreen,
} from './AppScreens';
import {
  FaSearch, FaCalendarPlus, FaComments, FaBell, FaUserCircle,
  FaMapMarkerAlt, FaMagic, FaPaperPlane, FaBellSlash,
} from 'react-icons/fa';
import {
  HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineChat,
  HiOutlineBell, HiOutlineUserCircle, HiOutlineGlobe,
} from 'react-icons/hi';

/* ─── Stage definitions ─── */
const STAGES = [
  {
    key: 'events',
    screen: EventsScreen,
    badge: '01 — Discover',
    badgeIcon: <FaSearch size={10} />,
    title: 'Discover What\'s\nHappening Around You',
    subtitle: 'Find local events, sports matches, and community meetups — all in one beautiful feed. From weekend cricket to yoga sessions, your next adventure is a tap away.',
    glowColor: 'bg-blue-500/10',
    tagBg: 'bg-blue-500/10',
    tagBorder: 'border-blue-500/20',
    tagText: 'text-blue-400',
    line: 'bg-blue-500/40',
    features: ['Location-aware feed', 'Spotlight events', 'Smart search'],
  },
  {
    key: 'create',
    screen: CreateEventScreen,
    badge: '02 — Create',
    badgeIcon: <FaCalendarPlus size={10} />,
    title: 'Create Events\nin Seconds',
    subtitle: 'Set up an event in under 30 seconds. Add a title, pick a time, drop a pin — and let our AI write the perfect description for you. It\'s that simple.',
    glowColor: 'bg-violet-500/10',
    tagBg: 'bg-violet-500/10',
    tagBorder: 'border-violet-500/20',
    tagText: 'text-violet-400',
    line: 'bg-violet-500/40',
    features: ['AI descriptions', 'One-tap location', 'Photo upload'],
  },
  {
    key: 'chats',
    screen: ChatsScreen,
    badge: '03 — Connect',
    badgeIcon: <FaComments size={10} />,
    title: 'Stay Connected\nWith Your Squad',
    subtitle: 'Built-in group messaging for every event. Coordinate plans, share updates, and keep the conversation going — no more juggling between apps.',
    glowColor: 'bg-emerald-500/10',
    tagBg: 'bg-emerald-500/10',
    tagBorder: 'border-emerald-500/20',
    tagText: 'text-emerald-400',
    line: 'bg-emerald-500/40',
    features: ['Group chats', 'Event threads', 'Real-time sync'],
  },
  {
    key: 'notifications',
    screen: NotificationsScreen,
    badge: '04 — Alerts',
    badgeIcon: <FaBell size={10} />,
    title: 'Never Miss\nA Moment',
    subtitle: 'Stay in the loop with smart notifications. Get alerted when friends post events, when you\'re invited, or when something exciting happens nearby.',
    glowColor: 'bg-orange-500/10',
    tagBg: 'bg-orange-500/10',
    tagBorder: 'border-orange-500/20',
    tagText: 'text-orange-400',
    line: 'bg-orange-500/40',
    features: ['Smart alerts', 'Event reminders', 'Activity feed'],
  },
  {
    key: 'profile',
    screen: ProfileScreen,
    badge: '05 — Identity',
    badgeIcon: <FaUserCircle size={10} />,
    title: 'Build Your\nSports Identity',
    subtitle: 'Showcase your interests, connect with followers, and let the community know what you\'re about. Your profile is your passport to every game.',
    glowColor: 'bg-rose-500/10',
    tagBg: 'bg-rose-500/10',
    tagBorder: 'border-rose-500/20',
    tagText: 'text-rose-400',
    line: 'bg-rose-500/40',
    features: ['Sports tags', 'Follower network', 'Activity history'],
  },
];

/* ─── Intro words ─── */
const INTRO_WORDS = ['UniteAll', 'Connect.', 'Play.', 'Discover.'];

const IntroWord = ({ word, index, scrollYProgress, transformData }) => {
  const wOpacity = useTransform(
    scrollYProgress,
    [transformData.start, transformData.peak],
    [0, 1]
  );
  const wY = useTransform(
    scrollYProgress,
    [transformData.start, transformData.peak],
    [40, 0]
  );
  const wScale = useTransform(
    scrollYProgress,
    [transformData.start, transformData.peak],
    [0.8, 1]
  );
  const wBlur = useTransform(
    scrollYProgress,
    [transformData.start, transformData.peak],
    [8, 0]
  );
  const filter = useTransform(wBlur, (v) => `blur(${v}px)`);

  return (
    <motion.span
      style={{
        opacity: wOpacity,
        y: wY,
        scale: wScale,
        filter
      }}
      className={`font-display font-bold text-center ${
        index === 0
          ? 'text-4xl md:text-5xl lg:text-6xl text-white'
          : 'text-2xl md:text-3xl lg:text-4xl text-primary-400'
      }`}
    >
      {word}
    </motion.span>
  );
};

/* ────────────────────────────────────────────
   PhoneShowcase  – The main scroll container
   ──────────────────────────────────────────── */
const PhoneShowcase = () => {
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isIntro, setIsIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Total scroll distance: 1 intro (1vh) + phone slide (0.5vh) + 5 stages
  // Using 750vh total for generous scroll room
  const TOTAL_VH = 800;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ─── Scroll → Stage mapper ─── */
  // 0–0.08: Intro words appear
  // 0.08–0.14: Phone slides to right
  // 0.14–1.0: 5 stages evenly split
  const INTRO_END = 0.08;
  const SLIDE_END = 0.14;
  const STAGES_RANGE = 1.0 - SLIDE_END; // 0.86
  const STAGE_SIZE = STAGES_RANGE / STAGES.length; // ~0.172

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < SLIDE_END) {
      setIsIntro(true);
      setActiveStage(0);
    } else {
      setIsIntro(false);
      const stageProgress = (latest - SLIDE_END) / STAGES_RANGE;
      const idx = Math.min(Math.floor(stageProgress * STAGES.length), STAGES.length - 1);
      setActiveStage(idx);
    }
  });

  /* ─── Intro word transforms ─── */
  const wordTransforms = INTRO_WORDS.map((_, i) => {
    const wordStart = (INTRO_END / INTRO_WORDS.length) * i;
    const wordPeak = wordStart + (INTRO_END / INTRO_WORDS.length) * 0.6;
    return { start: wordStart, peak: wordPeak };
  });

  // Intro overall opacity — fade out during slide phase
  const introOpacity = useTransform(scrollYProgress, [0, INTRO_END * 0.5, INTRO_END, SLIDE_END], [1, 1, 1, 0]);

  /* ─── Phone position transforms ─── */
  // Phone starts centered (x=0)
  // On desktop: moves right (25vw). On mobile: stays centered (0vw).
  const phoneX = useTransform(
    scrollYProgress,
    [0, INTRO_END, SLIDE_END],
    ['0vw', '0vw', isMobile ? '0vw' : '25vw']
  );

  // Phone scale: kept constant so it perfectly fits the safe vertical area
  const phoneScale = useTransform(
    scrollYProgress,
    [0, INTRO_END, SLIDE_END],
    [1, 1, 1]
  );

  // On mobile, keep phone at full brightness since we won't overlap anymore!
  const phoneOpacity = useTransform(
    scrollYProgress,
    [0, SLIDE_END],
    [1, 1]
  );



  /* ─── Glow pulse behind phone ─── */
  const glowScale = useTransform(
    scrollYProgress,
    [0, INTRO_END, SLIDE_END, 1],
    [1.2, 1.3, 1, 1.1]
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${TOTAL_VH}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pt-16 pb-4">
        {/* Ambient background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ scale: glowScale }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary-600/8 rounded-full blur-[120px]"
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-secondary-600/6 rounded-full blur-[140px]"
          />
          {/* Active stage glow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute top-1/2 right-[20%] -translate-y-1/2 w-[400px] h-[400px] ${STAGES[activeStage].glowColor} rounded-full blur-[100px]`}
            />
          </AnimatePresence>
        </div>

        {/* ─── INTRO WORDS ─── */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none pb-[35vh] md:pb-0"
        >
          <div className="flex flex-col items-center gap-3">
            {INTRO_WORDS.map((word, i) => (
              <IntroWord 
                key={word} 
                word={word} 
                index={i} 
                scrollYProgress={scrollYProgress} 
                transformData={wordTransforms[i]} 
              />
            ))}
          </div>
        </motion.div>

        {/* ─── LEFT SIDE / OVERLAY CONTENT ─── */}
        <div className="absolute top-16 md:inset-y-0 md:top-0 left-0 w-full md:w-[50%] lg:w-[55%] flex items-start md:items-center justify-center md:justify-start z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            {!isIntro && (
              <StageContent
                key={STAGES[activeStage].key}
                stage={STAGES[activeStage]}
                isMobile={isMobile}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ─── PHONE (centered → slides right on desktop) ─── */}
        <motion.div
          style={{
            x: phoneX,
            scale: phoneScale,
            opacity: phoneOpacity,
          }}
          className="relative z-10 mt-[35vh] md:mt-0"
        >
          {/* Glow behind phone */}
          <div className="absolute inset-0 scale-125 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className={`absolute inset-0 ${STAGES[activeStage].glowColor} blur-[60px] rounded-full`}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-primary-500/15 blur-[80px] rounded-full" />
          </div>

          {/* Phone Frame */}
          <div className="relative h-[55vh] md:h-[85vh] max-h-[900px] aspect-[9/19.5] w-auto mx-auto mt-2 md:mt-4">
            {/* Side buttons */}
            <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-sm" />
            <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
            <div className="absolute -right-[3px] top-28 w-[3px] h-16 bg-gray-700 rounded-r-sm" />

            <div className="relative bg-gray-950 rounded-[2.75rem] p-[10px] shadow-2xl shadow-primary-500/20 border border-gray-800/80 h-full">
              {/* Dynamic island */}
              <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-full z-20" />

              {/* Screen */}
              <div className="relative bg-black rounded-[2.2rem] overflow-hidden aspect-[9/19.5]">
                <AnimatePresence mode="wait">
                  {!isIntro && (
                    <motion.div
                      key={STAGES[activeStage].key}
                      initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -30, scale: 0.96, filter: 'blur(6px)' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      {React.createElement(STAGES[activeStage].screen, {
                        scrollProgress: scrollYProgress,
                        stageStart: SLIDE_END + activeStage * STAGE_SIZE,
                        stageEnd: SLIDE_END + (activeStage + 1) * STAGE_SIZE
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Scroll progress indicator (bottom) ─── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {STAGES.map((s, i) => (
            <motion.div
              key={s.key}
              animate={{
                width: i === activeStage ? 32 : 8,
                backgroundColor: i === activeStage ? '#0ea5e9' : 'rgba(255,255,255,0.2)',
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── StageContent — Left side text panel (or centered overlay on mobile) ─── */
const StageContent = ({ stage, isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : -80, y: isMobile ? 20 : 0, filter: 'blur(12px)' }}
      animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: isMobile ? 0 : 80, y: isMobile ? -20 : 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`px-6 md:px-12 lg:px-20 max-w-2xl flex flex-col w-full ${isMobile ? 'items-center text-center mt-4' : 'items-start text-left'}`}
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <span className="text-primary-400">{stage.badgeIcon}</span>
        <span className="text-primary-400 font-bold text-xs tracking-widest uppercase">
          {stage.badge}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-5 leading-tight whitespace-pre-line drop-shadow-2xl"
      >
        {stage.title}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-sm md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8 max-w-md drop-shadow-md"
      >
        {stage.subtitle}
      </motion.p>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className={`flex flex-wrap gap-2 ${isMobile ? 'justify-center' : 'justify-start'}`}
      >
        {stage.features.map((f, i) => (
          <motion.span
            key={f}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${stage.tagBg} ${stage.tagBorder} ${stage.tagText} backdrop-blur-sm shadow-sm`}
          >
            {f}
          </motion.span>
        ))}
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`h-[2px] w-12 rounded-full ${stage.line} mt-8 ${isMobile ? 'origin-center' : 'origin-left'}`}
      />
    </motion.div>
  );
};

export default PhoneShowcase;
