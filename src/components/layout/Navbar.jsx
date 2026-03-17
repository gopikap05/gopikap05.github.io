import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.png";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

  .nb-root {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    z-index: 1000;
    padding: 0 clamp(16px, 4vw, 64px);
    font-family: 'Syne', sans-serif;
    transition: background 0.5s, border-color 0.5s;
    box-sizing: border-box;
  }

  .nb-root.scrolled {
    background: rgba(5,5,5,0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid #141414;
  }
  .nb-root.top {
    background: transparent;
    border-bottom: 1px solid transparent;
  }

  .nb-inner {
    max-width: 1400px;
    margin: 0 auto;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  /* ── logo ── */
  .nb-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
    position: relative;
  }
  .nb-logo img {
    height: 42px;
    width: auto;
    object-fit: contain;
    transition: opacity 0.3s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  .nb-logo:hover img {
    opacity: 0.7;
    transform: scale(1.08);
  }

  /* ── nav links wrapper (holds sliding pill) ── */
  .nb-links {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    position: relative;
  }

  /* sliding background pill behind active/hovered link */
  .nb-pill {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    border-radius: 100px;
    background: rgba(255,255,255,0.04);
    border: 1px solid #1e1e1e;
    pointer-events: none;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), width 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.2s;
    opacity: 0;
    z-index: 0;
  }
  .nb-pill.visible { opacity: 1; }

  .nb-link {
    font-family: 'DM Mono', monospace;
    font-size: 16px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    color: #555;
    padding: 11px 20px;
    border-radius: 100px;
    position: relative;
    transition: color 0.25s;
    white-space: nowrap;
    z-index: 1;
  }
  .nb-link:hover { color: #aaa; }
  .nb-link.active { color: #e8e8e0; }

  /* active lime dot */
  .nb-link.active::after {
    content: '';
    position: absolute;
    bottom: 3px; left: 50%;
    transform: translateX(-50%);
    width: 3px; height: 3px;
    border-radius: 50%;
    background: #E6E6FA;
    box-shadow: 0 0 4px #E6E6FA;
  }

  /* ── contact button — magnetic ── */
  .nb-contact-wrap {
    margin-left: 8px;
    flex-shrink: 0;
    position: relative;
  }

  .nb-contact {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    color: #050505;
    background: #e8e8e0;
    padding: 13px 28px;
    border-radius: 100px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.3s, color 0.3s;
    white-space: nowrap;
  }
  .nb-contact::before {
    content: '';
    position: absolute; inset: 0;
    background: #E6E6FA;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    z-index: 0;
  }
  .nb-contact:hover::before { transform: scaleX(1); }
  .nb-contact:hover {
    box-shadow: 0 8px 28px rgba(200,255,0,0.25);
  }
  .nb-contact span { position: relative; z-index: 1; }

  /* ── hamburger (mobile) ── */
  .nb-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
    background: none;
    border: none;
    flex-shrink: 0;
  }
  .nb-hamburger span {
    display: block;
    width: 24px; height: 1px;
    background: #666;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s, background 0.3s;
    transform-origin: center;
  }
  .nb-hamburger:hover span { background: #e8e8e0; }
  .nb-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .nb-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nb-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  /* ── mobile drawer ── */
  .nb-drawer {
    position: fixed;
    top: 88px; left: 0;
    width: 100%; height: calc(100vh - 88px);
    background: rgba(5,5,5,0.97);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s;
    border-top: 1px solid #111;
  }
  .nb-drawer.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nb-drawer-link {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 8vw, 64px);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #222;
    text-decoration: none;
    transition: color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    display: flex;
    align-items: center;
    gap: 16px;
    line-height: 1.2;
  }
  .nb-drawer-link:hover { color: #e8e8e0; transform: translateX(8px); }
  .nb-drawer-link.active { color: #e8e8e0; }
  .nb-drawer-link.active::before {
    content: '';
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #E6E6FA;
    flex-shrink: 0;
    box-shadow: 0 0 8px #E6E6FA;
  }

  .nb-drawer-contact {
    font-family: 'DM Mono', monospace;
    font-size: 16px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    color: #050505;
    background: #E6E6FA;
    padding: 14px 36px;
    border-radius: 100px;
    margin-top: 24px;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
  }
  .nb-drawer-contact:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(200,255,0,0.3);
  }

  .nb-drawer-footer {
    position: absolute;
    bottom: 40px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #1e1e1e;
  }

  @media (max-width: 680px) {
    .nb-links, .nb-contact-wrap { display: none; }
    .nb-hamburger { display: flex; }
  }
`;

const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Projects", to: "/projects" },
];

function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [pillStyle, setPillStyle]   = useState({ left: 0, width: 0, opacity: 0 });
  const [pillVisible, setPillVisible] = useState(false);
  const linksRef = useRef({});
  const location = useLocation();

  useEffect(() => {
    if (document.getElementById("nb-styles")) return;
    const tag = document.createElement("style");
    tag.id = "nb-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const movePill = (to) => {
    const el = linksRef.current[to];
    if (!el) return;
    const parent = el.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setPillStyle({
      left: rect.left - parentRect.left,
      width: rect.width,
    });
    setPillVisible(true);
  };

  const hidePill = () => setPillVisible(false);

  return (
    <>
      <nav className={`nb-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="nb-inner">

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <img src={logo} alt="Logo" />
          </Link>

          {/* Desktop links */}
          <div
            className="nb-links"
            onMouseLeave={hidePill}
          >
            {/* sliding background pill */}
            <div
              className={`nb-pill${pillVisible ? " visible" : ""}`}
              style={{
                transform: `translateX(${pillStyle.left}px)`,
                width: pillStyle.width,
              }}
            />

            {NAV_LINKS.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  ref={(el) => (linksRef.current[to] = el)}
                  className={`nb-link${isActive ? " active" : ""}`}
                  onMouseEnter={() => movePill(to)}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Contact pill */}
          <div className="nb-contact-wrap">
            <Link to="/contact" className="nb-contact">
              <span>Contact</span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`nb-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nb-drawer${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ label, to }, i) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={label}
              to={to}
              className={`nb-drawer-link${isActive ? " active" : ""}`}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {label}
            </Link>
          );
        })}
        <Link to="/contact" className="nb-drawer-contact">
          Get in touch
        </Link>
        <span className="nb-drawer-footer">Gopika · Frontend Developer</span>
      </div>
    </>
  );
}

export default Navbar;