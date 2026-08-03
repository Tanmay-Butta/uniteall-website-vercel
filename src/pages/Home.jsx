import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBolt, FaUsers, FaSearch, FaMapMarkedAlt, FaStar,
  FaGooglePlay, FaAppStore,
} from 'react-icons/fa';
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';
import PhoneShowcase from '../components/phone/PhoneShowcase';
import MapZoomHero from '../components/MapZoomHero';
import CommunityRoadmap from '../components/CommunityRoadmap';
import TestimonialWalkthrough from '../components/TestimonialWalkthrough';

const Home = () => {
  return (
    <div className="min-h-screen transition-colors duration-300 overflow-clip">
      {/* ═══════════════════════════════════════════
          PHONE SHOWCASE — Scroll-driven hero
          ═══════════════════════════════════════════ */}
      <PhoneShowcase />

      {/* Features Overview */}
      <MapZoomHero>
        <FeatureCard icon={<FaBolt />} title="AI Descriptions" desc="Generate professional event details instantly with our integrated AI tool." />
        <FeatureCard icon={<FaSearch />} title="Smart Discovery" desc="Find events that match your interests based on location and preferences." />
        <FeatureCard icon={<FaMapMarkedAlt />} title="Turf Booking" desc="Reserve venues directly from the app with real-time availability." />
        <FeatureCard icon={<FaUsers />} title="Community First" desc="Connect with local players and build your sports network effortlessly." />
      </MapZoomHero>

      {/* Communities */}
      <CommunityRoadmap />

      {/* Testimonials Timeline */}
      <TestimonialWalkthrough />

      {/* CTA */}
      <section id="download" className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal scale direction="up" duration={0.9}>
            <div className="bg-gradient-to-r from-primary-900 to-secondary-900 rounded-3xl p-12 md:p-16 text-center border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
                  Ready to Unite?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of users organizing events smarter and faster.
                  Download UniteAll today.
                </p>
                <ScrollStagger className="flex flex-col sm:flex-row justify-center gap-8">
                  <ScrollStaggerItem>
                    <div className="flex flex-col items-center">
                      <button className="bg-white text-dark-900 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                        <FaGooglePlay /> Google Play
                      </button>
                      <span className="text-gray-400 text-sm mt-2">Coming Soon</span>
                    </div>
                  </ScrollStaggerItem>
                  <ScrollStaggerItem>
                    <div className="flex flex-col items-center">
                      <button className="glass text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white/10 transition shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                        <FaAppStore /> App Store
                      </button>
                      <span className="text-gray-400 text-sm mt-2">Coming Soon</span>
                    </div>
                  </ScrollStaggerItem>
                </ScrollStagger>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="p-8 rounded-2xl glass hover:border-primary-500/30 transition-all group light:bg-white light:border-gray-200 light:shadow-sm h-full"
  >
    <div className="h-14 w-14 bg-dark-900 light:bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors text-white light:text-gray-900">
      {title}
    </h3>
    <p className="text-gray-400 light:text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);



export default Home;
