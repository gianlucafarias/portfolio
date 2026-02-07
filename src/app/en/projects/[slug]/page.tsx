import { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import { getMessages } from "@/lib/i18n";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects-sheet";

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
  const project = await getProjectBySlug("en", slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.shortDescription || project.description?.slice(0, 160),
    alternates: {
      canonical: `/en/projects/${slug}`,
      languages: {
        es: `/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.shortDescription || project.description?.slice(0, 160),
      url: `/en/projects/${slug}`,
      siteName: "Gianluca Palmier",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.shortDescription || project.description?.slice(0, 160),
    },
  };
}

export default async function ProjectCaseStudyPageEn({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug("en", slug);
  const messages = getMessages("en");

  if (!project) notFound();

  return <CaseStudyPage project={project} locale="en" messages={messages} />;
}
