// src/data/projects.js
import { emildaProjects } from "./emilda-projects";
import { friskaProjects } from "./friska-projects";
import { freelanceProjects } from "./freelance-projects"; // ✅ ADD


// Combine all projects
const projects = [...emildaProjects, ...friskaProjects, ...freelanceProjects];

// Log to verify data
console.log("Total projects loaded:", projects.length);
console.log("Sample origins:", projects.map(p => p.origin).slice(0, 5));
console.log("Sample statuses:", projects.map(p => p.status).slice(0, 5));

export default projects;