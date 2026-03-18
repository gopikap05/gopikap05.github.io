import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import resumePreview from "../../assets/resume/resume-preview.jpg";

function Resume() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Resume image hover ── */
        .resume-img {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
          display: block;
        }
        .resume-img:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.6);
        }

        /* ── 3D Card ── */
        .resume-3d-card {
          width: min(240px, 100%);
          background: linear-gradient(135deg, #1a0533, #2d0a6e);
          border: 1px solid rgba(124,58,237,0.4);
          border-radius: 16px;
          transform: rotate3d(1, -1, 1, 55deg);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
          overflow: hidden;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          position: relative;
          cursor: pointer;
        }
        .resume-3d-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(139,92,246,0.15), transparent);
          pointer-events: none;
        }
        .resume-3d-card:hover {
          transform: rotate3d(0,0,0,0deg);
          box-shadow: 0 24px 60px rgba(109,40,217,0.4);
        }

        .resume-inner {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .resume-role {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 2.8rem);
          color: #f5e9ff;
          line-height: 1;
          letter-spacing: 2px;
        }

        .resume-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(233,213,255,0.6);
          margin: 4px 0 0;
        }

        .resume-download {
          background: rgba(243,232,255,0.12);
          color: #e9d5ff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: 1px solid rgba(233,213,255,0.2);
          padding: 8px 14px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          width: fit-content;
          margin-top: 4px;
        }
        .resume-download:hover {
          background: rgba(243,232,255,0.22);
          border-color: rgba(233,213,255,0.5);
          color: #fff;
        }

        @media (max-width: 768px) {
          .resume-3d-card { transform: rotate3d(0.5,-0.5,0.5,45deg); }
        }
        @media (max-width: 480px) {
          .resume-3d-card { transform: rotate3d(0.3,-0.3,0.3,30deg); }
        }

        /* ── Skills chips ── */
        .skill-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 4px 12px;
          border-radius: 999px;
          transition: color 0.3s ease, border-color 0.3s ease;
          white-space: nowrap;
        }
        .skill-chip:hover {
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.25);
        }

        /* ── Mobile centering ── */
        @media (max-width: 899px) {
          .resume-right-col {
            align-items: center !important;
            text-align: center;
          }
          .resume-chips {
            justify-content: center !important;
          }
          .resume-card-wrap {
            display: flex;
            justify-content: center;
            width: 100%;
          }
          .resume-divider {
            margin: 0 auto;
          }
          .resume-desc {
            text-align: center;
          }
        }
      `}</style>

      {/* ── SECTION ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        sx={{
          width: "100%",
          backgroundColor: "#080808",
          color: "#fff",
          borderTop: "1px solid #141414",
          borderBottom: "1px solid #141414",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── CONTAINER ── */}
        <Box sx={{
          maxWidth: "1350px",
          mx: "auto",
          width: "100%",
          px: "clamp(16px, 5%, 96px)",
          py: { xs: "60px", sm: "70px", md: "80px" },
        }}>

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "12px",
              marginBottom: "clamp(28px, 4vw, 48px)",
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 12px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
              Resume
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(2rem, 7vw, 3.5rem)", md: "clamp(3rem, 5vw, 4.5rem)" },
              fontWeight: 400,
              letterSpacing: "3px",
              lineHeight: 1,
              mb: { xs: 4, md: 6 },
              textAlign: { xs: "center", md: "left" },
            }}>
              A Snapshot of My{" "}
              <Box component="span" sx={{ color: "rgba(255,255,255,0.25)" }}>
                Professional Journey.
              </Box>
            </Typography>
          </motion.div>

          {/* Main content: image + right column */}
          <Box sx={{
            display: "flex",
            gap: { xs: 5, md: 10 },
            alignItems: { xs: "center", md: "flex-start" },
            flexDirection: { xs: "column", md: "row" },
          }}>

            {/* Resume image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: "0 0 auto", width: "100%", maxWidth: "440px" }}
            >
              <Box
                component="img"
                src={resumePreview}
                alt="Resume Preview"
                className="resume-img"
                sx={{
                  width: { xs: "100%", md: "380px" },
                  maxWidth: "440px",
                  borderRadius: "12px",
                  border: "1px solid #1c1c1c",
                  display: "block",
                  mx: { xs: "auto", md: 0 },
                }}
              />
            </motion.div>

            {/* Right column */}
            <Box
              className="resume-right-col"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                gap: { xs: "32px", md: "40px" },
                width: "100%",
              }}
            >

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ width: "100%" }}
              >
                <Typography
                  className="resume-desc"
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: { xs: "0.88rem", md: "0.95rem" },
                    lineHeight: 1.9,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Experienced frontend developer with a strong foundation in
                  scalable architecture, performance optimization, and
                  production-ready UI systems. Skilled in React, TypeScript,
                  API integrations, and maintaining enterprise-level applications.
                </Typography>
              </motion.div>

              {/* Skill chips */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ width: "100%" }}
              >
                <Box
                  className="resume-chips"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  {["React", "TypeScript", "Next.js", "MUI", "Framer Motion", "REST APIs", "Git"].map((s) => (
                    <span key={s} className="skill-chip">{s}</span>
                  ))}
                </Box>
              </motion.div>

              {/* Divider */}
              <div style={{
                width: "100%", height: "1px",
                background: "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
              }} />

              {/* 3D Card */}
              <motion.div
                className="resume-card-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
              >
                <a
                  href="/resume/Gopika-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  <div className="resume-3d-card">
                    <div className="resume-inner">
                      <div>
                        <div className="resume-role">Jr.</div>
                        <p className="resume-sub">Frontend Developer</p>
                      </div>
                      <button className="resume-download">
                        Download CV
                        <svg viewBox="0 0 100 100" width="14" height="14" fill="currentColor">
                          <path d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </a>
              </motion.div>

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Resume;