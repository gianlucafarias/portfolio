"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent, PointerEvent, ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ProfileHoverNameProps {
  children: ReactNode;
  imageSrc?: string;
  imageAlt: string;
}

const PROFILE_SIZE = 80;
const PROFILE_GAP = 16;
const PROFILE_MARGIN = 24;

const PREVIEW_ENTER_TRANSITION = {
  duration: 0.24,
  ease: [0.16, 1, 0.3, 1] as const,
  opacity: { duration: 0.18 },
  filter: { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const },
  y: { duration: 0.24 },
  scale: { duration: 0.24 },
};

const PREVIEW_EXIT_TRANSITION = {
  duration: 0.15,
  ease: [0.4, 0, 1, 1] as const,
  opacity: { duration: 0.12 },
  filter: { duration: 0.15 },
  y: { duration: 0.15 },
  scale: { duration: 0.15 },
};

export default function ProfileHoverName({
  children,
  imageSrc = "/profile.png",
  imageAlt,
}: ProfileHoverNameProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const previewTop = useMotionValue(0);
  const previewLeft = useMotionValue(0);
  const springX = useSpring(imageX, { stiffness: 160, damping: 28, mass: 0.45 });
  const springY = useSpring(imageY, { stiffness: 160, damping: 28, mass: 0.45 });
  const springPreviewTop = useSpring(previewTop, {
    stiffness: 220,
    damping: 32,
    mass: 0.45,
  });

  const getLayoutElement = useCallback(() => {
    return containerRef.current?.closest("header")?.parentElement ?? null;
  }, []);

  const updatePreviewPosition = useCallback(() => {
    const layoutEl = getLayoutElement();
    const nameEl = containerRef.current;
    if (!layoutEl || !nameEl) {
      return;
    }

    const layoutRect = layoutEl.getBoundingClientRect();
    const nameRect = nameEl.getBoundingClientRect();
    const left = layoutRect.left - PROFILE_SIZE - PROFILE_GAP;
    const targetTop = nameRect.top + nameRect.height / 2;
    const min = PROFILE_MARGIN + PROFILE_SIZE / 2;
    const max = window.innerHeight - PROFILE_MARGIN - PROFILE_SIZE / 2;

    previewLeft.set(Math.max(PROFILE_MARGIN, left));
    previewTop.set(Math.min(Math.max(targetTop, min), max));
  }, [getLayoutElement, previewLeft, previewTop]);

  const showPreview = useCallback(() => {
    setIsPreviewVisible(true);
    updatePreviewPosition();
  }, [updatePreviewPosition]);

  const hidePreview = useCallback(() => {
    setIsPreviewVisible(false);
    imageX.set(0);
    imageY.set(0);
  }, [imageX, imageY]);

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion || (event.pointerType !== "mouse" && event.pointerType !== "pen")) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    imageX.set(x * 8);
    imageY.set(y * 6);
  };

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      hidePreview();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isPreviewVisible) {
      return;
    }

    let frame: number | undefined;
    const startedAt = performance.now();
    const syncDuringEntrance = (now: number) => {
      updatePreviewPosition();
      if (now - startedAt < 400) {
        frame = window.requestAnimationFrame(syncDuringEntrance);
      }
    };
    const handleLayoutChange = () => {
      updatePreviewPosition();
    };

    frame = window.requestAnimationFrame(syncDuringEntrance);
    window.addEventListener("resize", handleLayoutChange);
    window.addEventListener("scroll", handleLayoutChange, true);

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("scroll", handleLayoutChange, true);
    };
  }, [isPreviewVisible, updatePreviewPosition]);

  return (
    <>
      <span
        ref={containerRef}
        className="inline-block"
        onFocus={showPreview}
        onBlur={handleBlur}
        onPointerEnter={showPreview}
        onPointerMove={handlePointerMove}
        onPointerLeave={hidePreview}
      >
        {children}
      </span>

      {isMounted &&
        createPortal(
          <motion.div
            data-profile-hover-preview
            className="pointer-events-none fixed z-20 hidden -translate-y-1/2 xl:block"
            style={{
              top: springPreviewTop,
              left: previewLeft,
              width: PROFILE_SIZE,
              height: PROFILE_SIZE,
            }}
            aria-hidden="true"
          >
            <AnimatePresence initial={false}>
              {isPreviewVisible && (
                <motion.div
                  key="profile-preview"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 8, scale: 0.985, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 6,
                          scale: 0.99,
                          filter: "blur(4px)",
                          transition: PREVIEW_EXIT_TRANSITION,
                        }
                  }
                  transition={prefersReducedMotion ? { duration: 0 } : PREVIEW_ENTER_TRANSITION}
                  className="absolute inset-0"
                >
                  <motion.div
                    className="h-full w-full overflow-hidden rounded-full bg-zinc-100 shadow-sm ring-4 ring-paper/80 dark:bg-zinc-900"
                    style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
                  >
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={PROFILE_SIZE}
                      height={PROFILE_SIZE}
                      className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                      sizes={`${PROFILE_SIZE}px`}
                      priority
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
