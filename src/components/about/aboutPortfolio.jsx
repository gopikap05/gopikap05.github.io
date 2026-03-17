import "../../styles/globals.css";

function AboutPortfolio() {
  return (
    <section className="portfolio-system">
      <div className="portfolio-wrapper">
        <h2 className="portfolio-title">Design & Build System</h2>

        {/* Typography */}
        <div className="portfolio-block">
          <h3>Typography</h3>
          <p>
            Primary font: <strong>Inter</strong> — chosen for clarity,
            geometric balance, and modern UI readability.
          </p>
          <p>
            Bold headings establish hierarchy. Controlled letter spacing
            ensures consistent navigation and section identity.
          </p>
        </div>

        {/* Color System */}
        <div className="portfolio-block">
          <h3>Color System</h3>
          <p>
            Dark-first design approach using layered depth and selective
            accent highlights.
          </p>
          <ul>
            <li>Base Background: #000000</li>
            <li>Surface Panels: #111111</li>
            <li>Borders: #1a1a1a</li>
            <li>Accent Colors: Interactive & motion highlights</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="portfolio-block">
          <h3>Tech Stack</h3>
          <ul>
            <li>HTML5 / CSS3 / JavaScript (ES6+)</li>
            <li>React — Component-based architecture</li>
            <li>Material UI — Design system foundation</li>
            <li>Framer Motion — Interaction & animation</li>
            <li>Redux Toolkit — Scalable state management</li>
            <li>React Router — Structured routing</li>
            <li>Vite — Optimized development build tool</li>
          </ul>
        </div>

        {/* Implementation Highlights */}
        <div className="portfolio-block">
          <h3>Implementation Highlights</h3>
          <ul>
            <li>Modular folder architecture</li>
            <li>Reusable UI components</li>
            <li>Responsive layout strategy</li>
            <li>3D hover interactions</li>
            <li>Smooth motion transitions</li>
          </ul>
        </div>
      </div>

      {/* Animated Color Strip (unchanged) */}
      <div className="container-items">
        <button
          className="item-color"
          style={{ "--color": "#ffffff" }}
          aria-label="#ffffff"
        ></button>
        <button
          className="item-color"
          style={{ "--color": "#aaaaaa" }}
          aria-label="#aaaaaa"
        ></button>
        <button
          className="item-color"
          style={{ "--color": "#1a1a1a" }}
          aria-label="#1a1a1a"
        ></button>
        <button
          className="item-color"
          style={{ "--color": "#111111" }}
          aria-label="#111111"
        ></button>
        <button
          className="item-color"
          style={{ "--color": "#e11d48" }}
          aria-label="#e11d48"
        ></button>
        <button
          className="item-color"
          style={{ "--color": "#3b82f6" }}
          aria-label="#3b82f6"
        ></button>
        <button
          className="item-color"
          style={{ "--color": "#8b5cf6" }}
          aria-label="#8b5cf6"
        ></button>
        <button
          className="item-color"
          style={{ "--color": "#10b981" }}
          aria-label="#10b981"
        ></button>
      </div>
    </section>
  );
}

export default AboutPortfolio;