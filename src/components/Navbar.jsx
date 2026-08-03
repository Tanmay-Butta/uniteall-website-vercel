import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'About', path: '/about' },
        { name: 'Feedback', path: '/feedback' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${
                scrolled
                    ? 'glass border-b border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl bg-dark-900/80'
                    : 'bg-transparent border-b border-transparent'
            }`}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-display font-bold text-white tracking-wide flex items-center gap-2">
                        <span className="bg-gradient-to-tr from-primary-600 to-secondary-600 text-white p-1.5 rounded-lg shadow-lg shadow-primary-500/20">UA</span>
                        <span className="text-gray-100 dark:text-gray-100 transition-colors">
                            Unite<span className="text-primary-500">All</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={clsx(
                                    "text-sm font-medium transition-colors hover:text-primary-400",
                                    location.pathname === link.path ? "text-primary-500" : "text-gray-400"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            to="/"
                            onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg shadow-primary-900/20 hover:shadow-primary-500/30 text-center"
                        >
                            <span className="block leading-none mb-0.5">Get App</span>
                            <span className="block text-[10px] opacity-80 leading-none">Coming Soon</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white p-2 rounded-lg hover:bg-white/10 transition"
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden glass border-t border-white/5 overflow-hidden"
                >
                    <div className="px-6 py-4 flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "block py-2 text-base font-medium",
                                    location.pathname === link.path ? "text-primary-500" : "text-gray-300 light:text-gray-700"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            className="bg-primary-600 text-white w-full py-2 rounded-lg font-medium shadow-lg flex flex-col items-center justify-center"
                            onClick={() => setIsOpen(false)}
                            to="/"
                        >
                            <span className="leading-none mb-0.5">Get App</span>
                            <span className="text-[10px] opacity-80 leading-none">Coming Soon</span>
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
