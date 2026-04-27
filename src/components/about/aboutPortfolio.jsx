import { motion } from "framer-motion";

const blocks = [
  {
    label: "01",
    title: "Typography",
    tag: "Visual Language",
    content: [
      { type: "p", text: "Primary font: Bebas Neue for display headings — bold, editorial, and architectural. DM Sans for body — clean, geometric, and readable." },
      { type: "p", text: "Bold headings establish hierarchy. Controlled letter spacing ensures consistent navigation and section identity." },
    ],
  },
  {
    label: "02",
    title: "Color System",
    tag: "Palette & Depth",
    content: [
      { type: "p", text: "Dark-first design approach using layered depth and selective accent highlights." },
      {
        type: "ul", items: [
          "Base Background — #080808",
          "Surface Panels — #0d0d0d",
          "Borders — #141414 / #1c1c1c",
          "Accent Red — #ff3b3b",
          "Gradient — Yellow → Pink → Purple",
        ],
      },
    ],
  },
  {
    label: "03",
    title: "Tech Stack",
    tag: "Tools & Libraries",
    content: [
      {
        type: "ul", items: [
          "HTML5 / CSS3 / JavaScript ES6+",
          "React — component-based architecture",
          "Material UI — design system",
          "Framer Motion — animation layer",
          "Redux Toolkit — state management",
          "React Router — structured routing",
          "Vite — build tool",
        ],
      },
    ],
  },
  {
    label: "04",
    title: "Highlights",
    tag: "Craft & Detail",
    content: [
      {
        type: "ul", items: [
          "Modular folder architecture",
          "Reusable UI components",
          "Responsive layout strategy",
          "3D hover interactions",
          "Smooth motion transitions",
          "Magnetic cursor effects",
          "Scroll-driven animations",
        ],
      },
    ],
  },
];

const colors = [
  "#ffffff", "#aaaaaa", "#1a1a1a", "#111111",
  "#ff3b3b", "#3b82f6", "#8b5cf6", "#10b981",
  "#ffdb3b", "#fe53bb", "#0044ff", "#f97316",
];

/* Each card gets a unique animation delay so the scanlines feel staggered */
const scanDelays = ["0s", "1.4s", "2.8s", "0.7s"];

function Block({ block, index }) {
  return (
    <motion.div
      className="bcard"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* looping scan line — unique delay per card */}
      <div
        className="bcard-scan"
        style={{ animationDelay: scanDelays[index] }}
      />

      {/* meta */}
      <div className="bcard-meta">
        <span className="bcard-num">{block.label}</span>
        <span className="bcard-tag">{block.tag}</span>
      </div>

      {/* title */}
      <h3 className="bcard-title">{block.title}</h3>

      {/* static rule */}
      <div className="bcard-rule" />

      {/* body */}
      <div className="bcard-body">
        {block.content.map((c, j) =>
          c.type === "p" ? (
            <p key={j} className="bcard-p">{c.text}</p>
          ) : (
            <ul key={j} className="bcard-ul">
              {c.items.map((item, k) => (
                <li key={k} className="bcard-li">{item}</li>
              ))}
            </ul>
          )
        )}
      </div>
    </motion.div>
  );
}

function AboutPortfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── COLOR PALETTE ── */
        .item-color {
          position: relative; flex-shrink: 0;
          width: clamp(22px, 3vw, 30px);
          height: clamp(28px, 3.5vw, 36px);
          border: none; outline: none; background: transparent;
          transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
          cursor: pointer;
        }
        .item-color::after {
          position: absolute; content: ""; inset: 0;
          width: clamp(28px, 3.5vw, 36px); height: clamp(28px, 3.5vw, 36px);
          background-color: var(--color); border-radius: 6px;
          transform: scale(1.15); pointer-events: none;
          transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }
        .item-color::before {
          position: absolute; content: attr(aria-label);
          left: 50%; bottom: 48px;
          font-family: 'DM Sans', sans-serif; font-size: 9px; letter-spacing: 1px;
          transform: translateX(-50%); padding: 3px 6px;
          background: var(--theme-text-primary); color: var(--theme-bg-primary);
          border-radius: 4px;
          pointer-events: none; opacity: 0; visibility: hidden;
          transition: 300ms ease; white-space: nowrap;
        }
        .item-color:hover { transform: scale(1.5); z-index: 99999; }
        .item-color:hover::before { opacity: 1; visibility: visible; }
        .item-color:active::after { transform: scale(1.05); }
        .item-color:focus::before { content: "✅ Copied"; }
        .item-color:hover + * { transform: scale(1.3); z-index: 9999; }
        .item-color:hover + * + * { transform: scale(1.15); z-index: 999; }
        .item-color:has(+ *:hover) { transform: scale(1.3); z-index: 9999; }
        .item-color:has(+ * + *:hover) { transform: scale(1.15); z-index: 999; }
        .color-strip {
          display: flex; justify-content: center; flex-wrap: wrap;
          gap: clamp(2px, 0.4vw, 4px);
          padding: clamp(24px, 4vw, 48px) 0;
          transform-style: preserve-3d; transform: perspective(1000px);
        }
        @media (max-width: 600px) { .color-strip { gap: 2px; } }

        /* ── SCAN LINE ANIMATION ── */
        @keyframes scan {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* ── 2×2 GRID ── */
        .bcards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 2vw, 24px);
        }
        @media (max-width: 680px) {
          .bcards-grid { grid-template-columns: 1fr; }
        }

        /* ── CARD ── */
        .bcard {
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 2px;
          padding: clamp(28px, 4vw, 52px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .bcard:hover {
          border-color: var(--theme-border-hover);
        }

        /* The looping scan line */
        .bcard-scan {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255,59,59,0.0) 20%,
            rgba(255,59,59,0.35) 50%,
            rgba(255,59,59,0.0) 80%,
            transparent 100%
          );
          animation: scan 4s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .bcard-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: clamp(14px, 2vw, 22px);
          position: relative;
          z-index: 2;
        }

        .bcard-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          color: rgba(255,59,59,0.5);
        }

        .bcard-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          padding: 3px 10px;
          border: 1px solid var(--theme-border-hover);
          border-radius: 999px;
          transition: all 0.3s ease;
        }

        .bcard-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 400;
          letter-spacing: 3px;
          color: var(--theme-text-primary);
          margin: 0 0 clamp(14px, 2vw, 20px);
          line-height: 0.95;
          position: relative;
          z-index: 2;
        }

        .bcard-rule {
          width: 100%;
          height: 1px;
          background: var(--theme-border-hover);
          margin-bottom: clamp(16px, 2.5vw, 26px);
          position: relative;
          z-index: 2;
        }

        .bcard-body {
          position: relative;
          z-index: 2;
        }

        .bcard-p {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.9rem, 1.3vw, 1rem);
          color: var(--theme-text-secondary);
          line-height: 1.85;
          margin: 0 0 10px;
        }

        .bcard-ul {
          list-style: none;
          padding: 0; margin: 0;
          display: flex; flex-direction: column;
          gap: 9px;
        }

        .bcard-li {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.88rem, 1.2vw, 0.97rem);
          color: var(--theme-text-secondary);
          line-height: 1.7;
          padding-left: 16px;
          position: relative;
        }
        .bcard-li::before {
          content: '';
          position: absolute;
          left: 0; top: 11px;
          width: 5px; height: 1px;
          background: rgba(255,59,59,0.4);
        }

        /* Light theme specific adjustments */
        [data-theme="light"] .bcard {
          background: var(--theme-bg-card);
        }
        [data-theme="light"] .bcard-tag {
          border-color: var(--theme-border);
        }
        [data-theme="light"] .bcard-p,
        [data-theme="light"] .bcard-li {
          color: var(--theme-text-secondary);
          opacity: 0.8;
        }
      `}</style>

      <section style={{
        width: "100%",
        backgroundColor: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)",
        borderTop: "1px solid var(--theme-border)",
        borderBottom: "1px solid var(--theme-border)",
      }}>
        <div style={{
          maxWidth: "1440px",
          width: "100%",
          margin: "0 auto",
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5%, 96px)",
          boxSizing: "border-box",
        }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 12px",
              border: "1px solid var(--theme-border-hover)",
              borderRadius: "999px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px", letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--theme-text-muted)",
              marginBottom: "24px",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
              Design System
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
                fontWeight: 400,
                letterSpacing: "5px",
                margin: "0",
                lineHeight: 0.95,
                color: "var(--theme-text-primary)",
              }}
            >
              Design &amp;{" "}
              <span style={{ color: "var(--theme-text-muted)", opacity: 0.5 }}>Build System</span>
            </motion.h2>
          </motion.div>

          {/* 2×2 grid */}
          <div className="bcards-grid">
            {blocks.map((block, i) => (
              <Block key={i} block={block} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div style={{
            width: "100%", height: "1px",
            background: "linear-gradient(to right, transparent, var(--theme-border-hover), transparent)",
            margin: "clamp(40px, 6vw, 72px) 0 0",
          }} />

          {/* Color palette */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px", letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--theme-text-muted)",
              margin: "clamp(24px, 3vw, 36px) 0 0",
            }}>
              Palette
            </p>
            <div className="color-strip">
              {colors.map((color) => (
                <button
                  key={color}
                  className="item-color"
                  style={{ "--color": color }}
                  aria-label={color}
                  onClick={() => navigator.clipboard?.writeText(color)}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default AboutPortfolio;