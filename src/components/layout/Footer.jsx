import { useEffect } from "react";
import { motion } from "framer-motion";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

  .ft-root {
    font-family: 'Syne', sans-serif;
    background: #050505;
    color: #e8e8e0;
    border-top: 1px solid #111;
    padding: clamp(80px,12vw,140px) clamp(24px,6vw,96px) 40px;
    position: relative;
    overflow: hidden;
  }

  /* grain */
  .ft-root::before {
    content: '';
    position: absolute; inset: 0;
    pointer-events: none;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    z-index: 0;
  }

  /* ghost */
  .ft-ghost {
    font-family: 'DM Mono', monospace;
    font-size: clamp(80px,16vw,200px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #0d0d0d;
    position: absolute;
    bottom: 30px; left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
    z-index: 0;
  }

  .ft-inner {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── top CTA row ── */
  .ft-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
    margin-bottom: 100px;
  }
  @media (max-width: 768px) {
    .ft-top { grid-template-columns: 1fr; gap: 48px; }
  }

  /* big headline */
  .ft-headline {
    font-size: clamp(48px, 7vw, 96px);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.04em;
    margin: 0;
  }
  .ft-headline span {
    color: transparent;
    -webkit-text-stroke: 1px #444;
  }

  /* right side */
  .ft-right {
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .ft-desc {
    font-size: 20px;
    color: #777;
    line-height: 1.85;
    margin: 0 0 40px;
  }

  /* email link */
  .ft-email {
    font-family: 'DM Mono', monospace;
    font-size: 18px;
    color: #999;
    text-decoration: none;
    letter-spacing: 0.04em;
    position: relative;
    display: inline-block;
    padding-bottom: 4px;
    transition: color 0.3s;
  }
  .ft-email::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: #E6E6FA;
    transition: width 0.4s ease;
  }
  .ft-email:hover { color: #E6E6FA; }
  .ft-email:hover::after { width: 100%; }

  /* availability badge */
  .ft-avail {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #E6E6FA;
    background: rgba(200,255,0,0.06);
    border: 1px solid rgba(200,255,0,0.15);
    border-radius: 100px;
    padding: 8px 18px;
    margin-bottom: 32px;
    align-self: flex-start;
  }
  .ft-avail-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #E6E6FA;
    animation: ftPulse 2s infinite;
    flex-shrink: 0;
  }
  @keyframes ftPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(200,255,0,0.5); }
    50%      { box-shadow: 0 0 0 5px rgba(200,255,0,0); }
  }

  /* ── divider ── */
  .ft-divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, #111, #1e1e1e 50%, #111);
    margin-bottom: 40px;
  }

  /* ── bottom row ── */
  .ft-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  /* logo name */
  .ft-logo {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #e8e8e0;
  }
  .ft-logo span { color: #E6E6FA; }

  /* social links */
  .ft-socials {
    display: flex;
    gap: 28px;
    align-items: center;
  }
  .ft-social {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #555;
    text-decoration: none;
    transition: color 0.3s;
    position: relative;
  }
  .ft-social::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: #E6E6FA;
    transition: width 0.3s ease;
  }
  .ft-social:hover { color: #888; }
  .ft-social:hover::after { width: 100%; }

  /* copyright */
  .ft-copy {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #444;
    letter-spacing: 0.08em;
  }
`;

function Footer() {
  useEffect(() => {
    if (document.getElementById("ft-styles")) return;
    const tag = document.createElement("style");
    tag.id = "ft-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <footer className="ft-root">
      <div className="ft-ghost">GOPIKA</div>

      <div className="ft-inner">

        {/* ── Top CTA ── */}
        <div className="ft-top">

          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="ft-headline">
              Let's<br />
              <span>Work</span><br />
              Together
            </h2>
          </motion.div>

          {/* Right — desc + email */}
          <motion.div
            className="ft-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ft-avail">
              <span className="ft-avail-dot" />
              Available for work
            </div>

            <p className="ft-desc">
              I'm currently open to frontend and product engineering opportunities.
              If you're building something ambitious and need clean, scalable
              interfaces — let's create something impactful together.
            </p>

            <a href="mailto:gopikap026@gmail.com" className="ft-email">
              gopikap026@gmail.com |  Let's Connect and craft !
            </a>
          </motion.div>

        </div>

        {/* ── Divider ── */}
        <div className="ft-divider" />

        {/* ── Bottom bar ── */}
        <motion.div
          className="ft-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="ft-logo">GOP<span>I</span>KA</div>

          <div className="ft-socials">
            {[
              { label: "LinkedIn", href: "#" },
              { label: "GitHub",   href: "#" },
              { label: "Email",    href: "mailto:gopikap026@gmail.com" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="ft-social" target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>

          <p className="ft-copy">© {new Date().getFullYear()} Gopika. All rights reserved.</p>
        </motion.div>

      </div>
    </footer>
  );
}

export default Footer;