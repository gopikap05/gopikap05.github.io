import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { currentTheme, toggleTheme, isDark } = useTheme();

  return (
    <label className="theme-switch">
      <input 
        type="checkbox" 
        checked={!isDark}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <div className="slider round">
        <div className="sun-moon">
          {/* Moon dots */}
          <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          
          {/* Light rays for sun */}
          <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>

          {/* Clouds for both themes */}
          <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
        </div>
        
        <div className="stars">
          <svg id="star-1" className="star" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
          </svg>
          <svg id="star-2" className="star" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
          </svg>
          <svg id="star-3" className="star" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
          </svg>
          <svg id="star-4" className="star" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
          </svg>
        </div>
      </div>
      
      <style>{`
        .theme-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
          cursor: pointer;
        }

        .theme-switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${isDark ? "#1c1c1c" : "#2196f3"};
          transition: 0.4s;
          z-index: 0;
          overflow: hidden;
          border-radius: 34px;
        }

        .sun-moon {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: ${isDark ? "#ffffff" : "#ffd700"};
          border-radius: 50%;
          transition: 0.4s;
          transform: ${isDark ? "translateX(26px)" : "translateX(0)"};
          animation: ${isDark ? "rotate-center 0.6s ease-in-out both" : "none"};
        }

        @keyframes rotate-center {
          0% {
            transform: translateX(0) rotate(0);
          }
          100% {
            transform: translateX(26px) rotate(360deg);
          }
        }

        /* Moon dots */
        .moon-dot {
          opacity: ${isDark ? 1 : 0};
          transition: 0.4s;
          fill: gray;
          position: absolute;
          width: 6px;
          height: 6px;
        }

        #moon-dot-1 {
          left: 10px;
          top: 3px;
          width: 6px;
          height: 6px;
          z-index: 4;
        }

        #moon-dot-2 {
          left: 2px;
          top: 10px;
          width: 10px;
          height: 10px;
          z-index: 4;
        }

        #moon-dot-3 {
          left: 16px;
          top: 18px;
          width: 3px;
          height: 3px;
          z-index: 4;
        }

        /* Light rays */
        .light-ray {
          position: absolute;
          fill: white;
          opacity: ${isDark ? 0 : 0.1};
          transition: 0.4s;
        }

        #light-ray-1 {
          left: -8px;
          top: -8px;
          width: 43px;
          height: 43px;
          z-index: -1;
        }

        #light-ray-2 {
          left: -50%;
          top: -50%;
          width: 55px;
          height: 55px;
          z-index: -1;
        }

        #light-ray-3 {
          left: -18px;
          top: -18px;
          width: 60px;
          height: 60px;
          z-index: -1;
        }

        /* Clouds */
        .cloud-light, .cloud-dark {
          position: absolute;
          fill: ${isDark ? "#ccc" : "#eee"};
          animation: cloud-move 6s infinite ease-in-out;
          opacity: ${isDark ? 0.6 : 0.4};
        }

        .cloud-dark {
          fill: #ccc;
          animation-delay: 1s;
        }

        .cloud-light {
          fill: #eee;
        }

        #cloud-1 {
          left: 30px;
          top: 15px;
          width: 40px;
          height: 40px;
        }
        #cloud-2 {
          left: 44px;
          top: 10px;
          width: 20px;
          height: 20px;
        }
        #cloud-3 {
          left: 18px;
          top: 24px;
          width: 30px;
          height: 30px;
        }
        #cloud-4 {
          left: 36px;
          top: 18px;
          width: 40px;
          height: 40px;
        }
        #cloud-5 {
          left: 48px;
          top: 14px;
          width: 20px;
          height: 20px;
        }
        #cloud-6 {
          left: 22px;
          top: 26px;
          width: 30px;
          height: 30px;
        }

        @keyframes cloud-move {
          0%, 100% { transform: translateX(0px); }
          40% { transform: translateX(4px); }
          80% { transform: translateX(-4px); }
        }

        /* Stars */
        .stars {
          transform: translateY(${isDark ? "0" : "-32px"});
          opacity: ${isDark ? 1 : 0};
          transition: 0.4s;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .star {
          fill: white;
          position: absolute;
          transition: 0.4s;
          animation: star-twinkle 2s infinite;
        }

        #star-1 {
          width: 20px;
          height: 20px;
          top: 2px;
          left: 3px;
          animation-delay: 0.3s;
        }
        #star-2 {
          width: 6px;
          height: 6px;
          top: 16px;
          left: 3px;
          animation-delay: 0s;
        }
        #star-3 {
          width: 12px;
          height: 12px;
          top: 20px;
          left: 10px;
          animation-delay: 0.6s;
        }
        #star-4 {
          width: 18px;
          height: 18px;
          top: 0px;
          left: 18px;
          animation-delay: 1.3s;
        }

        @keyframes star-twinkle {
          0%, 100% { transform: scale(1); opacity: 1; }
          40% { transform: scale(1.2); opacity: 0.8; }
          80% { transform: scale(0.8); opacity: 0.6; }
        }

        /* Hover effect */
        .theme-switch:hover .slider {
          filter: brightness(1.05);
        }

        /* Focus effect for accessibility */
        .theme-switch input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
          outline: 2px solid rgba(33, 150, 243, 0.5);
        }
      `}</style>
    </label>
  );
}

export default ThemeToggle;