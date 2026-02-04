"use client";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { TextLoop } from "@/components/ui/text-loop";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const THEMES_OPTIONS = [
  { label: "Light", id: "light", icon: <SunIcon className="h-4 w-4" /> },
  { label: "Dark", id: "dark", icon: <MoonIcon className="h-4 w-4" /> },
  { label: "System", id: "system", icon: <MonitorIcon className="h-4 w-4" /> },
];

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";

  const handleThemeChange = (id) => {
    if (id === "light" && theme === "dark") toggleTheme();
    if (id === "dark" && theme === "light") toggleTheme();
  };

  return (
    <AnimatedBackground
      className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
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
          className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
          type="button"
          aria-label={`Cambiar a tema ${t.label}`}
          data-id={t.id}
        >
          {t.icon}
        </button>
      ))}
    </AnimatedBackground>
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
        >
          <TextLoop className="text-xs text-zinc-500">
            <span>© 2026 gianluca.dev</span>
            <span>{isEnglish ? "Built with Next.js" : "Hecho con Next.js"}</span>
          </TextLoop>
        </a>
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
