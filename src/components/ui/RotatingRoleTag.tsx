"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface RotatingRoleTagProps {
  tags: string[];
  intervalMs?: number;
  initialDelay?: number;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function RotatingRoleTag({
  tags,
  intervalMs = 3800,
  initialDelay = 0.5,
  className = "text-sm text-zinc-400 dark:text-zinc-500",
}: RotatingRoleTagProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const isInitialEnter = useRef(true);
  const activeTag = tags[activeIndex] ?? tags[0] ?? "";

  useEffect(() => {
    if (prefersReducedMotion || tags.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tags.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, prefersReducedMotion, tags.length]);

  if (!activeTag) {
    return null;
  }

  const enterDelay = isInitialEnter.current ? initialDelay : 0;

  if (prefersReducedMotion) {
    return <p className={className}>{activeTag}</p>;
  }

  return (
    <div
      className="min-h-5"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={activeTag}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 4,
            transition: { duration: 0.32, ease: EASE },
          }}
          transition={{
            duration: 0.4,
            delay: enterDelay,
            ease: EASE,
          }}
          onAnimationComplete={() => {
            isInitialEnter.current = false;
          }}
          className={className}
        >
          {activeTag}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
