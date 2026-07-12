"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import type { Locale, Messages } from "@/lib/i18n";
import type { Project } from "@/lib/projects-sheet";

interface ProjectSidePanelProps {
  project: Project;
  projects: Project[];
  locale: Locale;
  messages: Messages;
  closeHref?: string;
}

export default function ProjectSidePanel({
  project,
  projects,
  locale,
  messages,
  closeHref,
}: ProjectSidePanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const titleRef = useRef<HTMLDivElement>(null);
  const isEnglish = locale === "en";
  const basePath = isEnglish ? "/en/projects" : "/projects";

  const { previousProject, nextProject } = useMemo(() => {
    const index = projects.findIndex((item) => item.slug === project.slug);
    if (index < 0 || projects.length < 2) {
      return { previousProject: undefined, nextProject: undefined };
    }

    return {
      previousProject: projects[(index - 1 + projects.length) % projects.length],
      nextProject: projects[(index + 1) % projects.length],
    };
  }, [project.slug, projects]);

  const close = useCallback(() => {
    if (closeHref) {
      router.push(closeHref, { scroll: false });
      return;
    }
    router.back();
  }, [closeHref, router]);

  const openProject = (nextProjectToOpen: Project | undefined) => {
    if (!nextProjectToOpen?.slug) return;
    router.replace(`${basePath}/${nextProjectToOpen.slug}`, { scroll: false });
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.projectPanelOpen = "true";
    titleRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-project-panel]")) return;
      if (target.closest('a[data-project-link="true"]')) return;
      close();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.projectPanelOpen;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [close]);

  return (
    <motion.aside
      key={pathname}
      data-project-panel
      aria-label={isEnglish ? `Project: ${project.title}` : `Proyecto: ${project.title}`}
      className="project-side-panel bg-white dark:bg-zinc-950"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={close}
        aria-label={isEnglish ? "Close project" : "Cerrar proyecto"}
        className="project-panel-close z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-500 backdrop-blur-sm transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:bg-zinc-950/90 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="mx-auto min-h-full w-full max-w-2xl px-4 pb-12 pt-20 lg:px-0 lg:pb-20">

        <div ref={titleRef} tabIndex={-1} className="outline-none">
          <CaseStudyPage
            project={project}
            locale={locale}
            messages={messages}
            layout="panel"
          />
        </div>

        {(previousProject || nextProject) && (
          <nav
            aria-label={isEnglish ? "Project navigation" : "Navegación de proyectos"}
            className="mt-14 flex items-center justify-between gap-6 border-t border-zinc-200/70 pt-6 dark:border-zinc-800/70"
          >
            <button
              type="button"
              onClick={() => openProject(previousProject)}
              className="inline-flex items-center gap-2 text-left text-sm text-zinc-500 transition-colors hover:text-orange-500 dark:text-zinc-400 dark:hover:text-orange-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>
                <span className="block text-xs">{isEnglish ? "Previous" : "Anterior"}</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{previousProject?.title}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => openProject(nextProject)}
              className="inline-flex items-center gap-2 text-right text-sm text-zinc-500 transition-colors hover:text-orange-500 dark:text-zinc-400 dark:hover:text-orange-400"
            >
              <span>
                <span className="block text-xs">{isEnglish ? "Next" : "Siguiente"}</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{nextProject?.title}</span>
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </motion.aside>
  );
}
