import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import AnimatedLogo from './AnimatedLogo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <a href="#" className="footer__logo" aria-label="Home">
            <AnimatedLogo size={36} />
          </a>
          <p className="footer__copy">
            © {new Date().getFullYear()} Aniket Kumar Singh. Built with <FiHeart className="footer__heart" /> and React.
          </p>
        </div>

        <div className="footer__socials">
          <a href="https://github.com/anikket7" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href="https://linkedin.com/in/aniket712/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href="mailto:aniket70045@gmail.com" aria-label="Email"><FiMail /></a>
        </div>
      </div>
    </footer>
  );
}
