import React from 'react';
import ScrollReveal from './ScrollReveal';

const Footer = () => {
    return (
        <ScrollReveal direction="up" duration={0.6}>
            <footer className="bg-dark-800 py-8 px-4 text-center text-gray-400 border-t border-white/5">
                <p>&copy; 2024 UniteAll. All rights reserved.</p>
            </footer>
        </ScrollReveal>
    );
};

export default Footer;
