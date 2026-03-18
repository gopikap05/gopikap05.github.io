import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import projects from "../../data/projects";

const SPRING_CFG = { stiffness: 300, damping: 25, mass: 0.4 };

function ProjectCard({ project, index, to }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, SPRING_CFG);
  const smoothY = useSpring(rawY, SPRING_CFG);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [rawX, rawY]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{ height: "320px" }}
    >
      <Link
        to={to}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "block",
          height: "90%",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          border: "1px solid #1c1c1c",
          backgroundColor: "#0d0d0d",
          cursor: "none",
          boxSizing: "border-box",
        }}
      >
        {/* Revolving conic gradient bg */}
        <div
          className="card-gradient-bg"
          style={{
            position: "absolute",
            inset: 0,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 0,
          }}
        />

        {/* Dark overlay so text stays readable */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(13,13,13,0.84)",
          zIndex: 1,
        }} />

        {/* Red top line sweep */}
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "2px",
          background: "linear-gradient(to right, #ff3b3b, transparent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.5s ease",
          zIndex: 2,
        }} />

        {/* Magnetic cursor circle — smooth spring */}
        <motion.div
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            left: smoothX,
            top: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: hovered ? 1 : 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
          transition={{ opacity: { duration: 0.2 } }}
        >
          <span style={{ fontSize: "18px", color: "#000", lineHeight: 1 }}>→</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "7px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#000",
          }}>View</span>
        </motion.div>

        {/* Card content */}
        <div style={{
          position: "relative",
          zIndex: 3,
          padding: "28px",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "12px",
            letterSpacing: "3px",
            color: "rgba(255,59,59,0.8)",
            marginBottom: "14px",
          }}>
            {String(index + 1).padStart(2, "0")}
          </div>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
            letterSpacing: "2px",
            color: "#fff",
            lineHeight: 1,
            marginBottom: "10px",
          }}>
            {project.title || project.company}
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.35)",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}>
            {project.company}
            {project.ceo && ` · ${project.ceo}`}
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.55)",
            fontSize: "0.88rem",
            lineHeight: 1.7,
          }}>
            {project.shortDescription}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function RecentProjects() {
  const navigate = useNavigate();

  const recentProjects = [...projects]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');

        /* Revolving gradient using CSS animation on background-position */
        @keyframes gradientRevolve {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .card-gradient-bg {
          background: linear-gradient(
            270deg,
            rgba(255,59,59,0.35),
            rgba(168,85,247,0.3),
            rgba(59,130,246,0.3),
            rgba(255,59,59,0.35)
          );
          background-size: 400% 400%;
          animation: gradientRevolve 4s ease infinite;
        }

        /* ── Section tag ── */
        .projects-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: clamp(28px, 4vw, 48px);
        }

        /* ── CTA Button ── */
        .animated-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 40px;
          border: 1px solid rgba(255,255,255,0.3);
          background: transparent;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.5s ease, border-color 0.5s ease, border-radius 0.5s ease;
          white-space: nowrap;
        }
        .animated-button .btn-bg {
          position: absolute;
          inset: 0;
          background: #fff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
          border-radius: inherit;
        }
        .animated-button:hover .btn-bg { transform: scaleX(1); }
        .animated-button:hover { color: #000; border-color: #fff; border-radius: 10px; }
        .animated-button .btn-text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .animated-button .btn-arrow {
          display: inline-block;
          transition: transform 0.4s ease;
        }
        .animated-button:hover .btn-arrow { transform: translateX(5px); }
        .animated-button:active { transform: scale(0.97); }
      `}</style>

      {/* ── SECTION ── */}
      <Box sx={{
        width: "100%",
        backgroundColor: "#080808",
        color: "#fff",
        borderTop: "1px solid #141414",
        position: "relative",
        overflow: "hidden",
      }}>
        <Box sx={{
          maxWidth: "1350px",
          width: "100%",
          mx: "auto",
          px: "clamp(16px, 5%, 96px)",
          pt: { xs: "60px", sm: "70px", md: "80px" },
          pb: { xs: "60px", sm: "70px", md: "80px" },
        }}>

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="projects-tag">
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
              Recent Projects
            </div>
          </motion.div>

          {/* Heading row */}
          <Box sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "12px", sm: 0 },
            mb: { xs: 4, md: 6 },
          }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "clamp(2.5rem, 8vw, 4rem)", md: "clamp(3rem, 5vw, 5rem)" },
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "3px",
              }}>
                Latest Work
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(11px, 1vw, 13px)",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                pb: { sm: "8px" },
              }}>
                {recentProjects.length} Projects
              </Typography>
            </motion.div>
          </Box>

          {/* Cards */}
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: "16px", md: "20px" },
            mb: { xs: 0, md: 0 },
          }}>
            {recentProjects.map((project, i) => (
              <ProjectCard
                key={project.count}
                project={project}
                index={i}
                to={`/projects/${project.count}`}
              />
            ))}
          </Box>

          {/* CTA Button */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button className="animated-button" onClick={() => navigate("/projects")}>
                <div className="btn-bg" />
                <span className="btn-text">
                  View All Projects
                  <span className="btn-arrow">→</span>
                </span>
              </button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default RecentProjects;