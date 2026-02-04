import { Metadata } from "next";
import CaseStudyPage from "@/components/pages/CaseStudyPage";

const SLUGS = [
  "mentesana",
  "la-max-stream",
  "incubadora-noc",
  "arquitrack",
  "ceresito",
  "encuesta-plan-obras",
  "club-central",
];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const messages = (await import("@/messages/en.json")).default;
  
  interface Project {
    slug?: string;
    title: string;
    shortDescription?: string;
    description?: string;
  }
  
  const pinProjects = (messages?.projects?.pinProjects || []) as Project[];
  const otherProjects = (messages?.projects?.otherProjects || []) as Project[];
  const all = [...pinProjects, ...otherProjects];
  const project = all.find((p) => p.slug === slug);
  
  if (!project) return { title: "Project not found" };
  
  return {
    title: `${project.title} | Case Study`,
    description: project.shortDescription || project.description?.slice(0, 160),
  };
}

export default async function ProjectCaseStudyPageEn({ params }: PageProps) {
  const { slug } = await params;
  return <CaseStudyPage slug={slug} />;
}
