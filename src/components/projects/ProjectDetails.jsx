import { Box, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../../data/projects";
import Breadcrumbs from "../common/breadcrumbs";

import figma from "../../assets/tech icons/figma.svg";
import github from "../../assets/tech icons/github.svg";
import netlify from "../../assets/tech icons/netflify.svg";
import shopify from "../../assets/tech icons/shopify.svg";
import vscode from "../../assets/tech icons/vs code.svg";
import webflow from "../../assets/tech icons/webflow.svg";
import wordpress from "../../assets/tech icons/wordpress.svg";
import hostinger from "../../assets/tech icons/hostinge.png";

const ORIGIN_LABELS = {
  "emilda solutions": "Emilda Solutions",
  "Friska ai": "Friska AI",
  freelance: "Freelance",
};

const TECH_ICONS = {
  Figma: figma,
  GitHub: github,
  Netlify: netlify,
  Shopify: shopify,
  "VS Code": vscode,
  Webflow: webflow,
  WordPress: wordpress,
  Hostinger: hostinger,
};

function ProjectDetails() {
  const { origin, id } = useParams();
  const project = projects.find((p) =>
    p.origin.toLowerCase().replace(/\s+/g, '-') === origin &&
    p.id === id
  );

  if (!project) {
    return (
      <Box sx={{
        width: "100%", minHeight: "100vh", background: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)", display: "flex", alignItems: "center",
        justifyContent: "center", px: "5%",
      }}>
        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: { xs: "14px", sm: "16px" }, color: "var(--theme-text-muted)" }}>
          Project not found.
        </Typography>
      </Box>
    );
  }

  const relatedProjects = projects.filter((p) =>
    project.relatedProjects?.includes(p.id)
  );

  // 3 most recent, excluding current + already shown in related
  const relatedCounts = new Set(relatedProjects.map((p) => p.count));
  const recentProjects = [...projects]
    .filter((p) => p.count !== project.count && !relatedCounts.has(p.count))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  // Zero-pad project number: 1 → "01", 12 → "12"
  const projectNumber = String(project.count).padStart(2, "0");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .pd-tech-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 999px;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          transition: transform 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }
        .pd-tech-chip:hover {
          transform: translateY(-3px);
          border-color: var(--theme-border-hover);
        }

        .pd-related-card {
          text-decoration: none;
          color: inherit;
          display: block;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .pd-related-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(to right, #ff3b3b, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .pd-related-card:hover { 
          border-color: var(--theme-border-hover); 
          transform: translateY(-3px); 
        }
        .pd-related-card:hover::before { transform: scaleX(1); }

        .pd-recent-card {
          text-decoration: none;
          color: inherit;
          display: block;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .pd-recent-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(to right, var(--theme-border-hover), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .pd-recent-card:hover { 
          border-color: var(--theme-border-hover); 
          transform: translateY(-3px); 
        }
        .pd-recent-card:hover::before { transform: scaleX(1); }

        .pd-live-link {
          color: var(--theme-text-primary);
          text-decoration: none;
          border-bottom: 1px solid var(--theme-border);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          word-break: break-all;
          transition: border-color 0.2s ease;
        }
        .pd-live-link:hover { 
          border-color: var(--theme-text-primary); 
        }

        .pd-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          margin-bottom: 16px;
        }

        /* Light theme specific adjustments */
        [data-theme="light"] .pd-tech-chip {
          background: var(--theme-bg-card);
        }
        [data-theme="light"] .pd-recent-card {
          background: var(--theme-bg-card);
        }
        [data-theme="light"] .pd-recent-card:hover {
          background: var(--theme-bg-secondary);
        }

        /* Responsive font sizes */
        @media (max-width: 600px) {
          .pd-section-label {
            font-size: 10px;
          }
          .pd-live-link {
            font-size: 13px;
          }
        }
      `}</style>

      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Projects", path: "/projects" },
          { label: project.title },
        ]}
      />

      <Box sx={{
        width: "100%",
        backgroundColor: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)",
        borderTop: "1px solid var(--theme-border)",
        borderBottom: "1px solid var(--theme-border)",
        px: "5%",
        py: { xs: "48px", sm: "64px", md: "80px" },
      }}>
        <Box sx={{ maxWidth: "1440px", mx: "auto", width: "100%" }}>

          {/* Hero top row — title block + project number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow + project number */}
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              {/* Eyebrow */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b" }} />
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: { xs: "10px", sm: "11px", md: "12px" },
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "var(--theme-text-muted)",
                }}>
                  {ORIGIN_LABELS[project.origin] || project.origin}
                </Typography>
              </Box>

              {/* Project number — top right */}
              <Typography sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                lineHeight: 0.9,
                letterSpacing: "4px",
                color: "var(--theme-text-muted)",
                opacity: 0.1,
                userSelect: "none",
                mt: { xs: "-4px", md: "-8px" },
              }}>
                #{projectNumber}
              </Typography>
            </Box>

            {/* Title */}
            <Typography sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(2rem, 7vw, 3rem)", sm: "clamp(2.5rem, 8vw, 4rem)", md: "clamp(3rem, 5vw, 4.5rem)" },
              fontWeight: 400,
              letterSpacing: "3px",
              lineHeight: 1,
              mb: 1.5,
              color: "var(--theme-text-primary)",
            }}>
              {project.title}
            </Typography>

            {/* Company + CEO */}
            <Typography sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--theme-text-muted)",
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
              letterSpacing: "1px",
              mb: 4,
            }}>
              {project.company}
              {project.ceo && (
                <span style={{ color: "var(--theme-text-muted)", opacity: 0.6 }}> · CEO: {project.ceo}</span>
              )}
            </Typography>
          </motion.div>

          {/* Divider */}
          <div style={{
            width: "100%", height: "1px",
            background: "linear-gradient(to right, var(--theme-border-hover), transparent)",
            marginBottom: "40px",
          }} />

          {/* Two-col layout */}
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 320px" },
            gap: { xs: 6, md: 10 },
            alignItems: "start",
          }}>

            {/* LEFT — main content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Short description */}
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                color: "var(--theme-text-secondary)",
                lineHeight: 1.7,
                mb: 5,
              }}>
                {project.shortDescription}
              </Typography>

              {/* Detailed description */}
              {project.detailedDescription && (
                <Box sx={{ mb: 6 }}>
                  <p className="pd-section-label">About the Project</p>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "var(--theme-text-secondary)",
                    fontSize: { xs: "14px", sm: "14px", md: "15px" },
                    lineHeight: 1.8,
                  }}>
                    {project.detailedDescription}
                  </Typography>
                </Box>
              )}

              {/* Tech stack */}
              {project.tech?.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <p className="pd-section-label">Tech Used</p>
                  <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {project.tech.map((tech) => (
                      <div key={tech} className="pd-tech-chip">
                        {TECH_ICONS[tech] && (
                          <Box
                            component="img"
                            src={TECH_ICONS[tech]}
                            alt={tech}
                            sx={{
                              width: "16px", height: "16px",
                              filter: tech === "WordPress" || tech === "Hostinger" ? "none" : "invert(1)",
                            }}
                          />
                        )}
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: { xs: "11px", sm: "12px" },
                          color: "var(--theme-text-secondary)",
                          letterSpacing: "0.5px",
                        }}>
                          {tech}
                        </Typography>
                      </div>
                    ))}
                  </Box>
                </Box>
              )}
            </motion.div>

            {/* RIGHT — sidebar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <Box sx={{
                background: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border)",
                borderRadius: "20px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}>

                {/* Status */}
                <Box>
                  <p className="pd-section-label">Status</p>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    px: 2, py: 0.8, borderRadius: "999px",
                    backgroundColor: project.status === "active" ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)",
                    color: project.status === "active" ? "var(--theme-success)" : "var(--theme-error)",
                    border: project.status === "active" ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(248,113,113,0.2)",
                  }}>
                    <Box sx={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: project.status === "active" ? "var(--theme-success)" : "var(--theme-error)",
                      animation: project.status === "active" ? "statusPulse 2s infinite" : "none",
                    }} />
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: { xs: "10px", sm: "11px" },
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}>
                      {project.status === "active" ? "Active" : "Inactive"}
                    </Typography>
                  </Box>
                  <style>{`
                    @keyframes statusPulse {
                      0%,100%{opacity:1;transform:scale(1)}
                      50%{opacity:0.4;transform:scale(0.8)}
                    }
                  `}</style>
                </Box>

                {/* Live URL */}
                {project.liveUrl && (
                  <Box>
                    <p className="pd-section-label">Website</p>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pd-live-link"
                    >
                      {project.liveUrl.replace("https://", "").replace("http://", "")}
                    </a>
                  </Box>
                )}

                {/* Origin */}
                <Box>
                  <p className="pd-section-label">Worked At</p>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: { xs: "13px", sm: "14px" },
                    color: "var(--theme-text-secondary)",
                  }}>
                    {ORIGIN_LABELS[project.origin] || project.origin}
                  </Typography>
                </Box>

              </Box>
            </motion.div>

          </Box>

          {/* ── Recent Projects ── */}
          {recentProjects.length > 0 && (
            <>
              <div style={{
                width: "100%", height: "1px",
                background: "linear-gradient(to right, var(--theme-border-hover), transparent)",
                margin: "56px 0 40px",
              }} />
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: 1.5 }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", flexShrink: 0 }} />
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: { xs: "10px", sm: "11px" },
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "var(--theme-text-muted)",
                  }}>
                    Recent
                  </Typography>
                </Box>

                <Typography sx={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" },
                  letterSpacing: "3px",
                  mb: 4,
                  color: "var(--theme-text-primary)",
                }}>
                  Latest Projects
                </Typography>

                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)"
                  },
                  gap: "16px",
                }}>
                  {recentProjects.map((p) => (
                    <Link key={p.count} to={`/projects/${p.origin.toLowerCase().replace(/\s+/g, '-')}/${p.count}`} className="pd-recent-card">
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Typography sx={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            letterSpacing: "2px",
                            color: "var(--theme-text-muted)",
                            opacity: 0.5,
                            lineHeight: 1,
                          }}>
                            #{String(p.count).padStart(2, "0")}
                          </Typography>
                          <Typography sx={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                            letterSpacing: "2px",
                            color: "var(--theme-text-primary)",
                            lineHeight: 1,
                          }}>
                            {p.title}
                          </Typography>
                        </Box>
                        <Box sx={{
                          width: 6, height: 6, borderRadius: "50%", flexShrink: 0, mt: "3px",
                          background: p.status === "active" ? "var(--theme-success)" : "var(--theme-error)",
                        }} />
                      </Box>
                      <Typography sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "var(--theme-text-secondary)",
                        fontSize: { xs: "12px", sm: "13px" },
                        lineHeight: 1.6,
                        mb: 2,
                      }}>
                        {p.shortDescription}
                      </Typography>
                      <Typography sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: { xs: "9px", sm: "10px" },
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "var(--theme-text-muted)",
                        opacity: 0.6,
                      }}>
                        {ORIGIN_LABELS[p.origin] || p.origin}
                      </Typography>
                    </Link>
                  ))}
                </Box>
              </Box>
            </>
          )}

        </Box>
      </Box>
    </>
  );
}

export default ProjectDetails;