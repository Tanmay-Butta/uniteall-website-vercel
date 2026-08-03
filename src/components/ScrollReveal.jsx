import { motion, useReducedMotion } from 'framer-motion';

const directionOffsets = {
  up: { x: 0, y: 72 },
  down: { x: 0, y: -48 },
  left: { x: 72, y: 0 },
  right: { x: -72, y: 0 },
  none: { x: 0, y: 0 },
};

export const scrollViewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -80px 0px',
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.75,
  as = 'div',
  scale = false,
  blur = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;
  const offset = directionOffsets[direction] || directionOffsets.up;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: scale ? 0.92 : 1,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={scrollViewport}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
};

export const ScrollStagger = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStaggerItem = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
