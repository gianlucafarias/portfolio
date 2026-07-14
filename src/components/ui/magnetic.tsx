"use client";

import { useCallback, useEffect, useRef, ReactNode } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, SpringOptions } from "motion/react";

const SPRING_CONFIG: SpringOptions = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

type ActionArea = "self" | "parent" | "global";

interface MagneticProps {
  children: ReactNode;
  intensity?: number;
  range?: number;
  actionArea?: ActionArea;
  springOptions?: SpringOptions;
}

export function Magnetic({
  children,
  intensity = 0.6,
  range = 100,
  actionArea = "self",
  springOptions = SPRING_CONFIG,
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHovered = useRef(actionArea === "global");
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  const resetPosition = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const calculateDistance = useCallback((clientX: number, clientY: number) => {
    if (prefersReducedMotion || !isHovered.current || !ref.current) {
      resetPosition();
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const distanceX = clientX - (rect.left + rect.width / 2);
    const distanceY = clientY - (rect.top + rect.height / 2);
    const absoluteDistance = Math.hypot(distanceX, distanceY);

    if (absoluteDistance <= range) {
      const scale = 1 - absoluteDistance / range;
      x.set(distanceX * intensity * scale);
      y.set(distanceY * intensity * scale);
    } else {
      resetPosition();
    }
  }, [intensity, prefersReducedMotion, range, resetPosition, x, y]);

  useEffect(() => {
    if (actionArea === "parent" && ref.current?.parentElement) {
      const parent = ref.current.parentElement;

      const handleParentEnter = () => { isHovered.current = true; };
      const handleParentLeave = () => {
        isHovered.current = false;
        resetPosition();
      };
      const handleParentMove = (event: PointerEvent) => calculateDistance(event.clientX, event.clientY);

      parent.addEventListener("pointerenter", handleParentEnter);
      parent.addEventListener("pointerleave", handleParentLeave);
      parent.addEventListener("pointermove", handleParentMove);

      return () => {
        parent.removeEventListener("pointerenter", handleParentEnter);
        parent.removeEventListener("pointerleave", handleParentLeave);
        parent.removeEventListener("pointermove", handleParentMove);
      };
    } else if (actionArea === "global") {
      isHovered.current = true;
      const handleGlobalMove = (event: PointerEvent) => calculateDistance(event.clientX, event.clientY);
      document.addEventListener("pointermove", handleGlobalMove);
      return () => document.removeEventListener("pointermove", handleGlobalMove);
    }
  }, [actionArea, calculateDistance, resetPosition]);

  const handleMouseEnter = () => {
      if (actionArea === "self") {
      isHovered.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (actionArea === "self") {
      isHovered.current = false;
      resetPosition();
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (actionArea === "self") calculateDistance(event.clientX, event.clientY);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={actionArea === "self" ? handleMouseEnter : undefined}
      onPointerMove={actionArea === "self" ? handlePointerMove : undefined}
      onPointerLeave={actionArea === "self" ? handleMouseLeave : undefined}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}
