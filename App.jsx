import { useEffect, useState } from 'react';
import './styles.css';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('site-header');
    const heroPhoto = document.getElementById('hero-photo');
    const heroName = document.querySelector('.hero-name');
    const heroLocation = document.querySelector('.hero-location');
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

    const revealEls = document.querySelectorAll('#about, #projects, #contact');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

    const mainTimer = window.setTimeout(triggerEntrance, 2400);
    const fallbackTimer = window.setTimeout(triggerEntrance, 3500);

    return () => {
      window.clearTimeout(mainTimer);
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  const closeNav = () => setNavOpen(false);

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

          <a href="#contact" className="btn-contact" onClick={closeNav}>
            <i className="fa-regular fa-paper-plane" aria-hidden="true" />
            Contact Me
          </a>
        </div>
      </header>

      <main>
        <div className="page-wrapper">
          <section id="hero" aria-labelledby="hero-name">
            <div className="hero-inner">
              <div className="hero-photo-wrap" id="hero-photo" aria-hidden="true">
                <div className="hero-photo-ring">
                  <img
                    src="/assets/muka.png"
                    alt="Lanz Sandoval — profile photo"
                    width="240"
                    height="240"
                  />
                </div>
                <div className="status-badge">
                  <span className="status-dot" />
                  Open to work
                </div>
              </div>

              <div className="hero-text">
                <h1 className="hero-name" id="hero-name">
                  Lanz<br />
                  <span className="accent-word">Sandoval</span>
                </h1>

                <p className="hero-location">
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                 Bauan Batangas, Philippines &nbsp;·&nbsp; UTC−8
                </p>

                <div className="hero-title">
                  Software Engineer
                  <span className="title-chip">Fresh Graduate</span>
                </div>

                <div className="hero-social" aria-label="Social links">
                  <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fa-brands fa-github" />
                  </a>
                  <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                  <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                    <i className="fa-brands fa-x-twitter" />
                  </a>
                  <a href="mailto:lanzerrol.sandoval@gmail.com" className="social-link" aria-label="Email">
                    <i className="fa-regular fa-envelope" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="about" aria-labelledby="about-heading">
            <div className="about-grid">
              <div>
                <p className="section-eyebrow">About Me</p>
                <h2 className="about-heading" id="about-heading">
                  I create things<br />for the web.
                </h2>
                <p className="about-para">
                  I'm a <strong>full-stack software engineer</strong> based in San Francisco with a passion for crafting performant, accessible, and beautifully designed digital experiences. I specialize in the intersection of engineering rigor and thoughtful UX.
                </p>
                <p className="about-para">
                  Over the past five years I've shipped production systems across startups and mid-size companies — from real-time collaborative editors to high-throughput data pipelines. I care deeply about code that lasts: <strong>well-tested, well-documented, and well-reasoned</strong>.
                </p>
                <p className="about-para">
                  When I'm not at the keyboard, you'll find me hiking coastal trails, contributing to open-source, or nerding out about type design.
                </p>
                <p className="skills-label">Core toolkit</p>
                <div className="skill-chips">
                  <span className="chip">TypeScript</span>
                  <span className="chip">React</span>
                  <span className="chip">Next.js</span>
                  <span className="chip">Node.js</span>
                  <span className="chip">PostgreSQL</span>
                  <span className="chip">Go</span>
                  <span className="chip">Docker</span>
                  <span className="chip">AWS</span>
                </div>
              </div>

              <div className="about-stats" aria-label="Career highlights">
                <div className="stat-card">
                  <div className="stat-icon"><i className="fa-solid fa-rocket" /></div>
                  <div>
                    <div className="stat-num">30+</div>
                    <div className="stat-desc">Production projects shipped across SaaS, fintech, and developer tooling</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon"><i className="fa-solid fa-star" /></div>
                  <div>
                    <div className="stat-num">4.2k</div>
                    <div className="stat-desc">GitHub stars across open-source libraries and developer tools</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon"><i className="fa-solid fa-users" /></div>
                  <div>
                    <div className="stat-num">12</div>
                    <div className="stat-desc">Engineers mentored and onboarded at previous roles</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-heading">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Featured Work</p>
                <h2 className="section-heading" id="projects-heading">Selected Projects</h2>
              </div>
              <a href="#" className="view-all">View all <i className="fa-solid fa-arrow-right" /></a>
            </div>

            <div className="projects-grid">

              <article className="project-card">
                <div className="project-top">
                  <div className="project-icon"><i className="fa-solid fa-chart-line" /></div>
                  <div className="project-links">
                    <a href="#" aria-label="GitHub repo"><i className="fa-brands fa-github" /></a>
                    <a href="#" aria-label="Live demo"><i className="fa-solid fa-arrow-up-right-from-square" /></a>
                  </div>
                </div>
                <h3 className="project-name">Vicmar Homes</h3>
                <p className="project-desc">Find your dream home with Vicmar Homes — where tradition meets modern Filipino living.</p>
                <div className="project-tags">
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">React</span>
                </div>
              </article>

              <article className="project-card">
                <div className="project-top">
                  <div className="project-icon"><i className="fa-solid fa-terminal" /></div>
                  <div className="project-links">
                    <a href="#" aria-label="GitHub repo"><i className="fa-brands fa-github" /></a>
                    <a href="#" aria-label="Live demo"><i className="fa-solid fa-arrow-up-right-from-square" /></a>
                  </div>
                </div>
                <h3 className="project-name">Digiscribe</h3>
                <p className="project-desc">A Philippine-based Medical Transcription Company Serving the Information Technology Enabled Services (ITES) Sector.</p>
                <div className="project-tags">
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                  <span className="tag">React</span>
                </div>
              </article>
            </div>
          </section>

          <section id="contact" aria-labelledby="contact-heading">
            <div className="contact-card">
              <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Get in touch</p>
              <h2 className="contact-heading" id="contact-heading">Let's build<br />something great.</h2>
              <p className="contact-sub">
                Whether you have a project in mind, a role to discuss, or just want to say hello — my inbox is always open.
              </p>
              <a href="mailto:lanzerrol.sandoval@gmail.com" className="btn-primary">
                <i className="fa-regular fa-paper-plane" aria-hidden="true" />
                Say Hello
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="footer-inner">
          <p className="footer-copy">©2026 Lanz Errol P. Sandoval. All rights reserved.</p>
          <nav className="footer-social" aria-label="Footer social links">
            <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/lanz-sandoval-12b876416/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Jobstreet</a>
            <a href="mailto:lanzerrol.sandoval@gmail.com">Email</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
