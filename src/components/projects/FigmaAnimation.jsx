import React from "react";

function FigmaAnimation() {
  return (
    <>
      <style>
        {`
        .figma-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .svg-container {
          flex: 1;
          max-width: 600px;
        }

        .outer {
          flex: 0 0 300px;
          width: 300px;
          height: 250px;
          border-radius: 10px;
          padding: 1px;
          background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
          position: relative;
        }

        .dot {
          width: 5px;
          aspect-ratio: 1;
          position: absolute;
          background-color: #fff;
          box-shadow: 0 0 10px #ffffff;
          border-radius: 100px;
          z-index: 2;
          right: 10%;
          top: 10%;
          animation: moveDot 6s linear infinite;
        }

        @keyframes moveDot {
          0%,100% { top: 10%; right: 10%; }
          25% { top: 10%; right: calc(100% - 35px); }
          50% { top: calc(100% - 30px); right: calc(100% - 35px); }
          75% { top: calc(100% - 30px); right: 10%; }
        }

        .card {
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 9px;
          border: solid 1px #202222;
          background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-direction: column;
          color: #fff;
        }

        .ray {
          width: 220px;
          height: 45px;
          border-radius: 100px;
          position: absolute;
          background-color: #c7c7c7;
          opacity: 0.4;
          box-shadow: 0 0 50px #fff;
          filter: blur(10px);
          transform-origin: 10%;
          top: 0%;
          left: 0;
          transform: rotate(40deg);
        }

        .card .text {
          font-weight: 700;
          font-size: 3.5rem;
          letter-spacing: 2px;
        }

        .line {
          width: 100%;
          height: 1px;
          position: absolute;
          background-color: #2c2c2c;
        }

        .topl {
          top: 10%;
          background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%);
        }

        .bottoml { bottom: 10%; }

        .leftl {
          left: 10%;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, #747474 30%, #222424 70%);
        }

        .rightl {
          right: 10%;
          width: 1px;
          height: 100%;
        }

        /* Mobile stacking */
        @media (max-width: 900px) {
          .figma-wrapper {
            flex-direction: column;
            gap: 60px;
          }

          .svg-container {
            max-width: 100%;
          }
        }
        `}
      </style>

      <div className="figma-wrapper">
        {/* LEFT SVG */}
        <div className="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 614 390"
            width="100%"
          >
            <rect
              x="28"
              y="20"
              width="559"
              height="286"
              stroke="#000"
              strokeWidth="2"
              fill="#8b5cf610"
            />

            <text x="50%" y="130" textAnchor="middle" fill="white" fontSize="52" fontWeight="600">
              Build,
            </text>
            <text x="50%" y="190" textAnchor="middle" fill="white" fontSize="52" fontWeight="600">
              Create,
            </text>
            <text x="50%" y="250" textAnchor="middle" fill="white" fontSize="52" fontWeight="600">
              Launch.
            </text>

            <path
              strokeWidth="2"
              stroke="white"
              fill="#8b5cf6"
              d="M453.383 343L448 317L471 331L459.745 333.5L453.383 343Z"
            />
          </svg>
        </div>

        {/* RIGHT CARD */}
        <div className="outer">
          <div className="dot"></div>

          <div className="card">
            <div className="ray"></div>

            <div className="text">40+</div>
            <div style={{ fontSize: "14px", letterSpacing: "2px", marginTop: "6px" }}>
              Projects
            </div>

            <div className="line topl"></div>
            <div className="line leftl"></div>
            <div className="line bottoml"></div>
            <div className="line rightl"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FigmaAnimation;