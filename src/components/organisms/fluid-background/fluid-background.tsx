"use client";

import { useScroll, useTransform } from "framer-motion";
import * as m from "framer-motion/m";
import { BLOBS, PILLS } from "./blob-config";
import { cn } from "@/lib/utils/cn";

/**
 * Fluid Background — blobs parallax + floating organik.
 *
 * Optimasi performa:
 * - Parallax via useScroll/useTransform (tidak memicu React re-render,
 *   nilai di-drive langsung ke style MotionValue).
 * - Animasi loop hanya transform (x/y/scale) — GPU-composited.
 * - `will-change-transform` mem-promote elemen ke layer GPU sendiri.
 */
export function FluidBackground() {
  const { scrollYProgress } = useScroll();
  // Parallax: blobs bergerak lebih lambat dari konten → depth perception
  const y1 = useTransform(scrollYProgress, [0, 1], [0, BLOBS[0].parallax?.[1] ?? 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, BLOBS[1].parallax?.[1] ?? 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, BLOBS[2].parallax?.[1] ?? 0]);
  const parallaxY = [y1, y2, y3];

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {BLOBS.map((blob, i) => (
        <m.div
          key={i}
          style={blob.parallax ? ({ y: parallaxY[i] } as any) : undefined}
          className={cn(blob.wrapper, "will-change-transform")}
        >
          <m.div
            animate={blob.animate}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
            className={cn(blob.className, "will-change-transform")}
          />
        </m.div>
      ))}

      {/* Floating decorative pills */}
      {PILLS.map((pill, i) => (
        <m.div
          key={i}
          animate={pill.animate}
          transition={{ duration: pill.duration, repeat: Infinity, ease: "easeInOut" }}
          className={cn(pill.className, "will-change-transform")}
        />
      ))}
    </div>
  );
}
