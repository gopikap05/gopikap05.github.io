import { motion } from "framer-motion";
import { useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400&display=swap');

  .hs-root {
    font-family: 'Syne', sans-serif;
    height: 100vh;
    background: #050505;
    color: #e8e8e0;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 clamp(24px,6vw,96px);
    overflow: hidden;
  }

  /* grain */
  .hs-root::after {
    content: '';
    position: absolute; inset: 0;
    pointer-events: none;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    z-index: 0;
  }

  /* subtle radial glow */
  .hs-glow {
    position: absolute;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%);
    filter: blur(80px);
    top: -160px; right: -160px;
    z-index: 0;
    pointer-events: none;
  }

  /* bottom-left lime accent glow */
  .hs-glow-lime {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%);
    filter: blur(60px);
    bottom: -80px; left: -80px;
    z-index: 0;
    pointer-events: none;
  }

  /* eyebrow top-left */
  .hs-eyebrow {
    position: absolute;
    top: clamp(90px,12vh,140px);
    left: clamp(24px,6vw,96px);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #555;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 4px;
    line-height: 1.6;
  }
  .hs-eyebrow span {
    color: #333;
  }

  /* scroll indicator bottom-left */
  .hs-scroll {
    position: absolute;
    bottom: clamp(32px,6vh,64px);
    left: clamp(24px,6vw,96px);
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #333;
  }
  .hs-scroll-line {
    width: 40px; height: 1px;
    background: #222;
    position: relative;
    overflow: hidden;
  }
  .hs-scroll-line::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: #E6E6FA;
    animation: scrollLine 2s ease-in-out infinite;
  }
  @keyframes scrollLine {
    0%   { left: -100%; }
    50%  { left: 0%; }
    100% { left: 100%; }
  }

  /* role bottom-right */
  .hs-role {
    position: absolute;
    bottom: clamp(32px,6vh,64px);
    right: clamp(24px,6vw,96px);
    z-index: 2;
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #555;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .hs-role::before {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: #333;
  }

  /* main content row */
  .hs-content {
    display: flex;
    align-items: center;
    gap: clamp(40px, 8vw, 100px);
    z-index: 2;
    position: relative;
    width: 100%;
  }

  /* big name */
  .hs-name {
    font-size: clamp(72px, 14vw, 180px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.04em;
    margin: 0;
    flex-shrink: 0;
  }
  .hs-name span {
    color: transparent;
    -webkit-text-stroke: 2px #e8e8e0;
    display: block;
  }

  /* horizontal rule behind name */
  .hs-rule {
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, #111, #1e1e1e 40%, #111);
    z-index: 1;
  }

  /* 3D object container */
  .hs-obj-wrap {
    flex-shrink: 0;
  }

  /* ── PRESERVED 3D object ── */
  .obj {
    position: relative;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transition: 0.5s all;
    transform: rotateX(-25deg) rotateY(20deg);
  }

  .objchild {
    animation: rotate 10s infinite linear;
    transform-style: preserve-3d;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .objchild::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    box-shadow: 0 0 200px 15px white;
    transform: rotateX(90deg) scale(1.1) translateZ(-120px);
  }

  .inn6 {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(21, 21, 21);
    transform: rotateX(90deg) translateZ(100px);
    animation: updown 4s infinite ease-in-out;
  }

  @keyframes rotate {
    0%   { transform: rotate3d(0,1,0,0deg); }
    100% { transform: rotate3d(0,1,0,360deg); }
  }

  @keyframes updown {
    0%   { transform: translateY(100px) rotateX(90deg) translateZ(100px); }
    50%  { transform: translateY(200px) rotateX(90deg) translateZ(100px); }
    100% { transform: translateY(100px) rotateX(90deg) translateZ(100px); }
  }

  /* availability dot top-right corner */
  .hs-avail {
    position: absolute;
    top: clamp(90px,12vh,140px);
    right: clamp(24px,6vw,96px);
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #E6E6FA;
    background: rgba(200,255,0,0.06);
    border: 1px solid rgba(200,255,0,0.15);
    border-radius: 100px;
    padding: 7px 16px;
  }
  .hs-avail-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #E6E6FA;
    animation: availPulse 2s infinite;
    flex-shrink: 0;
  }
  @keyframes availPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(200,255,0,0.5); }
    50%      { box-shadow: 0 0 0 5px rgba(200,255,0,0); }
  }
`;

function HeroSection() {
  useEffect(() => {
    if (document.getElementById("hs-styles")) return;
    const tag = document.createElement("style");
    tag.id = "hs-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <div className="hs-root">
      <div className="hs-glow" />
      <div className="hs-glow-lime" />

      {/* Eyebrow — top left */}
      <motion.div
        className="hs-eyebrow"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Hello! <span>This is</span>
      </motion.div>

      {/* Availability — top right */}
      <motion.div
        className="hs-avail"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
      >
        <span className="hs-avail-dot" />
        Available for work
      </motion.div>

      {/* Main content */}
      <div className="hs-content">
        <motion.h1
          className="hs-name"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          GOP
          <span>IKA</span>
        </motion.h1>

        {/* 3D object — preserved exactly */}
        <motion.div
          className="hs-obj-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          <div className="obj">
            <div className="objchild">
              <span className="inn6"></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — bottom left */}
      <motion.div
        className="hs-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <div className="hs-scroll-line" />
        Scroll
      </motion.div>

      {/* Role — bottom right */}
      <motion.div
        className="hs-role"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.5 }}
      >
        Frontend Developer
      </motion.div>
    </div>
  );
}

export default HeroSection;