"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const { messages, isEnglish } = useLanguage();
  const pathname = usePathname();
  
  const profileMessages = messages?.profile as { name?: string; role?: string } | undefined;
  const navMessages = messages?.nav as { about?: string; projects?: string; experience?: string; contact?: string } | undefined;

  const safePathname = pathname ?? "/";
  const normalizedPath = safePathname === "/" ? "/" : safePathname.replace(/\/$/, "");
  const isProjects = normalizedPath.startsWith("/projects") || normalizedPath.startsWith("/en/projects");
  const isContact = normalizedPath.startsWith("/contact") || normalizedPath.startsWith("/en/contact");

  const navLinkBase = "text-zinc-500 transition-colors dark:text-zinc-300";
  const navLinkHover = "hover:text-orange-500 dark:hover:text-orange-400";
  const navLinkActive = "text-orange-500 dark:text-orange-400";

  const isActiveAbout = false;
  const isActiveProjects = isProjects;
  const isActiveExperience = false;
  const isActiveContact = isContact;
  
  const roleText =
    profileMessages?.role ||
    (isEnglish
      ? "University Programming Technician - Full Stack Developer"
      : "Técnico Universitario en Programación - Full Stack Developer");

  return (
    <motion.header
      className="mb-8 flex items-center justify-between"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div>
        <Link
          href={isEnglish ? "/en" : "/"}
          className="text-lg font-medium text-black dark:text-white"
        >
          {profileMessages?.name || "Gianluca Palmier"}
        </Link>
        <motion.p
          key={isEnglish ? "en" : "es"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-zinc-600 dark:text-zinc-300"
        >
          {roleText}
        </motion.p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link
            href={isEnglish ? "/en#about" : "/#about"}
            className={`${navLinkBase} ${isActiveAbout ? navLinkActive : navLinkHover}`}
            aria-current={isActiveAbout ? "page" : undefined}
          >
            {navMessages?.about || "Sobre mí"}
          </Link>
          <Link
            href={isEnglish ? "/en/projects" : "/projects"}
            className={`${navLinkBase} ${isActiveProjects ? navLinkActive : navLinkHover}`}
            aria-current={isActiveProjects ? "page" : undefined}
          >
            {navMessages?.projects || "Proyectos"}
          </Link>
          <Link
            href={isEnglish ? "/en#experience" : "/#experience"}
            className={`${navLinkBase} ${isActiveExperience ? navLinkActive : navLinkHover}`}
            aria-current={isActiveExperience ? "page" : undefined}
          >
            {navMessages?.experience || "Experiencia"}
          </Link>
          <Link
            href={isEnglish ? "/en/contact" : "/contact"}
            className={`${navLinkBase} ${isActiveContact ? navLinkActive : navLinkHover}`}
            aria-current={isActiveContact ? "page" : undefined}
          >
            {navMessages?.contact || "Contacto"}
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
