import React from "react";
import { projects, seo } from "@/data/data";
import ProjectsClient from "./ProjectsClient";

export const metadata = {
    title: `Proyectos | ${seo.title}`,
    description: "Explora una colección de proyectos web desarrollados con Next.js, React, y tecnologías web modernas.",
    keywords: "projects, web development, Next.js, React, JavaScript, portfolio"
};

function Projects() {
    return <ProjectsClient projects={projects} />;
}

export default Projects;
