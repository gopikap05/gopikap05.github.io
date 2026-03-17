import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import resumePreview from "../../assets/resume/resume-preview.jpg";

function Resume() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
      }}
    >
      <Box sx={{ maxWidth: "1100px", mx: "auto" }}>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#777",
            letterSpacing: "2px",
            mb: 2,
          }}
        >
          RESUME
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "32px", md: "48px" },
            fontWeight: 600,
            mb: 6,
          }}
        >
          A snapshot of my professional journey.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 4, md: 8 },
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            component={motion.img}
            src={resumePreview}
            alt="Resume Preview"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            sx={{
              width: { xs: "100%", md: "45%" },
              borderRadius: "16px",
              border: "1px solid #1a1a1a",
            }}
          />

          <Box
            component={motion.div}
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "#aaa",
                lineHeight: 1.8,
                mb: 5,
              }}
            >
              Experienced frontend developer with a strong foundation in
              scalable architecture, performance optimization, and
              production-ready UI systems. Skilled in React, TypeScript,
              API integrations, and maintaining enterprise-level applications.
            </Typography>

            {/* EXACT 3D CARD BUTTON */}
            <a
              href="/resume/Gopika-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", width: "fit-content" }}
            >
              <div className="resume-3d-card group">
                <div className="resume-inner">
                  <div className="resume-text">
                    <span className="resume-role">Jr</span>
                    <p className="resume-sub">Frontend Developer</p>
                  </div>

                  <button className="resume-download">
                    Download CV
                    <svg
                      viewBox="0 0 100 100"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Resume;