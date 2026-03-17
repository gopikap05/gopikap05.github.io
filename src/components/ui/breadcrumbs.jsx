import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Breadcrumbs({ items }) {
  return (
    <Box
      sx={{
        px: 6,
        pt: 12,
        pb: 3,
        borderBottom: "1px solid #1a1a1a",
            }}
    >
      <Box sx={{ maxWidth: "1350px", mx: "auto" }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Box
              key={index}
              component="span"
              sx={{ fontSize: "13px", letterSpacing: "2px" }}
            >
              {isLast ? (
                <Typography
                  component="span"
                  sx={{ color: "#aaa" }}
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
                    }}
                  >
                    {item.label}
                  </Link>
                  <span style={{ margin: "0 8px", color: "#444" }}>
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