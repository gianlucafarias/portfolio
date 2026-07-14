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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
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
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement && activeElement.closest('[data-project-link="true"]')) {
      openerRef.current = activeElement;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.projectPanelOpen = "true";

    const backgroundControls = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".portfolio-primary a[href], .portfolio-primary button, .portfolio-primary input, .portfolio-primary textarea, .portfolio-primary select, .portfolio-primary [tabindex]",
      ),
    ).filter(
      (element) =>
        !element.closest("[data-project-panel]") &&
        !element.closest('[data-project-link="true"]'),
    );
    const previousTabIndexes = backgroundControls.map((element) => ({
      element,
      value: element.getAttribute("tabindex"),
    }));
    backgroundControls.forEach((element) => element.setAttribute("tabindex", "-1"));

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
      previousTabIndexes.forEach(({ element, value }) => {
        if (value === null) {
          element.removeAttribute("tabindex");
        } else {
          element.setAttribute("tabindex", value);
        }
      });
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);

      const opener = openerRef.current;
      if (opener?.isConnected) {
        window.requestAnimationFrame(() => opener.focus({ preventScroll: true }));
      }
    };
  }, [close]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      titleRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [project.slug]);

  return (
    <motion.aside
      key={pathname}
      data-project-panel
      aria-label={isEnglish ? `Project: ${project.title}` : `Proyecto: ${project.title}`}
      className="project-side-panel bg-canvas"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={close}
        aria-label={isEnglish ? "Close project" : "Cerrar proyecto"}
        className="project-panel-close z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-zinc-500 backdrop-blur-sm transition-[background-color,color,scale] duration-150 hover:bg-zinc-100 hover:text-zinc-950 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ui dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="mx-auto min-h-full w-full max-w-2xl px-4 pb-12 pt-20 lg:px-0 lg:pb-20">

        <div>
          <CaseStudyPage
            project={project}
            locale={locale}
            messages={messages}
            layout="panel"
            titleRef={titleRef}
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
              className="inline-flex min-h-11 items-center gap-2 rounded-lg text-left text-sm text-zinc-500 transition-[color,scale] duration-150 hover:text-accent-text active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ui dark:text-zinc-400"
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
              className="inline-flex min-h-11 items-center gap-2 rounded-lg text-right text-sm text-zinc-500 transition-[color,scale] duration-150 hover:text-accent-text active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ui dark:text-zinc-400"
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
