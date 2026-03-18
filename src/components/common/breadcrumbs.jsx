import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Breadcrumbs({ items }) {
  return (
    // ── SECTION ──
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#000", // Added for consistency with other sections
        borderBottom: "1px solid #1a1a1a",
        // Section padding: left/right 5% (handled by container px), top/bottom specific
        px: "5%", // Added for consistent section padding
        pt: { xs: "80px", sm: "90px", md: "100px" }, // Accounts for fixed navbar
        pb: { xs: "16px", sm: "20px", md: "24px" },
      }}
    >
      {/* ── CONTAINER ── */}
      <Box
        sx={{
          maxWidth: "1350px",
          width: "100%",
          mx: "auto",
          // No padding here since section handles it
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
                    color: "#aaa",
                  }}
                >
                  {item.label}
                </Typography>
              ) : (
                <>
                  <Link
                    to={item.path}
                    style={{
                      color: "#777",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#fff")}
                    onMouseLeave={(e) => (e.target.style.color = "#777")}
                  >
                    {item.label}
                  </Link>
                  <span style={{ margin: "0 8px", color: "#444" }}>/</span>
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