import { motion } from 'framer-motion';

export default function AnimatedLogo({ size = 40, isPreloader = false }) {
  const containerSize = isPreloader ? 180 : size;
  const strokeBase = isPreloader ? 3 : 2.5;

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { 
            delay, 
            type: "spring", 
            duration: 2.5, 
            bounce: 0, 
            repeat: Infinity, 
            repeatType: "reverse", 
            repeatDelay: 1.5 
          },
          opacity: { delay, duration: 0.1 }
        }
      };
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: isPreloader ? '1.5rem' : '0.5rem', position: 'relative' }}>
      {/* Background glow for preloader */}
      {isPreloader && (
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)',
            filter: 'blur(30px)',
            opacity: 0.5,
            zIndex: 0
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.5 }}
          transition={{ duration: 2, yoyo: Infinity, ease: "easeInOut" }}
        />
      )}

      <svg
        width={containerSize}
        height={containerSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', zIndex: 1 }}
      >
        {/* Outer Tech Hexagon */}
        <motion.polygon
          points="50,5 93,25 93,75 50,95 7,75 7,25"
          stroke="var(--border-subtle)"
          strokeWidth={strokeBase - 1}
          opacity={0.4}
          custom={0}
          variants={draw}
          initial="hidden"
          animate="visible"
        />

        {/* Inner Glowing Hexagon */}
        <motion.polygon
          points="50,15 85,32 85,68 50,85 15,68 15,32"
          stroke="var(--accent)"
          strokeWidth={strokeBase}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.8}
          custom={0.5}
          variants={draw}
          initial="hidden"
          animate="visible"
          style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }}
        />

        {/* The Stylized Letter 'A' Formed by intersecting geometric lines */}
        {/* Left Leg */}
        <motion.line
          x1="50" y1="20" x2="30" y2="75"
          stroke="var(--text-primary)"
          strokeWidth={strokeBase + 1.5}
          strokeLinecap="round"
          custom={1}
          variants={draw}
          initial="hidden"
          animate="visible"
        />

        {/* Right Leg */}
        <motion.line
          x1="50" y1="20" x2="70" y2="75"
          stroke="var(--text-primary)"
          strokeWidth={strokeBase + 1.5}
          strokeLinecap="round"
          custom={1.2}
          variants={draw}
          initial="hidden"
          animate="visible"
        />

        {/* Middle Crossbar (Digital/Glitch Style) */}
        <motion.path
          d="M 38 60 L 50 50 L 62 60"
          stroke="var(--accent)"
          strokeWidth={strokeBase + 1}
          strokeLinecap="round"
          strokeLinejoin="round"
          custom={1.4}
          variants={draw}
          initial="hidden"
          animate="visible"
          style={{ filter: 'drop-shadow(0 0 5px var(--accent))' }}
        />

        {/* Decorative Tech Nodes (Dots at vertices) */}
        <motion.circle cx="50" cy="20" r={strokeBase + 1} fill="var(--accent)" custom={2} variants={draw} initial="hidden" animate="visible" />
        <motion.circle cx="30" cy="75" r={strokeBase + 1} fill="var(--text-primary)" custom={2.1} variants={draw} initial="hidden" animate="visible" />
        <motion.circle cx="70" cy="75" r={strokeBase + 1} fill="var(--text-primary)" custom={2.2} variants={draw} initial="hidden" animate="visible" />
      </svg>

    </div>
  );
}
