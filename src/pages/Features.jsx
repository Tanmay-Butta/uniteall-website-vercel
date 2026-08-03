import React from 'react';
import { motion } from 'framer-motion';
import {
  FaMagic, FaCalendarAlt, FaMapMarkedAlt, FaUsers,
  FaBell, FaShieldAlt, FaSearch,
} from 'react-icons/fa';
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

const featuresList = [
  {
    icon: <FaMagic />,
    title: 'AI-Powered Descriptions',
    desc: 'Never struggle with event details again. Our smart AI generates professional, engaging descriptions in seconds based on your keywords.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: <FaSearch />,
    title: 'Smart Event Discovery',
    desc: 'Find events that truly match your interests. Our recommendation engine suggests activities based on your location and past preferences.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Seamless Organization',
    desc: 'Create, manage, and track events with ease. Handle RSVPs, waitlists, and updates all from a single intuitive dashboard.',
    color: 'from-pink-500 to-rose-400',
  },
  {
    icon: <FaUsers />,
    title: 'Community Focused',
    desc: 'Build local sports communities. Connect with players nearby, chat within event groups, and foster lasting connections.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: <FaBell />,
    title: 'Real-time Notifications',
    desc: 'Stay in the loop with instant alerts for event updates, messages, and last-minute changes so you never miss a beat.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Trusted & Secure',
    desc: 'Verified profiles and secure data handling ensure a safe environment for all participants and organizers.',
    color: 'from-cyan-400 to-blue-500',
  },
];

const Features = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 overflow-x-hidden">
      <section className="container mx-auto px-6 mb-24 text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to organize, discover, and enjoy sports events.
            Built for efficiency, designed for community.
          </p>
        </ScrollReveal>
      </section>

      <section className="container mx-auto px-6 mb-32">
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <ScrollStaggerItem key={feature.title}>
              <FeatureCard feature={feature} />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </section>

      <section className="container mx-auto px-6">
        <ScrollReveal scale duration={0.9}>
          <div className="bg-dark-800 rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] group-hover:bg-primary-600/20 transition-all" />

            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="w-full md:w-1/2">
                <span className="inline-block px-4 py-2 bg-primary-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  Coming Soon
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Turf Booking Integration</h2>
                <p className="text-xl text-gray-400 mb-8">
                  We are partnering with venues across the city to bring direct booking capabilities to UniteAll.
                  Soon you&apos;ll be able to reserve pitches, courts, and fields instantly alongside your event creation.
                </p>
                <button className="text-primary-500 font-bold hover:text-primary-400 transition flex items-center gap-2">
                  Get notified when it launches &rarr;
                </button>
              </div>

              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative">
                  <FaMapMarkedAlt className="text-9xl text-dark-700" />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-secondary-600 text-white p-4 rounded-xl shadow-lg"
                  >
                    <span className="font-bold text-lg">Book Now</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

const FeatureCard = ({ feature }) => (
  <motion.div
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="bg-dark-card border border-white/5 p-8 rounded-2xl hover:bg-white/5 transition-all group h-full"
  >
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      {feature.icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
  </motion.div>
);

export default Features;
