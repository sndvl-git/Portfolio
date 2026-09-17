import { useEffect, useRef, useState } from 'react';
import './styles.css';
import profile from "./assets/muka.png";
import iot from "./assets/iot.png";
import digi from "./assets/digi.png";
import vicmar from "./assets/vicmar.png";

import ciscoDevNetCert from "./assets/cisco-devnet.png";
import ciscoIntroductionCert from "./assets/cisco-introduction.png";
import pythonCert from "./assets/python.png";
import cCert from "./assets/c.png";
import jsCert from "./assets/javascript.png";
import machineCert from "./assets/machine-learning.png";

const certifications = [
  { name: 'Cisco DevNet Associate', image: ciscoDevNetCert, description: 'Placeholder summary — describe what this certification covers.' },
  { name: 'CCNA: Introduction to Networks', image: ciscoIntroductionCert, description: 'Placeholder summary — describe what this certification covers.' },
  { name: 'Machine Learning', image: machineCert, description: 'Placeholder summary — describe what this certification covers.' },
  { name: 'Python Programming', image: pythonCert, description: 'Placeholder summary — describe what this certification covers.' },
  { name: 'C Programming', image: cCert, description: 'Placeholder summary — describe what this certification covers.' },
  { name: 'JavaScript Essentials', image: jsCert, description: 'Placeholder summary — describe what this certification covers.' },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [showcaseTab, setShowcaseTab] = useState('projects');
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [certificationIndex, setCertificationIndex] = useState(0);
  const scrollFrameRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    message: '',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('site-header');
    const heroPhoto = document.getElementById('hero-photo');
    const heroName = document.querySelector('.hero-name');
    const heroLocation = document.querySelector('.hero-role');
    const heroTitle = document.querySelector('.hero-title');
    const heroSocial = document.querySelector('.hero-social');

    let entered = false;

    const triggerEntrance = () => {
      if (entered) return;
      entered = true;

      if (preloader) {
        preloader.classList.add('fade-out');
        preloader.addEventListener('animationend', () => {
          preloader.style.display = 'none';
        }, { once: true });
      }

      if (header) setTimeout(() => header.classList.add('visible'), 100);
      if (heroPhoto) setTimeout(() => heroPhoto.classList.add('visible'), 200);
      if (heroName) setTimeout(() => heroName.classList.add('visible'), 520);
      if (heroLocation) setTimeout(() => heroLocation.classList.add('visible'), 640);
      if (heroTitle) setTimeout(() => heroTitle.classList.add('visible'), 760);
      if (heroSocial) setTimeout(() => heroSocial.classList.add('visible'), 880);
    };

    const revealEls = document.querySelectorAll('#about, #projects, #contact, .about-column, .personal-details, [data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

    const mainTimer = window.setTimeout(triggerEntrance, 1900);
    const fallbackTimer = window.setTimeout(triggerEntrance, 3200);

    return () => {
      window.clearTimeout(mainTimer);
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsContactOpen(false);
        setIsCvOpen(false);
        setSelectedCertification(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => () => {
    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  useEffect(() => {
    if (showcaseTab !== 'certifications') return undefined;

    const rotation = window.setTimeout(() => {
      setCertificationIndex((current) => (current + 1) % 5);
    }, 5000);

    return () => window.clearTimeout(rotation);
  }, [showcaseTab, certificationIndex]);

  const closeNav = () => setNavOpen(false);
  const handleNavClick = (event, target) => {
    event.preventDefault();
    closeNav();
    const destination = document.querySelector(target);

    if (!destination) return;

    destination.classList.add('visible');

    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);

    const startPosition = window.scrollY;
    const headerOffset = target === '#hero' || target === '#about' ? 0 : 80;
    const destinationPosition = Math.max(
      0,
      destination.offsetTop - headerOffset
    );
    const distance = destinationPosition - startPosition;
    const duration = 850;
    const startTime = performance.now();
    const easeInOutCubic = (progress) => (
      progress < 0.5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2
    );

    const animateScroll = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (progress < 1) {
        scrollFrameRef.current = requestAnimationFrame(animateScroll);
      } else {
        scrollFrameRef.current = null;
      }
    };

    scrollFrameRef.current = requestAnimationFrame(animateScroll);
    window.history.replaceState(null, '', target);
  };
  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);
  const closeCvModal = () => setIsCvOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`New contact from ${formData.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name || 'Not provided'}\nAddress: ${formData.address || 'Not provided'}\n\nMessage:\n${formData.message || 'No message provided'}`
    );

    window.location.href = `mailto:lanzerrol.sandoval@gmail.com?subject=${subject}&body=${body}`;
    closeContactModal();
    setFormData({ name: '', address: '', message: '' });
  };

  return (
    <>
      <div id="preloader" role="status" aria-label="Loading">
        <div className="loader-name" aria-hidden="true">please hire me</div>
        <div className="loader-bar-wrap" aria-hidden="true">
          <div className="loader-bar" />
        </div>
      </div>
      
      <header id="site-header">
        
        <div className="header-inner">
          <a href="#hero" className="logo" onClick={(event) => handleNavClick(event, '#hero')}>LS<span>.</span></a>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={navOpen}
            type="button"
            onClick={() => setNavOpen((open) => !open)}
          >
            <i className={navOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
          </button>

          <nav className={`nav-links${navOpen ? ' open' : ''}`} id="nav-links">
            <a href="#hero" onClick={(event) => handleNavClick(event, '#hero')}>Home</a>
            <a href="#about" onClick={(event) => handleNavClick(event, '#about')}>About</a>
            <a href="#projects" onClick={(event) => handleNavClick(event, '#projects')}>Projects</a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className={`theme-toggle${isDarkMode ? ' dark' : ''}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDarkMode}
              onClick={() => setIsDarkMode((dark) => !dark)}
            >
              <span className="theme-toggle-track" aria-hidden="true">
                <i className="fa-solid fa-sun theme-icon theme-icon-sun" />
                <i className="fa-solid fa-moon theme-icon theme-icon-moon" />
                <span className="theme-toggle-thumb" />
              </span>
            </button>

            <button
              type="button"
              className="btn-contact"
              onClick={() => {
                closeNav();
                openContactModal();
              }}
            >
              <i className="fa-regular fa-paper-plane" aria-hidden="true" />
              <span className="contact-label">Contact Me</span>
            </button>
          </div>
        </div>
      </header>

      <section id="hero" aria-labelledby="hero-name">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-stage">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1 className="hero-name" id="hero-name">
                <span className="typing-greeting">Hi,</span>
                <span className="typing-name">I'm Lanz</span>
              </h1>

              <p className="hero-role">Computer Engineer <span>·</span> 2026</p>

              <p className="hero-title">
                Building smart solutions for the physical and digital world, with curiosity, care, and a focus on making technology genuinely useful for people.
              </p>

              <div className="hero-actions">
                <a className="btn-primary" href="#projects" onClick={(event) => handleNavClick(event, '#projects')}>
                  Explore Projects
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </a>
                <button type="button" className="btn-outline" onClick={() => setIsCvOpen(true)}>
                  Download CV
                  <i className="fa-solid fa-download" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="hero-photo-wrap" id="hero-photo">
              <div className="hero-photo-ring">
                <img
                  src={profile}
                  alt="Lanz Sandoval — profile photo"
                  width="240"
                  height="240"
                />
              </div>
            </div>
          </div>

          <div className="hero-social" aria-label="Social links">
            <a href="https://github.com/sndvl-git" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/lanz-sandoval-12b876416/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href="https://www.facebook.com/Z.Sndvl" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fa-brands fa-facebook" />
            </a>
            <a href="mailto:lanzerrol.sandoval@gmail.com" aria-label="Email">
              <i className="fa-regular fa-envelope" />
            </a>
          </div>
        </div>
      </section>

      <main>
        <div className="page-wrapper">
          <section id="about" aria-labelledby="about-heading">
            <h2 className="about-heading" id="about-heading">About Me</h2>

            <div className="about-grid">
              <div className="about-stats" aria-label="Career highlights">
                <div className="stat-card" data-reveal>
                  <div className="stat-icon"><i className="fa-solid fa-graduation-cap"></i></div>
                  <div>
                    <div className="stat-num">BS '26</div>
                    <div className="stat-desc">Bachelor of Science in Computer Engineering from University of Batangas</div>
                  </div>
                </div>
                <div className="stat-card" data-reveal>
                  <div className="stat-icon"><i className="fa-solid fa-certificate"></i></div>
                  <div>
                    <div className="stat-num">5+</div>
                    <div className="stat-desc">Industry certifications including CCNA and Cisco Networking credentials</div>
                  </div>
                </div>
                <div className="stat-card" data-reveal>
                  <div className="stat-icon"><i className="fa-solid fa-microchip"></i></div>
                  <div>
                    <div className="stat-num">IoT</div>
                    <div className="stat-desc">Hands-on experience with ESP32, sensors, and embedded systems design</div>
                  </div>
                </div>
              </div>

              <div className="about-column about-intro">
                <p className="about-column-label">Who am I</p>
                <p className="about-para">
                  I'm a <strong>Computer Engineering graduate</strong> from the Philippines, curious about how things work and excited to build technology that feels useful, thoughtful, and easy for people to live with. I enjoy moving between web development, hardware, and electronics while learning something new with every project.
                </p>
              </div>

              <div className="about-column about-values">
                <p className="about-column-label">My values</p>
                <p className="about-para">
                  I <strong>welcome feedback</strong> because it helps me see things from different perspectives and improve. I want to learn from others, contribute where I can, and become someone a team can rely on when a challenge needs patience, care, and a practical solution.
                </p>
              </div>

              <div className="personal-details">
                <p className="about-column-label">Personal details</p>
                <div className="personal-details-grid">
                  <div><span>Full name</span><strong>Lanz Errol P. Sandoval</strong></div>
                  <div><span>Location</span><strong>Bauan, Batangas, Philippines</strong></div>
                  <div><span>Phone</span><strong>+63 917 123 4567</strong></div>
                  <div><span>Email</span><strong>lanzerrol.sandoval@gmail.com</strong></div>
                  <div><span>Education</span><strong>University of Batangas</strong></div>
                  <div><span>Age</span><strong>23</strong></div>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-heading">
            <div className="showcase-heading">
              <h2 className="section-heading" id="projects-heading">Portfolio Showcase</h2>
              <nav className="showcase-tabs" aria-label="Portfolio categories">
                {['projects', 'certifications', 'techstack'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={showcaseTab === tab ? 'active' : ''}
                    aria-pressed={showcaseTab === tab}
                    onClick={() => setShowcaseTab(tab)}
                  >
                    {tab === 'techstack' ? 'Techstack' : tab[0].toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {showcaseTab === 'projects' && (
              <div className="showcase-projects" key="projects-view">
                <article className="showcase-project-card">
                  <img src={iot} alt="Smart Pipeline preview" />
                  <div className="showcase-project-copy">
                    <span className="showcase-index">01 / IoT</span>
                    <h3>Smart Pipeline</h3>
                    <p>Real-time leak detection for water pipelines using flow sensors, microcontroller processing, and GSM alerts.</p>
                    <a href="https://water-monitoring-dashboard-six.vercel.app/" target="_blank" rel="noopener noreferrer">Details <i className="fa-solid fa-arrow-up-right-from-square" /></a>
                  </div>
                </article>
                <article className="showcase-project-card">
                  <img src={digi} alt="Digiscribe preview" />
                  <div className="showcase-project-copy">
                    <span className="showcase-index">02 / Web</span>
                    <h3>Digiscribe</h3>
                    <p>A responsive website for Digiscribe Transcription Corp. with a clear, modern, and user-friendly interface.</p>
                    <a href="https://www.digiscribeasiapacific.com/" target="_blank" rel="noopener noreferrer">Details <i className="fa-solid fa-arrow-up-right-from-square" /></a>
                  </div>
                </article>
                <article className="showcase-project-card">
                  <img src={vicmar} alt="Vicmar Homes preview" />
                  <div className="showcase-project-copy">
                    <span className="showcase-index">03 / Web</span>
                    <h3>Vicmar Homes</h3>
                    <p>Website improvements, property listing fixes, and a direct contact feature for unit availability.</p>
                    <a href="http://vicmarhomes.com/" target="_blank" rel="noopener noreferrer">Details <i className="fa-solid fa-arrow-up-right-from-square" /></a>
                  </div>
                </article>
              </div>
            )}

{showcaseTab === 'certifications' && (
  <div className="certification-showcase">
    <div className="certification-carousel">
      <button type="button" className="certification-arrow certification-arrow-prev" aria-label="Previous certification" onClick={() => setCertificationIndex((current) => (current + certifications.length - 1) % certifications.length)}>
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
      </button>
      {certifications.map((certification, index) => {
        const offset = (index - certificationIndex + certifications.length) % certifications.length;
        const position = offset === 0
          ? 'active'
          : offset === certifications.length - 1
            ? 'previous'
            : offset === 1
              ? 'next'
              : 'hidden';

        return (
          <button
            className={`certification-card ${position}`}
            type="button"
            key={certification.name}
            onClick={() => setSelectedCertification(certification)}
            aria-label={`Preview ${certification.name}`}
          >
            <img src={certification.image} alt={`${certification.name} certificate preview`} />
            <h3>{certification.name}</h3>
          </button>
        );
      })}
      <button type="button" className="certification-arrow certification-arrow-next" aria-label="Next certification" onClick={() => setCertificationIndex((current) => (current + 1) % certifications.length)}>
        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
      </button>
    </div>
    <div className="certification-dots" aria-label="Certification carousel position">
      {certifications.map((certification, index) => (
        <button
          key={certification.name}
          type="button"
          className={certificationIndex === index ? 'active' : ''}
          aria-label={`Show certification ${index + 1}`}
          onClick={() => setCertificationIndex(index)}
        />
      ))}
    </div>
  </div>
)}

{selectedCertification && (
  <div className="certificate-modal-backdrop" role="presentation" onClick={() => setSelectedCertification(null)}>
    <div
      className="certificate-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedCertification.name} preview`}
      onClick={(event) => event.stopPropagation()}
    >
      <button type="button" className="modal-close" onClick={() => setSelectedCertification(null)} aria-label="Close certificate preview">
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
      <img src={selectedCertification.image} alt={`${selectedCertification.name} enlarged preview`} />
      <h3>{selectedCertification.name}</h3>
      <p className="certificate-modal-desc">{selectedCertification.description}</p>
    </div>
  </div>
)}

{showcaseTab === 'techstack' && (
  <div className="techstack-panel">
    <div className="tech-category" style={{ '--i': 0 }}>
      <p className="tech-category-title">Frontend</p>
      <ul className="tech-list">
        <li>HTML</li><li>CSS</li><li>JavaScript (JS)</li><li>JSX</li><li>React</li><li>Vite</li>
      </ul>
    </div>
    <div className="tech-category" style={{ '--i': 1 }}>
      <p className="tech-category-title">Backend</p>
      <ul className="tech-list">
        <li>Python</li><li>Java</li><li>Node.js</li><li>REST APIs</li><li>SQL</li>
      </ul>
    </div>
    <div className="tech-category" style={{ '--i': 2 }}>
      <p className="tech-category-title">Development Tools</p>
      <ul className="tech-list">
        <li>Git</li><li>GitHub</li><li>VS Code</li><li>Claude Code</li><li>OpenAI Codex</li>
      </ul>
    </div>
    <div className="tech-category" style={{ '--i': 3 }}>
      <p className="tech-category-title">Networking / Other Technical</p>
      <ul className="tech-list">
        <li>Cisco / Cisco Packet Tracer</li>
      </ul>
    </div>
    <div className="tech-category" style={{ '--i': 4 }}>
      <p className="tech-category-title">Productivity</p>
      <ul className="tech-list">
        <li>Microsoft Word</li><li>Microsoft Excel</li>
      </ul>
    </div>
    <div className="tech-category" style={{ '--i': 5 }}>
      <p className="tech-category-title">AI Tools</p>
      <ul className="tech-list">
        <li>ChatGPT / GPT</li><li>Claude Code</li><li>OpenAI Codex</li>
      </ul>
    </div>
  </div>
)}
          </section>

          <section id="contact" aria-labelledby="contact-heading">
            <div className="contact-card" data-reveal>
              <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Get in touch</p>
              <h2 className="contact-heading" id="contact-heading">Let's build<br />something great.</h2>
              <p className="contact-sub">
                Whether you have a project in mind, a role to discuss, or just want to say hello, my inbox is always open.
              </p>
              <button type="button" className="btn-primary" onClick={openContactModal}>
                <i className="fa-regular fa-paper-plane" aria-hidden="true" />
                Say Hello
              </button>
            </div>
          </section>
        </div>
      </main>

      {isContactOpen && (
        <div className="contact-modal-backdrop" role="presentation" onClick={closeContactModal}>
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={closeContactModal} aria-label="Close contact dialog">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>

            <p className="section-eyebrow">Contact form</p>
            <h3 id="contact-modal-title">Get in touch</h3>
            <p className="modal-copy">
              Share a few details below and I’ll receive your message directly in my inbox.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                <span>Address</span>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Your address"
                  required
                />
              </label>

              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me what you need"
                  rows="5"
                  required
                />
              </label>

              <button type="submit" className="btn-primary form-submit">
                <i className="fa-regular fa-paper-plane" aria-hidden="true" />
                Get in Touch
              </button>
            </form>
          </div>
        </div>
      )}

      {isCvOpen && (
        <div className="cv-modal-backdrop" role="presentation" onClick={closeCvModal}>
          <div
            className="cv-modal"
            role="dialog"
            aria-modal="true"
            aria-label="CV Preview"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={closeCvModal} aria-label="Close CV preview">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
            <span className="cv-modal-label">CV Preview</span>
            <div className="cv-preview">
              <img src={profile} alt="Lanz Sandoval CV preview" />
            </div>
            <a className="btn-primary cv-download" href="/Lanz-Sandoval-CV.pdf" download>
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-inner">
          <p className="footer-copy">©2026 Lanz Errol P. Sandoval. All rights reserved.</p>
          <nav className="footer-social" aria-label="Footer social links">
            <a href="https://github.com/sndvl-git" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/lanz-sandoval-12b876416/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://ph.jobstreet.com/profile/me" target="_blank" rel="noopener noreferrer">Jobstreet</a>
            <a href="https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-homepage--homepage-frontend" target="_blank" rel="noopener noreferrer">Indeed</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
