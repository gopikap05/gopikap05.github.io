import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Breadcrumbs({ items }) {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 6 }, // ✅ responsive alignment
        pt: 12,
        pb: 3,
        borderBottom: "1px solid #1a1a1a",
      }}
    >
      <Box
        sx={{
          maxWidth: "1100px", // ✅ aligned with rest of layout
          mx: "auto",
          display: "flex", // ✅ keeps everything in one line cleanly
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Box
              key={index}
              component="span"
              sx={{
                fontSize: "13px",
                letterSpacing: "2px",
                display: "flex",
                alignItems: "center", // ✅ vertical alignment fix
              }}
            >
              {isLast ? (
                <Typography component="span" sx={{ color: "#aaa" }}>
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
                    }}
                  >
                    {item.label}
                  </Link>

                  <span
                    style={{
                      margin: "0 8px",
                      color: "#444",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    /
                  </span>
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