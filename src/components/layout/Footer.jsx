import { Box } from "@mui/material";
import { motion } from "framer-motion";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Links ── */
        .footer-link {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(12px, 1vw, 14px);
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          position: relative;
          display: inline-block;
          padding-bottom: 2px;
          transition: color 0.3s ease;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0%;
          height: 1px;
          background: rgba(255,255,255,0.6);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .footer-link:hover { color: #fff; }
        .footer-link:hover::after { width: 100%; }

        /* ── Marquee ── */
        .footer-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid #141414;
          border-bottom: 1px solid #141414;
          padding: 6px 0;
        }
        .footer-marquee-track {
          display: flex;
          animation: fMarquee 22s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        @keyframes fMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .footer-marquee-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 6vw, 80px);
          letter-spacing: 2px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.07);
          padding: 0 clamp(12px, 2vw, 28px);
          user-select: none;
          flex-shrink: 0;
        }
        .footer-marquee-name.solid {
          -webkit-text-stroke: 0px;
          color: rgba(255,255,255,0.035);
        }

        /* ── Status dot ── */
        .status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #4ade80;
          display: inline-block;
          flex-shrink: 0;
          animation: sPulse 2.5s ease infinite;
        }
        @keyframes sPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.75); }
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: clamp(16px, 2.5vw, 28px) 0;
        }
        .footer-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.2);
          white-space: nowrap;
        }
        .footer-avail {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }

        @media (max-width: 600px) {
          .footer-bottom {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          backgroundColor: "#080808",
          color: "#fff",
          borderTop: "1px solid #141414",
          overflow: "hidden",
        }}
      >
        {/* ── Main content ── */}
        <Box sx={{
          maxWidth: "1350px",
          mx: "auto",
          width: "100%",
          px: { xs: "20px", sm: "36px", md: "52px", lg: "96px" },
          pt: { xs: "52px", sm: "72px", md: "96px", lg: "120px" },
        }}>

          {/* Top: tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 12px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px", letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
              Contact
            </div>
          </motion.div>

          {/* Center block: heading + description stacked */}
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "flex-end" },
            justifyContent: "space-between",
            gap: { xs: "32px", md: "60px", lg: "80px" },
          }}>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 5.5rem)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "3px",
                margin: 0,
                flexShrink: 0,
              }}
            >
              Let's<br />Work<br />
              <span style={{ color: "rgba(255,255,255,0.2)" }}>Together.</span>
            </motion.h2>

            {/* Right: description + contacts */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth: "380px",
                paddingBottom: "clamp(8px, 1.5vw, 20px)",
              }}
            >
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.82rem, 1vw, 0.9rem)",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.85,
                margin: "0 0 clamp(20px, 3vw, 32px)",
              }}>
                Open to frontend and product engineering opportunities.
                Building something ambitious? Let's create something impactful together.
              </p>

              {/* Contacts stacked */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(255,59,59,0.5)",
                    width: "48px",
                    flexShrink: 0,
                  }}>Email</span>
                  <a href="mailto:gopikap026@gmail.com" className="footer-link">
                    gopikap026@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </Box>

          {/* Thin divider */}
          <div style={{
            width: "100%", height: "1px",
            background: "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
            margin: "clamp(32px, 5vw, 56px) 0 0",
          }} />
        </Box>

        {/* ── Marquee ── */}
        <div className="footer-marquee-wrap">
          <div className="footer-marquee-track">
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                className={`footer-marquee-name ${i % 4 === 2 ? "solid" : ""}`}
              >
                {i % 2 === 0 ? "GOPIKA" : "·"}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <Box sx={{
          maxWidth: "1350px",
          mx: "auto",
          width: "100%",
          px: { xs: "20px", sm: "36px", md: "52px", lg: "96px" },
        }}>
          <div className="footer-bottom">
            <span className="footer-meta">© {year} Gopika. All rights reserved.</span>

            <div className="footer-avail">
              <span className="status-dot" />
              Available for work
            </div>

            <span className="footer-meta">Designed &amp; built by Gopika</span>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Footer;