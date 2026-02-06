"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { Magnetic } from "@/components/ui/magnetic";
import { useLanguage } from "@/contexts/LanguageContext";
import { socials } from "@/data/constants";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import { Languages } from "lucide-react";
import type { Project } from "@/lib/projects-sheet";

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
  emailText?: string;
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

interface HomePageClientProps {
  pinProjectsEs: Project[];
  pinProjectsEn: Project[];
}

const SKILLS = [
  { label: "HTML", icon: "/html.svg" },
  { label: "CSS", icon: "/css.svg" },
  { label: "JavaScript", icon: "/js.svg" },
  { label: "React", icon: "/react.svg" },
  { label: "Next.js", icon: "/nextjs.svg" },
  { label: "Node.js", icon: "/node-js.svg" },
  { label: "PostgreSQL", icon: "/postgresql.svg" },
  { label: "Tailwind", icon: "/tailwind.svg" },
  { label: "Angular", icon: "/angular.svg" },
  { label: "Vercel", icon: "/vercel.svg" },
];

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
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const TRANSITION_SECTION = {
  duration: 0.3,
};

const MONTH_ABBR_ES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const MONTH_ABBR_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDateMonthYear(
  dateStr: string | undefined,
  isEnglish = false,
): string | undefined {
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
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
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

export default function HomePageClient({
  pinProjectsEs,
  pinProjectsEn,
}: HomePageClientProps) {
  const { messages, changeLanguage, isEnglish } = useLanguage();

  const profileMessages = messages?.profile as ProfileMessages | undefined;
  const navMessages = messages?.nav as NavMessages | undefined;
  const sectionsMessages = messages?.sections as SectionsMessages | undefined;
  const experience = (messages?.experience || []) as ExperienceItem[];
  const education = (messages?.education || []) as EducationItem[];

  const projectsToShow = (
    isEnglish ? pinProjectsEn : pinProjectsEs
  ).slice(0, 4);
  const basePath = isEnglish ? "/en/projects" : "/projects";
  const email = profileMessages?.email || "palmiergianluca@gmail.com";
  const about = profileMessages?.about || "";

  const socialLinks = [
    { label: "Github", link: socials.github },
    { label: "Twitter", link: socials.twitter },
    { label: "LinkedIn", link: socials.linkedin },
    { label: "Instagram", link: socials.instagram },
  ];

  return (
    <motion.main
      className="space-y-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* Intro / About */}
      <motion.section
        id="about"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-zinc-600 dark:text-zinc-400">{about}</p>
          </div>
          <button
            onClick={() => changeLanguage(isEnglish ? "es" : "en")}
            className="ml-4 flex shrink-0 items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            aria-label="Cambiar idioma"
          >
            <Languages className="h-4 w-4" />
            <span>{isEnglish ? "ES" : "EN"}</span>
          </button>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        id="skills"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">
          {isEnglish ? "Skills" : "Habilidades"}
        </h3>
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <div
              key={skill.label}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
            >
              <Image
                src={skill.icon}
                alt={skill.label}
                width={16}
                height={16}
                className="h-4 w-4 opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-70 dark:brightness-0 dark:invert dark:group-hover:brightness-100"
              />
              <span>{skill.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Selected Projects */}
      <motion.section
        id="projects"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {navMessages?.projects || "Proyectos"}
          </h3>
          <Link
            href={basePath}
            className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {sectionsMessages?.viewAll || "Ver todos"}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projectsToShow.map((project) => (
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
                    (project.description?.slice(0, 100) + "...")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section
        id="experience"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">
          {navMessages?.experience || "Experiencia"}
        </h3>
        <div className="space-y-6">
          {experience.map((item) => (
            <div key={`${item.title}-${item.date}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </p>
                {item.date && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDateMonthYear(item.date, isEnglish)}
                  </p>
                )}
              </div>
              {item.company && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.company}
                </p>
              )}
              {item.description && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        id="education"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">
          {sectionsMessages?.education || "Educacion & Certificaciones"}
        </h3>
        <div className="space-y-6">
          {education.map((item) => (
            <div key={`${item.title}-${item.date}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </p>
                {item.date && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDateMonthYear(item.date, isEnglish)}
                  </p>
                )}
              </div>
              {item.institution && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.institution}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">
          {navMessages?.contact || "Contacto"}
        </h3>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {profileMessages?.projectInvitation || "¿Tenés un proyecto en mente? enviame un"}{" "}
          <a
            className="underline dark:text-zinc-300"
            href={`mailto:${email}`}
          >
            {email}
          </a>
          {" "}{profileMessages?.responseText || "y te respondo al toque."}
        </p>
        <div className="mb-8 rounded-2xl border border-zinc-200/50 bg-zinc-50/40 p-6 ring-1 ring-zinc-200/50 ring-inset dark:border-zinc-800/50 dark:bg-zinc-950/40 dark:ring-zinc-800/50">
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
            className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            {sectionsMessages?.downloadCV || "Descargar CV"}
          </Link>
        </div>
      </motion.section>
    </motion.main>
  );
}
