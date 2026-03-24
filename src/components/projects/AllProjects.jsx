import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
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

const CARDS_PER_PAGE = 6;

function AllProjects() {
  const [activeOrigin, setActiveOrigin] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredProjects = projects
    .filter((project) => {
      // Origin filter
      const originMatch =
        activeOrigin === "all" ||
        (project.origin &&
          project.origin.toLowerCase().trim() === activeOrigin.toLowerCase().trim());
      
      // Status filter
      const statusMatch =
        activeStatus === "all" ||
        (project.status &&
          project.status.toLowerCase() === activeStatus.toLowerCase());
      
      // Search filter - matches project title or company name
      const searchMatch = searchQuery === "" || 
        (project.title && project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (project.company && project.company.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return originMatch && statusMatch && searchMatch;
    })
    .sort((a, b) => b.count - a.count);

  const totalPages = Math.ceil(filteredProjects.length / CARDS_PER_PAGE);
  const paginated = filteredProjects.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  const handleFilter = (setter, val) => {
    setter(val);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Get the total number of projects dynamically
  const totalProjectsCount = projects.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .filter-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 7px 18px;
          border-radius: 999px;
          border: 1px solid #1c1c1c;
          background: transparent;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          white-space: nowrap;
        }
        .filter-pill:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.7); }
        .filter-pill.active { border-color: #fff; color: #000; background: #fff; }

        .project-card {
          text-decoration: none;
          color: inherit;
          border: 1px solid #1c1c1c;
          background: #0d0d0d;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(to right, #ff3b3b, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        .project-card:hover::before { transform: scaleX(1); }
        .project-card:hover {
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
        }
        .status-badge-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .status-active { background: rgba(74,222,128,0.08); color: #4ade80; border: 1px solid rgba(74,222,128,0.2); }
        .status-active .status-badge-dot { background: #4ade80; animation: statusPulse 2s infinite; }
        .status-inactive { background: rgba(248,113,113,0.08); color: #f87171; border: 1px solid rgba(248,113,113,0.2); }
        .status-inactive .status-badge-dot { background: #f87171; }

        @keyframes statusPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .tech-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid #1c1c1c;
          color: rgba(255,255,255,0.3);
          background: transparent;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .project-card:hover .tech-chip { border-color: rgba(255,255,255,0.12); color: rgba(255,255,255,0.45); }

        .page-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #1c1c1c;
          background: transparent;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .page-btn:hover:not(:disabled) { border-color: rgba(255,255,255,0.3); color: #fff; }
        .page-btn.active { border-color: #fff; background: #fff; color: #000; }
        .page-btn:disabled { opacity: 0.2; cursor: not-allowed; }

        .page-arrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          padding: 7px 18px;
          border-radius: 999px;
          border: 1px solid #1c1c1c;
          background: transparent;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 1px;
        }
        .page-arrow:hover:not(:disabled) { border-color: rgba(255,255,255,0.3); color: #fff; }
        .page-arrow:disabled { opacity: 0.2; cursor: not-allowed; }

        .no-results {
          text-align: center;
          padding: 80px 32px;
          border: 1px dashed #1c1c1c;
          background: #0d0d0d;
        }

        .search-input {
          font-family: 'DM Sans', sans-serif;
        }
        .search-input .MuiOutlinedInput-root {
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        .search-input .MuiOutlinedInput-root fieldset {
          border-color: #1c1c1c;
          border-radius: 999px;
          transition: border-color 0.3s ease;
        }
        .search-input .MuiOutlinedInput-root:hover fieldset {
          border-color: rgba(255,255,255,0.25);
        }
        .search-input .MuiOutlinedInput-root.Mui-focused fieldset {
          border-color: #fff;
        }
        .search-input .MuiInputLabel-root {
          color: rgba(255,255,255,0.3);
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 1px;
        }
      `}</style>

      <Box sx={{
        width: "100%",
        backgroundColor: "#080808",
        color: "#fff",
        borderTop: "1px solid #141414",
        borderBottom: "1px solid #141414",
      }}>
        <Box sx={{
          maxWidth: "1350px",
          mx: "auto",
          width: "100%",
          px: "clamp(16px, 5%, 96px)",
          py: { xs: "60px", sm: "70px", md: "80px" },
        }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "clamp(20px, 3vw, 32px)" }}
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
              Projects
            </div>
          </motion.div>

          {/* Heading row */}
          <Box sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "8px", sm: 0 },
            mb: { xs: 4, md: 6 },
          }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "clamp(2.5rem, 8vw, 4rem)", md: "clamp(3rem, 5vw, 5rem)" },
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "3px",
              }}>
                Selected Work
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(11px, 1vw, 14px)",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "5px",
                textTransform: "uppercase",
                pb: { sm: "6px" },
              }}>
                {totalProjectsCount} Project{totalProjectsCount !== 1 ? "s" : ""}
              </Typography>
            </motion.div>
          </Box>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Box sx={{
              mb: { xs: 4, md: 5 },
              maxWidth: "500px",
              mx: "auto",
            }}>
              <TextField
                fullWidth
                placeholder="Search projects by name or company..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "rgba(255,255,255,0.3)", fontSize: "20px" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(0,0,0,0.3)',
                  }
                }}
              />
            </Box>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Box sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: "20px", md: "40px" },
              mb: { xs: 4, md: 6 },
            }}>
              <Box>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                  letterSpacing: "3px", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)", marginBottom: "12px",
                }}>Company</p>
                <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {ORIGIN_FILTERS.map((f) => (
                    <button
                      key={f.key}
                      className={`filter-pill ${activeOrigin === f.key ? "active" : ""}`}
                      onClick={() => handleFilter(setActiveOrigin, f.key)}
                    >
                      {f.label}
                    </button>
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: { xs: "none", md: "block" }, width: "1px", background: "#1c1c1c", alignSelf: "stretch" }} />

              <Box>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                  letterSpacing: "3px", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)", marginBottom: "12px",
                }}>Status</p>
                <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {STATUS_FILTERS.map((f) => (
                    <button
                      key={f.key}
                      className={`filter-pill ${activeStatus === f.key ? "active" : ""}`}
                      onClick={() => handleFilter(setActiveStatus, f.key)}
                    >
                      {f.label}
                    </button>
                  ))}
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* Results count indicator */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.4)",
                mb: 2,
                textAlign: "center",
              }}>
                Found {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} matching "{searchQuery}"
              </Typography>
            </motion.div>
          )}

          {/* Divider */}
          <div style={{
            width: "100%", height: "1px",
            background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent)",
            marginBottom: "clamp(24px, 3vw, 36px)",
          }} />

          {/* Grid */}
          <AnimatePresence mode="wait">
            {paginated.length > 0 ? (
              <motion.div
                key={`${activeOrigin}-${activeStatus}-${searchQuery}-${page}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                  gap: { xs: "16px", md: "20px" },
                }}>
                  {paginated.map((project, i) => (
                    <motion.div
                      key={project.count}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.5 }}
                      style={{ height: "100%" }}
                    >
                      <Link to={`/projects/${project.count}`} className="project-card">
                        <Box sx={{ padding: "clamp(20px, 2.5vw, 32px)", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>

                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
                            <span style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: "20px", letterSpacing: "3px",
                              color: "rgba(255,59,59,0.6)",
                            }}>
                              {String(project.count).padStart(2, "0")}
                            </span>
                            <span className={`status-badge ${project.status === "active" ? "status-active" : "status-inactive"}`}>
                              <span className="status-badge-dot" />
                              {project.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </Box>

                          <Typography sx={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                            letterSpacing: "2px", color: "#fff",
                            lineHeight: 1, mb: "8px", pr: "8px",
                          }}>
                            {project.title || project.company}
                          </Typography>

                          <Typography sx={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "rgba(255,255,255,0.3)", fontSize: "10px",
                            letterSpacing: "2px", textTransform: "uppercase", mb: "14px",
                          }}>
                            {project.company}{project.ceo && ` · ${project.ceo}`}
                          </Typography>

                          <Typography sx={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "rgba(255,255,255,0.45)", fontSize: "1rem",
                            lineHeight: 1.7, flex: 1, mb: "16px",
                          }}>
                            {project.shortDescription}
                          </Typography>

                          {project.tech?.length > 0 && (
                            <Box sx={{ display: "flex", gap: "6px", flexWrap: "wrap", mt: "auto" }}>
                              {project.tech.slice(0, 3).map((tech) => (
                                <span key={tech} className="tech-chip">{tech}</span>
                              ))}
                              {project.tech.length > 3 && (
                                <span className="tech-chip">+{project.tech.length - 3}</span>
                              )}
                            </Box>
                          )}
                        </Box>
                      </Link>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="no-results">
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "1px" }}>
                  No projects match the selected filters.
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                mt: { xs: "40px", md: "56px" },
                flexWrap: "wrap",
              }}>
                <button
                  className="page-arrow"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`page-btn ${page === p ? "active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}

                <button
                  className="page-arrow"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
              </Box>

              <Typography sx={{
                textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                mt: "16px",
              }}>
                Page {page} of {totalPages}
              </Typography>
            </motion.div>
          )}

        </Box>
      </Box>
    </>
  );
}

export default AllProjects;