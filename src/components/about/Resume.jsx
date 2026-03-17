import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import resumePreview from "../../assets/resume/resume-preview.jpg";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  .rs-root {
    font-family: 'Syne', sans-serif;
    background: #050505;
    color: #e8e8e0;
    min-height: 100vh;
    padding: clamp(60px,10vw,130px) clamp(24px,6vw,96px);
    position: relative;
    overflow: hidden;
  }

  /* grain */
  .rs-root::before {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    z-index: 0;
  }

  .rs-inner {
    max-width: 1350px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── header ── */
  .rs-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #444;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .rs-eyebrow::before {
    content: '';
    display: block;
    width: 28px; height: 1px;
    background: #444;
  }

  .rs-title {
    font-size: clamp(32px, 5vw, 64px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin: 0 0 80px;
  }
  .rs-title span {
    color: transparent;
    -webkit-text-stroke: 1px #333;
  }

  /* ── ghost ── */
  .rs-ghost {
    font-family: 'DM Mono', monospace;
    font-size: clamp(80px, 14vw, 160px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #111;
    position: absolute;
    right: -10px; top: 40px;
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
  }

  /* ── divider ── */
  .rs-divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
    margin-bottom: 80px;
  }

  /* ── layout ── */
  .rs-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .rs-layout { grid-template-columns: 1fr; gap: 48px; }
  }

  /* ── image side ── */
  .rs-img-wrap {
    position: relative;
  }

  .rs-img-frame {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #141414;
  }
  .rs-img-frame img {
    width: 100%;
    display: block;
    transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
  }
  .rs-img-frame:hover img { transform: scale(1.03); }

  /* overlay scanline on image */
  .rs-img-frame::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
    pointer-events: none;
  }

  /* floating badge on image */
  .rs-img-badge {
    position: absolute;
    bottom: -16px; right: 24px;
    background: #0a0a0a;
    border: 1px solid #1e1e1e;
    border-radius: 12px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 2;
  }
  .rs-img-badge-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #E6E6FA;
    box-shadow: 0 0 8px #E6E6FA88;
    animation: badgePulse 2s infinite;
  }
  @keyframes badgePulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(200,255,0,0.5); }
    50%      { box-shadow: 0 0 0 6px rgba(200,255,0,0); }
  }
  .rs-img-badge-text {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #666;
    letter-spacing: 0.08em;
  }
  .rs-img-badge-text strong {
    color: #E6E6FA;
    font-weight: 400;
  }

  /* corner marks */
  .rs-corner {
    position: absolute;
    width: 12px; height: 12px;
    border-color: #2a2a2a;
    border-style: solid;
    z-index: 3;
    pointer-events: none;
  }
  .rs-corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .rs-corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
  .rs-corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
  .rs-corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

  /* ── content side ── */
  .rs-content {
    padding-top: 8px;
  }

  .rs-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
  }
  .rs-label::before { content: ''; width: 20px; height: 1px; background: #333; }

  .rs-bio {
    font-size: 18px;
    color: #777;
    line-height: 1.85;
    margin-bottom: 48px;
  }

  /* ── stats row ── */
  .rs-stats {
    display: flex;
    gap: 40px;
    margin-bottom: 48px;
    flex-wrap: wrap;
  }
  .rs-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .rs-stat-num {
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #e8e8e0;
    line-height: 1;
  }
  .rs-stat-num span { color: #E6E6FA; }
  .rs-stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #444;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  /* ── download button ── */
  .rs-btn-wrap { display: inline-block; }

  .rs-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 36px;
    background: #e8e8e0;
    color: #050505;
    border: none;
    border-radius: 100px;
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.01em;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
    position: relative;
    overflow: hidden;
  }
  .rs-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: #E6E6FA;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    z-index: 0;
  }
  .rs-btn:hover::before { transform: scaleX(1); }
  .rs-btn:hover { box-shadow: 0 12px 40px rgba(200,255,0,0.2); transform: translateY(-3px); }
  .rs-btn span, .rs-btn svg { position: relative; z-index: 1; }

  .rs-btn-icon {
    width: 20px; height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.1);
    border-radius: 50%;
    padding: 4px;
    flex-shrink: 0;
  }

  /* secondary link */
  .rs-view-link {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #444;
    text-decoration: none;
    letter-spacing: 0.08em;
    margin-left: 28px;
    position: relative;
    transition: color 0.3s;
  }
  .rs-view-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: #E6E6FA;
    transition: width 0.35s ease;
  }
  .rs-view-link:hover { color: #E6E6FA; }
  .rs-view-link:hover::after { width: 100%; }

  /* ── skills tags ── */
  .rs-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 48px;
    padding-top: 40px;
    border-top: 1px solid #111;
  }
  .rs-skill {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #555;
    letter-spacing: 0.06em;
    padding: 8px 16px;
    border: 1px solid #1a1a1a;
    border-radius: 100px;
    background: #0a0a0a;
    transition: border-color 0.3s, color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    cursor: default;
  }
  .rs-skill:hover {
    border-color: #2a2a2a;
    color: #888;
    transform: translateY(-3px);
  }

  /* reveal */
  .rs-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .rs-reveal.visible { opacity: 1; transform: none; }
`;

const SKILLS = ["React", "TypeScript", "JavaScript ES6+", "Material UI", "Framer Motion", "Redux Toolkit", "REST APIs", "Vite", "CSS3", "Responsive Design"];

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="rs-reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function Resume() {
  useEffect(() => {
    if (document.getElementById("rs-styles")) return;
    const tag = document.createElement("style");
    tag.id = "rs-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <section className="rs-root">
      <div className="rs-inner">

        {/* ── Header ── */}
        <div style={{ position: "relative" }}>
          <div className="rs-ghost">CV</div>
          <Reveal>
            <p className="rs-eyebrow">Resume</p>
            <h2 className="rs-title">
              Professional<br /><span>Journey</span>
            </h2>
          </Reveal>
        </div>

        <div className="rs-divider" />

        {/* ── Layout ── */}
        <div className="rs-layout">

          {/* Image */}
          <Reveal delay={0}>
            <div className="rs-img-wrap">
              <div className="rs-img-frame">
                <div className="rs-corner rs-corner-tl" />
                <div className="rs-corner rs-corner-tr" />
                <div className="rs-corner rs-corner-bl" />
                <div className="rs-corner rs-corner-br" />
                <img src={resumePreview} alt="Resume Preview" />
              </div>

              {/* floating badge */}
              <div className="rs-img-badge">
                <div className="rs-img-badge-dot" />
                <span className="rs-img-badge-text">
                  <strong>Available</strong> for opportunities
                </span>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={120}>
            <div className="rs-content">
              <p className="rs-label">About me</p>

              <p className="rs-bio">
                Experienced frontend developer with a strong foundation in
                scalable architecture, performance optimization, and
                production-ready UI systems. Skilled in React, TypeScript,
                API integrations, and maintaining enterprise-level applications.
              </p>

              {/* Stats */}
              <div className="rs-stats">
                <div className="rs-stat">
                  <span className="rs-stat-num">40<span>+</span></span>
                  <span className="rs-stat-label">Projects</span>
                </div>
                <div className="rs-stat">
                  <span className="rs-stat-num">2<span>+</span></span>
                  <span className="rs-stat-label">Years Exp.</span>
                </div>
                <div className="rs-stat">
                  <span className="rs-stat-num">2</span>
                  <span className="rs-stat-label">Companies</span>
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <a
                  href="/resume/Gopika-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rs-btn"
                >
                  <span>Download CV</span>
                  <span className="rs-btn-icon">
                    <svg viewBox="0 0 100 100" width="14" height="14" fill="currentColor">
                      <path d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z" />
                    </svg>
                  </span>
                </a>

                <a
                  href="/resume/Gopika-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rs-view-link"
                >
                  View online ↗
                </a>
              </div>

              {/* Skills */}
              <div className="rs-skills">
                {SKILLS.map(s => (
                  <span key={s} className="rs-skill">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export default Resume;