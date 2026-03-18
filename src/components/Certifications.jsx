import ScrollReveal from './ScrollReveal';
import { FiAward, FiShield, FiUsers } from 'react-icons/fi';
import './Certifications.css';

const certifications = [
  {
    title: 'Generative AI Professional',
    issuer: 'Oracle',
    date: 'Oct 2025',
    icon: <FiAward />,
    image: '/oracle.png',
    link: '/oracle-cert.pdf',
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    date: 'Apr 2025',
    icon: <FiAward />,
    image: '/cloud.png',
    link: '/cloud-computing-cert.pdf',
  },
  {
    title: 'Data Structure & Algorithms Training',
    issuer: 'Summer Training Program (LPU)',
    date: 'Jun – Jul 2025',
    icon: <FiAward />,
    image: '/training.png',
    link: '/summerCertivicate.pdf',
  },
];

const activities = [
  {
    title: 'Cybersecurity Symposium Workshop',
    description: 'Gained hands-on exposure to threat analysis, security fundamentals, and real-world defensive practices.',
    date: 'Apr 2024',
    icon: <FiShield />,
  },
  {
    title: 'Web Development Hackathon — Round 2',
    description: 'Built a functional website with a team under timed constraints and presented the prototype for evaluation.',
    date: 'Mar 2024',
    icon: <FiUsers />,
  },
];

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Certifications & Activities</span>
          <h2 className="section-title">
            Credentials & <span>Experience</span>
          </h2>
        </ScrollReveal>

        <div className="certs__grid">
          <div className="certs__column">
            <ScrollReveal>
              <h3 className="certs__group-title">Certifications</h3>
            </ScrollReveal>
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={i * 0.1}>
                {cert.link ? (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-card glass-card cert-card--link">
                    <div className="cert-card__header">
                      <span className="cert-card__icon">{cert.icon}</span>
                      <div className="cert-card__info">
                        <h4 className="cert-card__title">{cert.title}</h4>
                        <p className="cert-card__issuer">{cert.issuer}</p>
                        <span className="cert-card__date">{cert.date}</span>
                      </div>
                    </div>
                    {cert.image && (
                      <div className="cert-card__image">
                        <img src={cert.image} alt={cert.title} loading="lazy" />
                      </div>
                    )}
                  </a>
                ) : (
                  <div className="cert-card glass-card">
                    <div className="cert-card__header">
                      <span className="cert-card__icon">{cert.icon}</span>
                      <div className="cert-card__info">
                        <h4 className="cert-card__title">{cert.title}</h4>
                        <p className="cert-card__issuer">{cert.issuer}</p>
                        <span className="cert-card__date">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>

          <div className="certs__column">
            <ScrollReveal>
              <h3 className="certs__group-title">Extracurricular</h3>
            </ScrollReveal>
            {activities.map((act, i) => (
              <ScrollReveal key={act.title} delay={i * 0.1}>
                <div className="cert-card glass-card">
                  <div className="cert-card__header">
                    <span className="cert-card__icon">{act.icon}</span>
                    <div className="cert-card__info">
                      <h4 className="cert-card__title">{act.title}</h4>
                      <p className="cert-card__desc">{act.description}</p>
                      <span className="cert-card__date">{act.date}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
