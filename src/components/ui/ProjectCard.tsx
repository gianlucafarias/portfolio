"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects-sheet";

interface ProjectCardProps {
  project: Project;
  href: string;
  compact?: boolean;
  noImageText: string;
}

export default function ProjectCard({
  project,
  href,
  compact = false,
  noImageText,
}: ProjectCardProps) {
  const summary =
    project.recruiterSummary ||
    project.shortDescription ||
    (project.description ? `${project.description.slice(0, 120)}...` : undefined);
  const metaItems = [project.type].filter(Boolean);

  return (
    <article className="group space-y-3">
      <Link
        href={href}
        className="relative block overflow-hidden rounded-xl border border-zinc-200/70 bg-zinc-50/40 p-1 transition-colors hover:border-zinc-300 dark:border-zinc-800/70 dark:bg-zinc-950/30 dark:hover:border-zinc-700"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={640}
              height={360}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
              <span className="text-zinc-500">{noImageText}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-zinc-900/[0.04] dark:bg-zinc-50/[0.04]" />
          {project.status && (
            <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/85 dark:text-zinc-100">
              {project.status}
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-2 px-1">
        {metaItems.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            {metaItems.map((item) => (
              <span key={item} className="rounded-full border border-zinc-200 px-2 py-0.5 dark:border-zinc-800">
                {item}
              </span>
            ))}
          </div>
        )}

        <Link
          href={href}
          className="font-base inline-block font-[500] text-zinc-950 transition-colors hover:text-[#ff6200] dark:text-zinc-50 dark:hover:text-[#ff6200]"
        >
          {project.title}
        </Link>

        {project.impactHighlight && (
          <p className="text-sm font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
            {project.impactHighlight}
          </p>
        )}

        {summary && (
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {summary}
          </p>
        )}

        {!compact && project.proof && (
          <p className="border-l border-orange-500/70 pl-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {project.proof}
          </p>
        )}

        {!compact && project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
