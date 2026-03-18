import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from 'react-icons/fi';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
      </div>

      <div className="hero__content container">
        <div className="hero__layout">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
          >
            <motion.span
              className="hero__greeting"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
            >
              Hello, I'm
            </motion.span>

            <motion.h1
              className="hero__name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            >
              Aniket Kumar <span>Singh</span>
            </motion.h1>

            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
            >
              Computer Science Student · Full-Stack Developer · Problem Solver
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            >
              <a href="/Aniket_Kumar_Singh_CV.pdf" target="_blank" className="btn btn-primary btn-glow">
                <FiDownload /> Download CV
              </a>
              <a href="#contact" className="btn btn-outline">
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              className="hero__socials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
            >
              <a href="https://github.com/anikket7" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-gh">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/aniket712/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-in">
                <FiLinkedin />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero__image-ring">
              <motion.div 
                className="floating-badge badge-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
              >
                &lt;/&gt;
              </motion.div>
              <motion.div 
                className="floating-badge badge-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              >
                &#128279;
              </motion.div>
              <img src="/profile.png" alt="Aniket Kumar" className="hero__photo" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span>Scroll Down</span>
          <FiArrowDown className="hero__scroll-icon" />
        </motion.div>
      </div>
    </section>
  );
}
