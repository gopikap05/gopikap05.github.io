import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionTypography = motion(Typography);
const MotionBox = motion(Box);

function HeroSection() {
  return (
    <>
      <style>
        {`
          .obj {
            position: relative;
            width: 200px;
            height: 200px;
            transform-style: preserve-3d;
            transition: 0.5s all;
            transform: rotateX(-25deg) rotateY(20deg);
          }

          .objchild {
            animation: rotate 10s infinite linear;
            transform-style: preserve-3d;
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .objchild::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            filter: blur(20px);
            box-shadow: 0 0 200px 15px white;
            transform: rotateX(90deg) scale(1.1) translateZ(-120px);
          }

          .inn6 {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgb(21, 21, 21);
            transform: rotateX(90deg) translateZ(100px);
            animation: updown 4s infinite ease-in-out;
          }

          @keyframes rotate {
            0% { transform: rotate3d(0,1,0,0deg); }
            100% { transform: rotate3d(0,1,0,360deg); }
          }

          @keyframes updown {
            0% { transform: translateY(100px) rotateX(90deg) translateZ(100px); }
            50% { transform: translateY(200px) rotateX(90deg) translateZ(100px); }
            100% { transform: translateY(100px) rotateX(90deg) translateZ(100px); }
          }
        `}
      </style>

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        sx={{
          height: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          position: "relative",
          display: "flex",
          alignItems: "center",
          px: { xs: 2, md: 6 },
          overflow: "hidden",
        }}
      >
        <MotionBox
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 2 }}
          sx={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
            filter: "blur(120px)",
            top: "-100px",
            right: "-100px",
            zIndex: 0,
          }}
        />

        <MotionTypography
          initial={{ opacity: 0, letterSpacing: "20px", y: -20 }}
          animate={{ opacity: 0.7, letterSpacing: "10px", y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          sx={{
            position: "absolute",
            top: "18%",
            left: "6%",
            fontSize: "18px",
            zIndex: 2,
          }}
        >
          HELLO! <br></br>
          This is 
        </MotionTypography>

        {/* Name + Animation Parallel */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            zIndex: 2,
          }}
        >
          <MotionTypography
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            sx={{
              fontSize: { xs: "80px", md: "180px" },
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-4px",
            }}
          >
            GOPIKA
          </MotionTypography>

          <div className="obj">
            <div className="objchild">
              <span className="inn6"></span>
            </div>
          </div>
        </Box>

        <MotionTypography
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          sx={{
            position: "absolute",
            bottom: "12%",
            right: "6%",
            fontSize: "20px",
            textAlign: "right",
            zIndex: 2,
          }}
        >
          Frontend Developer
        </MotionTypography>
      </MotionBox>
    </>
  );
}

export default HeroSection;