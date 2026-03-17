import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AboutMe() {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      number: "01",
      title: "Frontend Development",
      desc: "Building scalable, responsive, and performance-driven web applications using modern frontend technologies.",
    },
    {
      number: "02",
      title: "UI Implementation",
      desc: "Translating complex design systems into pixel-perfect, maintainable UI components.",
    },
    {
      number: "03",
      title: "Performance Optimization",
      desc: "Improving load times, bundle size, and runtime performance for high-quality user experiences.",
    },
    {
      number: "04",
      title: "API Integration",
      desc: "Seamlessly connecting frontend applications with REST APIs and third-party services.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* HERO SECTION */}
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
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "40px", md: "80px" },
            fontWeight: 600,
            letterSpacing: "6px",
          }}
        >
          ABOUT ME
        </Typography>
      </Box>

      {/* SERVICES SECTION */}
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          px: 6,
          py: 12,
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <Box
          sx={{
            maxWidth: "1350px",
            mx: "auto",
            display: "flex",
            gap: 8,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Title */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              I PROVIDE
            </Typography>

            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              VARIOUS SERVICES
            </Typography>
          </Box>

          {/* Right List */}
          <Box sx={{ flex: 2 }}>
            {services.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <Box
                  key={index}
                  onClick={() => handleToggle(index)}
                  sx={{
                    py: 3,
                    borderTop:
                      index === 0 ? "1px solid #1a1a1a" : "none",
                    borderBottom: "1px solid #1a1a1a",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#000",
                    },
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ color: "#666", fontSize: "14px" }}
                    >
                      {item.number}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: isOpen ? "#fff" : "#aaa",
                          transition: "0.3s",
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* Animated + Icon */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ fontSize: "18px", color: "#888" }}
                      >
                        +
                      </motion.span>
                    </Box>
                  </Box>

                  {/* Animated Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ overflow: "hidden" }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#aaa",
                            maxWidth: "600px",
                            lineHeight: 1.7,
                            mt: 2,
                            ml: 5,
                          }}
                        >
                          {item.desc}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AboutMe;