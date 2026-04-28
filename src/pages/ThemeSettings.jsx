import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../context/ThemeContext";

function ThemeSettings() {
  const { currentTheme, setTheme, isDark, isLight } = useTheme();

  return (
    <Box 
      id="main-content"
      tabIndex="-1"
      role="main"
      style={{ outline: "none" }}
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--theme-bgPrimary)",
        color: "var(--theme-textPrimary)",
        py: 8,
        px: "5%",
      }}
    >
      <Helmet>
        <title>Theme Settings | Gopika - Portfolio</title>
        <meta name="description" content="Choose between dark and light theme mode for Gopika P's portfolio website." />
      </Helmet>

      {/* Hidden heading for screen readers - provides proper landmark structure */}
      <h1 style={{ 
        position: "absolute", 
        width: "1px", 
        height: "1px", 
        padding: 0, 
        margin: "-1px", 
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        border: 0,
        whiteSpace: "nowrap"
      }}>
        Theme Settings - Choose Dark or Light Mode
      </h1>

      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Theme Settings
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme("dark")}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: currentTheme === "dark" ? "2px solid var(--theme-primary)" : "1px solid var(--theme-border)",
              background: "var(--theme-cardBg)",
              color: "var(--theme-textPrimary)",
              cursor: "pointer",
            }}
          >
            🌙 Dark Mode
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme("light")}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: currentTheme === "light" ? "2px solid var(--theme-primary)" : "1px solid var(--theme-border)",
              background: "var(--theme-cardBg)",
              color: "var(--theme-textPrimary)",
              cursor: "pointer",
            }}
          >
            ☀️ Light Mode
          </motion.button>
        </Box>
      </Box>
    </Box>
  );
}

export default ThemeSettings;