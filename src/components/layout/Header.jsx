"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const { messages, isEnglish } = useLanguage();
  const roleText =
    messages?.profile?.role ||
    (isEnglish
      ? "University Programming Technician - Full Stack Developer"
      : "Técnico Universitario en Programación - Full Stack Developer");

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link
          href={isEnglish ? "/en" : "/"}
          className="text-lg font-medium text-black dark:text-white"
        >
          {messages?.profile?.name || "Gianluca Palmier"}
        </Link>
        <motion.p
          key={isEnglish ? "en" : "es"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-zinc-600 dark:text-zinc-500"
        >
          {roleText}
        </motion.p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link
            href={isEnglish ? "/en#about" : "/#about"}
            className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {messages?.nav?.about || "Sobre mí"}
          </Link>
          <Link
            href={isEnglish ? "/en/projects" : "/projects"}
            className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {messages?.nav?.projects || "Proyectos"}
          </Link>
          <Link
            href={isEnglish ? "/en#experience" : "/#experience"}
            className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {messages?.nav?.experience || "Experiencia"}
          </Link>
          <Link
            href={isEnglish ? "/en/contact" : "/contact"}
            className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {messages?.nav?.contact || "Contacto"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
