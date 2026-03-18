import ScrollReveal from './ScrollReveal';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { LuGraduationCap } from 'react-icons/lu';
import './Education.css';

const education = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering',
    school: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    period: 'Aug 2023 – Present',
    grade: 'CGPA: 7.19',
    current: true,
  },
  {
    degree: 'Intermediate',
    field: 'Science',
    school: 'Park Mount Public School',
    location: 'Patna, Bihar',
    period: 'Apr 2021 – Mar 2022',
    grade: 'Percentage: 76%',
  },
  {
    degree: 'Matriculation',
    field: '',
    school: "Mother's International Academy",
    location: 'Patna, Bihar',
    period: 'Apr 2019 – Mar 2020',
    grade: 'Percentage: 74%',
  },
];

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Education</span>
          <h2 className="section-title">
            Academic <span>Journey</span>
          </h2>
        </ScrollReveal>

        <div className="edu__timeline">
          {education.map((edu, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className={`edu__item glass-card ${edu.current ? 'edu__item--current' : ''}`}>
                <div className="edu__icon-wrap">
                  <LuGraduationCap />
                </div>
                <div className="edu__content">
                  <div className="edu__header">
                    <div>
                      <h3 className="edu__degree">{edu.degree}</h3>
                      {edu.field && <p className="edu__field">{edu.field}</p>}
                      <p className="edu__school">{edu.school}</p>
                    </div>
                    {edu.current && <span className="edu__badge">Current</span>}
                  </div>
                  <div className="edu__meta">
                    <span><FiMapPin /> {edu.location}</span>
                    <span><FiCalendar /> {edu.period}</span>
                    <span className="edu__grade">{edu.grade}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
