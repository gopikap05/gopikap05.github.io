import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import FigmaAnimation from "./FigmaAnimation";

function ProjectHero() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        px: 4,
      }}
    >
      <Typography
        component={motion.div}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
        sx={{
          fontSize: { xs: "40px", md: "80px" },
          fontWeight: 600,
          letterSpacing: "6px",
          mb: 10,
          mt: 20,
        }}
      >
        PROJECTS
      </Typography>

      <Box sx={{ width: "100%", maxWidth: "900px" }}>
        <FigmaAnimation />
      </Box>
    </Box>
  );
}

export default ProjectHero;