import { Box, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const MotionTypography = motion(Typography);
const MotionBox = motion(Box);

function HeroSection() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const cubeY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.12, 0.08, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * -20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nameLetters = "GOPIKA".split("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

        /* ── Reset box-sizing globally for this component ── */
        *, *::before, *::after {
          box-sizing: border-box;
        }

        /* ── 3D Cube ── */
        .obj {
          position: relative;
          width: 160px;
          height: 160px;
          transform-style: preserve-3d;
          flex-shrink: 0;
        }

        .objchild {
          animation: rotate 12s infinite linear;
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
          filter: blur(18px);
          box-shadow: 0 0 180px 12px rgba(255,255,255,0.6);
          transform: rotateX(90deg) scale(1.1) translateZ(-110px);
        }

        .inn6 {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgb(18, 18, 18);
          transform: rotateX(90deg) translateZ(90px);
          animation: updown 4s infinite ease-in-out;
        }

        @keyframes rotate {
          from { transform: rotate3d(0,1,0,0deg); }
          to   { transform: rotate3d(0,1,0,360deg); }
        }

        @keyframes updown {
          0%,100% { transform: translateY(90px) rotateX(90deg) translateZ(90px); }
          50%     { transform: translateY(170px) rotateX(90deg) translateZ(90px); }
        }

        /* ── Responsive cube sizes ── */
        @media (max-width: 1200px) {
          .obj { width: 130px; height: 130px; }
          .inn6 { transform: rotateX(90deg) translateZ(75px); }
          .objchild::after { transform: rotateX(90deg) scale(1.1) translateZ(-90px); }
          @keyframes updown {
            0%,100% { transform: translateY(75px) rotateX(90deg) translateZ(75px); }
            50%     { transform: translateY(140px) rotateX(90deg) translateZ(75px); }
          }
        }

        @media (max-width: 900px) {
          .obj { width: 100px; height: 100px; }
          .inn6 { transform: rotateX(90deg) translateZ(55px); }
          .objchild::after {
            filter: blur(12px);
            box-shadow: 0 0 120px 10px rgba(255,255,255,0.5);
            transform: rotateX(90deg) scale(1.1) translateZ(-65px);
          }
          @keyframes updown {
            0%,100% { transform: translateY(55px) rotateX(90deg) translateZ(55px); }
            50%     { transform: translateY(105px) rotateX(90deg) translateZ(55px); }
          }
        }

        @media (max-width: 600px) {
          .obj { width: 72px; height: 72px; }
          .inn6 { transform: rotateX(90deg) translateZ(40px); }
          .objchild::after {
            filter: blur(8px);
            box-shadow: 0 0 80px 6px rgba(255,255,255,0.4);
            transform: rotateX(90deg) scale(1.1) translateZ(-46px);
          }
          @keyframes updown {
            0%,100% { transform: translateY(40px) rotateX(90deg) translateZ(40px); }
            50%     { transform: translateY(78px) rotateX(90deg) translateZ(40px); }
          }
        }

        @media (max-width: 400px) {
          .obj { width: 52px; height: 52px; }
          .inn6 { transform: rotateX(90deg) translateZ(28px); }
          .objchild::after {
            filter: blur(6px);
            box-shadow: 0 0 60px 4px rgba(255,255,255,0.3);
            transform: rotateX(90deg) scale(1.1) translateZ(-33px);
          }
          @keyframes updown {
            0%,100% { transform: translateY(28px) rotateX(90deg) translateZ(28px); }
            50%     { transform: translateY(54px) rotateX(90deg) translateZ(28px); }
          }
        }

        /* ── Name letters ── */
        .name-letter {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.25s ease;
          cursor: default;
        }
        .name-letter:hover {
          transform: translateY(-8px) skewX(-2deg);
          color: rgba(255,255,255,0.55);
        }
        @media (hover: none) {
          .name-letter:hover {
            transform: none;
            color: inherit;
          }
        }

        /* ── Scanline subtle overlay ── */
        .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.04) 3px,
            rgba(0,0,0,0.04) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        /* ── Scroll indicator ── */
        .scroll-line {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 4;
        }
        .scroll-line span {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .scroll-dot {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
          animation: scrollpulse 2s ease-in-out infinite;
        }
        @keyframes scrollpulse {
          0%,100% { opacity: 0.3; transform: scaleY(1); }
          50%     { opacity: 0.8; transform: scaleY(1.2); }
        }

        /* ── Corner decoration ── */
        .corner-tl {
          position: absolute;
          top: 24px;
          left: 24px;
          width: 24px;
          height: 24px;
          border-top: 1px solid rgba(255,255,255,0.2);
          border-left: 1px solid rgba(255,255,255,0.2);
          z-index: 3;
        }
        .corner-br {
          position: absolute;
          bottom: 24px;
          right: 24px;
          width: 24px;
          height: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          border-right: 1px solid rgba(255,255,255,0.2);
          z-index: 3;
        }
        @media (max-width: 480px) {
          .corner-tl { top: 14px; left: 14px; width: 16px; height: 16px; }
          .corner-br { bottom: 14px; right: 14px; width: 16px; height: 16px; }
        }

        /* ── Horizontal rule ── */
        .hero-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
          margin: 28px 0 22px 0;
        }
        @media (max-width: 600px) {
          .hero-rule { margin: 22px 0 18px 0; }
        }

        /* ── Tag line ── */
        .tagline-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
        }
        @media (max-width: 480px) {
          .tagline-row {
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
        }

        .tagline-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          flex-shrink: 0;
          animation: blink 2.5s infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 1; }
        }

        /* ── Hello row ── */
        .hello-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        @media (max-width: 600px) {
          .hello-row {
            justify-content: center;
            margin-bottom: 24px;
          }
        }
        .hello-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
        }
        @media (max-width: 900px) { .hello-text { font-size: 11px; letter-spacing: 3px; } }
        @media (max-width: 600px) { .hello-text { font-size: 10px; letter-spacing: 2.5px; } }

        /* ── Name heading ── */
        .name-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: 6px;
          margin: 0;
          font-size: clamp(64px, 11vw, 185px);
          white-space: nowrap;
        }
        @media (max-width: 600px) {
          .name-heading {
            font-size: clamp(52px, 13vw, 80px);
            letter-spacing: 3px;
            text-align: center;
            width: 100%;
          }
        }
        @media (max-width: 400px) {
          .name-heading {
            font-size: clamp(40px, 12vw, 56px);
            letter-spacing: 2px;
            text-align: center;
            width: 100%;
          }
        }

        /* ── Name + Cube row ── */
        .name-cube-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(12px, 4vw, 72px);
          width: 100%;
          margin-bottom: 0;
        }
        @media (max-width: 600px) {
          .name-cube-row {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
        }

        /* ── Index label ── */
        .index-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
          white-space: nowrap;
        }
        @media (max-width: 600px) { .index-label { font-size: 10px; } }

        /* ── Role label ── */
        .role-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          white-space: nowrap;
        }
        @media (max-width: 900px) { .role-label { font-size: 13px; letter-spacing: 2.5px; } }
        @media (max-width: 600px) { .role-label { font-size: 11px; letter-spacing: 2px; } }
      `}</style>

      <MotionBox
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          width: "100%",
          minHeight: { xs: "520px", sm: "600px", md: "80vh" },
          height: { xs: "auto", md: "80vh" },
          backgroundColor: "#080808",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Scanlines */}
        <div className="scanlines" />

        {/* Corner decorations */}
        <motion.div
          className="corner-tl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        />
        <motion.div
          className="corner-br"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        />

        {/* Ambient glow top-right */}
        <MotionBox
          style={{ opacity: glowOpacity }}
          sx={{
            position: "absolute",
            width: { xs: "200px", sm: "300px", md: "500px", lg: "600px" },
            height: { xs: "200px", sm: "300px", md: "500px", lg: "600px" },
            background: "radial-gradient(circle, #fff 0%, transparent 70%)",
            filter: { xs: "blur(60px)", sm: "blur(80px)", md: "blur(120px)", lg: "blur(130px)" },
            top: { xs: "-60px", sm: "-80px", md: "-100px" },
            right: { xs: "-60px", sm: "-80px", md: "-100px" },
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Secondary glow bottom-left */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 1, duration: 2 }}
          sx={{
            position: "absolute",
            width: { xs: "150px", sm: "220px", md: "400px" },
            height: { xs: "150px", sm: "220px", md: "400px" },
            background: "radial-gradient(circle, #aaa 0%, transparent 70%)",
            filter: { xs: "blur(50px)", sm: "blur(70px)", md: "blur(100px)" },
            bottom: { xs: "-40px", sm: "-50px", md: "-60px" },
            left: { xs: "-40px", sm: "-50px", md: "-60px" },
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* ── CONTAINER ── */}
        <Box
          sx={{
            maxWidth: "1350px",
            width: "100%",
            mx: "auto",
            px: { xs: "24px", sm: "36px", md: "52px", lg: "72px", xl: "96px" },
            py: { xs: "60px", sm: "64px", md: "80px" },
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* HELLO row */}
          <motion.div
            className="hello-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="tagline-dot" />
            <span className="hello-text">Hello — This is</span>
          </motion.div>

          {/* Name + Cube row */}
          <div className="name-cube-row">
            {/* Name with per-letter hover */}
            <MotionBox style={{ y: nameY }}>
              <h1 className="name-heading">
                {nameLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="name-letter"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.7 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </MotionBox>

            {/* 3D Cube with mouse tilt */}
            <MotionBox style={{ y: cubeY, flexShrink: 0 }}>
              <div
                className="obj"
                style={{
                  transform: `rotateX(${-25 + mousePos.y * 0.3}deg) rotateY(${20 + mousePos.x * 0.3}deg)`,
                }}
              >
                <div className="objchild">
                  <span className="inn6" />
                </div>
              </div>
            </MotionBox>
          </div>

          {/* Horizontal rule */}
          <motion.div
            className="hero-rule"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          {/* Bottom row: index label + role */}
          <div className="tagline-row">
            <motion.span
              className="index-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.8 }}
            >
              Junior
            </motion.span>

            <motion.span
              className="role-label"
              style={{ y: subtitleY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Frontend Developer
            </motion.span>
          </div>
        </Box>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <span>Scroll</span>
          <div className="scroll-dot" />
        </motion.div>

        {/* Bottom fade */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: { xs: "60px", sm: "80px", md: "100px" },
            background: "linear-gradient(to top, #080808, transparent)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </MotionBox>
    </>
  );
}

export default HeroSection;