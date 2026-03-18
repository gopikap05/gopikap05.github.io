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
  const { projectId } = useParams();
  const project = projects.find((p) => p.count === Number(projectId));

  if (!project) {
    return (
      <Box sx={{
        width: "100%", minHeight: "100vh", background: "#080808",
        color: "#fff", display: "flex", alignItems: "center",
        justifyContent: "center", px: "5%",
      }}>
        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.4)" }}>
          Project not found.
        </Typography>
      </Box>
    );
  }

  const relatedProjects = projects.filter((p) =>
    project.relatedProjects?.includes(p.id)
  );

  // 2 most recent, excluding current + already shown in related
  const relatedCounts = new Set(relatedProjects.map((p) => p.count));
  const recentProjects = [...projects]
    .filter((p) => p.count !== project.count && !relatedCounts.has(p.count))
    .sort((a, b) => b.count - a.count)
    .slice(0, 2);

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
          background: #0d0d0d;
          border: 1px solid #1c1c1c;
          transition: transform 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }
        .pd-tech-chip:hover {
          transform: translateY(-3px);
          border-color: #2e2e2e;
        }

        .pd-related-card {
          text-decoration: none;
          color: inherit;
          display: block;
          background: #0d0d0d;
          border: 1px solid #1c1c1c;
          border-radius: 16px;
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
        .pd-related-card:hover { border-color: #2e2e2e; transform: translateY(-3px); }
        .pd-related-card:hover::before { transform: scaleX(1); }

        .pd-recent-card {
          text-decoration: none;
          color: inherit;
          display: block;
          background: #0d0d0d;
          border: 1px solid #1c1c1c;
          border-radius: 16px;
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
          background: linear-gradient(to right, rgba(255,255,255,0.15), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .pd-recent-card:hover { border-color: #2e2e2e; transform: translateY(-3px); }
        .pd-recent-card:hover::before { transform: scaleX(1); }

        .pd-live-link {
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid #2a2a2a;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          word-break: break-all;
          transition: border-color 0.2s ease;
        }
        .pd-live-link:hover { border-color: #fff; }

        .pd-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 16px;
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
        backgroundColor: "#080808",
        color: "#fff",
        borderTop: "1px solid #141414",
        borderBottom: "1px solid #141414",
        px: "5%",
        py: { xs: "48px", sm: "64px", md: "80px" },
      }}>
        <Box sx={{ maxWidth: "1350px", mx: "auto", width: "100%" }}>

          {/* Hero top row — title block + project number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow + project number */}
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
              {/* Eyebrow */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b" }} />
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px", letterSpacing: "2.5px",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                }}>
                  {ORIGIN_LABELS[project.origin] || project.origin}
                </Typography>
              </Box>

              {/* Project number — top right */}
              <Typography sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "3rem", md: "4.5rem" },
                lineHeight: 0.9,
                letterSpacing: "4px",
                color: "rgba(255,255,255,0.06)",
                userSelect: "none",
                mt: { xs: "-6px", md: "-10px" },
              }}>
                #{projectNumber}
              </Typography>
            </Box>

            {/* Title */}
            <Typography sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(2.2rem, 7vw, 4rem)", md: "clamp(3rem, 5vw, 4.5rem)" },
              fontWeight: 400,
              letterSpacing: "3px",
              lineHeight: 1,
              mb: 2,
            }}>
              {project.title}
            </Typography>

            {/* Company + CEO */}
            <Typography sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.35)", fontSize: "13px",
              letterSpacing: "1px", mb: 4,
            }}>
              {project.company}
              {project.ceo && (
                <span style={{ color: "rgba(255,255,255,0.2)" }}> · CEO: {project.ceo}</span>
              )}
            </Typography>
          </motion.div>

          {/* Divider */}
          <div style={{
            width: "100%", height: "1px",
            background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent)",
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
                fontSize: { xs: "16px", md: "18px" },
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.8,
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
                    color: "rgba(255,255,255,0.45)",
                    fontSize: { xs: "14px", md: "15px" },
                    lineHeight: 1.85,
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
                          fontSize: "12px", color: "rgba(255,255,255,0.55)",
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
                background: "#0d0d0d",
                border: "1px solid #1c1c1c",
                borderRadius: "16px",
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
                    px: 2, py: 0.6, borderRadius: "999px",
                    backgroundColor: project.status === "active" ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)",
                    color: project.status === "active" ? "#4ade80" : "#f87171",
                    border: project.status === "active" ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(248,113,113,0.2)",
                  }}>
                    <Box sx={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: project.status === "active" ? "#4ade80" : "#f87171",
                      animation: project.status === "active" ? "statusPulse 2s infinite" : "none",
                    }} />
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px", letterSpacing: "1.5px",
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
                    fontSize: "13px", color: "rgba(255,255,255,0.5)",
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
                background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent)",
                margin: "56px 0 40px",
              }} />
              <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: 1.5 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", flexShrink: 0 }} />
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px", letterSpacing: "2.5px",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                }}>
                  Recent
                </Typography>
              </Box>

              <Typography sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                letterSpacing: "3px", mb: 4,
              }}>
                Latest Projects
              </Typography>

              <Box sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
                gap: "16px",
              }}>
                {recentProjects.map((p) => (
                  <Link key={p.count} to={`/projects/${p.count}`} className="pd-recent-card">
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Typography sx={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "0.75rem",
                          letterSpacing: "2px",
                          color: "rgba(255,255,255,0.15)",
                          lineHeight: 1,
                        }}>
                          #{String(p.count).padStart(2, "0")}
                        </Typography>
                        <Typography sx={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "1.2rem", letterSpacing: "2px", color: "#fff",
                          lineHeight: 1,
                        }}>
                          {p.title}
                        </Typography>
                      </Box>
                      <Box sx={{
                        width: 6, height: 6, borderRadius: "50%", flexShrink: 0, mt: "3px",
                        background: p.status === "active" ? "#4ade80" : "#f87171",
                      }} />
                    </Box>
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(255,255,255,0.35)",
                      fontSize: "13px", lineHeight: 1.7,
                      mb: 2,
                    }}>
                      {p.shortDescription}
                    </Typography>
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.18)",
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