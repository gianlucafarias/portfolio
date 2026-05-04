"use client";

import { motion } from "motion/react";
import Link from "next/link";
import ProjectSkeleton from "@/components/ui/ProjectSkeleton";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Locale, Messages } from "@/lib/i18n";
import type { Project } from "@/lib/projects-sheet";

interface ProjectsPageClientProps {
  locale: Locale;
  messages: Messages;
  pinProjects: Project[];
  otherProjects: Project[];
}

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const TRANSITION_SECTION = { duration: 0.3 };

export default function ProjectsPageClient({ locale, messages, pinProjects, otherProjects }: ProjectsPageClientProps) {
  const isEnglish = locale === "en";
  const allProjects = [...pinProjects, ...otherProjects];
  const basePath = isEnglish ? "/en/projects" : "/projects";

  if (!messages) {
    return (
      <motion.main className="space-y-24">
        <div className="space-y-6">
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-medium">
            {isEnglish ? "All Projects" : "Todos los proyectos"}
          </h3>
          <Link
            href={isEnglish ? "/en" : "/"}
            className="text-sm text-zinc-600 underline decoration-orange-500/70 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            ← {isEnglish ? "Home" : "Inicio"}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {allProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              href={project.slug ? `${basePath}/${project.slug}` : basePath}
              noImageText={isEnglish ? "No image" : "Sin imagen"}
            />
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}
