import Breadcrumbs from "../components/common/breadcrumbs";
import HeroSection from "../components/home/Hero";
import AboutSection from "../components/home/About";
import RecentProjects from "../components/home/Recentprojects";
import CTASection from "../components/home/Cta";
import Testimonials from "../components/home/testimonials"; 

function Home() {
  return (
    <div style={{ position: "relative" }}>
      <Breadcrumbs
        items={[
          { label: "Home" }
        ]}
      />

      <HeroSection />
      <AboutSection />
      <RecentProjects />
      <Testimonials /> 
      <CTASection />
    </div>
  );
}

export default Home;