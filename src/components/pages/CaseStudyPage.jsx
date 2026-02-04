"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { notFound } from "next/navigation";

const VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function CaseStudyPage({ slug }) {
  const { messages, isEnglish } = useLanguage();

  if (!messages?.projects) return null;

  const pinProjects = messages.projects.pinProjects || [];
  const otherProjects = messages.projects.otherProjects || [];
  const allProjects = [...pinProjects, ...otherProjects];
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  const labels = messages.projects.caseStudy || {};
  const base = isEnglish ? "/en/projects" : "/projects";

  const CtaLinks = ({ project, labels }) => (
    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl bg-zinc-900 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {labels.viewProject || "Ver Proyecto"}
      </a>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          {labels.viewCode || "Ver Código"}
        </a>
      )}
    </div>
  );

  return (
    <motion.article
      className="space-y-8 lg:grid lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-16 lg:space-y-0 lg:items-start"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <div className="space-y-6 lg:sticky lg:top-24">
        <Link
          href={base}
          className="inline-flex text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          {labels.backToProjects || "← Volver a proyectos"}
        </Link>
        <motion.header className="space-y-2" variants={VARIANTS} transition={{ duration: 0.3 }}>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {project.title}
          </h1>
          {project.caseStudy?.role && (
            <p className="text-zinc-500 dark:text-zinc-400">
              {labels.role}: {project.caseStudy.role}
            </p>
          )}
        </motion.header>
        {project.image && (
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
          <CtaLinks project={project} labels={labels} />
        </motion.div>
      </div>

      <div className="space-y-12 pt-2">
        <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
          <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
            {labels.overview || "Overview"}
          </h2>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
        </motion.section>

        {project.caseStudy && (
          <div className="space-y-12">
            {project.caseStudy.challenge && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  {labels.challenge}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.challenge}
                </p>
              </motion.section>
            )}

            {project.caseStudy.solution && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  {labels.solution}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.solution}
                </p>
              </motion.section>
            )}

            {project.caseStudy.process?.length > 0 && (
              <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
                <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  {labels.process}
                </h2>
                <ol className="space-y-3">
                  {project.caseStudy.process.map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
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
                <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  {labels.results}
                </h2>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.results}
                </p>
              </motion.section>
            )}
          </div>
        )}

        {project.tags?.length > 0 && (
          <motion.section variants={VARIANTS} transition={{ duration: 0.3 }}>
            <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
              {labels.technologies}
            </h2>
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
          </motion.section>
        )}
      </div>
    </motion.article>
  );
}
