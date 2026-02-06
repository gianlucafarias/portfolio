import ProjectsPageClient from "@/components/pages/ProjectsPageClient";
import { getProjectsByLocale } from "@/lib/projects-sheet";

export const dynamic = "force-static";

export default async function ProjectsPageEn() {
  const { pinProjects, otherProjects } = await getProjectsByLocale("en");

  return (
    <ProjectsPageClient pinProjects={pinProjects} otherProjects={otherProjects} />
  );
}
