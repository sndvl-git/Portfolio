import { useEffect, useState } from 'react';
import './styles.css';
import profile from "./assets/muka.png";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
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

    const revealEls = document.querySelectorAll('#about, #projects, #contact, [data-reveal]');
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
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const closeNav = () => setNavOpen(false);
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
        <div className="loader-name" aria-hidden="true">Lanz Sandoval</div>
        <div className="loader-bar-wrap" aria-hidden="true">
          <div className="loader-bar" />
        </div>
      </div>
      
      <header id="site-header">
        
        <div className="header-inner">
          <a href="#hero" className="logo">LS<span>.</span></a>
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
            <a href="#hero" onClick={closeNav}>Home</a>
            <a href="#about" onClick={closeNav}>About</a>
            <a href="#projects" onClick={closeNav}>Projects</a>
            <a href="#contact" onClick={closeNav}>Contact</a>
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
              Contact Me
            </button>
          </div>
        </div>
      </header>

      <section id="hero" aria-labelledby="hero-name">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-name" id="hero-name">
              Lanz <span className="accent-word">Sandoval</span>
            </h1>

            <p className="hero-role">Computer Engineer <span>·</span> 2026</p>

            <p className="hero-title">
              Building smart solutions for the physical and digital world, with curiosity, care, and a focus on making technology genuinely useful for people.
            </p>

            <div className="hero-actions">
              <a className="btn-primary" href="#projects">
                Explore Projects
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </a>
              <button type="button" className="btn-outline" onClick={() => setIsCvOpen(true)}>
                Download CV
                <i className="fa-solid fa-download" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className="hero-photo-wrap"
            id="hero-photo"
          >
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
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Featured Work</p>
                <h2 className="section-heading" id="projects-heading">Recent Projects</h2>
              </div>
              <a href="#projects" className="view-all">View all <i className="fa-solid fa-arrow-right" /></a>
            </div>

            <div className="projects-grid">

              <article className="project-card" data-reveal>
                <div className="project-top">
                  <div className="project-icon"><i className="fa-solid fa-water"></i></div>
                  <div className="project-links">
                    <a href="https://water-monitoring-dashboard-six.vercel.app/" aria-label="Live demo"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                  </div>
                </div>
                <h3 className="project-name">Smart Pipeline Monitor</h3>
                <p className="project-desc">IoT-based real-time leak detection system for water pipelines using flow sensors, microcontroller processing, and GSM-based SMS alerts.</p>
                <div className="project-tags">
                  <span className="tag">ESP32</span>
                  <span className="tag">IoT</span>
                  <span className="tag">Sensors</span>
                  <span className="tag">GSM</span>
                </div>
              </article>
              
              <article className="project-card" data-reveal>
                <div className="project-top">
                  <div className="project-icon"><i className="fa-solid fa-wrench"></i></div>
                </div>
                <h3 className="project-name">Hardware Troubleshooting</h3>
                <p className="project-desc">Hands-on experience with computer repair, diagnostics, and network infrastructure — PC maintenance, laptop troubleshooting, and ethernet setup.</p>
                <div className="project-tags">
                  <span className="tag">PC Repair</span>
                  <span className="tag">Networking</span>
                  <span className="tag">Hardware</span>
                </div>
              </article>
              
              <article className="project-card" data-reveal>
                <div className="project-top">
                  <div className="project-icon"><i className="fa-solid fa-chart-line" /></div>
                  <div className="project-links">
                    <a href="#" aria-label="GitHub repo"><i className="fa-brands fa-github" /></a>
                    <a href="http://vicmarhomes.com/" aria-label="Live demo"><i className="fa-solid fa-arrow-up-right-from-square" /></a>
                  </div>
                </div>
                <h3 className="project-name">Vicmar Homes</h3>
                <p className="project-desc">Fixed and debugged property listings on the website, added a contact feature to reach the CEO directly for unit availability, and implemented several UI tweaks.</p>
                <div className="project-tags">
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">React</span>
                </div>
              </article>

              <article className="project-card" data-reveal>
                <div className="project-top">
                  <div className="project-icon"><i className="fa-solid fa-terminal" /></div>
                  <div className="project-links">
                    <a href="#" aria-label="GitHub repo"><i className="fa-brands fa-github" /></a>
                    <a href="https://www.digiscribeasiapacific.com/" aria-label="Live demo"><i className="fa-solid fa-arrow-up-right-from-square" /></a>
                  </div>
                </div>
                <h3 className="project-name">Digiscribe</h3>
                <p className="project-desc">Developed a responsive website for Digiscribe Transcription Corp., implementing modern web design practices and user-friendly interfaces.</p>
                <div className="project-tags">
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                  <span className="tag">React</span>
                </div>
              </article>
            </div>
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
