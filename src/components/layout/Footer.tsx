"use client";

import { ReactNode } from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface ThemeOption {
  label: string;
  id: string;
  icon: ReactNode;
}

const THEMES_OPTIONS: ThemeOption[] = [
  { label: "Light", id: "light", icon: <SunIcon className="h-4 w-4" /> },
  { label: "Dark", id: "dark", icon: <MoonIcon className="h-4 w-4" /> },
  { label: "System", id: "system", icon: <MonitorIcon className="h-4 w-4" /> },
];

function ThemeSwitch({ isEnglish }: { isEnglish: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";

  const handleThemeChange = (id: string | null) => {
    if (id === "light" && theme === "dark") toggleTheme();
    if (id === "dark" && theme === "light") toggleTheme();
  };

  return (
    <div
      role="group"
      aria-label={isEnglish ? "Theme" : "Tema"}
      className="inline-flex rounded-xl bg-zinc-50 p-0.5 dark:bg-zinc-900"
    >
      <AnimatedBackground
        className="rounded-[10px] bg-zinc-100 dark:bg-zinc-800"
        defaultValue={currentTheme}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.2,
        }}
        enableHover={false}
        onValueChange={handleThemeChange}
      >
        {THEMES_OPTIONS.filter((t) => t.id !== "system").map((t) => (
          <button
            key={t.id}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-zinc-500 transition-[color,scale] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ui data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
            type="button"
            aria-label={
              isEnglish
                ? `Switch to ${t.label.toLowerCase()} theme`
                : `Cambiar a tema ${t.id === "light" ? "claro" : "oscuro"}`
            }
            aria-pressed={currentTheme === t.id}
            data-id={t.id}
          >
            {t.icon}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  );
}

export function Footer() {
  const { isEnglish } = useLanguage();

  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <a
          href="https://github.com/gianlucafarias"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center text-xs text-zinc-500 transition-colors hover:text-accent-text dark:text-zinc-400"
        >
          <span>© 2026 gianluca.dev</span>
          <span className="mx-1 text-zinc-300/70 dark:text-zinc-700">•</span>
          <span>{isEnglish ? "Built with Next.js" : "Hecho con Next.js"}</span>
        </a>
        <div className="text-xs text-zinc-500 dark:text-zinc-500">
          <ThemeSwitch isEnglish={isEnglish} />
        </div>
      </div>
    </footer>
  );
}
