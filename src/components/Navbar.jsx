import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import AnimatedLogo from './AnimatedLogo';
import './Navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = () => setMobileOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo">
          <AnimatedLogo size={36} />
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href ? 'active' : ''}
                onClick={handleClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen(p => !p)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
    </nav>
  );
}
