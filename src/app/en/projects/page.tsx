import { Metadata } from "next";
import ProjectsPageClient from "@/components/pages/ProjectsPageClient";
import { getMessages } from "@/lib/i18n";
import { getProjectsByLocale } from "@/lib/projects-sheet";

const messages = getMessages("en");

export const metadata: Metadata = {
  title: `Projects | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
  description: (messages?.seo as { description?: string })?.description,
  alternates: {
    canonical: "/en/projects",
    languages: {
      es: "/projects",
    },
  },
  openGraph: {
    title: `Projects | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
    description: (messages?.seo as { description?: string })?.description,
    url: "/en/projects",
    siteName: "Gianluca Palmier",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
    description: (messages?.seo as { description?: string })?.description,
  },
};

export default async function ProjectsPageEn() {
  const { pinProjects, otherProjects } = await getProjectsByLocale("en");
  return <ProjectsPageClient locale="en" messages={messages} pinProjects={pinProjects} otherProjects={otherProjects} />;
}
