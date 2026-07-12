"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FocusEvent, MouseEvent as ReactMouseEvent, PointerEvent, SyntheticEvent } from "react";
import type { ElementType } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects-sheet";
import { cn } from "@/lib/utils";

interface ProjectHoverListProps {
  projects: Project[];
  basePath: string;
  noImageText: string;
  compact?: boolean;
}

const getSummary = (project: Project) =>
  project.recruiterSummary ||
  project.shortDescription ||
  (project.description ? `${project.description.slice(0, 120)}...` : undefined);

const getProjectHref = (project: Project, basePath: string) =>
  project.slug ? `${basePath}/${project.slug}` : basePath;

const PREVIEW_MAX_WIDTH = 320;
const PREVIEW_MAX_HEIGHT = 280;
const PREVIEW_FALLBACK_HEIGHT = 180;
const PREVIEW_MARGIN = 24;
const PREVIEW_GAP = 16;

function getPreviewSize(naturalWidth: number, naturalHeight: number) {
  if (!naturalWidth || !naturalHeight) {
    return { width: PREVIEW_MAX_WIDTH, height: PREVIEW_FALLBACK_HEIGHT };
  }

  const ratio = naturalWidth / naturalHeight;
  let width = PREVIEW_MAX_WIDTH;
  let height = Math.round(width / ratio);

  if (height > PREVIEW_MAX_HEIGHT) {
    height = PREVIEW_MAX_HEIGHT;
    width = Math.round(height * ratio);
  }

  return { width, height };
}

const PREVIEW_ENTER_TRANSITION = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
  opacity: { duration: 0.5 },
  filter: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  y: { duration: 0.55 },
  scale: { duration: 0.55 },
};

const PREVIEW_EXIT_TRANSITION = {
  duration: 0.38,
  ease: [0.16, 1, 0.3, 1] as const,
  opacity: { duration: 0.32 },
  filter: { duration: 0.42 },
  y: { duration: 0.38 },
  scale: { duration: 0.38 },
};

export default function ProjectHoverList({
  projects,
  basePath,
  noImageText,
  compact = false,
}: ProjectHoverListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const firstPreviewIndex = useMemo(
    () => Math.max(0, projects.findIndex((project) => Boolean(project.image))),
    [projects],
  );
  const [activeIndex, setActiveIndex] = useState(firstPreviewIndex);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewSize, setPreviewSize] = useState({
    width: PREVIEW_MAX_WIDTH,
    height: PREVIEW_FALLBACK_HEIGHT,
  });
  const previewSizeRef = useRef({
    width: PREVIEW_MAX_WIDTH,
    height: PREVIEW_FALLBACK_HEIGHT,
  });
  const previewDimensionsCache = useRef(
    new Map<string, { width: number; height: number }>(),
  );
  const activeItemRef = useRef<HTMLElement | null>(null);
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const previewTop = useMotionValue(0);
  const previewLeft = useMotionValue(0);
  const springX = useSpring(imageX, { stiffness: 160, damping: 28, mass: 0.45 });
  const springY = useSpring(imageY, { stiffness: 160, damping: 28, mass: 0.45 });
  const springPreviewTop = useSpring(previewTop, {
    stiffness: 220,
    damping: 32,
    mass: 0.45,
  });

  const activeProject = projects[activeIndex] || projects[0];

  const resetPreviewSize = useCallback(() => {
    const fallback = {
      width: PREVIEW_MAX_WIDTH,
      height: PREVIEW_FALLBACK_HEIGHT,
    };
    previewSizeRef.current = fallback;
    setPreviewSize(fallback);
  }, []);

  const updatePreviewLeft = useCallback(() => {
    const layoutEl = containerRef.current?.closest("main");
    if (!layoutEl) {
      return;
    }

    const layoutRect = layoutEl.getBoundingClientRect();
    const { width } = previewSizeRef.current;
    const left = Math.min(
      layoutRect.right + PREVIEW_GAP,
      window.innerWidth - width - PREVIEW_MARGIN,
    );

    previewLeft.set(Math.max(PREVIEW_MARGIN, left));
  }, [previewLeft]);

  const updatePreviewTop = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const target = rect.top + rect.height / 2;
    const { height } = previewSizeRef.current;
    const min = PREVIEW_MARGIN + height / 2;
    const max = window.innerHeight - PREVIEW_MARGIN - height / 2;

    previewTop.set(Math.min(Math.max(target, min), max));
  };

  const handlePreviewImageLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      const image = activeProject?.image;
      const { naturalWidth, naturalHeight } = event.currentTarget;
      const nextSize = getPreviewSize(naturalWidth, naturalHeight);

      previewSizeRef.current = nextSize;
      setPreviewSize(nextSize);

      if (image) {
        previewDimensionsCache.current.set(image, nextSize);
      }
    },
    [activeProject?.image],
  );

  const showPreview = (index: number, element: HTMLElement) => {
    if (document.body.dataset.projectPanelOpen === "true") {
      hidePreview();
      return;
    }
    activeItemRef.current = element;
    setActiveIndex(index);
    setIsPreviewVisible(true);
    updatePreviewTop(element);
    updatePreviewLeft();
  };

  const resetPreviewMotion = () => {
    imageX.set(0);
    imageY.set(0);
  };

  const hidePreview = () => {
    setIsPreviewVisible(false);
    resetPreviewMotion();
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || (event.pointerType !== "mouse" && event.pointerType !== "pen")) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    imageX.set(x * 10);
    imageY.set(y * 8);
  };

  const handleListBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      hidePreview();
    }
  };

  useEffect(() => {
    const image = activeProject?.image;
    if (!image) {
      resetPreviewSize();
      return;
    }

    const cached = previewDimensionsCache.current.get(image);
    if (cached) {
      previewSizeRef.current = cached;
      setPreviewSize(cached);
      return;
    }

    resetPreviewSize();
  }, [activeProject?.image, resetPreviewSize]);

  useEffect(() => {
    if (!isPreviewVisible) {
      return;
    }

    if (activeItemRef.current) {
      updatePreviewTop(activeItemRef.current);
    }

    updatePreviewLeft();
  }, [isPreviewVisible, previewSize, updatePreviewLeft]);

  useEffect(() => {
    if (!isPreviewVisible) {
      return;
    }

    const handleLayoutChange = () => {
      updatePreviewLeft();
    };

    window.addEventListener("resize", handleLayoutChange);
    window.addEventListener("scroll", handleLayoutChange, true);

    return () => {
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("scroll", handleLayoutChange, true);
    };
  }, [isPreviewVisible, updatePreviewLeft]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerLeave={hidePreview}
      onBlur={handleListBlur}
    >
      <div className="flex flex-col">
        {projects.map((project, index) => {
          const href = getProjectHref(project, basePath);
          const canOpenCaseStudy = project.caseStudyEnabled;
          const ProjectRow = (canOpenCaseStudy ? Link : "div") as ElementType;
          const summary = getSummary(project);
          const metaItems = [project.status, project.type].filter(Boolean);
          const isSelected = Boolean(
            project.slug && pathname?.endsWith(`/projects/${project.slug}`),
          );
          const isActive = (isPreviewVisible && index === activeIndex) || isSelected;

          return (
            <motion.article
              key={project.slug || project.title}
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 14, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: prefersReducedMotion ? 0 : index * 0.045,
                duration: prefersReducedMotion ? 0 : 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="contents"
            >
              <ProjectRow
                {...(canOpenCaseStudy ? { href } : {})}
                data-project-link={canOpenCaseStudy ? "true" : undefined}
                aria-disabled={canOpenCaseStudy ? undefined : true}
                onClick={(event: ReactMouseEvent<HTMLElement>) => {
                  if (!canOpenCaseStudy) return;
                  if (window.innerWidth < 1024) {
                    event.preventDefault();
                    window.location.assign(href);
                    return;
                  }
                  if (window.innerWidth >= 1024 && document.body.dataset.projectPanelOpen === "true") {
                    event.preventDefault();
                    router.replace(href, { scroll: false });
                  }
                }}
                onFocus={(event: FocusEvent<HTMLElement>) => showPreview(index, event.currentTarget)}
                onPointerEnter={(event: PointerEvent<HTMLElement>) => showPreview(index, event.currentTarget)}
                onPointerMove={handlePointerMove}
                className={cn(
                  "group -mx-3 block rounded-xl px-3 py-3 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
                  !canOpenCaseStudy && "cursor-default",
                  isActive
                    ? "bg-zinc-100/80 dark:bg-zinc-900/80"
                    : "hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70",
                )}
              >
                <div className="mb-3 overflow-hidden rounded-lg border border-zinc-200/70 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={640}
                      height={420}
                      className="aspect-video w-full object-cover object-top"
                      sizes="100vw"
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                      {noImageText}
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h4
                        className={cn(
                          "text-base font-semibold text-zinc-900 transition-colors group-hover:text-orange-500 dark:text-zinc-50",
                          isSelected && "text-orange-500 dark:text-orange-400",
                        )}
                      >
                        {project.title}
                      </h4>
                      {!compact && metaItems.length > 0 && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {metaItems.join(" · ")}
                        </span>
                      )}
                      {!canOpenCaseStudy && project.status && (
                        <span className="text-xs text-orange-500 dark:text-orange-400">
                          {project.status}
                        </span>
                      )}
                    </div>

                    {project.impactHighlight && (
                      <p
                        className={cn(
                          "text-sm leading-relaxed",
                          compact
                            ? "text-zinc-600 dark:text-zinc-300"
                            : "font-medium text-zinc-900 dark:text-zinc-100",
                        )}
                      >
                        {project.impactHighlight}
                      </p>
                    )}

                    {!compact && summary && (
                      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {summary}
                      </p>
                    )}

                    {!compact && project.proof && (
                      <p className="border-l border-orange-500/70 pl-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {project.proof}
                      </p>
                    )}

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.slice(0, compact ? 2 : 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {canOpenCaseStudy && (
                    <ArrowUpRight
                      className={cn(
                        "mt-1 hidden h-4 w-4 shrink-0 text-zinc-400 transition-all duration-200 sm:block",
                        isActive && "translate-x-0.5 -translate-y-0.5 text-orange-500",
                      )}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </ProjectRow>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        data-project-hover-preview
        className="pointer-events-none fixed z-20 hidden -translate-y-1/2 xl:block"
        style={{
          top: springPreviewTop,
          left: previewLeft,
          width: previewSize.width,
        }}
      >
        <div className="relative" style={{ height: previewSize.height }}>
          <AnimatePresence mode="wait">
            {isPreviewVisible && activeProject && (
              <motion.div
                key={activeProject.slug || activeProject.title}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 14, scale: 0.97, filter: "blur(16px)" }
                }
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 10,
                        scale: 0.985,
                        filter: "blur(12px)",
                        transition: PREVIEW_EXIT_TRANSITION,
                      }
                }
                transition={prefersReducedMotion ? { duration: 0 } : PREVIEW_ENTER_TRANSITION}
                className="absolute inset-0"
              >
                <motion.div
                  className="overflow-hidden rounded-xl border border-zinc-200/70 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                  style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ width: previewSize.width, height: previewSize.height }}
                  >
                    {activeProject.image ? (
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        width={previewSize.width}
                        height={previewSize.height}
                        className="h-full w-full object-contain"
                        sizes={`${PREVIEW_MAX_WIDTH}px`}
                        onLoad={handlePreviewImageLoad}
                        priority={activeIndex === firstPreviewIndex}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                        {noImageText}
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-zinc-950/[0.03] dark:bg-zinc-50/[0.04]" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
