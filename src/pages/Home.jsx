import Breadcrumbs from "../components/ui/breadcrumbs";
import HeroSection from "../components/home/Hero";
import AboutSection from "../components/home/About";
import RecentProjects from "../components/home/Recentprojects";
import CTASection from "../components/home/Cta";

function Home() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home" }
        ]}
      />

      <HeroSection />
      <AboutSection />
      <RecentProjects />
      <CTASection />
    </>
  );
}

export default Home;