"use client";

import * as m from "framer-motion/m";
import { staggerContainer, wordReveal } from "@/lib/animations/variants";
import { HERO_HEADLINE } from "@/lib/constants/content";
import { cn } from "@/lib/utils/cn";

/**
 * Headline hero — word-by-word reveal membangun anticipation on load
 * (CRO: attention capture). Kata kunci di-highlight shimmer navy→cyan.
 */
export function HeroHeadline() {
  return (
    <m.h1
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl"
    >
      {HERO_HEADLINE.map((word, i) => (
        <m.span
          key={i}
          variants={wordReveal}
          className={cn(
            "mr-[0.3em] inline-block",
            // Highlight kata kunci dengan shimmer navy→cyan (loop) — bukan ungu
            (word === "1x" || word === "Bayar." || word === "Selamanya.") &&
              "bg-[linear-gradient(110deg,#0F172A_35%,#06B6D4_50%,#0F172A_65%)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shimmer"
          )}
        >
          {word}
        </m.span>
      ))}
    </m.h1>
  );
}
