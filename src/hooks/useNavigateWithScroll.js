import { useNavigate } from "react-router-dom";

const useNavigateWithScroll = () => {
  const navigate = useNavigate();

  const navigateWithScroll = (path) => {
    // Force scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
    
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Handle Lenis
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    
    // Navigate
    navigate(path);
  };

  return navigateWithScroll;
};

export default useNavigateWithScroll;