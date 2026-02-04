"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectSkeleton from "@/components/ui/ProjectSkeleton";
import Image from "next/image";
import Link from "next/link";

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const TRANSITION_SECTION = { duration: 0.3 };

export default function ProjectsPage() {
  const { messages, isEnglish } = useLanguage();

  const pinProjects = messages?.projects?.pinProjects || [];
  const otherProjects = messages?.projects?.otherProjects || [];
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
    <>
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
            <h3 className="text-lg font-medium">
              {isEnglish ? "All Projects" : "Todos los proyectos"}
            </h3>
            <Link
              href={isEnglish ? "/en" : "/"}
              className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← {isEnglish ? "Home" : "Inicio"}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {allProjects.map((project) => (
              <div key={project.title} className="space-y-2">
                <Link
                  href={project.slug ? `${basePath}/${project.slug}` : basePath}
                  className="relative block rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset transition-opacity hover:opacity-90 dark:bg-zinc-950/40 dark:ring-zinc-800/50"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-xl">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={640}
                        height={360}
                        className="aspect-video w-full object-cover transition-transform hover:scale-105"
                      />
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
                        <span className="text-zinc-500">
                          {isEnglish ? "No image" : "Sin imagen"}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="px-1">
                  <Link
                    href={project.slug ? `${basePath}/${project.slug}` : basePath}
                    className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  >
                    {project.title}
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50" />
                  </Link>
                  <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {project.shortDescription ||
                      project.description?.slice(0, 100) + "..."}
                  </p>
                  {project.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </>
  );
}
