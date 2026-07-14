"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const OPTIONS = [
  { value: "es" as const, label: "ES" },
  { value: "en" as const, label: "EN" },
];

export default function LanguageDropdown() {
  const { isEnglish, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeLocale = isEnglish ? "en" : "es";
  const activeIndex = isEnglish ? 1 : 0;

  const closeAndRestoreFocus = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const selectLanguage = (locale: "es" | "en") => {
    setIsOpen(false);
    if (locale !== activeLocale) changeLanguage(locale);
  };

  const handleOptionKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndRestoreFocus();
      return;
    }

    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? OPTIONS.length - 1
          : event.key === "ArrowDown"
            ? (index + 1) % OPTIONS.length
            : (index - 1 + OPTIONS.length) % OPTIONS.length;
    optionRefs.current[nextIndex]?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(() => optionRefs.current[activeIndex]?.focus());
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activeIndex, isOpen]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-label={isEnglish ? "Language" : "Idioma"}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="language-menu"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setIsOpen(true);
          }
          if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            closeAndRestoreFocus();
          }
        }}
        className="control-surface flex h-8 items-center rounded-md border border-transparent px-2 text-sm font-medium uppercase text-zinc-600 transition-[box-shadow,color,scale] duration-150 hover:text-accent-text active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ui dark:text-zinc-300"
      >
        <Languages className="mr-1.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>{isEnglish ? "EN" : "ES"}</span>
        <ChevronDown
          className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="language-menu"
            role="menu"
            aria-label={isEnglish ? "Choose language" : "Elegir idioma"}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -3, scale: 0.98 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-50 mt-1 min-w-20 rounded-lg border border-zinc-200/80 bg-paper p-1 shadow-lg dark:border-zinc-800"
          >
            {OPTIONS.map((option, index) => (
              <button
                key={option.value}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={option.value === activeLocale}
                onClick={() => selectLanguage(option.value)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                className="flex w-full items-center rounded-md px-2 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900"
              >
                <Check
                  className={`mr-2 h-3.5 w-3.5 ${option.value === activeLocale ? "opacity-100" : "opacity-0"}`}
                  aria-hidden="true"
                />
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
