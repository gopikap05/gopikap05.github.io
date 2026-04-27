import { useState, useEffect, useCallback } from "react";

const CIRCLE_RADIUS = 20;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const pct = docHeight > 0 ? scrollTop / docHeight : 0;
    setProgress(Math.min(pct, 1));
    setVisible(scrollTop > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        background: "transparent",
        padding: 0,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(16px) scale(0.85)",
        transition:
          "opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Backdrop — adapts to theme bg */}
        <circle
          cx="26"
          cy="26"
          r="24"
          fill="var(--theme-bg-primary)"
          stroke="var(--theme-border)"
          strokeWidth="1"
        />

        {/* Track ring */}
        <circle
          cx="26"
          cy="26"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="var(--theme-border)"
          strokeWidth="2"
        />

        {/* Progress ring — lavender purple */}
        <circle
          cx="26"
          cy="26"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 26 26)"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />

        {/* Hover fill overlay */}
        <circle
          cx="26"
          cy="26"
          r="24"
          fill="#a78bfa"
          style={{
            opacity: hovered ? 0.12 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
      </svg>

      {/* Arrow — lavender so it's visible on both themes */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        style={{
          position: "relative",
          zIndex: 1,
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <path
          d="M7 11.5V2.5M7 2.5L2.5 7M7 2.5L11.5 7"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}