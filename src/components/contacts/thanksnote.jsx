import { Box } from "@mui/material";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ThanksNote() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sy, [-80, 80], [6, -6]);
  const rotateY = useTransform(sx, [-80, 80], [-6, 6]);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await emailjs.send(
        "service_3wgg108",
        "template_dlg5gxp",
        {
          from_name: "Portfolio Visitor",
          from_email: "gopikap026@gmail.com",
          rating: `${selected}/5`,
label: labels[selected],
feedback: feedback || "No feedback provided",
          to_email: "gopikap026@gmail.com",
        },
        "tF2Z9ebsNoKBb13kb"
      );
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .tn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          align-items: stretch;
        }
        @media (max-width: 680px) {
          .tn-grid { grid-template-columns: 1fr; }
        }

        .tn-card {
          position: relative;
          height: 100%;
          background: #f5f2ea;
          background-image: linear-gradient(#edeae0 1.15rem, #d6d2c4 1.2rem);
          background-size: 100% 1.2rem;
          border-radius: 14px;
          padding: 36px 24px 28px 52px;
          box-shadow:
            0 2px 0 #e0dbd0, 0 4px 0 #d8d3c8, 0 6px 0 #d0cbbe,
            0 24px 48px rgba(0,0,0,0.55), 0 8px 16px rgba(0,0,0,0.3);
          transform-style: preserve-3d;
          box-sizing: border-box;
        }
        .tn-margin-line { position: absolute; left: 36px; top: 0; bottom: 0; width: 1.5px; background: rgba(200,90,90,0.35); }
        .tn-hole { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: #080808; box-shadow: inset 0 1px 3px rgba(0,0,0,0.6); left: 50%; transform: translateX(-50%); }
        .tn-hole.h1 { top: 16px; }
        .tn-hole.h2 { top: 50%; margin-top: -6px; }
        .tn-hole.h3 { bottom: 16px; }
        .tn-tape { position: absolute; top: -9px; left: 50%; transform: translateX(-50%) rotate(-1.5deg); width: 70px; height: 20px; background: rgba(255,240,180,0.55); border-radius: 2px; }
        .tn-stamp { position: absolute; top: 16px; right: 16px; width: 38px; height: 48px; border: 2px solid rgba(255,59,59,0.45); border-radius: 3px; display: flex; align-items: center; justify-content: center; padding: 3px; }
        .tn-stamp-inner { width: 100%; height: 100%; border: 1px solid rgba(255,59,59,0.25); border-radius: 2px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .tn-stamp-icon { font-size: 14px; line-height: 1; }
        .tn-stamp-text { font-family: 'DM Sans', sans-serif; font-size: 5px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,59,59,0.6); margin-top: 2px; }
        .tn-postmark { position: absolute; top: 12px; right: 62px; width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; }
        .tn-postmark::before, .tn-postmark::after { content:''; position:absolute; width:100%; height:1.5px; background:rgba(0,0,0,0.08); }
        .tn-postmark::before { transform: rotate(-25deg); }
        .tn-postmark::after  { transform: rotate(25deg); }
        .tn-postmark-text { font-family: 'DM Sans', sans-serif; font-size: 5.5px; letter-spacing: 1px; text-transform: uppercase; color: rgba(0,0,0,0.2); text-align: center; z-index: 1; line-height: 1.4; }
        .tn-date { font-family: 'Caveat', cursive; font-size: 13px; color: rgba(0,0,0,0.28); display: block; margin-bottom: 1.2rem; }
        .tn-card p { font-family: 'Caveat', cursive; font-size: 16px; line-height: 1.2rem; color: #1c1a16; margin: 0 0 1.2rem 0; }
        .tn-sign { font-family: 'Caveat', cursive; font-size: 19px; font-weight: 600; color: rgba(0,0,0,0.38); display: block; margin-top: 4px; }

        /* Rating box */
        .rate-box {
          background: #0d0d0d;
          border: 1px solid #1c1c1c;
          border-radius: 14px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          height: 100%;
          box-sizing: border-box;
          min-height: 260px;
        }

        .rate-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        .star-row { display: flex; gap: 12px; }
        .star {
          font-size: 36px; line-height: 1; cursor: pointer; user-select: none;
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), color 0.2s ease;
          color: #2a2a2a; display: inline-block;
        }
        .star.lit { color: #f59e0b; transform: scale(1.2); }
        .star:hover { transform: scale(1.3); }

        .rate-dots { display: flex; gap: 6px; align-items: center; }
        .rate-dot { width: 6px; height: 6px; border-radius: 50%; background: #1c1c1c; transition: background 0.2s, transform 0.2s; }
        .rate-dot.lit { background: #f59e0b; transform: scale(1.3); }

        .rate-label-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; letter-spacing: 1px;
          color: rgba(255,255,255,0.5);
          min-height: 20px; font-weight: 500;
        }

        /* Feedback textarea */
        .rate-feedback {
          width: 100%;
          box-sizing: border-box;
          background: #111;
          border: 1px solid #1c1c1c;
          border-radius: 10px;
          padding: 12px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          resize: none;
          outline: none;
          transition: border-color 0.25s ease;
          line-height: 1.6;
        }
        .rate-feedback::placeholder { color: rgba(255,255,255,0.2); }
        .rate-feedback:focus { border-color: #2e2e2e; }

        .rate-feedback-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          align-self: flex-start;
          margin-bottom: -12px;
        }

        .rate-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          padding: 12px 28px; border-radius: 999px;
          border: 1px solid #1c1c1c; background: transparent;
          color: rgba(255,255,255,0.25); cursor: not-allowed;
          transition: all 0.25s ease; width: 100%; max-width: 200px;
        }
        .rate-btn.ready { border-color: rgba(255,59,59,0.45); color: rgba(255,100,100,0.8); cursor: pointer; }
        .rate-btn.ready:hover { background: rgba(255,59,59,0.07); border-color: rgba(255,59,59,0.7); color: #ff6b6b; }
        .rate-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .rate-success { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
        .rate-success-icon { font-size: 32px; color: #4ade80; }
        .rate-success-score { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #4ade80; letter-spacing: 1px; }
        .rate-success-text { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.4); line-height: 1.6; }
      `}</style>

      <Box sx={{
        width: "100%",
        backgroundColor: "#080808",
        borderTop: "1px solid #141414",
        borderBottom: "1px solid #141414",
        px: "5%",
        py: { xs: "60px", sm: "72px", md: "90px" },
      }}>
        <Box sx={{ maxWidth: "1350px", width: "100%", mx: "auto" }}>
          <div className="tn-grid">

            {/* Note card */}
            <motion.div
              ref={ref}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="tn-card">
                <div className="tn-tape" />
                <div className="tn-margin-line" />
                <div className="tn-hole h1" />
                <div className="tn-hole h2" />
                <div className="tn-hole h3" />
                <div className="tn-postmark">
                  <div className="tn-postmark-text">2025<br />India</div>
                </div>
                <div className="tn-stamp">
                  <div className="tn-stamp-inner">
                    <span className="tn-stamp-icon">✦</span>
                    <span className="tn-stamp-text">Portfolio</span>
                  </div>
                </div>
                <span className="tn-date">2026,</span>
                <p>Thank you for exploring my portfolio. Every section, component, interaction and animation you see here was carefully crafted to reflect both structure and creativity.</p>
                <p>I appreciate your time and interest in my work.</p>
                <span className="tn-sign">— Gopika P</span>
              </div>
            </motion.div>

            {/* Rating box */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rate-box">
                {!submitted ? (
                  <>
                    <span className="rate-title">Rate this Portfolio</span>

                    <div className="star-row">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={`star ${n <= (hovered || selected) ? "lit" : ""}`}
                          onMouseEnter={() => setHovered(n)}
                          onMouseLeave={() => setHovered(0)}
                          onClick={() => setSelected(n)}
                        >★</span>
                      ))}
                    </div>

                    <div className="rate-dots">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`rate-dot ${n <= (hovered || selected) ? "lit" : ""}`} />
                      ))}
                    </div>

                    <span className="rate-label-text">
                      {(hovered || selected) ? labels[hovered || selected] : "Select a rating"}
                    </span>

                    {/* Optional feedback */}
                    <span className="rate-feedback-label">Feedback — optional</span>
                    <textarea
                      className="rate-feedback"
                      rows={3}
                      placeholder="Share your thoughts..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />

                    <button
                      className={`rate-btn ${selected ? "ready" : ""}`}
                      disabled={!selected || loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "Sending..." : "Submit →"}
                    </button>
                  </>
                ) : (
                  <motion.div
                    className="rate-success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="rate-success-icon">✦</span>
                    <span className="rate-success-score">{selected} / 5 · {labels[selected]}</span>
                    <span className="rate-success-text">
                      Thanks for the feedback!<br />It means a lot.
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>

          </div>
        </Box>
      </Box>
    </>
  );
}

export default ThanksNote;