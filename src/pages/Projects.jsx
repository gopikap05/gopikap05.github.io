import { Box } from "@mui/material";
import Breadcrumbs from "../components/ui/breadcrumbs";
import AllProjects from "../components/projects/AllProjects";
import ProjectHero from "../components/projects/project";

function Projects() {
  return (
    <Box>
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Projects", path: "/projects" },
        ]}
      />

      <ProjectHero />

      <AllProjects />
    </Box>
  );
}

export default Projects;