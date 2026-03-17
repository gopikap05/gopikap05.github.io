import { Box } from "@mui/material";
import Breadcrumbs from "../components/common/breadcrumbs";
import AboutMe from "../components/about/Aboutme";
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

      <AboutMe />
      <Resume />
      <AboutPortfolio />
    </Box>
  );
}

export default About;