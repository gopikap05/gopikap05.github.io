import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Breadcrumbs({ items }) {
  return (
    // ── SECTION ──
    <Box
      sx={{
        width: "100%",
        backgroundColor: "var(--theme-bg-primary)",
        borderBottom: "1px solid var(--theme-border)",
        px: "5%",
        pt: { xs: "80px", sm: "90px", md: "100px" },
        pb: { xs: "16px", sm: "20px", md: "24px" },
      }}
    >
      {/* ── CONTAINER ── */}
      <Box
        sx={{
          maxWidth: "1440px",
          width: "100%",
          mx: "auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* ── CONTENT ── */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Box
              key={index}
              component="span"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                letterSpacing: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isLast ? (
                <Typography
                  component="span"
                  sx={{
                    fontSize: "inherit",
                    letterSpacing: "inherit",
                    color: "var(--theme-text-secondary)",
                    opacity: 0.9,
                  }}
                >
                  {item.label}
                </Typography>
              ) : (
                <>
                  <Link
                    to={item.path}
                    style={{
                      color: "var(--theme-text-secondary)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      transition: "color 0.3s ease",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--theme-text-primary)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--theme-text-secondary)")}
                  >
                    {item.label}
                  </Link>
                  <span style={{
                    margin: "0 12px",
                    color: "var(--theme-text-primary)",
                    opacity: 0.5,
                    fontSize: "inherit",
                    fontWeight: 600,
                  }}>/</span>
                </>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Breadcrumbs;