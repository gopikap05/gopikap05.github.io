import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useMemo } from "react";
import projects from "../../data/projects";

function ProjectHero() {
  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.status === "active").length;
    const companies = [...new Set(projects.map(p => p.origin).filter(Boolean))].length;
    return [
      { num: `${String(total).padStart(2, "0")}+`, label: "Projects" },
      { num: String(companies).padStart(2, "0"), label: "Companies" },
      { num: String(active).padStart(2, "0"), label: "Active Now" },
    ];
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .ph-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, rgba(255,59,59,0.5), transparent);
          margin: 0 auto;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ph-marquee-track {
          display: flex;
          gap: 48px;
          animation: marquee 18s linear infinite;
          width: max-content;
        }
        .ph-marquee-track:hover { animation-play-state: paused; }
        .ph-marquee-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ph-marquee-item::after {
          content: '';
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,59,59,0.4);
        }
      `}</style>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          backgroundColor: "#080808",
          color: "#fff",
          borderTop: "1px solid #141414",
          borderBottom: "1px solid #141414",
          overflow: "hidden",
        }}
      >
        <Box sx={{
          maxWidth: "1350px",
          width: "100%",
          mx: "auto",
          px: "5%",
          pt: { xs: "80px", md: "120px" },
          pb: { xs: "60px", md: "80px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: { xs: "auto", md: "calc(100vh - 80px)" },
          justifyContent: "center",
        }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: "28px" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 14px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "999px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
              Selected Work
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            <Typography sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(4rem, 15vw, 9rem)", md: "clamp(5rem, 12vw, 10rem)" },
              fontWeight: 400,
              letterSpacing: { xs: "6px", md: "10px" },
              lineHeight: 0.95,
              color: "#fff",
            }}>
              PROJECTS
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ marginBottom: "56px", textAlign: "center" }}
          >
            <Typography sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: { xs: "12px", md: "13px" },
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>
              Design · Development · Deployment
            </Typography>
          </motion.div>

          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ marginBottom: "56px" }}
          >
            <div className="ph-line" />
          </motion.div>

          {/* Stats — fully dynamic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Box sx={{
              display: "flex",
              gap: { xs: "32px", md: "64px" },
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
              {stats.map((stat, i) => (
                <Box key={i} sx={{ textAlign: "center" }}>
                  <Typography sx={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: { xs: "2rem", md: "2.6rem" },
                    letterSpacing: "3px",
                    color: "#fff",
                    lineHeight: 1,
                    mb: "4px",
                  }}>
                    {stat.num}
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>

        </Box>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Box sx={{
            borderTop: "1px solid #141414",
            py: "16px",
            overflow: "hidden",
          }}>
            <div className="ph-marquee-track">
              {[...Array(2)].map((_, ri) =>
                ["Emilda Solutions", "Friska AI", "Freelance", "React", "Node.js", "UI/UX", "Full Stack", "Emilda Solutions", "Friska AI", "Freelance", "React", "Node.js", "UI/UX", "Full Stack"].map((item, i) => (
                  <span key={`${ri}-${i}`} className="ph-marquee-item">{item}</span>
                ))
              )}
            </div>
          </Box>
        </motion.div>

      </Box>
    </>
  );
}

export default ProjectHero;