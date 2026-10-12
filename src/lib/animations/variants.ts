import type { Variants } from "framer-motion";

/**
 * Shared animation variants — spring-based, hanya menganimasikan
 * opacity & transform (GPU-composited) sehingga render tetap ringan.
 */

export const springReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

/** Viewport config standar: animasi berjalan sekali saat masuk layar */
export const viewportOnce = { once: true, margin: "-80px" } as const;
