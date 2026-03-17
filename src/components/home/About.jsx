import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

  .as-root {
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
  .as-root::before {
    content: '';
    position: absolute; inset: 0;
    pointer-events: none;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  /* big ghost number */
  .as-ghost {
    font-family: 'DM Mono', monospace;
    font-size: clamp(120px, 22vw, 300px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #0e0e0e;
    position: absolute;
    bottom: -40px; right: -20px;
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.05em;
  }

  .as-inner {
    max-width: 1100px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* eyebrow */
  .as-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #333;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
  }
  .as-eyebrow::before {
    content: '';
    display: block; width: 28px; height: 1px; background: #333;
  }

  /* headline */
  .as-headline {
    font-size: clamp(28px, 5vw, 60px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0 0 40px;
  }

  .as-accent {
    color: transparent;
    -webkit-text-stroke: 1px #e8e8e0;
    transition: -webkit-text-stroke-color 0.3s, color 0.3s;
  }
  .as-accent:hover {
    color: #E6E6FA;
    -webkit-text-stroke-color: #E6E6FA;
  }

  /* scroll reveal paragraph */
  .as-para {
    font-size: clamp(15px, 1.6vw, 18px);
    max-width: 620px;
    line-height: 1.85;
    margin-bottom: 56px;
    color: #888;
  }

  /* divider */
  .as-divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, #1a1a1a, #2a2a2a 50%, #1a1a1a);
    margin-bottom: 52px;
  }

  /* ── gooey button (kept, recolored to lime) ── */
  .c-button {
    font-family: 'DM Mono', monospace;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.18em;
    padding: 1em 2.2em;
    cursor: pointer;
    display: inline-block;
    position: relative;
    z-index: 1;
    background: transparent;
    text-transform: uppercase;
  }

  .c-button--gooey {
    color: #E6E6FA;
    border: 1px solid #E6E6FA;
    transition: all 700ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .c-button--gooey:hover {
    color: #050505;
    box-shadow: 0 0 30px rgba(200, 255, 0, 0.25);
  }

  .c-button--gooey .c-button__blobs {
    height: 100%;
    filter: url(#goo);
    overflow: hidden;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: -1;
  }

  .c-button--gooey .c-button__blobs div {
    background: #E6E6FA;
    width: 34%;
    height: 100%;
    border-radius: 100%;
    position: absolute;
    transform: scale(1.4) translateY(125%);
    transition: all 700ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .c-button--gooey .c-button__blobs div:nth-child(1) { left: -5%; }
  .c-button--gooey .c-button__blobs div:nth-child(2) { left: 30%; transition-delay: 60ms; }
  .c-button--gooey .c-button__blobs div:nth-child(3) { left: 66%; transition-delay: 25ms; }

  .c-button--gooey:hover .c-button__blobs div {
    transform: scale(1.4) translateY(0);
  }

  /* stats row */
  .as-stats {
    display: flex;
    gap: 48px;
    margin-top: 64px;
    padding-top: 48px;
    border-top: 1px solid #0e0e0e;
    flex-wrap: wrap;
  }
  .as-stat {}
  .as-stat-num {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #e8e8e0;
    line-height: 1;
  }
  .as-stat-num span { color: #E6E6FA; }
  .as-stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #333;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 6px;
  }
`;

const text =
  "Currently building scalable frontend systems using React and TypeScript. Passionate about performance, UI clarity, and creating production-ready web experiences.";

const words = text.split(" ");

function AboutSection() {
  const paragraphRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (document.getElementById("as-styles")) return;
    const tag = document.createElement("style");
    tag.id = "as-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 80%", "end 40%"],
  });

  return (
    <div className="as-root">
      {/* ghost */}
      <div className="as-ghost">02</div>

      <div className="as-inner">
        {/* eyebrow */}
        <motion.p
          className="as-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About me
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="as-headline"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          I'm a versatile{" "}
          <span className="as-accent">developer</span>{" "}
          who partners with founders to turn ideas into{" "}
          <span className="as-accent">real products.</span>{" "}
          I focus on clean interfaces, sharp decisions, and fast execution.
        </motion.h2>

        <div className="as-divider" />

        {/* Scroll-reveal paragraph — kept exactly */}
        <motion.div
          ref={paragraphRef}
          className="as-para"
        >
          {words.map((word, index) => {
            const start = index / words.length;
            const end = start + 1 / words.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            return (
              <motion.span key={index} style={{ opacity, marginRight: "6px" }}>
                {word}
              </motion.span>
            );
          })}
        </motion.div>

        {/* Gooey button — kept, recolored lime */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            className="c-button c-button--gooey"
            onClick={() => navigate("/about")}
          >
            View More
            <div className="c-button__blobs">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="as-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {[
            { num: "40", suffix: "+", label: "Projects Shipped" },
            { num: "2",  suffix: "+", label: "Years Experience" },
            { num: "2",  suffix: "",  label: "Companies" },
          ].map(({ num, suffix, label }) => (
            <div key={label} className="as-stat">
              <div className="as-stat-num">{num}<span>{suffix}</span></div>
              <div className="as-stat-label">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Goo Filter SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default AboutSection;