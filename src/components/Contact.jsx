import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import './Contact.css';

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: 'aniket70045@gmail.com', href: 'mailto:aniket70045@gmail.com' },
  { icon: <FiPhone />, label: 'Mobile', value: '+91-7004545150', href: 'tel:+917004545150' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/aniket712', href: 'https://linkedin.com/in/aniket712/' },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/anikket7', href: 'https://github.com/anikket7' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ee324335-5c7a-47cb-a34a-ea5bace6295d', // Web3Forms access key
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (response.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(''), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let's <span>Connect</span>
          </h2>
        </ScrollReveal>

        <div className="contact__grid">
          <ScrollReveal delay={0.1} className="contact__info">
            <p className="contact__intro">
              Have a project in mind or just want to say hello? Feel free to reach out!
              I'm always open to discussing new opportunities and ideas.
            </p>

            <div className="contact__cards">
              {contactInfo.map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="contact-item glass-card">
                  <span className="contact-item__icon">{item.icon}</span>
                  <div>
                    <span className="contact-item__label">{item.label}</span>
                    <span className="contact-item__value">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="contact__form-wrap">
            <form className="contact__form glass-card" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text" required
                  placeholder="John Doe"
                  value={form.name} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email" required
                  placeholder="john@example.com"
                  value={form.email} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject" name="subject" type="text" required
                  placeholder="Project Discussion"
                  value={form.subject} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Description</label>
                <textarea
                  id="message" name="message" rows="4" required
                  placeholder="Tell me about your project or idea..."
                  value={form.message} onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent!' : <><FiSend /> Send Message</>}
              </button>

              {status === 'error' && (
                <p className="contact__error">Something went wrong. Please try again or email directly.</p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
