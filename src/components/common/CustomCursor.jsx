import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);

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
    const removeHoverEffect = () =>
      cursor.classList.remove("cursor-hover");

    const interactiveElements = document.querySelectorAll(
      "a, button, .button"
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
            background: #ffffff;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
          }

          .cursor-hover {
            width: 28px;
            height: 28px;
            background: rgba(139, 92, 246, 0.3);
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