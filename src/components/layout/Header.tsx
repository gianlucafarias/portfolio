"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const { messages, isEnglish } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  
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

  const handleLanguageChange = () => {
    if (!pathname) return;
    if (isEnglish) {
      const nextPath = pathname.replace(/^\/en/, "");
      router.push(nextPath === "" ? "/" : nextPath);
    } else {
      const nextPath = pathname === "/" ? "/en" : `/en${pathname}`;
      router.push(nextPath);
    }
  };

  return (
    <motion.header
      className="mb-8 flex items-start justify-between gap-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="min-w-0">
        <Link
          href={isEnglish ? "/en" : "/"}
          className="relative inline-flex items-baseline text-lg font-medium text-black dark:text-white"
        >
          <span>{profileMessages?.name || "Gianluca Palmier"}</span>
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
      <button
        onClick={handleLanguageChange}
        className="mt-1 flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 transition-colors hover:border-orange-500 hover:text-orange-500 active:translate-y-px dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-orange-400 dark:hover:text-orange-400"
        aria-label={isEnglish ? "Switch language to Spanish" : "Cambiar idioma a inglés"}
      >
        <Languages className="h-4 w-4" />
        <span>{isEnglish ? "ES" : "EN"}</span>
      </button>
    </motion.header>
  );
}
