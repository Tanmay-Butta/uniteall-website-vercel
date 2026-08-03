import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

const ScrollProgress = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 origin-left z-[60] pointer-events-none"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
