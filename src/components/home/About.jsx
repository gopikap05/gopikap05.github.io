import { Box, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

function AboutSection() {
  const paragraphRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 80%", "end 40%"],
  });

  const text =
    "Currently building scalable frontend systems using React and TypeScript. Passionate about performance, UI clarity, and creating production-ready web experiences.";

  const words = text.split(" ");

  return (
    <>
      {/* Purple Gooey Button Styles */}
      <style>{`
        .c-button {
          font-weight: 700;
          font-size: 14px;
          padding: 0.9em 1.8em;
          cursor: pointer;
          display: inline-block;
          position: relative;
          z-index: 1;
          background: transparent;
        }

        .c-button--gooey {
          color: #8b5cf6;
          text-transform: uppercase;
          letter-spacing: 2px;
          border: 2px solid #8b5cf6;
          transition: all 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .c-button--gooey:hover {
          color: #fff;
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.4);
        }

        .c-button--gooey .c-button__blobs {
          height: 100%;
          filter: url(#goo);
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .c-button--gooey .c-button__blobs div {
          background: linear-gradient(
            135deg,
            #8b5cf6,
            #a78bfa,
            #6d28d9
          );
          width: 34%;
          height: 100%;
          border-radius: 100%;
          position: absolute;
          transform: scale(1.4) translateY(125%);
          transition: all 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .c-button--gooey .c-button__blobs div:nth-child(1) {
          left: -5%;
        }

        .c-button--gooey .c-button__blobs div:nth-child(2) {
          left: 30%;
          transition-delay: 60ms;
        }

        .c-button--gooey .c-button__blobs div:nth-child(3) {
          left: 66%;
          transition-delay: 25ms;
        }

        .c-button--gooey:hover .c-button__blobs div {
          transform: scale(1.4) translateY(0);
        }
      `}</style>

      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        sx={{
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <Box sx={{ maxWidth: "1100px" }}>
          <MotionTypography
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            sx={{
              fontSize: { xs: "28px", md: "56px" },
              fontWeight: 600,
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            I’m a versatile{" "}
            <Box component="span" sx={{ color: "#ff3b3b" }}>
              developer
            </Box>{" "}
            who partners with founders to turn ideas into{" "}
            <Box component="span" sx={{ color: "#ff3b3b" }}>
              real products.
            </Box>{" "}
            I focus on clean interfaces, sharp decisions, and fast execution.
          </MotionTypography>

          {/* Scroll Reveal Paragraph */}
          <motion.div
            ref={paragraphRef}
            style={{
              fontSize: "16px",
              maxWidth: "600px",
              marginBottom: "50px",
              lineHeight: 1.7,
            }}
          >
            {words.map((word, index) => {
              const start = index / words.length;
              const end = start + 1 / words.length;

              const opacity = useTransform(
                scrollYProgress,
                [start, end],
                [0.2, 1]
              );

              return (
                <motion.span
                  key={index}
                  style={{
                    opacity,
                    marginRight: "6px",
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.div>

          {/* Gooey Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <button
              className="c-button c-button--gooey"
              onClick={() => navigate("/about")}
            >
              View More
              <div className="c-button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
          </Box>

          {/* Goo Filter */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            style={{ position: "absolute", width: 0, height: 0 }}
          >
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 18 -7
                  "
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
        </Box>
      </MotionBox>
    </>
  );
}

export default AboutSection;