import { Box, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import projects from "../../data/projects";
import Breadcrumbs from "../ui/breadcrumbs";

import figma from "../../assets/tech icons/figma.svg";
import github from "../../assets/tech icons/github.svg";
import netlify from "../../assets/tech icons/netflify.svg";
import shopify from "../../assets/tech icons/shopify.svg";
import vscode from "../../assets/tech icons/vs code.svg";
import webflow from "../../assets/tech icons/webflow.svg";
import wordpress from "../../assets/tech icons/wordpress.svg";
import hostinger from "../../assets/tech icons/hostinge.png";

/* ─── Styles injected once ─────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .pd-root {
    font-family: 'Syne', sans-serif;
    background: #050505;
    color: #e8e8e0;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  /* ── cursor ── */
  .pd-cursor {
    width: 12px; height: 12px;
    background: #e8e8e0;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.08s linear, width 0.25s ease, height 0.25s ease, background 0.25s ease;
    mix-blend-mode: difference;
  }
  .pd-cursor.hovering {
    width: 44px; height: 44px;
    background: #E6E6FA;
  }

  /* ── grain overlay ── */
  .pd-grain {
    position: fixed; inset: 0; z-index: 1;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  /* ── hero number ── */
  .pd-project-number {
    font-family: 'DM Mono', monospace;
    font-size: clamp(120px, 18vw, 220px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #1e1e1e;
    position: absolute;
    top: -30px; right: -20px;
    line-height: 1;
    user-select: none;
    pointer-events: none;
    transition: -webkit-text-stroke-color 0.6s ease;
  }
  .pd-hero:hover .pd-project-number {
    -webkit-text-stroke-color: #2a2a2a;
  }

  /* ── reveal animation ── */
  .pd-reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .pd-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── label pill ── */
  .pd-label {
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
  .pd-label::before {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: #333;
  }

  /* ── title ── */
  .pd-title {
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin: 0 0 12px;
  }

  /* ── divider ── */
  .pd-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
    margin: 48px 0;
  }

  /* ── url row ── */
  .pd-url-link {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #888;
    text-decoration: none;
    position: relative;
    padding-bottom: 2px;
    transition: color 0.2s;
  }
  .pd-url-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: #E6E6FA;
    transition: width 0.35s ease;
  }
  .pd-url-link:hover { color: #E6E6FA; }
  .pd-url-link:hover::after { width: 100%; }

  /* ── status badge ── */
  .pd-badge {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 100px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }
  .pd-badge::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
  }
  .pd-badge.active {
    background: rgba(200,255,0,0.07);
    color: #E6E6FA;
    border: 1px solid rgba(200,255,0,0.18);
  }
  .pd-badge.active::before { background: #E6E6FA; animation: pulse 2s infinite; }
  .pd-badge.inactive {
    background: rgba(255,80,80,0.07);
    color: #ff5050;
    border: 1px solid rgba(255,80,80,0.18);
  }
  .pd-badge.inactive::before { background: #ff5050; }
  @keyframes pulse {
    0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(200,255,0,0.5); }
    50%      { opacity:0.8; box-shadow: 0 0 0 5px rgba(200,255,0,0); }
  }

  /* ── description block ── */
  .pd-description {
    font-size: clamp(15px, 1.8vw, 18px);
    color: #888;
    line-height: 1.85;
    max-width: 680px;
  }
  .pd-about-text {
    font-size: clamp(14px, 1.6vw, 17px);
    color: #666;
    line-height: 1.9;
    max-width: 720px;
  }

  /* ── tech pill ── */
  .pd-tech-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 100px;
    background: #0d0d0d;
    border: 1px solid #1a1a1a;
    cursor: default;
    transition: border-color 0.3s, background 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }
  .pd-tech-pill:hover {
    border-color: #2e2e2e;
    background: #121212;
    transform: translateY(-5px) scale(1.03);
  }
  .pd-tech-pill span {
    font-size: 13px;
    color: #bbb;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }

  /* ── related card ── */
  .pd-related-card {
    text-decoration: none;
    color: inherit;
    display: block;
    border: 1px solid #141414;
    border-radius: 16px;
    padding: 36px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.4s, transform 0.45s cubic-bezier(0.22,1,0.36,1);
    background: #070707;
  }
  .pd-related-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(200,255,0,0.04), transparent 55%);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .pd-related-card:hover {
    border-color: #252525;
    transform: translateY(-6px);
  }
  .pd-related-card:hover::before { opacity: 1; }

  .pd-related-card .card-arrow {
    position: absolute;
    top: 32px; right: 32px;
    font-size: 18px;
    color: #333;
    transition: color 0.3s, transform 0.3s;
  }
  .pd-related-card:hover .card-arrow {
    color: #E6E6FA;
    transform: translate(3px, -3px);
  }

  .pd-related-title {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 12px;
    padding-right: 32px;
  }
  .pd-related-desc {
    font-size: 13px;
    color: #555;
    line-height: 1.75;
    font-family: 'DM Mono', monospace;
  }

  /* ── meta row ── */
  .pd-meta {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
  }
  .pd-meta-item { display: flex; flex-direction: column; gap: 6px; }
  .pd-meta-key {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #333;
  }
  .pd-meta-val {
    font-size: 14px;
    color: #888;
  }

  /* ── section grid ── */
  .pd-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
`;

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const ORIGIN_LABELS = {
  "emilda solutions": "Emilda Solutions",
  "Friska ai": "Friska AI",
};

const TECH_ICONS = {
  Figma: figma,
  GitHub: github,
  Netlify: netlify,
  Shopify: shopify,
  "VS Code": vscode,
  Webflow: webflow,
  WordPress: wordpress,
  Hostinger: hostinger,
};

/* ─── Custom cursor ─────────────────────────────────────────────────────── */
function Cursor() {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      ref.current.style.left = e.clientX + "px";
      ref.current.style.top = e.clientY + "px";
    };
    const enter = (e) => { if (e.target.closest("[data-hover]")) setHovering(true); };
    const leave = (e) => { if (e.target.closest("[data-hover]")) setHovering(false); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", enter);
    window.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", enter);
      window.removeEventListener("mouseout", leave);
    };
  }, []);

  return <div ref={ref} className={`pd-cursor${hovering ? " hovering" : ""}`} />;
}

/* ─── Reveal-on-scroll wrapper ──────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="pd-reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Related card with mouse-tracked glow ──────────────────────────────── */
function RelatedCard({ project: p }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
  };
  return (
    <Link
      ref={ref}
      to={`/projects/${p.count}`}
      className="pd-related-card"
      onMouseMove={onMove}
      data-hover
    >
      <span className="card-arrow">↗</span>
      <p className="pd-related-title">{p.title}</p>
      <p className="pd-related-desc">{p.shortDescription}</p>
    </Link>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.count === Number(projectId));

  /* inject CSS once */
  useEffect(() => {
    if (document.getElementById("pd-styles")) return;
    const tag = document.createElement("style");
    tag.id = "pd-styles";
    tag.textContent = GLOBAL_CSS;
    document.head.appendChild(tag);
  }, []);

  if (!project) {
    return (
      <Box sx={{ minHeight:"100vh", background:"#050505", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Typography>Project not found.</Typography>
      </Box>
    );
  }

  const relatedProjects = projects.filter((p) => project.relatedProjects?.includes(p.count));
  const paddedCount = String(project.count).padStart(2, "0");

  return (
    <div className="pd-root">
      <Cursor />
      <div className="pd-grain" />

      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Projects", path: "/projects" },
          { label: project.title },
        ]}
      />

      {/* ── Hero ── */}
      <section
        className="pd-hero"
        style={{
          position: "relative",
          padding: "clamp(80px,12vw,160px) clamp(24px,6vw,96px) 0",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div className="pd-project-number">{paddedCount}</div>

        <Reveal delay={0}>
          <p className="pd-label">Project</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="pd-title">{project.title}</h1>
        </Reveal>

        <Reveal delay={160}>
          <div className="pd-meta" style={{ marginTop: 32 }}>
            <div className="pd-meta-item">
              <span className="pd-meta-key">Company</span>
              <span className="pd-meta-val">{project.company || "—"}</span>
            </div>
            {project.ceo && (
              <div className="pd-meta-item">
                <span className="pd-meta-key">CEO</span>
                <span className="pd-meta-val">{project.ceo}</span>
              </div>
            )}
            <div className="pd-meta-item">
              <span className="pd-meta-key">Worked at</span>
              <span className="pd-meta-val">{ORIGIN_LABELS[project.origin] || project.origin}</span>
            </div>
          </div>
        </Reveal>

        {/* URL + Status */}
        {project.liveUrl && (
          <Reveal delay={240}>
            <div style={{ marginTop: 40, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-url-link"
                data-hover
              >
                {project.liveUrl.replace(/https?:\/\//, "")}
              </a>
              <span className={`pd-badge ${project.status === "active" ? "active" : "inactive"}`}>
                {project.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          </Reveal>
        )}
      </section>

      {/* ── Body ── */}
      <div style={{ padding:"clamp(24px,6vw,96px)", maxWidth:1400, margin:"0 auto" }}>

        <div className="pd-divider" />

        {/* Short description */}
        <Reveal>
          <p className="pd-label">Overview</p>
          <p className="pd-description">{project.shortDescription}</p>
        </Reveal>

        {/* Detailed description */}
        {project.detailedDescription && (
          <>
            <div className="pd-divider" />
            <Reveal>
              <p className="pd-label">About the project</p>
              <p className="pd-about-text">{project.detailedDescription}</p>
            </Reveal>
          </>
        )}

        {/* Tech stack */}
        {project.tech?.length > 0 && (
          <>
            <div className="pd-divider" />
            <Reveal>
              <p className="pd-label">Stack</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginTop:8 }}>
                {project.tech.map((tech, i) => (
                  <div key={tech} className="pd-tech-pill" data-hover style={{ transitionDelay:`${i*40}ms` }}>
                    {TECH_ICONS[tech] && (
                      <img
                        src={TECH_ICONS[tech]}
                        alt={tech}
                        style={{
                          width:16, height:16,
                          filter: tech === "WordPress" || tech === "Hostinger" ? "none" : "invert(0.7)",
                        }}
                      />
                    )}
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </>
        )}

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <>
            <div className="pd-divider" />
            <Reveal>
              <p className="pd-label">Other Projects</p>
              <div className="pd-grid-2" style={{ marginTop:24 }}>
                {relatedProjects.map((p, i) => (
                  <Reveal key={p.count} delay={i * 80}>
                    <RelatedCard project={p} />
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </>
        )}

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
}

export default ProjectDetails;