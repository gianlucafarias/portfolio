import ProjectsPageClient from "@/components/pages/ProjectsPageClient";
import { getProjectsByLocale } from "@/lib/projects-sheet";

export const dynamic = "force-static";

export default async function ProjectsPage() {
  const { pinProjects, otherProjects } = await getProjectsByLocale("es");

  return (
    <ProjectsPageClient pinProjects={pinProjects} otherProjects={otherProjects} />
  );
}
