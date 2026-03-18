import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple attempts to ensure scroll happens
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
      
      // Force scroll on document elements
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
      
      document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
      
      // Manual setting
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Call immediately
    scrollToTop();

    // Call after delays to ensure it works
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);

    // Handle Lenis if it exists
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      
      // Also try to stop any ongoing Lenis scroll
      window.lenis.stop();
      setTimeout(() => {
        window.lenis.scrollTo(0, { immediate: true });
        window.lenis.start();
      }, 20);
    }

  }, [pathname]);

  return null;
};

export default ScrollToTop;