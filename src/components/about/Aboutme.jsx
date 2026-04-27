import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Frontend Development",
    desc: "Building scalable, responsive, and performance-driven web applications using modern frontend technologies.",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    number: "02",
    title: "UI Implementation",
    desc: "Translating complex design systems into pixel-perfect, maintainable UI components.",
    tags: ["Figma", "MUI", "CSS"],
  },
  {
    number: "03",
    title: "Performance Optimization",
    desc: "Improving load times, bundle size, and runtime performance for high-quality user experiences.",
    tags: ["Lighthouse", "Web Vitals", "Bundling"],
  },
  {
    number: "04",
    title: "API Integration",
    desc: "Seamlessly connecting frontend applications with REST APIs and third-party services.",
    tags: ["REST", "Axios", "GraphQL"],
  },
];

function AboutMe() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Service tag chips ── */
        .service-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          border: 1px solid var(--theme-border-hover);
          padding: 3px 10px;
          border-radius: 999px;
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        .service-tag:hover {
          border-color: var(--theme-primary);
          color: var(--theme-text-secondary);
        }

        /* ── Service row hover ── */
        .service-row {
          cursor: pointer;
          transition: background 0.3s ease;
          position: relative;
        }
        .service-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 2px; height: 0%;
          background: #ff3b3b;
          transition: height 0.4s ease;
        }
        .service-row:hover::before,
        .service-row.active::before {
          height: 100%;
        }
        .service-row:hover {
          background: var(--theme-overlay);
        }

        /* ── About hero char ── */
        .about-hero-char {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.25s ease;
        }
        .about-hero-char:hover {
          transform: translateY(-10px);
          color: var(--theme-text-muted);
        }

        /* Light theme specific adjustments */
        [data-theme="light"] .service-tag {
          border-color: var(--theme-border);
        }
        [data-theme="light"] .service-row:hover {
          background: rgba(122, 63, 145, 0.03);
        }
      `}</style>

      {/* ── HERO SECTION ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
          borderBottom: "1px solid var(--theme-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Corner decorations */}
        <div style={{
          position: "absolute", top: 24, left: 24,
          width: 28, height: 28,
          borderTop: "1px solid var(--theme-border-hover)",
          borderLeft: "1px solid var(--theme-border-hover)",
        }} />
        <div style={{
          position: "absolute", bottom: 24, right: 24,
          width: 28, height: 28,
          borderBottom: "1px solid var(--theme-border-hover)",
          borderRight: "1px solid var(--theme-border-hover)",
        }} />

        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, var(--theme-primary-light) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-100px", right: "-100px",
          pointerEvents: "none",
          opacity: 0.1,
        }} />

        <Box sx={{
          maxWidth: "1440px",
          width: "100%",
          mx: "auto",
          px: "clamp(16px, 5%, 96px)",
          py: { xs: "80px", sm: "100px", md: "120px" },
          minHeight: { xs: "auto", md: "60vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#ff3b3b",
            }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--theme-text-muted)",
            }}>
              About Me
            </span>
          </motion.div>

          {/* Big title — per-letter hover */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4rem, 14vw, 14rem)",
              fontWeight: 400,
              letterSpacing: "6px",
              lineHeight: 0.9,
              margin: 0,
              textAlign: "center",
              color: "var(--theme-text-primary)",
            }}>
              {"ABOUT ME".split("").map((char, i) => (
                <span key={i} className="about-hero-char">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(12px, 1.1vw, 14px)",
              color: "var(--theme-text-muted)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              textAlign: "center",
              margin: 0,
            }}>
              Frontend Developer · Hosur, India
            </p>
          </motion.div>
        </Box>
      </Box>

      {/* ── SERVICES SECTION ── */}
      <Box sx={{
        width: "100%",
        backgroundColor: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)",
        borderBottom: "1px solid var(--theme-border)",
      }}>
        <Box sx={{
          maxWidth: "1440px",
          width: "100%",
          mx: "auto",
          px: "clamp(16px, 5%, 96px)",
          py: { xs: "60px", sm: "70px", md: "80px" },
        }}>
          <Box sx={{
            display: "flex",
            gap: { xs: 4, md: 10 },
            flexDirection: { xs: "column", md: "row" },
          }}>

            {/* Left: sticky label */}
            <Box sx={{
              flex: { md: "0 0 200px" },
              pt: { md: "16px" },
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {/* Tag */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "4px 12px",
                  border: "1px solid var(--theme-border-hover)",
                  borderRadius: "999px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--theme-text-muted)",
                  marginBottom: "20px",
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
                  Services
                </div>

                <Typography sx={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 400,
                  letterSpacing: "3px",
                  lineHeight: 1.1,
                  color: "var(--theme-text-primary)",
                }}>
                  I<br />Provide<br />Various<br />Services
                </Typography>
              </motion.div>
            </Box>

            {/* Right: accordion list */}
            <Box sx={{ flex: 1 }}>
              {services.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Box
                      className={`service-row ${isOpen ? "active" : ""}`}
                      onClick={() => handleToggle(index)}
                      sx={{
                        py: { xs: "20px", md: "24px" },
                        px: "16px",
                        borderTop: index === 0 ? `1px solid var(--theme-border)` : "none",
                        borderBottom: `1px solid var(--theme-border)`,
                      }}
                    >
                      {/* Header row */}
                      <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}>
                        {/* Number */}
                        <span style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "12px",
                          letterSpacing: "2px",
                          color: isOpen ? "rgba(255,59,59,0.7)" : "var(--theme-text-muted)",
                          minWidth: "28px",
                          transition: "color 0.3s ease",
                        }}>
                          {item.number}
                        </span>

                        {/* Title */}
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                          color: isOpen ? "var(--theme-text-primary)" : "var(--theme-text-secondary)",
                          fontWeight: isOpen ? 500 : 400,
                          flex: 1,
                          transition: "color 0.3s ease",
                          letterSpacing: "0.5px",
                        }}>
                          {item.title}
                        </Typography>

                        {/* Plus / X */}
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            fontSize: "20px",
                            color: isOpen ? "var(--theme-text-primary)" : "var(--theme-text-muted)",
                            display: "inline-block",
                            lineHeight: 1,
                            transition: "color 0.3s ease",
                          }}
                        >
                          +
                        </motion.span>
                      </Box>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            style={{ overflow: "hidden" }}
                          >
                            <Box sx={{
                              pt: "16px",
                              pl: { xs: "28px", md: "36px" },
                              pr: "8px",
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { sm: "flex-end" },
                              justifyContent: "space-between",
                              gap: "16px",
                            }}>
                              <Typography sx={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: { xs: "0.82rem", md: "0.88rem" },
                                color: "var(--theme-text-secondary)",
                                lineHeight: 1.8,
                                maxWidth: "480px",
                              }}>
                                {item.desc}
                              </Typography>

                              {/* Tag chips */}
                              <Box sx={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                                justifyContent: { sm: "flex-end" },
                                flexShrink: 0,
                              }}>
                                {item.tags.map((tag) => (
                                  <span key={tag} className="service-tag">{tag}</span>
                                ))}
                              </Box>
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AboutMe;