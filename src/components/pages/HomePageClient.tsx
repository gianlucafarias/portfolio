"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { Magnetic } from "@/components/ui/magnetic";
import { socials } from "@/data/constants";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import ProjectHoverList from "@/components/ui/ProjectHoverList";
import type { Locale, Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";
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

const SKILLS = [
  { label: "TypeScript", icon: "/ts.svg" },
  { label: "React", icon: "/react.svg" },
  { label: "Next.js", icon: "/nextjs.svg" },
  { label: "Node.js", icon: "/node-js.svg" },
  { label: "NestJS", icon: "/nestjs.svg"},
  { label: "Astro", icon: "/Astro.svg"},
  { label: "Angular", icon: "/angular.svg" },
  { label: "Tailwind", icon: "/tailwind.svg" },
  { label: "PostgreSQL", icon: "/postgresql.svg" },
  { label: "AWS", icon: "/AWS.svg"},
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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const TRANSITION_SECTION = {
  duration: 0.3,
};

const MONTH_ABBR_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const MONTH_ABBR_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const HOVER_PILLS_QUERY = "(min-width: 1280px) and (hover: hover) and (pointer: fine)";

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
    .join("–");
}

interface MagneticSocialLinkProps {
  children: ReactNode;
  link: string;
}

interface HoverPillWordProps {
  children: ReactNode;
  pills: string[];
}

interface HoverPillPlacement {
  label: string;
  left: number;
  top: number;
  originX: number;
  originY: number;
  rotate: number;
}

function getHoverPillPlacements(
  wordRect: DOMRect,
  layoutRect: DOMRect,
  pills: string[],
): HoverPillPlacement[] {
  if (window.innerWidth < 1280) {
    return [];
  }

  const wordCenterX = wordRect.left + wordRect.width / 2;
  const wordCenterY = wordRect.top + wordRect.height / 2;
  const originLeft = wordCenterX - 44;
  const originTop = wordCenterY - 14;
  const leftColumn = Math.max(24, layoutRect.left - 168);
  const rightColumn = Math.min(
    window.innerWidth - 24,
    layoutRect.right + 12,
  );

  return [
    { label: pills[0], left: leftColumn, top: wordCenterY - 46, rotate: -3 },
    { label: pills[1], left: leftColumn + 62, top: wordCenterY + 46, rotate: 2 },
    { label: pills[2], left: rightColumn, top: wordCenterY - 38, rotate: 2 },
    { label: pills[3], left: rightColumn + 36, top: wordCenterY + 54, rotate: -3 },
  ]
    .filter((pill) => pill.label)
    .map((pill) => ({
      ...pill,
      originX: originLeft - pill.left,
      originY: originTop - pill.top,
    }));
}

function HoverPillWord({ children, pills }: HoverPillWordProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [supportsHoverPills, setSupportsHoverPills] = useState(false);
  const [placements, setPlacements] = useState<HoverPillPlacement[]>([]);
  const wordRef = useRef<HTMLSpanElement>(null);

  const updatePlacements = useCallback(() => {
    const wordEl = wordRef.current;
    const layoutEl = wordEl?.closest("main");

    if (!wordEl || !layoutEl) {
      return [];
    }

    const nextPlacements = getHoverPillPlacements(
      wordEl.getBoundingClientRect(),
      layoutEl.getBoundingClientRect(),
      pills,
    );

    setPlacements(nextPlacements);
    return nextPlacements;
  }, [pills]);

  const showPills = useCallback(() => {
    if (!supportsHoverPills) return;
    const nextPlacements = updatePlacements();
    setIsActive(nextPlacements.length > 0);
  }, [supportsHoverPills, updatePlacements]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(HOVER_PILLS_QUERY);
    const syncSupport = () => {
      setSupportsHoverPills(media.matches);
      if (!media.matches) {
        setIsActive(false);
        setPlacements([]);
      }
    };

    syncSupport();
    media.addEventListener("change", syncSupport);
    return () => media.removeEventListener("change", syncSupport);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    window.addEventListener("resize", updatePlacements);
    window.addEventListener("scroll", updatePlacements, true);

    return () => {
      window.removeEventListener("resize", updatePlacements);
      window.removeEventListener("scroll", updatePlacements, true);
    };
  }, [isActive, updatePlacements]);

  return (
    <>
      <span
        ref={wordRef}
        data-hover-pill-trigger
        className="inline-block cursor-default text-zinc-800 underline decoration-accent-decoration/80 decoration-dotted decoration-[1.5px] underline-offset-4 outline-none transition-colors hover:text-zinc-950 focus-visible:text-zinc-950 dark:text-zinc-100 dark:hover:text-zinc-50 dark:focus-visible:text-zinc-50 xl:relative xl:after:absolute xl:after:left-1/2 xl:after:top-1/2 xl:after:h-10 xl:after:w-full xl:after:min-w-10 xl:after:-translate-x-1/2 xl:after:-translate-y-1/2 xl:after:content-['']"
        tabIndex={supportsHoverPills ? 0 : undefined}
        onFocus={supportsHoverPills ? showPills : undefined}
        onBlur={supportsHoverPills ? () => setIsActive(false) : undefined}
        onPointerEnter={supportsHoverPills ? showPills : undefined}
        onPointerMove={supportsHoverPills ? () => {
          if (!isActive) showPills();
        } : undefined}
        onPointerLeave={supportsHoverPills ? () => setIsActive(false) : undefined}
      >
        {children}
      </span>
      {isMounted &&
        createPortal(
          <AnimatePresence initial={false}>
            {isActive && placements.length > 0 && (
              <div className="pointer-events-none fixed inset-0 z-50">
                {placements.map((pill, index) => (
                  <motion.span
                    key={pill.label}
                    aria-hidden="true"
                    className={cn(
                      "fixed whitespace-nowrap rounded-full border border-zinc-200 bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:text-zinc-200",
                    )}
                    style={{ left: pill.left, top: pill.top }}
                    initial={{
                      opacity: 0,
                      x: pill.originX,
                      y: pill.originY,
                      scale: 0.72,
                      rotate: 0,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: pill.rotate,
                    }}
                    exit={{
                      opacity: 0,
                      x: 0,
                      y: 4,
                      scale: 0.96,
                      rotate: pill.rotate,
                      transition: {
                        duration: 0.15,
                        ease: [0.4, 0, 1, 1],
                      },
                    }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.34,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {pill.label}
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function AboutIntro({ isEnglish, fallback }: { isEnglish: boolean; fallback: string }) {
  if (isEnglish) {
    return (
      <p className="max-w-[68ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        I design, build, and maintain{" "}
        <HoverPillWord pills={["Web", "Mobile App", "Chatbots", "Backend solutions"]}>
          digital products
        </HoverPillWord>{" "}
        end to end: chatbots, web platforms, mobile apps, backends, and integrations. I work from problem definition and user flows to architecture, development, deployment, and{" "}
        <HoverPillWord pills={["APIs", "Reliability", "Deploy", "Scalability"]}>
          production
        </HoverPillWord>
        .
      </p>
    );
  }

  if (!fallback) {
    return null;
  }

  return (
    <p className="max-w-[68ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
      Diseño, desarrollo y mantengo{" "}
      <HoverPillWord pills={["Web", "Aplicaciones", "Chatbots", "Soluciones backend"]}>
        productos digitales
      </HoverPillWord>{" "}
      de punta a punta: chatbots, plataformas web, apps móviles, backends e integraciones. Trabajo desde la definición del problema y los flujos de usuario hasta arquitectura, desarrollo, despliegue y operación en{" "}
      <HoverPillWord pills={["Documentación", "Confiabilidad", "Despliegues", "Escalabilidad"]}>
        producción
      </HoverPillWord>
      .
    </p>
  );
}

function MagneticSocialLink({ children, link }: MagneticSocialLinkProps) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="control-surface group relative inline-flex shrink-0 items-center gap-[1px] rounded-full border border-transparent px-2.5 py-1 text-sm text-zinc-700 transition-[box-shadow,color,scale] duration-200 hover:text-accent-text active:scale-[0.96] dark:text-zinc-200"
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
  pinProjects: Project[];
}

export default function HomePageClient({ locale, messages, pinProjects }: HomePageClientProps) {
  const isEnglish = locale === "en";

  const profileMessages = messages?.profile as ProfileMessages | undefined;
  const navMessages = messages?.nav as NavMessages | undefined;
  const sectionsMessages = messages?.sections as SectionsMessages | undefined;
  const experience = (messages?.experience || []) as ExperienceItem[];
  const education = (messages?.education || []) as EducationItem[];

  const projectsToShow = pinProjects.slice(0, 5);
  const basePath = isEnglish ? "/en/projects" : "/projects";
  const email = profileMessages?.email || "palmiergianluca@gmail.com";
  const about = profileMessages?.about || "";
  const cvPdfHref = isEnglish ? "/CV_Gianluca_Palmier_en.pdf" : "/CV_Gianluca_Palmier.pdf";

  const socialLinks = [
    { label: "GitHub", link: socials.github },
    { label: "LinkedIn", link: socials.linkedin },
  ];

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
         <h1 className="mb-4 text-2xl font-semibold leading-[1.15] tracking-tight">
          {isEnglish ? "About me" : "Sobre mí"}
        </h1>
        <div className="space-y-5">
          <AboutIntro isEnglish={isEnglish} fallback={about} />
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {isEnglish ? "Find me on " : "Encontrame en "}
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-zinc-700 underline decoration-accent-decoration/70 underline-offset-4 transition-colors hover:text-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ui dark:text-zinc-200"
            >
              GitHub ↗
            </a>
            {", "}
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-zinc-700 underline decoration-accent-decoration/70 underline-offset-4 transition-colors hover:text-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ui dark:text-zinc-200"
            >
              LinkedIn ↗
            </a>
            {isEnglish ? " or email me at " : " o enviame un correo a "}
            <a
              href={`mailto:${email}`}
              className="rounded-sm text-zinc-700 underline decoration-accent-decoration/70 underline-offset-4 transition-colors hover:text-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ui dark:text-zinc-200"
            >
              {email}
            </a>
            .
          </p>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-medium leading-tight">
            {navMessages?.projects || "Proyectos"}
          </h2>
          <Link
            href={basePath}
            className="inline-flex min-h-11 items-center text-sm text-zinc-600 underline decoration-accent-decoration/70 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            {sectionsMessages?.viewAll || "Ver todos"}
          </Link>
        </div>
        <ProjectHoverList
          projects={projectsToShow}
          basePath={basePath}
          compact
          noImageText={isEnglish ? "No image" : "Sin imagen"}
        />
      </motion.section>

      <motion.section
        id="skills"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h2 className="mb-5 text-lg font-medium leading-tight">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map((skill) => (
            <div
              key={skill.label}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-2.5 py-1 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-50"
            >
              <Image
                src={skill.icon}
                alt={skill.label}
                width={16}
                height={16}
                className="h-4 w-4 opacity-70 brightness-0 transition-opacity group-hover:opacity-100 dark:brightness-0 dark:invert dark:group-hover:opacity-100"
              />
              <span>{skill.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="experience"
        className="scroll-mt-24"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h2 className="mb-6 text-lg font-medium leading-tight">
          {navMessages?.experience || "Experiencia"}
        </h2>
        <div className="flex flex-col gap-8">
          {experience.map((job, i) => (
            <div key={`${job.title}-${i}`} className="space-y-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {job.title}
                  {job.company && (
                    <span className="text-zinc-500 dark:text-zinc-300">
                      {" "}· {job.company}
                    </span>
                  )}
                </h3>
                <span className="shrink-0 text-sm tabular-nums text-zinc-500 dark:text-zinc-300">
                  {formatDateMonthYear(job.date, isEnglish)}
                </span>
              </div>
              <p className="text-sm leading-normal text-zinc-600 dark:text-zinc-300">
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
        <h2 className="mb-6 text-lg font-medium leading-tight">
          {sectionsMessages?.education || "Educación"}
        </h2>
        <div className="flex flex-col gap-8">
          {education.map((item) => (
            <div key={item.title} className="space-y-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {item.title}
                  {item.institution && (
                    <span className="text-zinc-500 dark:text-zinc-300">
                      {" "}· {item.institution}
                    </span>
                  )}
                </h3>
                <span className="shrink-0 text-sm tabular-nums text-zinc-500 dark:text-zinc-300">
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
        <h2 className="mb-5 text-lg font-medium leading-tight">
          {navMessages?.contact || "Contacto"}
        </h2>
        <p className="mb-4 text-base text-zinc-600 dark:text-zinc-300">
          {profileMessages?.projectInvitation || "¿Tenés un proyecto en mente? Envíame un"}{" "}
          <a
            className="underline decoration-accent-decoration/70 underline-offset-4 dark:text-zinc-200"
            href={`mailto:${email}`}
          >
            {email}
          </a>
          {" "}{profileMessages?.responseText || "y te respondo al toque."}
        </p>
        <div className="mb-8 flex flex-wrap items-center justify-start gap-3">
          {socialLinks.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
          <a
            href={cvPdfHref}
            target="_blank"
            rel="noreferrer"
            className="control-surface group relative inline-flex shrink-0 items-center gap-[1px] rounded-full border border-transparent px-2.5 py-1 text-sm text-zinc-700 transition-[box-shadow,color,scale] duration-200 hover:text-accent-text active:scale-[0.96] dark:text-zinc-200"
          >
            {sectionsMessages?.downloadCV || "Descargar CV"}
          </a>
        </div>
        <div className="form-surface">
          <ContactForm />
        </div>
      </motion.section>
    </motion.main>
  );
}
