"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageDropdown from "@/components/layout/LanguageDropdown";
import ProfileHoverName from "@/components/ui/ProfileHoverName";
import RotatingRoleTag from "@/components/ui/RotatingRoleTag";

const HEADER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const HEADER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 8, filter: "blur(2px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Header() {
  const { messages, isEnglish } = useLanguage();
  const pathname = usePathname();
  
  const profileMessages = messages?.profile as {
    name?: string;
    role?: string;
    roleTags?: string[];
  } | undefined;
  const navMessages = messages?.nav as { about?: string; projects?: string; experience?: string; contact?: string } | undefined;

  const safePathname = pathname ?? "/";
  const normalizedPath = safePathname === "/" ? "/" : safePathname.replace(/\/$/, "");
  const isProjects = normalizedPath.startsWith("/projects") || normalizedPath.startsWith("/en/projects");
  const isContact = normalizedPath.startsWith("/contact") || normalizedPath.startsWith("/en/contact");

  const navLinkBase = "inline-flex min-h-11 items-center text-zinc-500 transition-colors dark:text-zinc-300";
  const navLinkHover = "hover:text-accent-text";
  const navLinkActive = "text-accent-text";

  const isActiveAbout = false;
  const isActiveProjects = isProjects;
  const isActiveExperience = false;
  const isActiveContact = isContact;
  
  const roleTags =
    profileMessages?.roleTags?.filter(Boolean) ??
    [
      profileMessages?.role ||
        (isEnglish
          ? "University Programming Technician - Full Stack Developer"
          : "Técnico Universitario en Programación - Full Stack Developer"),
    ];

  const displayName = profileMessages?.name || "Gianluca Palmier";

  return (
    <motion.header
      className="mb-8 flex items-start justify-between gap-4"
      initial="hidden"
      animate="visible"
      variants={HEADER_VARIANTS}
    >
      <div className="min-w-0">
        <motion.div variants={HEADER_ITEM_VARIANTS} transition={{ duration: 0.25 }}>
          <Link
            href={isEnglish ? "/en" : "/"}
            className="relative inline-flex min-h-11 items-center font-display text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            <ProfileHoverName imageAlt={displayName}>
              {displayName}
            </ProfileHoverName>
          </Link>
        </motion.div>
        <motion.div variants={HEADER_ITEM_VARIANTS} transition={{ duration: 0.25 }}>
          <RotatingRoleTag key={isEnglish ? "en" : "es"} tags={roleTags} />
        </motion.div>
        <motion.nav
          className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm"
          variants={HEADER_ITEM_VARIANTS}
          transition={{ duration: 0.25 }}
        >
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
        </motion.nav>
      </div>
      <motion.div
        className="shrink-0"
        variants={HEADER_ITEM_VARIANTS}
        transition={{ duration: 0.25 }}
      >
        <LanguageDropdown />
      </motion.div>
    </motion.header>
  );
}
