import { notFound } from "next/navigation";
import ProjectSidePanel from "@/components/pages/ProjectSidePanel";
import { getMessages } from "@/lib/i18n";
import { getProjectBySlug, getProjectsByLocale } from "@/lib/projects-sheet";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function InterceptedProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, { pinProjects, otherProjects }] = await Promise.all([
    getProjectBySlug("es", slug),
    getProjectsByLocale("es"),
  ]);

  if (!project) notFound();

  return (
    <ProjectSidePanel
      project={project}
      projects={[...pinProjects, ...otherProjects]}
      locale="es"
      messages={getMessages("es")}
    />
  );
}
