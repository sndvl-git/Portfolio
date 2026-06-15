import { useEffect, useState } from 'react';

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
      <style>{`
        :root {
          --bg:         #0A0F1E;
          --bg-card:    #111827;
          --bg-surface: #1A2235;
          --text:       #F0EDE8;
          --text-muted: #8892A4;
          --accent:     #6366F1;
          --accent-glow:rgba(99,102,241,0.25);
          --amber:      #F59E0B;
          --border:     rgba(255,255,255,0.07);
          --max-w:      1200px;
          --nav-h:      72px;
          --radius:     14px;
          --ease:       cubic-bezier(0.22, 1, 0.36, 1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.7;
          overflow-x: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        .page-wrapper {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
        }

        #preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1.5rem;
        }

        .loader-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          border-right: 3px solid var(--accent);
          width: 0;
          animation: typewriter 1.4s var(--ease) 0.3s forwards,
                     cursor-blink 0.7s step-end 0.3s 4;
        }

        .loader-bar-wrap {
          width: 160px;
          height: 2px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
          opacity: 0;
          animation: fade-in 0.3s ease 1s forwards;
        }

        .loader-bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, var(--accent), var(--amber));
          border-radius: 99px;
          animation: load-fill 1s var(--ease) 1.1s forwards;
        }

        #preloader.fade-out {
          animation: preloader-exit 0.7s var(--ease) forwards;
        }

        @keyframes typewriter {
          from { width: 0; }
          to   { width: 100%; border-color: transparent; }
        }
        @keyframes cursor-blink {
          50% { border-color: transparent; }
        }
        @keyframes load-fill {
          to { width: 100%; }
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
        @keyframes preloader-exit {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.04); pointer-events: none; }
        }

        header {
          position: sticky;
          top: 0;
          z-index: 100;
          height: var(--nav-h);
          background: rgba(10,15,30,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border);
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.6s var(--ease), transform 0.6s var(--ease), background 0.3s ease;
        }

        header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .header-inner {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          color: var(--text);
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo span { color: var(--accent); }

        nav {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 3vw, 2.25rem);
        }

        nav a {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s ease;
          position: relative;
        }

        nav a::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--accent);
          transition: width 0.3s var(--ease);
        }

        nav a:hover { color: var(--text); }
        nav a:hover::after { width: 100%; }

        .btn-contact {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1.25rem;
          background: var(--accent);
          color: #fff;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          flex-shrink: 0;
        }

        .btn-contact:hover {
          background: var(--amber);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245,158,11,0.35);
        }

        .nav-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text);
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
        }

        @media (max-width: 680px) {
          .nav-toggle { display: block; }

          nav.nav-links {
            display: none;
            position: absolute;
            top: var(--nav-h);
            left: 0;
            right: 0;
            background: var(--bg-card);
            border-bottom: 1px solid var(--border);
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem clamp(1.25rem, 4vw, 3rem);
            gap: 1rem;
          }

          nav.nav-links.open { display: flex; }

          .btn-contact { font-size: 0.8125rem; padding: 0.45rem 1rem; }
        }

        main { padding-top: 5rem; }
        section { padding: 5rem 0; }
        section:not(:last-child) { border-bottom: 1px solid var(--border); }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .section-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--accent);
        }

        #hero {
          min-height: calc(100vh - var(--nav-h));
          display: flex;
          align-items: center;
          padding: 4rem 0;
          border-bottom: 1px solid var(--border);
        }

        .hero-inner {
          display: flex;
          align-items: center;
          gap: clamp(2.5rem, 6vw, 5rem);
          width: 100%;
        }

        .hero-photo-wrap {
          flex-shrink: 0;
          position: relative;
          opacity: 0;
          transform: scale(0.88);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }

        .hero-photo-wrap.visible {
          opacity: 1;
          transform: scale(1);
        }

        .hero-photo-ring {
          width: clamp(160px, 22vw, 240px);
          height: clamp(160px, 22vw, 240px);
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, var(--accent), var(--amber));
          position: relative;
        }

        .hero-photo-ring::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: var(--accent-glow);
          filter: blur(18px);
          z-index: -1;
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }

        .hero-photo-ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          background: var(--bg-surface);
        }

        .status-badge {
          position: absolute;
          bottom: 8px;
          right: 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 99px;
          padding: 0.3rem 0.75rem 0.3rem 0.5rem;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          animation: status-pulse 2s ease infinite;
        }

        @keyframes status-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }

        .hero-text { flex: 1; min-width: 0; }

        .hero-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.25rem, 6vw, 4.25rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--text);
          margin-bottom: 0.6rem;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.6s var(--ease) 0.1s, transform 0.6s var(--ease) 0.1s;
        }

        .hero-name.visible { opacity: 1; transform: translateX(0); }
        .hero-name .accent-word { color: var(--accent); }

        .hero-location {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.6s var(--ease) 0.22s, transform 0.6s var(--ease) 0.22s;
        }

        .hero-location.visible { opacity: 1; transform: translateX(0); }
        .hero-location i { color: var(--accent); font-size: 0.8rem; }

        .hero-title {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Syne', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.6s var(--ease) 0.34s, transform 0.6s var(--ease) 0.34s;
        }

        .hero-title.visible { opacity: 1; transform: translateX(0); }

        .title-chip {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0.2rem 0.6rem;
          font-size: 0.75rem;
          color: var(--accent);
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .hero-social {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.6s var(--ease) 0.46s, transform 0.6s var(--ease) 0.46s;
        }

        .hero-social.visible { opacity: 1; transform: translateX(0); }

        .social-link {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 1rem;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .social-link:hover {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
          transform: translateY(-3px);
        }

        @media (max-width: 640px) {
          .hero-inner {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            gap: 2rem;
          }

          .hero-photo-ring {
            width: 120px;
            height: 120px;
          }
        }

        #about {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.75s var(--ease), transform 0.75s var(--ease);
        }

        #about.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .about-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 1.5rem;
        }

        .about-para {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.85;
          margin-bottom: 1rem;
        }

        .about-para strong { color: var(--text); font-weight: 500; }

        .skills-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
        }

        .skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .chip {
          padding: 0.3rem 0.8rem;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 99px;
          font-size: 0.8125rem;
          color: var(--text-muted);
          font-weight: 500;
          transition: border-color 0.2s, color 0.2s;
        }

        .chip:hover { border-color: var(--accent); color: var(--accent); }

        .about-stats {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .stat-card:hover {
          border-color: var(--accent);
          transform: translateX(4px);
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--accent-glow);
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--accent);
          font-size: 1rem;
        }

        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--text);
        }

        .stat-desc {
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        @media (max-width: 780px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        #projects {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.75s var(--ease), transform 0.75s var(--ease);
        }

        #projects.visible { opacity: 1; transform: translateY(0); }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .section-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .view-all {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--accent);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          flex-shrink: 0;
          transition: gap 0.2s ease;
        }

        .view-all:hover { gap: 0.6rem; }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
          gap: 1.5rem;
        }

        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }

        .project-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(99,102,241,0.15);
        }

        .project-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .project-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: var(--accent-glow);
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          font-size: 1rem;
        }

        .project-links { display: flex; gap: 0.5rem; }

        .project-links a {
          color: var(--text-muted);
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s;
        }

        .project-links a:hover { color: var(--text); }

        .project-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.01em;
        }

        .project-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.7;
          flex: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
        }

        .tag {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          background: rgba(99,102,241,0.12);
          color: var(--accent);
        }

        #contact {
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.75s var(--ease), transform 0.75s var(--ease);
        }

        #contact.visible { opacity: 1; transform: translateY(0); }

        .contact-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: clamp(2.5rem, 6vw, 4.5rem) clamp(2rem, 6vw, 5rem);
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: -60%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .contact-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .contact-sub {
          font-size: 1rem;
          color: var(--text-muted);
          max-width: 480px;
          margin: 0 auto 2.5rem;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          background: var(--accent);
          color: #fff;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }

        .btn-primary:hover {
          background: var(--amber);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(245,158,11,0.4);
        }

        footer {
          border-top: 1px solid var(--border);
          padding: 2rem 0;
        }

        .footer-inner {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-copy {
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .footer-social {
          display: flex;
          gap: 1rem;
        }

        .footer-social a {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-social a:hover { color: var(--text); }

        ::selection {
          background: rgba(99,102,241,0.35);
          color: var(--text);
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--bg-surface); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent); }
      `}</style>

      <div id="preloader" role="status" aria-label="Loading">
        <div className="loader-name" aria-hidden="true">Lanz Sandoval</div>
        <div className="loader-bar-wrap" aria-hidden="true">
          <div className="loader-bar" />
        </div>
      </div>

      <header id="site-header">
        <div className="header-inner">
          <a href="#hero" className="logo">ar<span>.</span></a>

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
                    src="assets\muka.png"
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
