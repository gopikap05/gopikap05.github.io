import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');

        /* ── Starfield Button ── */
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: min(15rem, 90%);
          overflow: hidden;
          height: clamp(2.8rem, 5vw, 3.2rem);
          background-size: 300% 300%;
          cursor: pointer;
          backdrop-filter: blur(1rem);
          border-radius: 5rem;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
          animation: gradient_301 5s ease infinite;
          border: double 4px transparent;
          background-image: linear-gradient(var(--theme-bg-card), var(--theme-bg-card)),
            linear-gradient(137.48deg, #ffdb3b 10%, #fe53bb 45%, #8f51ea 67%, #0044ff 87%);
          background-origin: border-box;
          background-clip: content-box, border-box;
          position: relative;
        }

        #container-stars {
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transition: 0.5s;
          backdrop-filter: blur(1rem);
          border-radius: 5rem;
        }

        .btn strong {
          z-index: 2;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.65rem, 1.3vw, 0.78rem);
          letter-spacing: 4px;
          color: var(--theme-text-primary);
          text-shadow: 0 0 6px rgba(255,255,255,0.3);
        }

        #glow {
          position: absolute;
          display: flex;
          width: 12rem;
        }

        .circle {
          width: 100%;
          height: 30px;
          filter: blur(2rem);
          animation: pulse_3011 4s infinite;
          z-index: -1;
        }
        .circle:nth-of-type(1) { background: rgba(254, 83, 186, 0.636); }
        .circle:nth-of-type(2) { background: rgba(142, 81, 234, 0.704); }

        .btn:hover #container-stars {
          z-index: 1;
          background-color: var(--theme-bg-card);
        }
        .btn:hover {
          transform: scale(1.06);
          box-shadow: 0 0 40px rgba(254,83,186,0.25), 0 0 80px rgba(142,81,234,0.15);
        }
        .btn:active {
          border: double 4px #fe53bb;
          background-origin: border-box;
          background-clip: content-box, border-box;
          animation: none;
          transform: scale(0.97);
        }
        .btn:active .circle { background: #fe53bb; }

        #stars {
          position: relative;
          background: transparent;
          width: 200rem;
          height: 200rem;
        }
        #stars::after {
          content: "";
          position: absolute;
          top: -10rem; left: -100rem;
          width: 100%; height: 100%;
          animation: animStarRotate 90s linear infinite;
          background-image: radial-gradient(var(--theme-text-primary) 1px, transparent 1%);
          background-size: 50px 50px;
        }
        #stars::before {
          content: "";
          position: absolute;
          top: 0; left: -50%;
          width: 170%; height: 500%;
          animation: animStar 60s linear infinite;
          background-image: radial-gradient(var(--theme-text-primary) 1px, transparent 1%);
          background-size: 50px 50px;
          opacity: 0.5;
        }

        @keyframes animStar {
          from { transform: translateY(0); }
          to   { transform: translateY(-135rem); }
        }
        @keyframes animStarRotate {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0); }
        }
        @keyframes gradient_301 {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse_3011 {
          0%   { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0,0,0,0.7); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(0,0,0,0); }
          100% { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0,0,0,0); }
        }

        /* ── Marquee ── */
        .cta-marquee-track {
          display: flex;
          gap: 48px;
          animation: marquee 18s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cta-marquee-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 7vw, 96px);
          letter-spacing: 4px;
          user-select: none;
          flex-shrink: 0;
          transition: opacity 0.3s ease;
        }
        
        /* Dark theme marquee */
        [data-theme="dark"] .cta-marquee-item {
          color: transparent;
          -webkit-text-stroke: 1px var(--theme-border);
          opacity: 0.4;
        }
        [data-theme="dark"] .cta-marquee-item.filled {
          -webkit-text-stroke: 0;
          color: var(--theme-text-primary);
          opacity: 0.08;
        }
        
        /* Light theme marquee - more visible */
        [data-theme="light"] .cta-marquee-item {
          color: var(--theme-primary);
          opacity: 0.3;
          -webkit-text-stroke: 0;
          font-weight: 500;
        }
        [data-theme="light"] .cta-marquee-item.filled {
          color: var(--theme-primary-light);
          opacity: 0.25;
        }

        /* ── Corner decoration ── */
        .cta-corner-tl {
          position: absolute;
          top: 24px; left: 24px;
          width: 28px; height: 28px;
          border-top: 1px solid var(--theme-border-hover);
          border-left: 1px solid var(--theme-border-hover);
        }
        .cta-corner-br {
          position: absolute;
          bottom: 24px; right: 24px;
          width: 28px; height: 28px;
          border-bottom: 1px solid var(--theme-border-hover);
          border-right: 1px solid var(--theme-border-hover);
        }
      `}</style>

      {/* ── SECTION ── */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
          borderTop: "1px solid var(--theme-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Corner decorations */}
        <motion.div
          className="cta-corner-tl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        />
        <motion.div
          className="cta-corner-br"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        />

        {/* Scrolling background marquee */}
        <Box sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.8,
        }}>
          <div className="cta-marquee-track">
            {["LET'S WORK", "·", "GET IN TOUCH", "·", "HIRE ME", "·", "COLLABORATE", "·",
              "LET'S WORK", "·", "GET IN TOUCH", "·", "HIRE ME", "·", "COLLABORATE", "·"].map((word, i) => (
              <span key={i} className={`cta-marquee-item ${i % 4 === 0 ? "filled" : ""}`}>
                {word}
              </span>
            ))}
          </div>
        </Box>

        {/* ── CONTAINER ── */}
        <Box
          sx={{
            maxWidth: "1350px",
            width: "100%",
            mx: "auto",
            px: "clamp(16px, 5%, 96px)",
            py: { xs: "80px", sm: "100px", md: "120px" },
            position: "relative",
            zIndex: 2,
            minHeight: { xs: "auto", md: "60vh" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{
            textAlign: "center",
            width: "100%",
            maxWidth: "min(820px, 100%)",
            mx: "auto",
          }}>

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "clamp(20px, 3vw, 32px)",
              }}
            >
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#fe53bb",
                animation: "pulse_3011 2.5s infinite",
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--theme-text-muted)",
              }}>
                Available for work
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "clamp(2.2rem, 8vw, 4rem)", md: "clamp(3rem, 5.5vw, 5.5rem)" },
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "3px",
                mb: { xs: 2, md: 3 },
                color: "var(--theme-text-primary)",
              }}>
                Let's Build Something{" "}
                <Box component="span" sx={{
                  background: "linear-gradient(135deg, #ffdb3b, #fe53bb, #8f51ea)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200%",
                  animation: "gradient_301 4s ease infinite",
                }}>
                  Great
                </Box>{" "}
                Together.
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                color: "var(--theme-text-muted)",
                mb: { xs: 4, md: 5 },
                fontSize: { xs: "0.9rem", md: "1.05rem" },
                lineHeight: 1.8,
                maxWidth: "520px",
                mx: "auto",
              }}>
                Open to freelance projects, collaborations, and full-time opportunities.
              </Typography>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/contact")}
              >
                <strong>GET IN TOUCH</strong>
                <div id="container-stars">
                  <div id="stars" />
                </div>
                <div id="glow">
                  <div className="circle" />
                  <div className="circle" />
                </div>
              </button>
            </motion.div>

          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CTASection;