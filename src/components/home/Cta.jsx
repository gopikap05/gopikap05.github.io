import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

  .cta-root {
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
  }

  /* grain */
  .cta-root::before {
    content: '';
    position: absolute; inset: 0;
    pointer-events: none;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    z-index: 0;
  }

  /* big ghost text */
  .cta-ghost {
    font-family: 'DM Mono', monospace;
    font-size: clamp(80px, 18vw, 220px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px #0d0d0d;
    position: absolute;
    bottom: -30px; left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
    z-index: 0;
  }

  /* radial glow behind center */
  .cta-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,255,0,0.03) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
  }

  .cta-inner {
    text-align: center;
    max-width: 860px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* eyebrow */
  .cta-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #333;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
  }
  .cta-eyebrow::before,
  .cta-eyebrow::after {
    content: '';
    display: block; width: 28px; height: 1px; background: #2a2a2a;
  }

  /* headline */
  .cta-headline {
    font-size: clamp(36px, 6vw, 80px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0 0 28px;
  }
  .cta-headline-outline {
    color: transparent;
    -webkit-text-stroke: 1px #e8e8e0;
  }

  /* sub */
  .cta-sub {
    font-size: clamp(15px, 1.6vw, 18px);
    color: #555;
    line-height: 1.8;
    margin-bottom: 60px;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }

  /* divider lines flanking button */
  .cta-btn-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
  }
  .cta-btn-line {
    flex: 1;
    max-width: 120px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #1e1e1e);
  }
  .cta-btn-line:last-child {
    background: linear-gradient(90deg, #1e1e1e, transparent);
  }

  /* ── original star button (preserved exactly) ── */
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13rem;
    overflow: hidden;
    height: 3rem;
    background-size: 300% 300%;
    cursor: pointer;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    transition: 0.5s;
    animation: gradient_301 5s ease infinite;
    border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121),
      linear-gradient(
        137.48deg,
        #ffdb3b 10%,
        #fe53bb 45%,
        #8f51ea 67%,
        #0044ff 87%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    position: relative;
  }

  #container-stars {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
  }

  .btn strong {
    z-index: 2;
    font-size: 12px;
    letter-spacing: 5px;
    color: #ffffff;
    text-shadow: 0 0 4px white;
  }

  #glow {
    position: absolute;
    display: flex;
    width: 12rem;
  }

  .circle {
    width: 100%;
    height: 30px;
    filter: blur(2rem);
    animation: pulse_3011 4s infinite;
    z-index: -1;
  }

  .circle:nth-of-type(1) { background: rgba(254, 83, 186, 0.636); }
  .circle:nth-of-type(2) { background: rgba(142, 81, 234, 0.704); }

  .btn:hover #container-stars {
    z-index: 1;
    background-color: #212121;
  }

  .btn:hover { transform: scale(1.1); }

  .btn:active {
    border: double 4px #fe53bb;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
  }

  .btn:active .circle { background: #fe53bb; }

  #stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
  }

  #stars::after {
    content: "";
    position: absolute;
    top: -10rem; left: -100rem;
    width: 100%; height: 100%;
    animation: animStarRotate 90s linear infinite;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  #stars::before {
    content: "";
    position: absolute;
    top: 0; left: -50%;
    width: 170%; height: 500%;
    animation: animStar 60s linear infinite;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
  }

  @keyframes animStar {
    from { transform: translateY(0); }
    to   { transform: translateY(-135rem); }
  }
  @keyframes animStarRotate {
    from { transform: rotate(360deg); }
    to   { transform: rotate(0); }
  }
  @keyframes gradient_301 {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes pulse_3011 {
    0%   { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0,0,0,0.7); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(0,0,0,0); }
    100% { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0,0,0,0); }
  }

  /* social links below button */
  .cta-socials {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 52px;
    padding-top: 40px;
    border-top: 1px solid #0e0e0e;
  }
  .cta-social-link {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #2e2e2e;
    text-decoration: none;
    transition: color 0.3s;
    position: relative;
  }
  .cta-social-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: #E6E6FA;
    transition: width 0.3s ease;
  }
  .cta-social-link:hover { color: #E6E6FA; }
  .cta-social-link:hover::after { width: 100%; }
`;

function CTASection() {
  const navigate = useNavigate();

  useEffect(() => {
    if (document.getElementById("cta-styles")) return;
    const tag = document.createElement("style");
    tag.id = "cta-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <section className="cta-root">
      <div className="cta-ghost">LET'S TALK</div>
      <div className="cta-glow" />

      <div className="cta-inner">

        {/* Eyebrow */}
        <motion.p
          className="cta-eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get in touch
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="cta-headline"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Let's Build<br />
          <span className="cta-headline-outline">Something Great</span><br />
          Together.
        </motion.h2>

        {/* Sub */}
        <motion.p
          className="cta-sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          I'm open to freelance projects, collaborations,
          and full-time opportunities.
        </motion.p>

        {/* Star button — preserved exactly */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="cta-btn-row">
            <div className="cta-btn-line" />
            <button
              type="button"
              className="btn"
              onClick={() => navigate("/contact")}
            >
              <strong>GET IN TOUCH</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>
            <div className="cta-btn-line" />
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="cta-socials"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: "LinkedIn", href: "#" },
            { label: "GitHub",   href: "#" },
            { label: "Email",    href: "mailto:hello@gopika.dev" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="cta-social-link" target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default CTASection;