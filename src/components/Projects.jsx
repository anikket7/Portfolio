import ScrollReveal from './ScrollReveal';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    title: 'ParkEasy',
    subtitle: 'Full-Stack Parking Management System',
    period: 'Nov 2025 – Dec 2025',
    description: [
      'Built a full-stack parking management system with React.js and Node.js featuring real-time spot availability, secure bookings, and automated entry-code access.',
      'Implemented JWT authentication with bcrypt hashing, role-based access control, and enforced admin privileges via database seeding.',
      'Designed multi-spot booking logic with dynamic availability calculation, 5-digit entry code generation, and MongoDB-backed booking lifecycle tracking.',
      'Developed a responsive dark-mode UI using Tailwind CSS and Vite, including an admin dashboard with revenue analytics and booking management.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/anikket7/ParkEasy',
  },
  {
    title: 'Train Management System',
    subtitle: 'Data Structure & Algorithms',
    period: 'Jun 2025 – Jul 2025',
    description: [
      'Built a menu-driven Train Management System in C++ using arrays, structs, and STL queues to manage ticket booking, cancellation, and passenger records.',
      'Implemented fixed-capacity seat allocation with a bounded FIFO waiting list to ensure deterministic and efficient operations.',
      'Designed a unique PNR generation mechanism with global collision checks across confirmed and waiting-list passengers.',
      'Developed an automated cancellation and promotion workflow that reallocates seats and confirms the next waiting passenger.',
    ],
    tech: ['C++', 'STL Queue', 'Arrays', 'Structures'],
    github: 'https://github.com/anikket7/train_management',
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            Things I've <span>Built</span>
          </h2>
        </ScrollReveal>

        <div className="projects__timeline">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.15} className="projects__reveal">
              <div className={`projects__item ${i % 2 === 0 ? 'projects__item--left' : 'projects__item--right'}`}>
                <div className="projects__icon-wrap">
                  <FiCode />
                </div>
                <div className="projects__card-wrapper">
                  <article className="project-card glass-card">
                    <div className="project-card__header">
                      <div>
                        <h3 className="project-card__title">{project.title}</h3>
                        <p className="project-card__subtitle">{project.subtitle}</p>
                      </div>
                      <span className="project-card__period">{project.period}</span>
                    </div>

                    <ul className="project-card__desc">
                      {project.description.map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>

                    <div className="project-card__footer">
                      <div className="project-card__tech">
                        {project.tech.map(t => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                      <div className="project-card__links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FiGithub />
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                            <FiExternalLink />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
