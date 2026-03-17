import { Box, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
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

  const project = projects.find(
    (p) => p.count === Number(projectId)
  );

  if (!project) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Project not found.</Typography>
      </Box>
    );
  }

  const relatedProjects = projects.filter((p) =>
    project.relatedProjects?.includes(p.count)
  );

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Projects", path: "/projects" },
          { label: project.title },
        ]}
      />

      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          px: 6,
          py: 14,
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ maxWidth: "1350px", mx: "auto" }}>
          {/* Title */}
          <Typography
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 600,
              mb: 2,
            }}
          >
            {project.title}
          </Typography>

          {/* Company */}
          <Typography sx={{ color: "#888", mb: 4 }}>
            {project.company}
            {project.ceo && ` · CEO: ${project.ceo}`}
          </Typography>

          {/* Origin */}
          <Typography sx={{ color: "#666", mb: 6 }}>
            Worked at: {ORIGIN_LABELS[project.origin] || project.origin}
          </Typography>

          {/* Website + Status */}
          {project.liveUrl && (
            <Box sx={{ mb: 8 }}>
              <Typography sx={{ color: "#777", mb: 2 }}>
                Website
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    borderBottom: "1px solid #333",
                    "&:hover": { borderColor: "#fff" },
                  }}
                >
                  {project.liveUrl
                    .replace("https://", "")
                    .replace("http://", "")}
                </Typography>

                <Box
                  sx={{
                    px: 2.5,
                    py: 0.6,
                    fontSize: "12px",
                    borderRadius: "20px",
                    backgroundColor:
                      project.status === "active"
                        ? "#0f2e22"
                        : "#2a1111",
                    color:
                      project.status === "active"
                        ? "#4ade80"
                        : "#f87171",
                    border:
                      project.status === "active"
                        ? "1px solid #134e4a"
                        : "1px solid #3f1d1d",
                  }}
                >
                  {project.status === "active"
                    ? "Active"
                    : "Inactive"}
                </Box>
              </Box>
            </Box>
          )}

          {/* Short Description */}
          <Typography sx={{ color: "#aaa", lineHeight: 1.8, mb: 4 }}>
            {project.shortDescription}
          </Typography>

          {/* Detailed Description */}
          {project.detailedDescription && (
            <Box sx={{ mb: 10 }}>
              <Typography sx={{ color: "#777", mb: 2, fontSize: "14px" }}>
                ABOUT THE PROJECT
              </Typography>
              <Typography sx={{ color: "#ccc", lineHeight: 1.8 }}>
                {project.detailedDescription}
              </Typography>
            </Box>
          )}

          {/* Tech Stack */}
          {project.tech?.length > 0 && (
            <Box sx={{ mb: 10 }}>
              <Typography sx={{ color: "#777", mb: 4 }}>
                Tech Used
              </Typography>

              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {project.tech.map((tech) => (
                  <Box
                    key={tech}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      px: 3,
                      py: 1.5,
                      borderRadius: "30px",
                      backgroundColor: "#111",
                      border: "1px solid #1a1a1a",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: "#333",
                        backgroundColor: "#151515",
                      },
                    }}
                  >
                    {TECH_ICONS[tech] && (
                      <Box
                        component="img"
                        src={TECH_ICONS[tech]}
                        alt={tech}
                        sx={{
                          width: "18px",
                          height: "18px",
                          filter:
                            tech === "WordPress" || tech === "Hostinger"
                              ? "none"
                              : "invert(1)",
                        }}
                      />
                    )}

                    <Typography sx={{ fontSize: "14px", color: "#ccc" }}>
                      {tech}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                  mb: 6,
                }}
              >
                Other Projects
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                  },
                  gap: 6,
                }}
              >
                {relatedProjects.map((p) => (
                  <Box
                    key={p.count}
                    component={Link}
                    to={`/projects/${p.count}`}
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      border: "1px solid #1a1a1a",
                      borderRadius: "20px",
                      padding: 5,
                      transition: "0.3s",
                      "&:hover": {
                        borderColor: "#333",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, mb: 2 }}>
                      {p.title}
                    </Typography>

                    <Typography sx={{ color: "#aaa" }}>
                      {p.shortDescription}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ProjectDetails;