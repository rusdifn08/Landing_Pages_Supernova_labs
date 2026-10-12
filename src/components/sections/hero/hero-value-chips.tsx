"use client";

import * as m from "framer-motion/m";
import { staggerContainer, wordReveal } from "@/lib/animations/variants";
import { HERO_VALUE_CHIPS } from "@/lib/constants/content";
import { cn } from "@/lib/utils/cn";

/**
 * Value chips — 3 pembeda utama dengan animasi masuk berjenjang,
 * kilau berwarna melintas berkala (loop), ikon berdenyut halus.
 */
export function HeroValueChips() {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: 1.3 }}
      className="mt-6 flex flex-wrap items-center justify-center gap-3"
    >
      {HERO_VALUE_CHIPS.map((chip) => (
        <m.div
          key={chip.title}
          variants={wordReveal}
          whileHover={{ y: -5, scale: 1.04, boxShadow: chip.hoverGlow }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "group relative flex cursor-default items-center gap-3 overflow-hidden rounded-2xl border border-navy/[0.06] bg-white/70 px-4 py-3 text-left shadow-glass backdrop-blur-xl transition-colors",
            chip.hoverBorder
          )}
        >
          {/* Kilau berwarna melintas berkala (loop) — highlight keunggulan */}
          <span className="pointer-events-none absolute inset-0">
            <m.span
              animate={{ left: ["-40%", "130%"] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
                delay: chip.delay,
              }}
              className={cn(
                "absolute top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent to-transparent",
                chip.sweep
              )}
            />
          </span>
          {/* Ikon berwarna tema dengan denyut halus (loop) */}
          <m.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: chip.delay,
            }}
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-xl shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110",
              chip.iconBg
            )}
          >
            <chip.icon className="h-4 w-4 text-white" />
          </m.span>
          <span className="relative">
            <span className="block text-sm font-bold text-navy">{chip.title}</span>
            <span className={cn("block text-[11px] font-semibold", chip.subColor)}>
              {chip.sub}
            </span>
          </span>
        </m.div>
      ))}
    </m.div>
  );
}
