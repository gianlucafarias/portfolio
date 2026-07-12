"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Locale, Messages } from "@/lib/i18n";
import type { Project } from "@/lib/projects-sheet";
import { cn } from "@/lib/utils";

interface CaseStudyLabels {
  backToProjects?: string;
  viewProject?: string;
  viewCode?: string;
  overview?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  process?: string;
  results?: string;
  technologies?: string;
  myRole?: string;
  technicalArchitecture?: string;
  impact?: string;
  majorChallenge?: string;
  currentUsage?: string;
  keyLearnings?: string;
  migrationStrategy?: string;
}

interface ProjectsMessages {
  caseStudy?: CaseStudyLabels;
}

interface CaseStudyPageProps {
  project: Project;
  locale: Locale;
  messages: Messages;
  layout?: "page" | "panel";
}

interface CtaLinksProps {
  project: Project;
  labels: CaseStudyLabels;
  layout: "page" | "panel";
}

const VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function CaseStudyPage({ project, locale, messages, layout = "page" }: CaseStudyPageProps) {
  const isEnglish = locale === "en";
  const projectsMessages = messages?.projects as ProjectsMessages | undefined;
  const labels = projectsMessages?.caseStudy || {};
  const base = isEnglish ? "/en/projects" : "/projects";
  const isPanel = layout === "panel";
  const metadataItems = [
    project.caseStudy?.role,
    project.caseStudy?.year,
    project.status,
    project.type,
  ].filter(Boolean);
  const snapshotItems = [
    project.impactHighlight && {
      label: isEnglish ? "Impact" : "Impacto",
      value: project.impactHighlight,
    },
    project.proof && {
      label: isEnglish ? "Proof" : "Evidencia",
      value: project.proof,
    },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const sectionTitleClass = cn(
    "mb-3 font-medium text-zinc-900 dark:text-zinc-50",
    isPanel
      ? "text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
      : "text-xl",
  );

  const CtaLinks = ({ project, labels, layout }: CtaLinksProps) => {
    if (!project.link && !project.github) return null;
    const isPanelLayout = layout === "panel";
    return (
    <div className={cn("flex gap-4", isPanelLayout ? "flex-wrap" : "flex-col sm:flex-row lg:flex-col")}>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm font-medium transition-colors",
            isPanelLayout
              ? "text-zinc-600 underline decoration-zinc-300 underline-offset-4 hover:text-orange-500 dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:text-orange-400"
              : "rounded-xl bg-zinc-900 px-5 py-2.5 text-center text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
          )}
        >
          {labels.viewProject || "Ver Proyecto"}{isPanelLayout && " ↗"}
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors",
            isPanelLayout
              ? "text-zinc-600 underline decoration-zinc-300 underline-offset-4 hover:text-orange-500 dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:text-orange-400"
              : "justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50",
          )}
        >
          {!isPanelLayout && <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>}
          {labels.viewCode || "Ver Código"}{isPanelLayout && " ↗"}
        </a>
      )}
    </div>
  );
  };

  return (
    <motion.article
      className={cn(
        "space-y-8",
        layout === "page" && "lg:grid lg:grid-cols-[minmax(200px,280px)_1fr] lg:items-start lg:gap-12 lg:space-y-0",
      )}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <div className={cn("space-y-6", layout === "page" && "lg:sticky lg:top-24")}>
        <motion.header className="space-y-2" variants={VARIANTS} transition={{ duration: 0.3 }}>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {project.title}
          </h1>
          {metadataItems.length > 0 && (
            <p className="text-zinc-500 dark:text-zinc-400">
              {metadataItems.join(" · ")}
            </p>
          )}
        </motion.header>
        {project.image && !isPanel && (
          <motion.figure
            className="overflow-hidden rounded-2xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50"
            variants={VARIANTS}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={640}
              height={360}
              className="aspect-video w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.figure>
        )}
        <motion.div variants={VARIANTS} transition={{ duration: 0.3 }}>
          <CtaLinks project={project} labels={labels} layout={layout} />
        </motion.div>
        {snapshotItems.length > 0 && (
          <motion.dl
            className={cn(
              isPanel ? "space-y-2" : "space-y-3 rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-4 dark:border-zinc-800/70 dark:bg-zinc-950/30",
            )}
            variants={VARIANTS}
            transition={{ duration: 0.3 }}
          >
            {snapshotItems.map((item) => (
              <div key={item.label} className={cn(isPanel ? "flex gap-3" : "space-y-1")}>
                <dt className={cn("text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400", isPanel && "sr-only")}>
                  {item.label}
                </dt>
                {isPanel && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden="true" />}
                <dd className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {item.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
        {layout === "page" && (
          <Link
            href={base}
            className="inline-flex text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {labels.backToProjects || "← Volver a proyectos"}
          </Link>
        )}
      </div>

      <div className={cn("pt-2", isPanel ? "space-y-8" : "space-y-12")}>
        <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
          <h2 className={sectionTitleClass}>
            {labels.overview || "Overview"}
          </h2>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.recruiterSummary || project.description}
          </p>
        </motion.section>

        {project.caseStudy && (
          <div className={isPanel ? "space-y-8" : "space-y-12"}>
            {project.caseStudy.challenge && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.challenge}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.challenge}
                </p>
              </motion.section>
            )}

            {project.caseStudy.solution && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.solution}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.solution}
                </p>
              </motion.section>
            )}

            {project.caseStudy.process && project.caseStudy.process.length > 0 && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.process}
                </h2>
                <ol className="space-y-3">
                  {project.caseStudy.process.map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-zinc-600 dark:text-zinc-400"
                    >
                      <span className={cn(
                        "shrink-0 text-xs font-medium text-zinc-500 dark:text-zinc-400",
                        !isPanel && "flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
                      )}>
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.section>
            )}

            {project.caseStudy.results && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.results}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.results}
                </p>
              </motion.section>
            )}

            {project.caseStudy.myRole && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.myRole}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.myRole}
                </p>
              </motion.section>
            )}

            {project.caseStudy.technicalArchitecture && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.technicalArchitecture}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                  {project.caseStudy.technicalArchitecture}
                </p>
              </motion.section>
            )}

            {project.caseStudy.migrationStrategy && project.caseStudy.migrationStrategy.length > 0 && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.migrationStrategy}
                </h2>
                <ol className="space-y-3">
                  {project.caseStudy.migrationStrategy.map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-zinc-600 dark:text-zinc-400"
                    >
                      <span className={cn(
                        "shrink-0 text-xs font-medium text-zinc-500 dark:text-zinc-400",
                        !isPanel && "flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
                      )}>
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.section>
            )}

            {project.caseStudy.impact && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.impact}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                  {project.caseStudy.impact}
                </p>
              </motion.section>
            )}

            {project.caseStudy.majorChallenge && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.majorChallenge}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.majorChallenge}
                </p>
              </motion.section>
            )}

            {project.caseStudy.currentUsage && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.currentUsage}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                  {project.caseStudy.currentUsage}
                </p>
              </motion.section>
            )}

            {project.caseStudy.keyLearnings && project.caseStudy.keyLearnings.length > 0 && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className={sectionTitleClass}>
                  {labels.keyLearnings}
                </h2>
                <ul className="space-y-2">
                  {project.caseStudy.keyLearnings.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}
          </div>
        )}

        {project.tags && project.tags.length > 0 && (
          <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
            <h2 className={sectionTitleClass}>
              {labels.technologies}
            </h2>
            {isPanel ? (
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.tags.join(" · ")}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </div>
    </motion.article>
  );
}
