"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { Magnetic } from "@/components/ui/magnetic";
import { socials } from "@/data/constants";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale, Messages } from "@/lib/i18n";

interface Project {
  title: string;
  slug?: string;
  image?: string;
  description?: string;
  shortDescription?: string;
}

interface ExperienceItem {
  title: string;
  company?: string;
  date?: string;
  description?: string;
}

interface EducationItem {
  title: string;
  institution?: string;
  date?: string;
}

interface ProfileMessages {
  name?: string;
  role?: string;
  email?: string;
  about?: string;
  projectInvitation?: string;
  responseText?: string;
}

interface NavMessages {
  about?: string;
  projects?: string;
  experience?: string;
  contact?: string;
}

interface SectionsMessages {
  viewAll?: string;
  education?: string;
  downloadCV?: string;
}

interface ProjectsMessages {
  pinProjects?: Project[];
}

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const TRANSITION_SECTION = {
  duration: 0.3,
};

const MONTH_ABBR_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const MONTH_ABBR_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateMonthYear(dateStr: string | undefined, isEnglish = false): string | undefined {
  if (!dateStr) return dateStr;
  const months = isEnglish ? MONTH_ABBR_EN : MONTH_ABBR_ES;
  return dateStr
    .split(" - ")
    .map((part) => {
      const p = part.trim().split("/");
      if (p.length >= 3) {
        const monthIdx = parseInt(p[1], 10) - 1;
        const month = months[monthIdx] || p[1];
        return `${month} ${p[2]}`;
      }
      return part;
    })
    .join(" - ");
}

interface MagneticSocialLinkProps {
  children: ReactNode;
  link: string;
}

function MagneticSocialLink({ children, link }: MagneticSocialLinkProps) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full border border-zinc-200/70 px-2.5 py-1 text-sm text-zinc-700 transition-colors duration-200 hover:border-orange-500 hover:text-orange-500 dark:border-zinc-700/60 dark:text-zinc-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </Magnetic>
  );
}

interface HomePageClientProps {
  locale: Locale;
  messages: Messages;
}

export default function HomePageClient({ locale, messages }: HomePageClientProps) {
  const isEnglish = locale === "en";
  const router = useRouter();
  const pathname = usePathname();

  const profileMessages = messages?.profile as ProfileMessages | undefined;
  const navMessages = messages?.nav as NavMessages | undefined;
  const sectionsMessages = messages?.sections as SectionsMessages | undefined;
  const projectsMessages = messages?.projects as ProjectsMessages | undefined;
  const experience = (messages?.experience || []) as ExperienceItem[];
  const education = (messages?.education || []) as EducationItem[];

  const projectsToShow = projectsMessages?.pinProjects?.slice(0, 4) || [];
  const basePath = isEnglish ? "/en/projects" : "/projects";
  const email = profileMessages?.email || "palmiergianluca@gmail.com";
  const about = profileMessages?.about || "";

  const socialLinks = [
    { label: "Github", link: socials.github },
    { label: "Twitter", link: socials.twitter },
    { label: "LinkedIn", link: socials.linkedin },
    { label: "Instagram", link: socials.instagram },
  ];

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
    <motion.main
      className="space-y-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        id="about"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {about}
            </p>
          </div>
          <button
            onClick={handleLanguageChange}
            className="ml-4 flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 transition-colors hover:border-orange-500 hover:text-orange-500 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-orange-400 dark:hover:text-orange-400"
            aria-label="Cambiar idioma"
          >
            <Languages className="h-4 w-4" />
            <span>{isEnglish ? "ES" : "EN"}</span>
          </button>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-xl font-medium">
          {navMessages?.projects || "Proyectos"}
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projectsToShow.map((project) => (
            <div key={project.title} className="space-y-2">
              <Link
                href={project.slug ? `${basePath}/${project.slug}` : basePath}
                className="relative block rounded-2xl border border-zinc-200/50 bg-zinc-50/30 p-1 transition-opacity hover:opacity-90 dark:border-zinc-800/50 dark:bg-zinc-950/30"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={640}
                      height={360}
                      className="aspect-video w-full object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex aspect-video w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
                      <span className="text-zinc-500">Sin imagen</span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-zinc-900/[0.04] dark:bg-zinc-50/[0.04]" />
                </div>
              </Link>
              <div className="px-1">
                <Link
                  href={project.slug ? `${basePath}/${project.slug}` : basePath}
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                >
                  {project.title}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-orange-500/80 transition-all duration-200 group-hover:max-w-full dark:bg-orange-400/80" />
                </Link>
                <p className="text-base text-zinc-600 dark:text-zinc-300">
                  {project.shortDescription || (project.description?.slice(0, 100) + "...")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link
          href={basePath}
          className="mt-4 inline-block text-sm text-zinc-600 underline decoration-orange-500/70 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          {sectionsMessages?.viewAll || "Ver todos"}
        </Link>
      </motion.section>

      <motion.section
        id="experience"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-6 text-xl font-medium">
          {navMessages?.experience || "Experiencia"}
        </h3>
        <div className="flex flex-col gap-8">
          {experience.map((job, i) => (
            <div key={`${job.title}-${i}`} className="space-y-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {job.title}
                  {job.company && (
                    <span className="text-zinc-500 dark:text-zinc-300">
                      {" "}· {job.company}
                    </span>
                  )}
                </h4>
                <span className="shrink-0 text-sm text-zinc-500 dark:text-zinc-300">
                  {formatDateMonthYear(job.date, isEnglish)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-6 text-xl font-medium">
          {sectionsMessages?.education || "Educación"}
        </h3>
        <div className="flex flex-col gap-8">
          {education.map((item) => (
            <div key={item.title} className="space-y-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {item.title}
                  {item.institution && (
                    <span className="text-zinc-500 dark:text-zinc-300">
                      {" "}· {item.institution}
                    </span>
                  )}
                </h4>
                <span className="shrink-0 text-sm text-zinc-500 dark:text-zinc-300">
                  {formatDateMonthYear(item.date, isEnglish)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-xl font-medium">
          {navMessages?.contact || "Contacto"}
        </h3>
        <p className="mb-4 text-base text-zinc-600 dark:text-zinc-300">
          {profileMessages?.projectInvitation || "¿Tenés un proyecto en mente? Envíame un"}{" "}
          <a
            className="underline decoration-orange-500/70 underline-offset-4 dark:text-zinc-200"
            href={`mailto:${email}`}
          >
            {email}
          </a>
          {" "}{profileMessages?.responseText || "y te respondo al toque."}
        </p>
        <div className="mb-8 rounded-2xl border border-zinc-200/50 p-6 dark:border-zinc-800/50">
          <ContactForm />
        </div>

        <div className="flex flex-wrap items-center justify-start gap-3">
          {socialLinks.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
          <Link
            href="/CV_Gianluca-Palmier.pdf"
            target="_blank"
            className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full border border-zinc-200/70 px-2.5 py-1 text-sm text-zinc-700 transition-colors duration-200 hover:border-orange-500 hover:text-orange-500 dark:border-zinc-700/60 dark:text-zinc-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
          >
            {sectionsMessages?.downloadCV || "Descargar CV"}
          </Link>
        </div>
      </motion.section>
    </motion.main>
  );
}
