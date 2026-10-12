"use client";

import * as m from "framer-motion/m";
import { springReveal, staggerContainer, viewportOnce } from "@/lib/animations/variants";
import { ShimmerText } from "@/components/atoms/shimmer-text";
import { cn } from "@/lib/utils/cn";

/**
 * Header section standar (eyebrow + judul + deskripsi) dengan stagger
 * reveal. Judul mendukung segmen shimmer — pola berulang di seluruh
 * section kini cukup satu komponen.
 */
export function SectionHeader({
  eyebrow,
  titleBefore,
  titleShimmer,
  titleAfter,
  description,
  titleClassName,
  className = "mb-12",
}: {
  eyebrow: string;
  titleBefore?: string;
  titleShimmer?: string;
  titleAfter?: string;
  description?: string;
  titleClassName?: string;
  className?: string;
}) {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("text-center", className)}
    >
      <m.span
        variants={springReveal}
        className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-electric-cyan"
      >
        {eyebrow}
      </m.span>
      <m.h2
        variants={springReveal}
        className={cn(
          "font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl",
          titleClassName
        )}
      >
        {titleBefore}
        {titleShimmer && <ShimmerText>{titleShimmer}</ShimmerText>}
        {titleAfter}
      </m.h2>
      {description && (
        <m.p
          variants={springReveal}
          className="mx-auto mt-4 max-w-xl text-slate-soft"
        >
          {description}
        </m.p>
      )}
    </m.div>
  );
}
