import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import projects from "../../data/projects";

/* ─── Global styles ─────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .ap-root {
    font-family: 'Syne', sans-serif;
    background: #050505;
    color: #e8e8e0;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  /* ── cursor ── */
  .ap-cursor {
    width: 12px; height: 12px;
    background: #e8e8e0;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.25s ease, height 0.25s ease, background 0.25s ease;
    mix-blend-mode: difference;
  }
  .ap-cursor.hovering {
    width: 44px; height: 44px;
    background: #E6E6FA;
  }

  /* ── grain ── */
  .ap-grain {
    position: fixed; inset: 0; z-index: 1;
    pointer-events: none; opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  /* ── reveal ── */
  .ap-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .ap-reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── hero ── */
  .ap-hero {
    padding: clamp(80px,11vw,140px) clamp(24px,6vw,96px) 0;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
  }
  .ap-ghost-text {
    font-family: 'DM Mono', monospace;
    font-size: clamp(80px,14vw,180px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #141414;
    position: absolute;
    top: 20px; right: -10px;
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
    transition: -webkit-text-stroke-color 0.6s;
  }
  .ap-hero:hover .ap-ghost-text { -webkit-text-stroke-color: #222; }

  .ap-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #444;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }
  .ap-label::before {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: #333;
  }

  .ap-title {
    font-size: clamp(40px,7vw,88px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin: 0;
  }
  .ap-title span {
    color: transparent;
    -webkit-text-stroke: 1px #444;
  }

  /* ── count ticker ── */
  .ap-count {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #444;
    letter-spacing: 0.08em;
    margin-top: 28px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ap-count-num {
    font-size: 20px;
    color: #E6E6FA;
    font-weight: 400;
    transition: all 0.4s ease;
  }

  /* ── divider ── */
  .ap-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
    margin: 48px 0;
  }

  /* ── filters ── */
  .ap-filters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px;
    padding: 0 clamp(24px,6vw,96px);
    max-width: 1400px;
    margin: 0 auto;
    align-items: flex-start;
  }
  .ap-filter-row {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 12px;
  }
  .ap-filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .ap-filter-key {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #333;
  }
  .ap-filter-btn {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.08em;
    padding: 10px 26px;
    border-radius: 100px;
    border: 1px solid #1e1e1e;
    background: transparent;
    color: #555;
    cursor: pointer;
    transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s;
  }
  .ap-filter-btn:hover {
    border-color: #333;
    color: #999;
    transform: translateY(-2px);
  }
  .ap-filter-btn.active {
    border-color: #E6E6FA;
    color: #E6E6FA;
    background: rgba(200,255,0,0.06);
  }

  /* ── grid ── */
  .ap-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    padding: 0 clamp(24px,6vw,96px);
    max-width: 1400px;
    margin: 0 auto;
  }

  /* ── card ── */
  .ap-card {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    border: 1px solid #111;
    border-radius: 20px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    background: #070707;
    transition: border-color 0.4s, transform 0.45s cubic-bezier(0.22,1,0.36,1);
    animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .ap-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(200,255,0,0.04), transparent 60%);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .ap-card:hover { border-color: #222; transform: translateY(-6px); }
  .ap-card:hover::before { opacity: 1; }

  .ap-card-num {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #2a2a2a;
    letter-spacing: 0.1em;
    margin-bottom: 20px;
    transition: color 0.3s;
  }
  .ap-card:hover .ap-card-num { color: #444; }

  .ap-card-arrow {
    position: absolute;
    top: 28px; right: 28px;
    font-size: 16px;
    color: #222;
    transition: color 0.3s, transform 0.3s;
  }
  .ap-card:hover .ap-card-arrow {
    color: #E6E6FA;
    transform: translate(3px,-3px);
  }

  .ap-card-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 8px;
    padding-right: 24px;
  }

  .ap-card-company {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #444;
    letter-spacing: 0.06em;
    margin-bottom: 16px;
  }

  .ap-card-desc {
    font-size: 15px;
    color: #777;
    line-height: 1.8;
    flex: 1;
  }

  /* ── badge ── */
  .ap-badge {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 100px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 20px;
    align-self: flex-start;
  }
  .ap-badge::before {
    content: ''; width: 5px; height: 5px;
    border-radius: 50%;
  }
  .ap-badge.active {
    background: rgba(200,255,0,0.07);
    color: #E6E6FA;
    border: 1px solid rgba(200,255,0,0.18);
  }
  .ap-badge.active::before { background:#E6E6FA; animation: pulse 2s infinite; }
  .ap-badge.inactive {
    background: rgba(255,80,80,0.07);
    color: #ff5050;
    border: 1px solid rgba(255,80,80,0.18);
  }
  .ap-badge.inactive::before { background:#ff5050; }
  @keyframes pulse {
    0%,100% { box-shadow:0 0 0 0 rgba(200,255,0,0.5); }
    50%      { box-shadow:0 0 0 5px rgba(200,255,0,0); }
  }

  /* ── tech chips ── */
  .ap-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px; }
  .ap-chip {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.06em;
    padding: 5px 14px;
    border-radius: 100px;
    background: #0d0d0d;
    border: 1px solid #1a1a1a;
    color: #555;
    transition: border-color 0.25s, color 0.25s;
    border-color: #222;
    color: #555;
  }

  /* ── empty state ── */
  .ap-empty {
    grid-column: 1/-1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    border: 1px dashed #1a1a1a;
    border-radius: 20px;
    gap: 16px;
  }
  .ap-empty-icon {
    font-size: 40px;
    opacity: 0.15;
  }
  .ap-empty-text {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #444;
    letter-spacing: 0.1em;
  }
`;

/* ─── Filter data ────────────────────────────────────────────────────────── */
const ORIGIN_FILTERS = [
  { key: "all", label: "All" },
  { key: "emilda solutions", label: "Emilda Solutions" },
  { key: "Friska ai", label: "Friska AI" },
];
const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
];

/* ─── Cursor ─────────────────────────────────────────────────────────────── */
function Cursor() {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      ref.current.style.left = e.clientX + "px";
      ref.current.style.top = e.clientY + "px";
    };
    const over = (e) => { if (e.target.closest("[data-hover]")) setHovering(true); };
    const out  = (e) => { if (e.target.closest("[data-hover]")) setHovering(false); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);
  return <div ref={ref} className={`ap-cursor${hovering ? " hovering" : ""}`} />;
}

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
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
  return <div ref={ref} className="ap-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ─── Project Card ───────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };
  const padded = String(project.count).padStart(2, "0");

  return (
    <Link
      ref={ref}
      to={`/projects/${project.count}`}
      className="ap-card"
      onMouseMove={onMove}
      data-hover
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <span className="ap-card-arrow">↗</span>
      <span className="ap-card-num">{padded}</span>

      <span className={`ap-badge ${project.status === "active" ? "active" : "inactive"}`}>
        {project.status === "active" ? "Active" : "Inactive"}
      </span>

      <p className="ap-card-title">{project.title || project.company}</p>
      <p className="ap-card-company">
        {project.company}{project.ceo ? ` · ${project.ceo}` : ""}
      </p>
      <p className="ap-card-desc">{project.shortDescription}</p>

      {project.tech?.length > 0 && (
        <div className="ap-chips">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="ap-chip">{t}</span>
          ))}
          {project.tech.length > 3 && (
            <span className="ap-chip">+{project.tech.length - 3}</span>
          )}
        </div>
      )}
    </Link>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
function AllProjects() {
  const [activeOrigin, setActiveOrigin] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [gridKey, setGridKey] = useState(0); // force re-animation on filter change

  /* inject CSS once */
  useEffect(() => {
    if (document.getElementById("ap-styles")) return;
    const tag = document.createElement("style");
    tag.id = "ap-styles";
    tag.textContent = GLOBAL_CSS;
    document.head.appendChild(tag);
  }, []);

  const handleOrigin = (key) => { setActiveOrigin(key); setGridKey(k => k + 1); };
  const handleStatus = (key) => { setActiveStatus(key); setGridKey(k => k + 1); };

  const sorted = [...projects]
    .filter((p) => {
      const om = activeOrigin === "all" || p.origin?.toLowerCase().trim() === activeOrigin.toLowerCase().trim();
      const sm = activeStatus === "all" || p.status?.toLowerCase() === activeStatus.toLowerCase();
      return om && sm;
    })
    .sort((a, b) => b.count - a.count);

  return (
    <div className="ap-root">
      <Cursor />
      <div className="ap-grain" />

      {/* ── Hero ── */}
      <div className="ap-hero">
        <div className="ap-ghost-text">WORK</div>
        <Reveal delay={0}>
          <p className="ap-label">Portfolio</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="ap-title">
            Selected<br /><span>Work</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="ap-count">
            <span className="ap-count-num">{sorted.length}</span>
            &nbsp;{sorted.length === 1 ? "project" : "projects"} found
          </p>
        </Reveal>
      </div>

      {/* ── Divider ── */}
      <div style={{ padding: "0 clamp(24px,6vw,96px)", maxWidth: 1400, margin: "0 auto" }}>
        <div className="ap-divider" />
      </div>

      {/* ── Filters ── */}
      <Reveal delay={0}>
        <div className="ap-filters">
          <div className="ap-filter-row">
            <span className="ap-filter-key">Company</span>
            <div className="ap-filter-buttons">
              {ORIGIN_FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`ap-filter-btn${activeOrigin === f.key ? " active" : ""}`}
                  onClick={() => handleOrigin(f.key)}
                  data-hover
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="ap-filter-row">
            <span className="ap-filter-key">Status</span>
            <div className="ap-filter-buttons">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`ap-filter-btn${activeStatus === f.key ? " active" : ""}`}
                  onClick={() => handleStatus(f.key)}
                  data-hover
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Grid ── */}
      <div style={{ height: 48 }} />
      <div key={gridKey} className="ap-grid">
        {sorted.length > 0
          ? sorted.map((p, i) => <ProjectCard key={p.count} project={p} index={i} />)
          : (
            <div className="ap-empty">
              <span className="ap-empty-icon">◌</span>
              <p className="ap-empty-text">No projects match the selected filters</p>
            </div>
          )}
      </div>

      <div style={{ height: 100 }} />
    </div>
  );
}

export default AllProjects;