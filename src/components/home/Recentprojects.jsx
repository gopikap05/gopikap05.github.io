import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../../data/projects";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

  .rp-root {
    font-family: 'Syne', sans-serif;
    background: #050505;
    color: #e8e8e0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(80px,12vw,160px) clamp(24px,6vw,96px);
    position: relative;
    overflow: hidden;
    border-top: 1px solid #0e0e0e;
    border-bottom: 1px solid #0e0e0e;
  }

  /* grain */
  .rp-root::before {
    content: '';
    position: absolute; inset: 0;
    pointer-events: none;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    z-index: 0;
  }

  /* ghost */
  .rp-ghost {
    font-family: 'DM Mono', monospace;
    font-size: clamp(100px, 18vw, 220px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #0d0d0d;
    position: absolute;
    top: -20px; right: -10px;
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
    z-index: 0;
  }

  .rp-inner {
    width: 100%;
    max-width: 1400px;
    position: relative;
    z-index: 1;
  }

  /* ── header ── */
  .rp-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #555;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .rp-eyebrow::before {
    content: '';
    display: block; width: 28px; height: 1px; background: #555;
  }

  .rp-title {
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin: 0 0 80px;
    color: #e8e8e0;
  }
  .rp-title span {
    color: transparent;
    -webkit-text-stroke: 1px #444;
  }

  /* ── grid ── */
  .rp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 80px;
  }
  @media (max-width: 900px) {
    .rp-grid { grid-template-columns: 1fr; }
  }

  /* ── flip card (preserved, reskinned) ── */
  .flip-card {
    perspective: 1200px;
    text-decoration: none;
    height: 100%;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    min-height: 300px;
    transform-style: preserve-3d;
    transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 16px;
    padding: 36px;
    border: 1px solid #111;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .flip-card-front {
    background: #0a0a0a;
    gap: 12px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.4s;
    border-color: #1a1a1a;
  }
  .flip-card-front::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(200,255,0,0.04), transparent 60%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }
  .flip-card:hover .flip-card-front::before { opacity: 1; }
  .flip-card:hover .flip-card-front { border-color: #1e1e1e; }

  .flip-card-back {
    transform: rotateY(180deg);
    background: #E6E6FA;
    color: #050505;
    align-items: center;
    justify-content: center;
    border-color: #E6E6FA;
  }

  /* card number */
  .rp-card-num {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #444;
    letter-spacing: 0.12em;
    margin-bottom: 8px;
  }

  /* card arrow */
  .rp-card-arrow {
    position: absolute;
    top: 28px; right: 28px;
    font-size: 18px;
    color: #333;
    transition: color 0.3s, transform 0.3s;
  }
  .flip-card:hover .rp-card-arrow {
    color: #E6E6FA;
    transform: translate(3px, -3px);
  }

  /* card title */
  .rp-card-title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #e8e8e0;
    padding-right: 28px;
    margin: 0;
  }

  /* card company */
  .rp-card-company {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #666;
    letter-spacing: 0.06em;
    margin: 0;
  }

  /* card desc */
  .rp-card-desc {
    font-size: 15px;
    color: #888;
    line-height: 1.8;
    margin: 0;
  }

  /* status badge */
  .rp-badge {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 100px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
  }
  .rp-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; }
  .rp-badge.active {
    background: rgba(200,255,0,0.07);
    color: #E6E6FA;
    border: 1px solid rgba(200,255,0,0.18);
  }
  .rp-badge.active::before { background: #E6E6FA; animation: rp-pulse 2s infinite; }
  .rp-badge.inactive {
    background: rgba(255,80,80,0.07);
    color: #ff5050;
    border: 1px solid rgba(255,80,80,0.18);
  }
  .rp-badge.inactive::before { background: #ff5050; }
  @keyframes rp-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(200,255,0,0.5); }
    50%      { box-shadow: 0 0 0 5px rgba(200,255,0,0); }
  }

  /* back label */
  .rp-back-label {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #050505;
  }
  .rp-back-arrow {
    font-size: 28px;
    margin-top: 12px;
    color: #050505;
  }

  /* ── animated button ── */
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 16px 36px;
    border: 1px solid #2a2a2a;
    background-color: #050505;
    border-radius: 100px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 400;
    color: #888;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button svg {
    position: absolute;
    width: 20px;
    fill: #777;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .ab-arr-1 { right: 16px; }
  .animated-button .ab-arr-2 { left: -25%; }

  .animated-button .ab-circle {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 20px; height: 20px;
    background-color: #E6E6FA;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .ab-text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button:hover {
    color: #050505;
    border-radius: 12px;
    border-color: #E6E6FA;
  }

  .animated-button:hover .ab-arr-1 { right: -25%; }
  .animated-button:hover .ab-arr-2 { left: 16px; }
  .animated-button:hover .ab-text { transform: translateX(12px); }
  .animated-button:hover svg { fill: #050505; }

  .animated-button:hover .ab-circle {
    width: 260px;
    height: 260px;
    opacity: 1;
  }

  .animated-button:active { transform: scale(0.95); }

  /* reveal */
  .rp-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .rp-reveal.visible { opacity: 1; transform: none; }
`;

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
    <div ref={ref} className="rp-reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function RecentProjects() {
  const navigate = useNavigate();

  useEffect(() => {
    if (document.getElementById("rp-styles")) return;
    const tag = document.createElement("style");
    tag.id = "rp-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  const recentProjects = [...projects]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const onMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <section className="rp-root">
      <div className="rp-ghost">WORK</div>

      <div className="rp-inner">

        {/* Header */}
        <Reveal>
          <p className="rp-eyebrow">Recent Projects</p>
          <h2 className="rp-title">
            Latest<br /><span>Work</span>
          </h2>
        </Reveal>

        {/* Flip Card Grid */}
        <Reveal delay={80}>
          <div className="rp-grid">
            {recentProjects.map((project, i) => {
              const padded = String(project.count).padStart(2, "0");
              return (
                <Link
                  key={project.count}
                  to={`/projects/${project.count}`}
                  className="flip-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onMouseMove={(e) => onMouseMove(e, e.currentTarget.querySelector(".flip-card-front"))}
                >
                  <div className="flip-card-inner">
                    {/* Front */}
                    <div className="flip-card-front">
                      <span className="rp-card-arrow">↗</span>
                      <span className="rp-card-num">{padded}</span>

                      <span className={`rp-badge ${project.status === "active" ? "active" : "inactive"}`}>
                        {project.status === "active" ? "Active" : "Inactive"}
                      </span>

                      <p className="rp-card-title">{project.title || project.company}</p>
                      <p className="rp-card-company">
                        {project.company}{project.ceo ? ` · ${project.ceo}` : ""}
                      </p>
                      <p className="rp-card-desc">{project.shortDescription}</p>
                    </div>

                    {/* Back */}
                    <div className="flip-card-back">
                      <p className="rp-back-label">View Project</p>
                      <p className="rp-back-arrow">↗</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>

        {/* Animated Button */}
        <Reveal delay={160}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="animated-button"
              onClick={() => navigate("/projects")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="ab-arr-2" viewBox="0 0 24 24">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
              <span className="ab-text">View All Projects</span>
              <span className="ab-circle"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="ab-arr-1" viewBox="0 0 24 24">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default RecentProjects;