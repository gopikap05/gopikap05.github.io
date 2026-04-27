import { Box } from "@mui/material";
import Breadcrumbs from "../components/common/breadcrumbs";
import AboutMeHero from "../components/about/AboutMeHero";
import AboutMeFAQ from "../components/about/AboutMeFAQ";
import Resume from "../components/about/Resume";
import AboutPortfolio from "../components/about/aboutPortfolio";

function About() {
  return (
    <Box>
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "About", path: "/about" },
        ]}
      />

      <AboutMeHero />
      <AboutMeFAQ />
      <Resume />
      <AboutPortfolio />
    </Box>
  );
}

export default About;