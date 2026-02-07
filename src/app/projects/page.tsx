import { Metadata } from "next";
import ProjectsPageClient from "@/components/pages/ProjectsPageClient";
import { getMessages } from "@/lib/i18n";
import { getProjectsByLocale } from "@/lib/projects-sheet";

const messages = getMessages("es");

export const metadata: Metadata = {
  title: `Proyectos | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
  description: (messages?.seo as { description?: string })?.description,
  alternates: {
    canonical: "/projects",
    languages: {
      en: "/en/projects",
    },
  },
  openGraph: {
    title: `Proyectos | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
    description: (messages?.seo as { description?: string })?.description,
    url: "/projects",
    siteName: "Gianluca Palmier",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Proyectos | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
    description: (messages?.seo as { description?: string })?.description,
  },
};

export default async function ProjectsPage() {
  const { pinProjects, otherProjects } = await getProjectsByLocale("es");
  return <ProjectsPageClient locale="es" messages={messages} pinProjects={pinProjects} otherProjects={otherProjects} />;
}
