import { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects-sheet";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug("es", slug);

  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: `${project.title} | Case Study`,
    description: project.shortDescription || project.description?.slice(0, 160),
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug("es", slug);

  if (!project) notFound();

  return <CaseStudyPage project={project} />;
}
