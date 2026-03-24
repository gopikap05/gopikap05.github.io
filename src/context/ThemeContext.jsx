import React, { createContext, useContext, useState, useEffect } from "react";

// Theme color definitions
export const themes = {
  light: {
    // Primary colors - Royal Amethyst (softer)
    primary: "#7A3F91",
    primaryLight: "#C59DD9",
    primaryDark: "#2B0D3E",
    primaryBg: "#F9F5FC", // Softer lavender background
    
    // Secondary/Accent colors
    accent: "#7A3F91",
    accentHover: "#C59DD9",
    
    // Background colors - MUCH SOFTER
    bgPrimary: "#FEFCF8", // Warm off-white instead of bright white
    bgSecondary: "#F9F5FC", // Very light lavender
    bgTertiary: "#F2EAF7", // Soft lavender
    bgCard: "#FFFFFF", // Keep cards white for contrast
    
    // Text colors
    textPrimary: "#2B0D3E", // Deep purple for main text
    textSecondary: "#7A3F91", // Rich purple
    textMuted: "#9B7BAA", // Soft muted purple
    
    // Border colors
    border: "#E5D5F0", // Very light purple border
    borderLight: "#F2EAF7", // Extra light border
    borderHover: "#D4C0E4", // Slightly darker on hover
    
    // Status colors
    success: "#4ade80",
    error: "#f87171",
    warning: "#f59e0b",
    
    // Card/Component backgrounds
    cardBg: "#FFFFFF",
    cardHover: "#F9F5FC",
    
    // Overlay
    overlay: "rgba(0, 0, 0, 0.03)",
    overlayDark: "rgba(0, 0, 0, 0.03)",
    
    // Gradients
    gradient: "linear-gradient(135deg, #7A3F91 0%, #C59DD9 100%)",
    
    // Cursor colors
    cursor: "#7A3F91",
    cursorHover: "rgba(122, 63, 145, 0.2)",
  },
  dark: {
    // Primary colors - Platinum Mist
    primary: "#7B7F85",
    primaryLight: "#C1C4C8",
    primaryDark: "#2B2E33",
    primaryBg: "#F5F6F7",
    
    // Secondary/Accent colors
    accent: "#7B7F85",
    accentHover: "#C1C4C8",
    
    // Background colors
    bgPrimary: "#080808",
    bgSecondary: "#0D0D0D",
    bgTertiary: "#141414",
    bgCard: "#0D0D0D",
    
    // Text colors
    textPrimary: "#FFFFFF",
    textSecondary: "#C1C4C8",
    textMuted: "#7B7F85",
    
    // Border colors
    border: "#1C1C1C",
    borderLight: "#2B2E33",
    borderHover: "rgba(255,255,255,0.12)",
    
    // Status colors
    success: "#4ade80",
    error: "#f87171",
    warning: "#f59e0b",
    
    // Card/Component backgrounds
    cardBg: "#0D0D0D",
    cardHover: "#141414",
    
    // Overlay
    overlay: "rgba(0, 0, 0, 0.5)",
    overlayDark: "rgba(13,13,13,0.84)",
    
    // Gradients
    gradient: "linear-gradient(135deg, #2B2E33 0%, #7B7F85 100%)",
    
    // Cursor colors
    cursor: "#ffffff",
    cursorHover: "rgba(255, 255, 255, 0.2)",
  },
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or default to 'dark'
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    // Default to 'dark' if no saved theme or if saved theme is invalid
    return savedTheme && themes[savedTheme] ? savedTheme : "dark";
  });

  const [themeColors, setThemeColors] = useState(themes[currentTheme]);

  useEffect(() => {
    // Update theme colors when theme changes
    setThemeColors(themes[currentTheme]);
    
    // Save to localStorage
    localStorage.setItem("portfolio-theme", currentTheme);
    
    // Apply theme to document root for CSS variables
    const root = document.documentElement;
    const colors = themes[currentTheme];
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Set data-theme attribute for CSS selectors
    root.setAttribute("data-theme", currentTheme);
    
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const setTheme = (theme) => {
    if (themes[theme]) {
      setCurrentTheme(theme);
    }
  };

  const value = {
    currentTheme,
    themeColors,
    toggleTheme,
    setTheme,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};