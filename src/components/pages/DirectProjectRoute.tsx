"use client";

import { useEffect, useState } from "react";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import HomePageClient from "@/components/pages/HomePageClient";
import ProjectSidePanel from "@/components/pages/ProjectSidePanel";
import type { Locale, Messages } from "@/lib/i18n";
import type { Project } from "@/lib/projects-sheet";

interface DirectProjectRouteProps {
  project: Project;
  projects: Project[];
  pinProjects: Project[];
  locale: Locale;
  messages: Messages;
}

export default function DirectProjectRoute({
  project,
  projects,
  pinProjects,
  locale,
  messages,
}: DirectProjectRouteProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (!isDesktop) {
    return <CaseStudyPage project={project} locale={locale} messages={messages} />;
  }

  return (
    <>
      <HomePageClient locale={locale} messages={messages} pinProjects={pinProjects} />
      <ProjectSidePanel
        project={project}
        projects={projects}
        locale={locale}
        messages={messages}
        closeHref={locale === "en" ? "/en" : "/"}
      />
    </>
  );
}
