import { Metadata } from "next";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import { getMessages } from "@/lib/i18n";
import { PROJECT_SLUGS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const messages = getMessages("en");

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
  const messages = getMessages("en");
  return <CaseStudyPage slug={slug} locale="en" messages={messages} />;
}
