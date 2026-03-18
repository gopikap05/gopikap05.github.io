import "./index.css";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import About from "./pages/About";

import AppLoader from "./components/common/AppLoader";
import CustomCursor from "./components/common/CustomCursor";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Make lenis available globally
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, [loading]);

  if (loading) {
    return <AppLoader onFinish={() => setLoading(false)} />;
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;