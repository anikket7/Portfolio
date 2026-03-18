import ScrollReveal from './ScrollReveal';
import { FiCode, FiDatabase, FiTool, FiGlobe } from 'react-icons/fi';
import './About.css';

const skillGroups = [
  { icon: <FiCode />, title: 'Languages', items: ['C++', 'C', 'Python', 'JavaScript', 'PHP'] },
  { icon: <FiDatabase />, title: 'Database', items: ['MySQL', 'MongoDB'] },
  { icon: <FiTool />, title: 'Tools/Platforms', items: ['Git', 'GitHub', 'Postman'] },
  { icon: <FiGlobe />, title: 'Web Technologies', items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js'] },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Crafting Code with <span>Purpose</span>
          </h2>
        </ScrollReveal>

        <div className="about__grid">
          <ScrollReveal delay={0.1} className="about__bio">
            <p>
              I'm a <strong>Computer Science Engineering</strong> student at{' '}
              <strong>Lovely Professional University</strong>, passionate about building
              clean, efficient, and impactful software. I specialize in full-stack web
              development with the MERN stack and love solving data structure &amp; algorithm
              challenges.
            </p>
            <p>
              From designing real-time parking systems to building C++ management tools,
              I thrive on turning ideas into functional, well-architected products.
              I'm always eager to learn, collaborate, and take on new challenges.
            </p>
          </ScrollReveal>

          <div className="about__skills">
            {skillGroups.map((group, i) => (
              <ScrollReveal key={group.title} delay={0.1 + i * 0.1}>
                <div className="skill-card glass-card">
                  <div className="skill-card__header">
                    <span className="skill-card__icon">{group.icon}</span>
                    <h3 className="skill-card__title">{group.title}</h3>
                  </div>
                  <div className="skill-card__tags">
                    {group.items.map(item => (
                      <span key={item} className="tag">{item}</span>
                    ))}
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
