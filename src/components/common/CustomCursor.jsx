import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const { themeColors, currentTheme } = useTheme();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const speed = 0.15; // smoothness factor

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor);
    requestAnimationFrame(animate);

    // Hover effect for interactive elements
    const addHoverEffect = () => cursor.classList.add("cursor-hover");
    const removeHoverEffect = () => cursor.classList.remove("cursor-hover");

    const interactiveElements = document.querySelectorAll(
      "a, button, .button, [role='button'], .filter-pill, .project-card, .animated-button"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", addHoverEffect);
      el.addEventListener("mouseleave", removeHoverEffect);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverEffect);
        el.removeEventListener("mouseleave", removeHoverEffect);
      });
    };
  }, []);

  // Update cursor styles when theme changes
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Update cursor colors based on theme
    if (currentTheme === "light") {
      cursor.style.background = themeColors.primary;
    } else {
      cursor.style.background = "#ffffff";
    }
  }, [currentTheme, themeColors]);

  return (
    <>
      <style>
        {`
          body {
            cursor: none;
          }

          .cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            width: 10px;
            height: 10px;
            background: var(--theme-cursor);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
          }

          .cursor-hover {
            width: 28px;
            height: 28px;
            background: var(--theme-cursor-hover);
            backdrop-filter: blur(4px);
          }

          @media (max-width: 768px) {
            body {
              cursor: default;
            }
            .cursor-dot {
              display: none;
            }
          }
        `}
      </style>

      <div ref={cursorRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;