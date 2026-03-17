import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

function Footer() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        borderTop: "1px solid #1a1a1a",
        pt: { xs: 10, md: 16 }, // ✅ responsive spacing
        pb: 6,
        px: { xs: 3, md: 6 },
      }}
    >
      {/* TOP CTA SECTION */}
      <Box
        sx={{
          maxWidth: "1100px", // ✅ aligned with rest of layout
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" }, // ✅ vertical alignment fix
          gap: { xs: 6, md: 10 }, // ✅ balanced spacing
        }}
      >
        {/* LEFT BIG TEXT */}
        <Typography
          sx={{
            fontSize: { xs: "36px", md: "72px" }, // ✅ better mobile alignment
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          Let’s <br /> work <br /> together
        </Typography>

        {/* RIGHT DESCRIPTION */}
        <Box sx={{ maxWidth: "420px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#aaa",
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            I'm currently open to frontend and product engineering opportunities.
            If you're building something ambitious and need clean, scalable interfaces —
            let’s create something impactful together.
          </Typography>

          <Typography
            component="a"
            href="mailto:gopikap026@gmail.com"
            sx={{
              fontSize: "16px",
              color: "#fff",
              textDecoration: "none",
              borderBottom: "1px solid #444",
              pb: 1,
              display: "inline-block",
              "&:hover": {
                bordercolor: "#fff",
              },
            }}
          >
            gopikap026@gmail.com
          </Typography>
        </Box>
      </Box>

      {/* BOTTOM CENTER SECTION */}
      <Box
        sx={{
          maxWidth: "1100px", // ✅ aligned with main grid
          mx: "auto",
          mt: 10, // ✅ tighter spacing
          pt: 4,
          borderTop: "1px solid #1a1a1a",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "2px",
            mb: 0,
          }}
        >
          GOPIKA
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;