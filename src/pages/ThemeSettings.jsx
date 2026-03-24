import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function ThemeSettings() {
  const { currentTheme, setTheme, isDark, isLight } = useTheme();

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundColor: "var(--theme-bgPrimary)",
      color: "var(--theme-textPrimary)",
      py: 8,
      px: "5%",
    }}>
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