import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  .am-root {
    font-family: 'Syne', sans-serif;
    background: #050505;
    color: #e8e8e0;
    position: relative;
    overflow: hidden;
  }

  /* grain */
  .am-root::before {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    z-index: 0;
  }

  /* ═══════════════════════════════
     HERO
  ═══════════════════════════════ */
  .am-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 40px clamp(24px,6vw,96px);
    border-bottom: 1px solid #111;
    overflow: hidden;
    z-index: 1;
  }

  /* big ghost behind */
  .am-hero-ghost {
    font-family: 'DM Mono', monospace;
    font-size: clamp(100px, 22vw, 280px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #0e0e0e;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
    transition: -webkit-text-stroke-color 0.6s;
  }
  .am-hero:hover .am-hero-ghost { -webkit-text-stroke-color: #161616; }

  /* eyebrow */
  .am-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #555;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    position: relative; z-index: 2;
  }
  .am-eyebrow::before {
    content: '';
    display: block; width: 28px; height: 1px; background: #555;
  }

  /* hero title */
  .am-hero-title {
    font-size: clamp(56px, 10vw, 130px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.95;
    text-align: center;
    margin: 0;
    position: relative; z-index: 2;
  }
  .am-hero-title span {
    color: transparent;
    -webkit-text-stroke: 1px #333;
  }

  /* scrolling marquee under title */
  .am-marquee-wrap {
    width: 100%;
    overflow: hidden;
    margin-top: 56px;
    border-top: 1px solid #111;
    border-bottom: 1px solid #111;
    padding: 14px 0;
    position: relative; z-index: 2;
  }
  .am-marquee-track {
    display: flex;
    gap: 0;
    white-space: nowrap;
    animation: marquee 18s linear infinite;
  }
  .am-marquee-item {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #2a2a2a;
    padding: 0 40px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .am-marquee-item::after {
    content: '·';
    color: #E6E6FA;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ═══════════════════════════════
     SERVICES SECTION
  ═══════════════════════════════ */
  .am-services {
    padding: clamp(60px,10vw,120px) clamp(24px,6vw,96px);
    position: relative; z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
  }

  .am-services-layout {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .am-services-layout { grid-template-columns: 1fr; gap: 40px; }
  }

  /* left sticky label */
  .am-services-left {
    position: sticky;
    top: 80px;
  }
  .am-services-label {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #555;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .am-services-label::before { content: ''; width: 24px; height: 1px; background: #555; }

  .am-services-heading {
    font-size: clamp(36px, 4.5vw, 58px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 0 0 32px;
  }
  .am-services-heading span { color: transparent; -webkit-text-stroke: 1px #333; }

  .am-services-sub {
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    color: #555;
    line-height: 1.9;
  }

  /* accordion */
  .am-accordion {
    display: flex;
    flex-direction: column;
  }

  .am-accordion-item {
    border-bottom: 1px solid #111;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .am-accordion-item:first-child { border-top: 1px solid #111; }

  /* hover glow line */
  .am-accordion-item::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: #E6E6FA;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .am-accordion-item:hover::before,
  .am-accordion-item.open::before { transform: scaleY(1); }

  .am-accordion-header {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 28px 20px;
    transition: background 0.3s;
  }
  .am-accordion-item:hover .am-accordion-header { background: rgba(255,255,255,0.01); }

  .am-accordion-num {
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    color: #2a2a2a;
    letter-spacing: 0.1em;
    min-width: 28px;
    transition: color 0.3s;
  }
  .am-accordion-item.open .am-accordion-num,
  .am-accordion-item:hover .am-accordion-num { color: #E6E6FA; }

  .am-accordion-title {
    font-size: 26px;
    font-weight: 700;
    color: #555;
    letter-spacing: -0.01em;
    flex: 1;
    transition: color 0.3s;
  }
  .am-accordion-item.open .am-accordion-title,
  .am-accordion-item:hover .am-accordion-title { color: #e8e8e0; }

  .am-accordion-icon {
    width: 32px; height: 32px;
    border: 1px solid #1e1e1e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #333;
    flex-shrink: 0;
    transition: border-color 0.3s, color 0.3s, background 0.3s;
  }
  .am-accordion-item.open .am-accordion-icon {
    border-color: #E6E6FA;
    color: #E6E6FA;
    background: rgba(200,255,0,0.06);
  }

  .am-accordion-body {
    overflow: hidden;
  }
  .am-accordion-desc {
    font-size: 18px;
    color: #777;
    line-height: 1.8;
    padding: 0 20px 32px 64px;
    max-width: 560px;
  }

  /* reveal */
  .am-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .am-reveal.visible { opacity: 1; transform: none; }
`;

const SERVICES = [
  {
    number: "01",
    title: "Frontend Development",
    desc: "Building scalable, responsive, and performance-driven web applications using modern frontend technologies.",
  },
  {
    number: "02",
    title: "UI Implementation",
    desc: "Translating complex design systems into pixel-perfect, maintainable UI components.",
  },
  {
    number: "03",
    title: "Performance Optimization",
    desc: "Improving load times, bundle size, and runtime performance for high-quality user experiences.",
  },
  {
    number: "04",
    title: "API Integration",
    desc: "Seamlessly connecting frontend applications with REST APIs and third-party services.",
  },
];

const MARQUEE_ITEMS = [
  "Frontend Developer", "React", "TypeScript", "UI Engineer",
  "Performance", "Design Systems", "API Integration", "Vite",
  "Frontend Developer", "React", "TypeScript", "UI Engineer",
  "Performance", "Design Systems", "API Integration", "Vite",
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
    <div ref={ref} className="am-reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function AboutMe() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (document.getElementById("am-styles")) return;
    const tag = document.createElement("style");
    tag.id = "am-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <div className="am-root">

      {/* ══ HERO ══ */}
      <section className="am-hero">
        <div className="am-hero-ghost">ABOUT</div>

        <p className="am-eyebrow">Who I am</p>

        <motion.h1
          className="am-hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          About<br /><span>Me</span>
        </motion.h1>

        {/* Marquee */}
        <motion.div
          className="am-marquee-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="am-marquee-track">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className="am-marquee-item">{item}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ SERVICES ══ */}
      <div style={{ borderBottom: "1px solid #111" }}>
        <div className="am-services">
          <div className="am-services-layout">

            {/* Left */}
            <Reveal>
              <div className="am-services-left">
                <p className="am-services-label">What I do</p>
                <h2 className="am-services-heading">
                  I Provide<br /><span>Various</span><br />Services
                </h2>
                <p className="am-services-sub">
                  Focused on building polished,<br />
                  production-ready experiences<br />
                  from design to deployment.
                </p>
              </div>
            </Reveal>

            {/* Accordion */}
            <Reveal delay={120}>
              <div className="am-accordion">
                {SERVICES.map((item, index) => {
                  const isOpen = activeIndex === index;
                  return (
                    <div
                      key={index}
                      className={`am-accordion-item${isOpen ? " open" : ""}`}
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                    >
                      <div className="am-accordion-header">
                        <span className="am-accordion-num">{item.number}</span>
                        <span className="am-accordion-title">{item.title}</span>
                        <motion.div
                          className="am-accordion-icon"
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          +
                        </motion.div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            className="am-accordion-body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <p className="am-accordion-desc">{item.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>

          </div>
        </div>
      </div>

    </div>
  );
}

export default AboutMe;