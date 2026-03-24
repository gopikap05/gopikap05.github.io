import { Box, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

function AboutSection() {
  const paragraphRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 80%", "end 40%"],
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "start 20%"],
  });

  const lineWidth = useTransform(sectionProgress, [0, 1], ["0%", "100%"]);

  const text =
    "Currently building scalable frontend systems using React and TypeScript. Passionate about performance, UI clarity, and creating production-ready web experiences.";

  const words = text.split(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');

        /* ── Gooey Button ── */
        .c-button {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
          background: transparent;
          border: none;
          padding: 0;
        }
        .c-button--gooey {
          color: var(--theme-text-primary);
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: clamp(0.7rem, 0.9vw, 0.8rem);
          border: 1px solid var(--theme-border-hover);
          padding: 1em 2.2em;
          transition: all 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .c-button--gooey:hover {
          color: var(--theme-bg-primary);
          border-color: transparent;
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
          background: var(--theme-text-primary);
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

        /* Arrow icon */
        .btn-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .c-button--gooey:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* ── Section number ── */
        .about-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 12vw, 180px);
          color: var(--theme-text-muted);
          opacity: 0.03;
          position: absolute;
          top: -20px;
          right: 0;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: 4px;
        }

        /* ── Tag chip ── */
        .about-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border: 1px solid var(--theme-border-hover);
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
        }
        .about-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #ff3b3b;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }

        /* ── Stat cards ── */
        .stat-card {
          border: 1px solid var(--theme-border-hover);
          padding: 20px 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
          background: var(--theme-bg-primary);
        }
        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--theme-bg-secondary);
          transform: translateY(100%);
          transition: transform 0.4s ease;
        }
        .stat-card:hover::before {
          transform: translateY(0);
        }
        .stat-card:hover {
          border-color: var(--theme-border);
        }
        .stat-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1;
          color: var(--theme-text-primary);
          position: relative;
          z-index: 1;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          margin-top: 4px;
          position: relative;
          z-index: 1;
        }
      `}</style>

      {/* ── SECTION ── */}
      <MotionBox
        ref={sectionRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
          borderTop: "1px solid var(--theme-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated top border line */}
        <motion.div
          style={{
            width: lineWidth,
            height: "1px",
            background: "linear-gradient(to right, #ff3b3b, var(--theme-text-secondary), transparent)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* ── CONTAINER ── */}
        <Box
          sx={{
            maxWidth: "1350px",
            width: "100%",
            mx: "auto",
            px: "clamp(16px, 5%, 96px)",
            pt: { xs: "60px", sm: "80px", md: "100px" },
            pb: { xs: "60px", sm: "80px", md: "100px" },
            position: "relative",
          }}
        >
          {/* Top row: tag + section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(28px, 4vw, 48px)" }}
          >
            <div className="about-tag">
              <div className="about-tag-dot" />
              About
            </div>
            <div style={{
              height: "1px",
              width: "40px",
              background: "var(--theme-border-hover)"
            }} />
          </motion.div>

          {/* Two-column layout on desktop */}
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: "40px", lg: "80px" },
            alignItems: "start",
          }}>

            {/* Left: Heading */}
            <Box>
              <MotionTypography
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: { xs: "clamp(1.6rem, 5vw, 2.2rem)", md: "clamp(2rem, 3vw, 3rem)" },
                  fontWeight: 600,
                  lineHeight: 1.25,
                  letterSpacing: "-0.5px",
                  color: "var(--theme-text-primary)",
                }}
              >
                I'm a versatile{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#ff3b3b",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      width: "100%",
                      height: "1px",
                      background: "#ff3b3b",
                      opacity: 0.4,
                    }
                  }}
                >
                  developer
                </Box>{" "}
                who partners with founders to turn ideas into{" "}
                <Box component="span" sx={{ color: "#ff3b3b" }}>
                  real products.
                </Box>{" "}
                I focus on clean interfaces, sharp decisions, and fast execution.
              </MotionTypography>

              {/* Stat cards */}
              <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                mt: { xs: "32px", md: "48px" },
                background: "var(--theme-border-hover)",
              }}>
                {[
                  { number: "2+", label: "Years Exp." },
                  { number: "30+", label: "Projects" },
                  { number: "100%", label: "Dedication" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  >
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Right: Scroll-reveal paragraph + button */}
            <Box sx={{ pt: { lg: "8px" } }}>
              <motion.div
                ref={paragraphRef}
                style={{
                  marginBottom: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.9,
                }}
              >
                {words.map((word, index) => {
                  const start = index / words.length;
                  const end = start + 1.5 / words.length;
                  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
                  const y = useTransform(scrollYProgress, [start, end], [8, 0]);
                  return (
                    <motion.span
                      key={index}
                      style={{
                        opacity,
                        y,
                        display: "inline-block",
                        marginRight: "0.4em",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                        color: "var(--theme-text-secondary)",
                      }}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </motion.div>

              {/* Gooey Button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <button
                  className="c-button c-button--gooey"
                  onClick={() => navigate("/about")}
                >
                  View More
                  <span className="btn-arrow">→</span>
                  <div className="c-button__blobs">
                    <div />
                    <div />
                    <div />
                  </div>
                </button>
              </motion.div>
            </Box>
          </Box>
        </Box>

        {/* Goo Filter */}
        <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </MotionBox>
    </>
  );
}

export default AboutSection;