import Breadcrumbs from "../components/common/breadcrumbs";
import HeroSection from "../components/home/Hero";
import AboutSection from "../components/home/About";
import RecentProjects from "../components/home/Recentprojects";
import CTASection from "../components/home/Cta";

function Home() {
  return (
    <div style={{ position: "relative" }}> {/*  Added wrapper */}
      <Breadcrumbs
        items={[
          { label: "Home" }
        ]}
      />

      <HeroSection />
      <AboutSection />
      <RecentProjects />
      <CTASection />
    </div>
  );
}

export default Home;
