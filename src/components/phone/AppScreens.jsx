import React from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import {
  FaSearch, FaCalendarPlus, FaBell, FaComments, FaUser, 
  FaMagic, FaCamera, FaChevronLeft
} from 'react-icons/fa';

/* ─────────── Shared Components for Dark Wireframes ─────────── */

const FadeInBlock = ({ scrollProgress, stageStart, stageEnd, delayPercent = 0, durationPercent = 0.3, children, className = "" }) => {
  const dummy = useMotionValue(0);
  const prog = scrollProgress || dummy;
  const start = stageStart || 0;
  const delta = (stageEnd || 1) - start;
  
  const itemStart = start + delta * delayPercent;
  const itemEnd = Math.min(start + delta, itemStart + delta * durationPercent);
  
  const opacity = useTransform(prog, [itemStart, itemEnd], [0, 1]);
  const y = useTransform(prog, [itemStart, itemEnd], [20, 0]);

  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
};

const BottomNav = ({ active = 0 }) => {
  const tabs = [
    { icon: <FaCalendarPlus size={16} />, label: 'Events' },
    { icon: <div className="w-4 h-4 border-2 border-current rounded-full" />, label: 'Clips' },
    { icon: <FaComments size={16} />, label: 'Chats' },
    { icon: <FaBell size={16} />, label: 'Alerts' },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/10 flex justify-around items-center py-3 px-1 z-10">
      {tabs.map((t, i) => (
        <div key={t.label} className={`flex flex-col items-center gap-1 ${i === active ? 'text-primary-400' : 'text-gray-600'}`}>
          {t.icon}
          <div className="w-8 h-1 rounded-full bg-current opacity-50 mt-1" />
        </div>
      ))}
    </div>
  );
};

const SkeletonBlock = ({ className = "" }) => (
  <div className={`bg-white/5 rounded-lg border border-white/5 ${className}`} />
);

const SkeletonText = ({ width = "w-full", height = "h-2", className = "" }) => (
  <div className={`bg-white/10 rounded-full ${width} ${height} ${className}`} />
);

const WireframeHeader = ({ title, showBack = false }) => (
  <div className="pt-8 pb-4 px-4 border-b border-white/10 bg-black/50 backdrop-blur-sm flex items-center gap-3">
    {showBack && <FaChevronLeft size={12} className="text-gray-500" />}
    <div className="flex-1 min-w-0">
      <h3 className="text-gray-300 font-bold text-[14px] tracking-wide uppercase truncate">{title}</h3>
    </div>
    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
      <FaUser size={10} className="text-gray-500" />
    </div>
  </div>
);

/* ─────────────────────────────────────────
   1. EVENTS SCREEN (Wireframe)
   ───────────────────────────────────────── */
export const EventsScreen = ({ scrollProgress, stageStart, stageEnd }) => {
  return (
  <div className="h-full w-full bg-gray-950 flex flex-col relative overflow-hidden">
    <WireframeHeader title="Discover" />

    <div className="p-4 space-y-4 flex-1 overflow-y-hidden">
      {/* Search Bar */}
      <div className="h-8 bg-white/5 border border-white/10 rounded-lg flex items-center px-3 gap-2">
        <FaSearch size={10} className="text-gray-500" />
        <span className="text-[10px] text-gray-500">Search events...</span>
      </div>

      {/* Spotlight Carousel */}
      <div>
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">Spotlight Events</p>
        <SkeletonBlock className="h-32 w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
             <span className="bg-primary-500/20 text-primary-400 text-[8px] font-bold px-2 py-0.5 rounded border border-primary-500/30 w-max mb-2 uppercase">Featured</span>
             <p className="text-white font-bold text-[12px] mb-1 truncate">Weekend Tournament</p>
             <SkeletonText width="w-1/2" />
          </div>
        </SkeletonBlock>
        <div className="flex justify-center gap-1 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Nearby Events List */}
      <FadeInBlock scrollProgress={scrollProgress} stageStart={stageStart} stageEnd={stageEnd} delayPercent={0.3} durationPercent={0.5} className="space-y-2">
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">Nearby You</p>
        {[
          { title: 'Morning Yoga Session' },
          { title: '5v5 Football Match' }
        ].map((e, i) => (
          <div key={i} className="flex gap-3 items-center">
            <SkeletonBlock className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border-white/10">
              <FaCalendarPlus className="text-white/20" size={16} />
            </SkeletonBlock>
            <div className="flex-1 min-w-0 space-y-1.5">
              <p className="text-gray-300 font-bold text-[10px] truncate">{e.title}</p>
              <SkeletonText width="w-1/3" />
            </div>
          </div>
        ))}
      </FadeInBlock>
    </div>

    <BottomNav active={0} />
  </div>
  );
};

/* ─────────────────────────────────────────
   2. CREATE EVENT SCREEN (Wireframe)
   ───────────────────────────────────────── */
export const CreateEventScreen = ({ scrollProgress, stageStart, stageEnd }) => {
  return (
  <div className="h-full w-full bg-gray-950 flex flex-col relative overflow-hidden">
    <WireframeHeader title="Create Event" showBack />

    <div className="p-4 flex-1 space-y-4 overflow-y-hidden">
      {/* Input Fields */}
      {[
        { label: 'Event Title', val: 'Weekend Basketball' },
        { label: 'Date & Time', val: 'Tomorrow, 5:00 PM' },
        { label: 'Location', val: 'Sector 62 Sports Complex' }
      ].map((field, i) => (
        <div key={i}>
          <p className="text-[8px] text-primary-400 font-bold uppercase tracking-widest mb-1">{field.label}</p>
          <div className="h-9 bg-white/5 border border-white/10 rounded-lg flex items-center px-3 min-w-0">
             <span className="text-[10px] text-gray-300 truncate w-full">{field.val}</span>
          </div>
        </div>
      ))}

      {/* Description Box */}
      <FadeInBlock scrollProgress={scrollProgress} stageStart={stageStart} stageEnd={stageEnd} delayPercent={0.15} durationPercent={0.3}>
        <p className="text-[8px] text-primary-400 font-bold uppercase tracking-widest mb-1">Description</p>
        <div className="h-20 bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
           <SkeletonText width="w-full" />
           <SkeletonText width="w-5/6" />
           <SkeletonText width="w-2/3" />
        </div>
      </FadeInBlock>

      <FadeInBlock scrollProgress={scrollProgress} stageStart={stageStart} stageEnd={stageEnd} delayPercent={0.45} durationPercent={0.3} className="space-y-4">
        {/* AI Button - Prominent in wireframe */}
        <button className="w-full bg-primary-600/20 border border-primary-500/50 text-primary-400 rounded-xl py-3 flex items-center justify-center gap-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-400/10" />
          <FaMagic size={12} className="relative z-10" />
          <span className="font-bold text-[10px] uppercase tracking-wider relative z-10">AI Generate</span>
        </button>

        {/* Photo Upload */}
        <div className="h-16 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2">
          <FaCamera size={16} className="text-gray-500" />
          <span className="text-[10px] text-gray-500 font-medium">Add Photo</span>
        </div>
      </FadeInBlock>
    </div>
  </div>
  );
};

/* ─────────────────────────────────────────
   3. CHATS SCREEN (Wireframe)
   ───────────────────────────────────────── */
export const ChatsScreen = ({ scrollProgress, stageStart, stageEnd }) => {
  return (
  <div className="h-full w-full bg-gray-950 flex flex-col relative overflow-hidden">
    <WireframeHeader title="Messages" />

    {/* Search */}
    <div className="p-3 border-b border-white/5 bg-gray-950 z-10">
      <div className="h-8 bg-white/5 border border-white/10 rounded-lg flex items-center px-3 gap-2">
        <FaSearch size={10} className="text-gray-500" />
        <span className="text-[10px] text-gray-500">Search messages...</span>
      </div>
    </div>

    {/* Chat List */}
    <div className="flex-1 overflow-y-hidden p-3 space-y-4">
      {[
        { name: 'Burger Party 🍔', msg: 'Yoo party is on for tonight!' },
        { name: "McDonald's Visit", msg: 'Where are you guys?' },
        { name: 'Weekend Plan', msg: 'Send the photos bro.' },
        { name: 'Sports Club', msg: 'Anyone up for a match?' },
        { name: 'General Chat', msg: 'Haha yeah!' }
      ].map((c, i) => {
        const content = (
          <>
            <SkeletonBlock className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
              <FaUser className="text-white/20" size={14} />
            </SkeletonBlock>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-center gap-2">
                <p className="text-gray-200 font-bold text-[11px] truncate">{c.name}</p>
                <SkeletonText width="w-8" className="opacity-50" />
              </div>
              <p className="text-gray-500 text-[9px] truncate w-4/5">{c.msg}</p>
            </div>
          </>
        );

        if (i < 2) {
          return (
            <div key={i} className="flex items-center gap-3">
              {content}
            </div>
          );
        }

        return (
          <FadeInBlock 
            key={i} 
            scrollProgress={scrollProgress} stageStart={stageStart} stageEnd={stageEnd} 
            delayPercent={(i - 1) * 0.25} 
            durationPercent={0.3}
            className="flex items-center gap-3"
          >
            {content}
          </FadeInBlock>
        );
      })}
    </div>

    <BottomNav active={2} />
  </div>
  );
};

/* ─────────────────────────────────────────
   4. NOTIFICATIONS SCREEN (Wireframe)
   ───────────────────────────────────────── */
export const NotificationsScreen = ({ scrollProgress, stageStart, stageEnd }) => {
  return (
  <div className="h-full w-full bg-gray-950 flex flex-col relative overflow-hidden">
    <WireframeHeader title="Alerts" />

    <div className="flex-1 overflow-y-hidden p-3 space-y-3">
      {[
        { title: 'Tanmay posted a new event', color: 'bg-primary-500/20', border: 'border-primary-500/30', text: 'text-primary-300' },
        { title: 'Sabeeh replied to your message', color: 'bg-white/5', border: 'border-white/10', text: 'text-gray-300' },
        { title: 'Upcoming: Weekend Football', color: 'bg-white/5', border: 'border-white/10', text: 'text-gray-300' },
        { title: 'Abhinav started following you', color: 'bg-white/5', border: 'border-white/10', text: 'text-gray-300' },
      ].map((item, i) => {
        const content = (
          <>
            <div className="flex justify-between items-center gap-2">
              <p className={`${item.text} font-bold text-[10px] truncate`}>{item.title}</p>
              <SkeletonText width="w-12" className="opacity-50" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white/10" />
              <SkeletonText width="w-1/3" />
            </div>
          </>
        );

        if (i === 0) {
          return (
            <SkeletonBlock key={i} className={`h-16 w-full ${item.color} ${item.border} rounded-xl p-3 flex flex-col justify-center space-y-2`}>
              {content}
            </SkeletonBlock>
          );
        }

        return (
          <FadeInBlock 
            key={i} 
            scrollProgress={scrollProgress} stageStart={stageStart} stageEnd={stageEnd} 
            delayPercent={i * 0.25} 
            durationPercent={0.3}
          >
            <SkeletonBlock className={`h-16 w-full ${item.color} ${item.border} rounded-xl p-3 flex flex-col justify-center space-y-2`}>
              {content}
            </SkeletonBlock>
          </FadeInBlock>
        );
      })}
    </div>

    <BottomNav active={3} />
  </div>
  );
};

/* ─────────────────────────────────────────
   5. PROFILE SCREEN (Wireframe)
   ───────────────────────────────────────── */
export const ProfileScreen = ({ scrollProgress, stageStart, stageEnd }) => {
  return (
  <div className="h-full w-full bg-gray-950 flex flex-col relative overflow-hidden">
    <WireframeHeader title="My Profile" />

    <div className="flex-1 overflow-y-hidden">
      {/* Avatar Area */}
    <div className="relative pt-8 pb-4 flex flex-col items-center border-b border-white/5">
      <SkeletonBlock className="w-20 h-20 rounded-full border-4 border-gray-950 shadow-2xl z-10 flex items-center justify-center">
         <FaUser className="text-white/20" size={32} />
         <div className="absolute inset-0 border border-white/20 rounded-full" />
      </SkeletonBlock>
      <div className="mt-3 text-center w-full">
        <p className="text-gray-200 font-bold text-[14px]">Tanmay Butta</p>
        <p className="text-primary-500 text-[10px] mt-1">@tanmay_sports</p>
      </div>
    </div>

    {/* Stats */}
    <div className="flex border-b border-white/5 p-3">
      <div className="flex-1 flex flex-col items-center border-r border-white/5">
        <p className="text-primary-400 font-bold text-[16px]">12</p>
        <p className="text-gray-500 text-[8px] uppercase tracking-wider font-bold">Followers</p>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <p className="text-primary-400 font-bold text-[16px]">38</p>
        <p className="text-gray-500 text-[8px] uppercase tracking-wider font-bold">Following</p>
      </div>
    </div>

    {/* Details */}
    <div className="p-4 space-y-4">
      <FadeInBlock scrollProgress={scrollProgress} stageStart={stageStart} stageEnd={stageEnd} delayPercent={0.15} durationPercent={0.3} className="space-y-4">
        {[
          { label: 'Sector 62, Noida' },
          { label: 'Basketball, Tennis, Football' },
          { label: 'Age: 21' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 min-w-0">
            <div className="w-6 h-6 rounded-md bg-white/10 flex-shrink-0" />
            <p className="text-gray-300 font-medium text-[10px] truncate">{item.label}</p>
          </div>
        ))}
      </FadeInBlock>

      <FadeInBlock scrollProgress={scrollProgress} stageStart={stageStart} stageEnd={stageEnd} delayPercent={0.5} durationPercent={0.3} className="mt-4">
         <div className="w-full h-8 border border-red-500/30 bg-red-500/10 rounded-lg flex items-center justify-center">
           <span className="text-red-400 text-[10px] font-bold uppercase">Log Out</span>
         </div>
      </FadeInBlock>
    </div>
    </div>
  </div>
  );
};

/* ─────────── EXPORT MAP ─────────── */
export const SCREENS = {
  events: EventsScreen,
  create: CreateEventScreen,
  chats: ChatsScreen,
  notifications: NotificationsScreen,
  profile: ProfileScreen,
};

export default SCREENS;
