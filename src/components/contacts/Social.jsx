import { Box, Typography, Link } from "@mui/material";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gopika05/", num: "01" },
  { label: "GitHub", href: "https://github.com/gopikap05", num: "02" },
  { label: "Email", href: "mailto:gopikap026@gmail.com", num: "03" },
];

function Social() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smooth, [0, 1], [60, -60]);
  const opacity = useTransform(smooth, [0.2, 0.5], [0, 1]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .social-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          border-bottom: 1px solid #1c1c1c;
          gap: 16px;
          transition: border-color 0.3s ease;
          cursor: pointer;
        }
        .social-link:first-of-type { border-top: 1px solid #1c1c1c; }
        .social-link:hover { border-color: #2e2e2e; }

        .social-link-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          letter-spacing: 3px;
          color: rgba(255,255,255,0.25);
          line-height: 1;
          transition: color 0.3s ease;
        }
        .social-link:hover .social-link-label { color: #fff; }

        .social-link-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(255,59,59,0.4);
          transition: color 0.3s ease;
        }
        .social-link:hover .social-link-num { color: rgba(255,59,59,0.7); }

        .social-link-arrow {
          font-size: 18px;
          color: rgba(255,255,255,0.15);
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .social-link:hover .social-link-arrow {
          color: #fff;
          transform: translate(4px, -4px);
        }
      `}</style>

      <Box
        ref={ref}
        sx={{
          width: "100%",
          backgroundColor: "#080808",
          color: "#fff",
          borderTop: "1px solid #141414",
          borderBottom: "1px solid #141414",
          px: "5%",
          py: { xs: "60px", sm: "70px", md: "90px" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BG text */}
        <motion.div style={{ y, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0 }}>
          <Typography sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: { xs: "clamp(4rem, 20vw, 10rem)" },
            color: "rgba(255,255,255,0.018)",
            whiteSpace: "nowrap",
            letterSpacing: "10px",
          }}>
            CONNECT
          </Typography>
        </motion.div>

        <Box sx={{ maxWidth: "1350px", mx: "auto", position: "relative", zIndex: 1, width: "100%" }}>

          {/* Header */}
          <motion.div style={{ opacity }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: 2 }}>
              <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b" }} />
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px", letterSpacing: "2.5px",
                textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
              }}>
                Connect
              </Typography>
            </Box>

            <Typography sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(2.2rem, 7vw, 3.5rem)", md: "clamp(2.8rem, 4vw, 4rem)" },
              fontWeight: 400,
              letterSpacing: "3px",
              lineHeight: 1,
              mb: { xs: 5, md: 7 },
            }}>
              Let's Stay Connected
            </Typography>
          </motion.div>

          {/* Social links */}
          <Box>
            {socials.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <span className="social-link-num">{item.num}</span>
                    <span className="social-link-label">{item.label}</span>
                  </Box>
                  <span className="social-link-arrow">↗</span>
                </Link>
              </motion.div>
            ))}
          </Box>

        </Box>
      </Box>
    </>
  );
}

export default Social;