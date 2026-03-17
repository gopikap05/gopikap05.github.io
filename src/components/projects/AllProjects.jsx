import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import projects from "../../data/projects";

const ORIGIN_FILTERS = [
  { key: "all", label: "All" },
  { key: "emilda solutions", label: "Emilda Solutions" },
  { key: "Friska ai", label: "Friska AI" },
  { key: "freelance", label: "Freelance" },
];

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
];

function AllProjects() {
  const [activeOrigin, setActiveOrigin] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");

  // Debug: Log all unique origins and statuses from the data
  useEffect(() => {
    const uniqueOrigins = [...new Set(projects.map(p => p.origin))];
    const uniqueStatuses = [...new Set(projects.map(p => p.status))];
    
    console.log("=== PROJECT DATA DEBUG ===");
    console.log("Total projects:", projects.length);
    console.log("Unique origins in data:", uniqueOrigins);
    console.log("Unique statuses in data:", uniqueStatuses);
    console.log("First project sample:", projects[0]);
    console.log("==========================");
  }, []);

  // First filter the projects
  const filteredProjects = projects.filter((project) => {
    // Apply origin filter
    const originMatch = activeOrigin === "all" || 
                       (project.origin && project.origin.toLowerCase().trim() === activeOrigin.toLowerCase().trim());
    
    // Apply status filter
    const statusMatch = activeStatus === "all" || 
                       (project.status && project.status.toLowerCase() === activeStatus.toLowerCase());
    
    // Debug: Log when filtering
    if (activeOrigin !== "all" && !originMatch) {
      console.log(`Project "${project.title}" origin: "${project.origin}" doesn't match "${activeOrigin}"`);
    }
    if (activeStatus !== "all" && !statusMatch) {
      console.log(`Project "${project.title}" status: "${project.status}" doesn't match "${activeStatus}"`);
    }
    
    return originMatch && statusMatch;
  });

  // Then sort them by count in descending order (most recent first)
  const sortedProjects = [...filteredProjects].sort((a, b) => b.count - a.count);

  // Debug: Log filter results
  console.log(`Filter: origin=${activeOrigin}, status=${activeStatus}, results=${sortedProjects.length}`);

  return (
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
        {/* Heading */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#777",
            letterSpacing: "2px",
            mb: 2,
          }}
        >
          PROJECTS
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "32px", md: "48px" },
            fontWeight: 600,
            mb: 6,
          }}
        >
          Selected Work
        </Typography>

        {/* Filters Container - Side by Side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 10,
            mb: 8,
            justifyContent: "flex-start",
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          {/* Origin Filters */}
          <Box>
            <Typography sx={{ color: "#777", mb: 2, fontSize: "14px" }}>
              FILTER BY COMPANY
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {ORIGIN_FILTERS.map((filter) => (
                <Button
                  key={filter.key}
                  variant="outlined"
                  onClick={() => setActiveOrigin(filter.key)}
                  sx={{
                    borderColor:
                      activeOrigin === filter.key ? "#fff" : "#333",
                    color: activeOrigin === filter.key ? "#fff" : "#aaa",
                    textTransform: "none",
                    borderRadius: "30px",
                    px: 4,
                    "&:hover": { borderColor: "#fff" },
                  }}
                >
                  {filter.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Status Filters */}
          <Box>
            <Typography sx={{ color: "#777", mb: 2, fontSize: "14px" }}>
              FILTER BY STATUS
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {STATUS_FILTERS.map((filter) => (
                <Button
                  key={filter.key}
                  variant="outlined"
                  onClick={() => setActiveStatus(filter.key)}
                  sx={{
                    borderColor:
                      activeStatus === filter.key ? "#fff" : "#333",
                    color: activeStatus === filter.key ? "#fff" : "#aaa",
                    textTransform: "none",
                    borderRadius: "30px",
                    px: 4,
                    "&:hover": { borderColor: "#fff" },
                  }}
                >
                  {filter.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Results count */}
        <Typography sx={{ color: "#777", mb: 4 }}>
          Showing {sortedProjects.length} projects (most recent first)
        </Typography>

        {/* Projects Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 6,
          }}
        >
          {sortedProjects.map((project) => (
            <Box
              key={project.count}
              component={Link}
              to={`/projects/${project.count}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #1a1a1a",
                borderRadius: "20px",
                padding: 5,
                transition: "0.3s",
                position: "relative",
                "&:hover": {
                  borderColor: "#333",
                  transform: "translateY(-4px)",
                },
              }}
            >
              {/* Status Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  px: 2,
                  py: 0.5,
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
                {project.status === "active" ? "Active" : "Inactive"}
              </Box>

              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 600,
                  mb: 1,
                  pr: 8, // Make space for status badge
                }}
              >
                {project.title || project.company}
              </Typography>

              <Typography
                sx={{
                  color: "#888",
                  fontSize: "14px",
                  mb: 2,
                }}
              >
                {project.company}
                {project.ceo && ` · CEO: ${project.ceo}`}
              </Typography>

              <Typography
                sx={{
                  color: "#aaa",
                  lineHeight: 1.8,
                }}
              >
                {project.shortDescription}
              </Typography>

              {/* Tech tags */}
              {project.tech?.length > 0 && (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 3 }}>
                  {project.tech.slice(0, 3).map((tech) => (
                    <Box
                      key={tech}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        fontSize: "11px",
                        borderRadius: "15px",
                        backgroundColor: "#111",
                        border: "1px solid #1a1a1a",
                        color: "#777",
                      }}
                    >
                      {tech}
                    </Box>
                  ))}
                  {project.tech.length > 3 && (
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        fontSize: "11px",
                        borderRadius: "15px",
                        backgroundColor: "#111",
                        border: "1px solid #1a1a1a",
                        color: "#777",
                      }}
                    >
                      +{project.tech.length - 3}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* No results message */}
        {sortedProjects.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              border: "1px dashed #1a1a1a",
              borderRadius: "20px",
            }}
          >
            <Typography sx={{ color: "#777" }}>
              No projects match the selected filters.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AllProjects;