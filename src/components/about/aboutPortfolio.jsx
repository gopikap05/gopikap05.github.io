import { useEffect, useRef, useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  .ab-root {
    font-family: 'Syne', sans-serif;
    background: #050505;
    color: #e8e8e0;
    min-height: 100vh;
    padding: clamp(60px,10vw,130px) clamp(24px,6vw,96px);
    position: relative;
    overflow: hidden;
  }

  /* grain */
  .ab-root::before {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    z-index: 0;
  }

  .ab-inner {
    max-width: 1350px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── header ── */
  .ab-header {
    margin-bottom: 80px;
    position: relative;
  }

  .ab-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #444;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .ab-eyebrow::before {
    content: '';
    display: block;
    width: 28px; height: 1px;
    background: #444;
  }

  .ab-title {
    font-size: clamp(36px, 5.5vw, 72px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin: 0;
  }
  .ab-title span {
    color: transparent;
    -webkit-text-stroke: 1px #333;
  }

  .ab-ghost {
    font-family: 'DM Mono', monospace;
    font-size: clamp(80px, 14vw, 160px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #111;
    position: absolute;
    right: -10px; top: -20px;
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
  }

  /* ── bento grid ── */
  .ab-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    gap: 16px;
  }

  /* ── block base ── */
  .ab-block {
    border: 1px solid #111;
    border-radius: 16px;
    padding: 36px;
    background: #070707;
    position: relative;
    overflow: hidden;
    transition: border-color 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .ab-block::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(200,255,0,0.04), transparent 55%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }
  .ab-block:hover { border-color: #1e1e1e; transform: translateY(-4px); }
  .ab-block:hover::before { opacity: 1; }

  /* grid placement */
  .ab-block-typo  { grid-column: span 5; }
  .ab-block-color { grid-column: span 7; }
  .ab-block-tech  { grid-column: span 7; }
  .ab-block-impl  { grid-column: span 5; }

  @media (max-width: 900px) {
    .ab-block-typo,
    .ab-block-color,
    .ab-block-tech,
    .ab-block-impl { grid-column: span 12; }
  }

  /* ── block header ── */
  .ab-block-label {
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ab-block-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #151515;
  }

  .ab-block-title {
    font-size: 36px;
    font-weight: 700;
    margin: 0 0 16px;
    letter-spacing: -0.02em;
    color: #e8e8e0;
  }

  .ab-block-body {
    font-size: 18px;
    color: #888;
    line-height: 1.85;
  }

  /* ── typography block ── */
  .ab-font-showcase {
    margin-top: 24px;
    padding: 20px;
    border: 1px solid #111;
    border-radius: 10px;
    background: #050505;
  }
  .ab-font-name {
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    color: #555;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .ab-font-display {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
    color: #e8e8e0;
  }
  .ab-font-display-mono {
    font-family: 'DM Mono', monospace;
    font-size: 18px;
    font-weight: 300;
    color: #444;
    margin-top: 6px;
    letter-spacing: 0.05em;
  }

  /* ── original color buttons (preserved exactly) ── */
  .container-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }
  .item-color {
    width: 55px;
    height: 55px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    background: var(--color);
    cursor: pointer;
    position: relative;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
    outline: none;
  }
  .item-color:hover {
    transform: translateY(-8px) scale(1.14);
    box-shadow: 0 12px 32px color-mix(in srgb, var(--color) 50%, transparent);
  }
  .item-color::after {
    content: attr(aria-label);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: #111;
    border: 1px solid #2a2a2a;
    color: #bbb;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.06em;
    padding: 6px 12px;
    border-radius: 8px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }
  .item-color:hover::after { opacity: 1; }

  /* ── tech block ── */
  .ab-tech-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 24px;
  }
  .ab-tech-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    border: 1px solid #111;
    border-radius: 10px;
    background: #050505;
    transition: border-color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    cursor: default;
  }
  .ab-tech-item:hover {
    border-color: #222;
    transform: translateY(-3px);
  }
  .ab-tech-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #E6E6FA;
    flex-shrink: 0;
    box-shadow: 0 0 6px #E6E6FA88;
  }
  .ab-tech-name {
    font-family: 'DM Mono', monospace;
    font-size: 16px;
    color: #888;
    letter-spacing: 0.04em;
  }
  .ab-tech-tag {
    margin-left: auto;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #444;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── impl block ── */
  .ab-impl-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }
  .ab-impl-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid #0e0e0e;
    transition: padding-left 0.3s ease;
    cursor: default;
  }
  .ab-impl-item:last-child { border-bottom: none; }
  .ab-impl-item:hover { padding-left: 6px; }
  .ab-impl-item:hover .ab-impl-arrow { color: #E6E6FA; }
  .ab-impl-arrow {
    font-size: 16px;
    color: #333;
    transition: color 0.3s;
    flex-shrink: 0;
  }
  .ab-impl-text {
    font-size: 18px;
    color: #888;
  }

  /* ── reveal ── */
  .ab-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .ab-reveal.visible { opacity: 1; transform: none; }
`;

const TECH = [
  { name: "React", tag: "UI" },
  { name: "Vite", tag: "Build" },
  { name: "Material UI", tag: "Design" },
  { name: "Framer Motion", tag: "Anim" },
  { name: "Redux Toolkit", tag: "State" },
  { name: "React Router", tag: "Route" },
  { name: "JavaScript ES6+", tag: "Lang" },
  { name: "CSS3 / HTML5", tag: "Base" },
];

const IMPL = [
  "Modular folder architecture",
  "Reusable UI components",
  "Responsive layout strategy",
  "3D hover interactions",
  "Smooth motion transitions",
];

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
    <div ref={ref} className="ab-reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function Block({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };
  return (
    <div ref={ref} className={`ab-block ${className}`} style={style} onMouseMove={onMove}>
      {children}
    </div>
  );
}

function AboutPortfolio() {
  useEffect(() => {
    if (document.getElementById("ab-styles")) return;
    const tag = document.createElement("style");
    tag.id = "ab-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <section className="ab-root">
      <div className="ab-inner">

        {/* ── Header ── */}
        <div className="ab-header">
          <div className="ab-ghost">SYS</div>
          <Reveal>
            <p className="ab-eyebrow">About this portfolio</p>
            <h2 className="ab-title">Design &amp; <span>Build</span><br />System</h2>
          </Reveal>
        </div>

        {/* ── Bento Grid ── */}
        <div className="ab-grid">

          {/* Typography */}
          <Reveal delay={0} style={{ gridColumn: "span 5" }}>
            <Block className="ab-block-typo">
              <p className="ab-block-label">01 — typography</p>
              <h3 className="ab-block-title">Type System</h3>
              <p className="ab-block-body">
                Bold headings establish hierarchy. Controlled letter spacing
                ensures consistent navigation and section identity.
              </p>

              <div className="ab-font-showcase">
                <p className="ab-font-name">Display — Syne</p>
                <p className="ab-font-display">Aa Bb Cc</p>
              </div>
              <div className="ab-font-showcase" style={{ marginTop: 10 }}>
                <p className="ab-font-name">Mono — DM Mono</p>
                <p className="ab-font-display-mono">0123 abcdef</p>
              </div>
            </Block>
          </Reveal>

          {/* Color */}
          <Reveal delay={80} style={{ gridColumn: "span 7" }}>
            <Block className="ab-block-color">
              <p className="ab-block-label">02 — color</p>
              <h3 className="ab-block-title">Color System</h3>
              <p className="ab-block-body">
                Dark-first design using layered depth and a single sharp accent.
              </p>

              <div className="container-items">
                <button className="item-color" style={{ "--color": "#ffffff" }} aria-label="#ffffff" />
                <button className="item-color" style={{ "--color": "#aaaaaa" }} aria-label="#aaaaaa" />
                <button className="item-color" style={{ "--color": "#1a1a1a" }} aria-label="#1a1a1a" />
                <button className="item-color" style={{ "--color": "#111111" }} aria-label="#111111" />
                <button className="item-color" style={{ "--color": "#e11d48" }} aria-label="#e11d48" />
                <button className="item-color" style={{ "--color": "#3b82f6" }} aria-label="#3b82f6" />
                <button className="item-color" style={{ "--color": "#8b5cf6" }} aria-label="#8b5cf6" />
                <button className="item-color" style={{ "--color": "#10b981" }} aria-label="#10b981" />
              </div>
            </Block>
          </Reveal>

          {/* Tech Stack */}
          <Reveal delay={120} style={{ gridColumn: "span 7" }}>
            <Block className="ab-block-tech">
              <p className="ab-block-label">03 — stack</p>
              <h3 className="ab-block-title">Tech Stack</h3>
              <p className="ab-block-body">
                Component-based architecture, optimised build tooling, and
                fluid motion.
              </p>

              <div className="ab-tech-list">
                {TECH.map(t => (
                  <div key={t.name} className="ab-tech-item">
                    <span className="ab-tech-dot" />
                    <span className="ab-tech-name">{t.name}</span>
                    <span className="ab-tech-tag">{t.tag}</span>
                  </div>
                ))}
              </div>
            </Block>
          </Reveal>

          {/* Implementation */}
          <Reveal delay={160} style={{ gridColumn: "span 5" }}>
            <Block className="ab-block-impl">
              <p className="ab-block-label">04 — highlights</p>
              <h3 className="ab-block-title">Implementation</h3>
              <p className="ab-block-body">
                Patterns and principles applied throughout this codebase.
              </p>

              <div className="ab-impl-list">
                {IMPL.map(item => (
                  <div key={item} className="ab-impl-item">
                    <span className="ab-impl-arrow">→</span>
                    <span className="ab-impl-text">{item}</span>
                  </div>
                ))}
              </div>
            </Block>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export default AboutPortfolio;