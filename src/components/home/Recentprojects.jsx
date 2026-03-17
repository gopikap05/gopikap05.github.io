import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import projects from "../../data/projects";

function RecentProjects() {
  const navigate = useNavigate();

  const recentProjects = [...projects]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
          px: 6,
          py: 14,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "1350px" }}>
          {/* Heading */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#777",
              letterSpacing: "2px",
              mb: 2,
            }}
          >
            RECENT PROJECTS
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 600,
              mb: 8,
            }}
          >
            Latest Work
          </Typography>

          {/* Flip Card Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 6,
              mb: 8,
            }}
          >
            {recentProjects.map((project) => (
              <Box
                key={project.count}
                className="flip-card"
                component={Link}
                to={`/projects/${project.count}`}
              >
                <Box className="flip-card-inner">
                  {/* FRONT SIDE */}
                  <Box className="flip-card-front">
                    <Typography
                      sx={{
                        fontSize: "22px",
                        fontWeight: 600,
                        mb: 2,
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
                  </Box>

                  {/* BACK SIDE */}
                  <Box className="flip-card-back">
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        letterSpacing: "2px",
                      }}
                    >
                      VIEW PROJECT
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Animated Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button
              className="animated-button"
              onClick={() => navigate("/projects")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="arr-2"
                viewBox="0 0 24 24"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>

              <span className="text">View All Projects</span>
              <span className="circle"></span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="arr-1"
                viewBox="0 0 24 24"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>
          </Box>
        </Box>
      </Box>

      {/* Styles */}
      <style>
        {`
        /* FLIP CARD */
       /* FLIP CARD */
.flip-card {
  perspective: 1200px;
  text-decoration: none;
  height: 100%;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  min-height: 280px;
  transform-style: preserve-3d;

  /* Slower + smoother */
  transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0; /* makes it stretch perfectly */
  backface-visibility: hidden;
  border-radius: 20px;
  padding: 40px;
  border: 1px solid #1a1a1a;
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: border 0.3s ease;
}

.flip-card-front {
  gap: 10px;
}

.flip-card-back {
  transform: rotateY(180deg);
  background-color: #fff;
  color: #000;
  align-items: center;
  justify-content: center;
}

        /* ANIMATED BUTTON */
        .animated-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 16px 36px;
          border: 2px solid #fff;
          background-color: #000;
          border-radius: 100px;
          font-weight: 600;
          color: #fff;
          box-shadow: 0 0 0 2px #ffffff;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button svg {
          position: absolute;
          width: 24px;
          fill: #fff;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .arr-1 { right: 16px; }
        .animated-button .arr-2 { left: -25%; }

        .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: #fff;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-12px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button:hover {
          box-shadow: 0 0 0 12px transparent;
          color: #000;
          border-radius: 12px;
        }

        .animated-button:hover .arr-1 { right: -25%; }
        .animated-button:hover .arr-2 { left: 16px; }

        .animated-button:hover .text {
          transform: translateX(12px);
        }

        .animated-button:hover svg {
          fill: #000;
        }

        .animated-button:hover .circle {
          width: 220px;
          height: 220px;
          opacity: 1;
        }

        .animated-button:active {
          transform: scale(0.95);
        }
        `}
      </style>
    </>
  );
}

export default RecentProjects;