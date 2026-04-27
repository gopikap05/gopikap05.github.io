import { motion } from "framer-motion";

const blocks = [
  {
    label: "01",
    title: "Typography",
    tag: "Visual Language",
    themeNote: "Same for both themes",
    content: [
      { type: "p", text: "Primary font: Bebas Neue for display headings — bold, editorial, and architectural. DM Sans for body — clean, geometric, and readable." },
      { type: "p", text: "Bold headings establish hierarchy. Controlled letter spacing ensures consistent navigation and section identity." },
    ],
  },
  {
    label: "02",
    title: "Color System",
    tag: "Palette & Depth",
    themeNote: "Dark: #080808 / Light: #FFFFFF",
    content: [
      { type: "p", text: "Dark-first design approach using layered depth and selective accent highlights." },
      {
        type: "ul", items: [
          "Base Background — Dark: #080808 / Light: #FFFFFF",
          "Surface Panels — Dark: #0d0d0d / Light: #F2EAF7",
          "Borders — Dark: #141414 / #1c1c1c / Light: #C59DD9",
          "Accent Red — #ff3b3b (Same for both)",
          "Gradient — Yellow → Pink → Purple",
        ],
      },
    ],
  },
  {
    label: "03",
    title: "Tech Stack",
    tag: "Tools & Libraries",
    themeNote: "Same for both themes",
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
    themeNote: "Same for both themes",
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

// Dark theme colors
const darkColors = [
  "#ffffff",     // White
  "#ff3b3b",     // Red (primary accent)
  "#8b5cf6",     // Purple (secondary accent)
  "#fe53bb",     // Pink (gradients)
  "#ffdb3b",     // Yellow (gradients)
  "#0044ff",     // Deep Blue (gradients)
  "#f97316",     // Orange (stars)
  "#4ade80",     // Green (success/active status)
  "#f87171",     // Red (error/inactive status)
];

// Light theme colors
const lightColors = [
  "#2B0D3E",     // Deep Purple (primary text)
  "#7A3F91",     // Royal Amethyst (primary)
  "#C59DD9",     // Soft Lavender (primary light)
  "#F2EAF7",     // Very Light Lavender (bg secondary)
  "#FFFFFF",     // White (bg primary)
  "#ff3b3b",     // Red (accent)
  "#8b5cf6",     // Purple (secondary accent)
  "#4ade80",     // Green (success)
  "#f87171",     // Red (error)
];

function Block({ block, index }) {
  return (
    <motion.div
      className="bcard"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* subtle corner accent */}
      <div className="bcard-corner" />

      {/* meta */}
      <div className="bcard-meta">
        <span className="bcard-num">{block.label}</span>
        <span className="bcard-tag">{block.tag}</span>
      </div>

      {/* title */}
      <h3 className="bcard-title">{block.title}</h3>

      {/* theme note badge */}
      <div className="bcard-theme-note">
        <span className="theme-badge">{block.themeNote}</span>
      </div>

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

      {/* hover gradient overlay */}
      <div className="bcard-overlay" />
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
        
        /* Color strips container - side by side on desktop */
        .palettes-container {
          display: flex;
          gap: clamp(20px, 4vw, 48px);
          margin-top: clamp(24px, 3vw, 36px);
          flex-direction: column;
        }
        
        @media (min-width: 768px) {
          .palettes-container {
            flex-direction: row;
          }
          .palette-col {
            flex: 1;
          }
        }
        
        .palette-col {
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 2px;
          padding: clamp(16px, 2vw, 24px);
          transition: border-color 0.3s ease;
        }
        
        .palette-col:hover {
          border-color: var(--theme-border-hover);
        }
        
        .palette-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .palette-badge {
          font-size: 9px;
          letter-spacing: 2px;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(255,59,59,0.1);
          color: rgba(255,59,59,0.7);
        }
        
        .color-strip {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: clamp(2px, 0.4vw, 4px);
          transform-style: preserve-3d;
          transform: perspective(1000px);
        }
        
        @media (max-width: 600px) { 
          .color-strip { gap: 2px; }
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
          padding: clamp(28px, 4vw, 32px);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }

        .bcard:hover {
          border-color: var(--theme-border-hover);
          transform: translateY(-4px);
        }

        /* Theme note badge */
        .bcard-theme-note {
          margin-bottom: clamp(12px, 1.5vw, 16px);
          position: relative;
          z-index: 2;
        }
        
        .theme-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(255,59,59,0.08);
          color: rgba(255,59,59,0.6);
          border: 1px solid rgba(255,59,59,0.15);
          display: inline-block;
        }

        /* Corner accent */
        .bcard-corner {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-top: 2px solid transparent;
          border-left: 2px solid transparent;
          transition: all 0.35s ease;
          pointer-events: none;
          z-index: 1;
        }

        .bcard:hover .bcard-corner {
          border-top-color: rgba(255, 59, 59, 0.6);
          border-left-color: rgba(255, 59, 59, 0.6);
          width: 24px;
          height: 24px;
        }

        /* Hover gradient overlay */
        .bcard-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 59, 59, 0.03), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }

        .bcard:hover .bcard-overlay {
          opacity: 1;
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
          transition: letter-spacing 0.3s ease;
        }

        .bcard:hover .bcard-num {
          letter-spacing: 4px;
          color: rgba(255,59,59,0.8);
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

        .bcard:hover .bcard-tag {
          border-color: rgba(255, 59, 59, 0.4);
          color: rgba(255, 59, 59, 0.7);
        }

        .bcard-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 400;
          letter-spacing: 3px;
          color: var(--theme-text-primary);
          margin: 0 0 clamp(6px, 1vw, 10px);
          line-height: 0.95;
          position: relative;
          z-index: 2;
          transition: letter-spacing 0.25s ease;
        }

        .bcard:hover .bcard-title {
          letter-spacing: 4px;
        }

        .bcard-rule {
          width: 100%;
          height: 1px;
          background: var(--theme-border-hover);
          margin-bottom: clamp(16px, 2.5vw, 26px);
          position: relative;
          z-index: 2;
          transition: width 0.3s ease;
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
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .bcard-li::before {
          content: '';
          position: absolute;
          left: 0; top: 11px;
          width: 5px; height: 1px;
          background: rgba(255,59,59,0.4);
          transition: width 0.2s ease, background 0.2s ease;
        }

        .bcard:hover .bcard-li::before {
          width: 8px;
          background: rgba(255,59,59,0.8);
        }

        .bcard-li:hover {
          transform: translateX(4px);
          color: var(--theme-text-primary);
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
        [data-theme="light"] .bcard:hover .bcard-corner {
          border-top-color: rgba(255, 59, 59, 0.8);
          border-left-color: rgba(255, 59, 59, 0.8);
        }
        [data-theme="light"] .palette-col {
          background: var(--theme-bg-card);
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

          {/* Color palettes - Side by side on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px", letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--theme-text-muted)",
              margin: "clamp(24px, 3vw, 36px) 0 0",
            }}>
              Color Palettes
            </p>
            
            <div className="palettes-container">
              {/* Dark Theme Palette */}
              <div className="palette-col">
                <div className="palette-title">
                  <span>Dark Theme</span>
                  <span className="palette-badge">9 colors</span>
                </div>
                <div className="color-strip">
                  {darkColors.map((color) => (
                    <button
                      key={color}
                      className="item-color"
                      style={{ "--color": color }}
                      aria-label={color}
                      onClick={() => navigator.clipboard?.writeText(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Light Theme Palette */}
              <div className="palette-col">
                <div className="palette-title">
                  <span>Light Theme</span>
                  <span className="palette-badge">9 colors</span>
                </div>
                <div className="color-strip">
                  {lightColors.map((color) => (
                    <button
                      key={color}
                      className="item-color"
                      style={{ "--color": color }}
                      aria-label={color}
                      onClick={() => navigator.clipboard?.writeText(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default AboutPortfolio;