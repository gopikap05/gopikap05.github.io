import { Box, Typography, Link } from "@mui/material";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

function Social() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const y = useTransform(smooth, [0, 1], [60, -60]);
  const opacity = useTransform(smooth, [0.2, 0.5], [0, 1]);

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/gopika05/",
    },
    {
      label: "GitHub",
      href: "https://github.com/gopikap05",
    },
    {
      label: "Email",
      href: "mailto:gopikap026@gmail.com",
    },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        px: 6,
        py: 18,
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div style={{ y }}>
        <Typography
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: { xs: "60px", md: "160px" },
            fontWeight: 700,
            color: "rgba(255,255,255,0.02)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          CONNECT
        </Typography>
      </motion.div>

      <Box sx={{ maxWidth: "1100px", mx: "auto", position: "relative" }}>
        <motion.div style={{ opacity }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#777",
              letterSpacing: "2px",
              mb: 2,
            }}
          >
            CONNECT
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 600,
              mb: 10,
            }}
          >
            Let’s stay connected.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {socials.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
            >
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  fontSize: "22px",
                  color: "#aaa",
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#fff",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -6,
                    left: 0,
                    width: 0,
                    height: "1px",
                    backgroundcolor: "#fff",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Social;