import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  useEffect(() => {
    // Hide the preloader after a short duration
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds total loading time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="preloader__content">
        <motion.div
          className="preloader__logo-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatedLogo isPreloader={true} />
        </motion.div>
        
        <motion.div 
          className="preloader__progress-bar"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
