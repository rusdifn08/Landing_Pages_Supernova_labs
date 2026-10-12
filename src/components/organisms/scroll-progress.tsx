"use client";

import { useScroll, useSpring } from "framer-motion";
import * as m from "framer-motion/m";

/**
 * Indikator progres baca di paling atas — micro-interaction trending yang
 * membuat halaman terasa "hidup" dan mendorong user scroll sampai bawah.
 * Di-drive oleh MotionValue langsung (tanpa React re-render per scroll).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <m.div
      style={{ scaleX } as any}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-vivid-purple"
    />
  );
}
