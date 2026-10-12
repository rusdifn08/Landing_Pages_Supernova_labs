"use client";

import * as m from "framer-motion/m";
import { springReveal, staggerContainer, viewportOnce } from "@/lib/animations/variants";
import { GlassCard } from "@/components/atoms/glass-card";
import { cn } from "@/lib/utils/cn";

/**
 * Kartu perbandingan untuk Problem Section (SaaS vs Supernova) —
 * pola identik dua sisi digeneralisasi dengan props.
 */
export function CompareCard({
  variant,
  title,
  subtitle,
  headerIcon: HeaderIcon,
  points,
  pointIcon: PointIcon,
  badge,
}: {
  variant: "saas" | "supernova";
  title: string;
  subtitle: string;
  headerIcon: React.ElementType;
  points: string[];
  pointIcon: React.ElementType;
  badge?: string;
}) {
  const isSupernova = variant === "supernova";
  return (
    <div
      className={cn(
        "relative rounded-[2rem] p-px",
        isSupernova &&
          "bg-gradient-to-br from-electric-cyan/70 via-luminous-pink/50 to-electric-cyan/70 shadow-[0_24px_70px_rgba(34,211,238,0.22)]"
      )}
    >
      {isSupernova && (
        <span
          aria-hidden
          className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-electric-cyan/25 via-luminous-pink/20 to-electric-cyan/25 blur-2xl"
        />
      )}
      <GlassCard
        lift={!isSupernova}
        className={cn(
          "group relative h-full overflow-hidden p-8 md:p-9",
          isSupernova
            ? "rounded-[calc(2rem-1px)] border-transparent bg-white/90"
            : "border-slate-soft/15 bg-white/40 shadow-none saturate-0"
        )}
      >
        <m.span
          animate={{ rotate: isSupernova ? 360 : -360 }}
          transition={{ duration: isSupernova ? 22 : 26, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl transition-colors duration-500",
            isSupernova
              ? "bg-electric-cyan/15 group-hover:bg-electric-cyan/25"
              : "bg-slate-soft/10 group-hover:bg-slate-soft/20"
          )}
        />
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          {/* Header: icon tile + title/subtitle, badge di kanan */}
          <m.div variants={springReveal} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {isSupernova ? (
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric-cyan via-blue-500 to-luminous-pink p-[2px] shadow-[0_8px_24px_rgba(34,211,238,0.35)]">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <HeaderIcon className="h-5 w-5 text-electric-cyan" />
                  </span>
                </span>
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-soft/10 text-slate-soft">
                  <HeaderIcon className="h-5 w-5" />
                </span>
              )}
              <div>
                <h3
                  className={cn(
                    "font-heading text-lg font-bold md:text-xl",
                    isSupernova ? "text-navy" : "text-slate-soft"
                  )}
                >
                  {title}
                </h3>
                <p
                  className={cn(
                    "mt-0.5 text-sm font-semibold",
                    isSupernova ? "text-electric-cyan" : "text-slate-soft/70"
                  )}
                >
                  {subtitle}
                </p>
              </div>
            </div>
            {badge && (
              <span className="shrink-0 rounded-full bg-luminous-pink px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-glow-pink">
                {badge}
              </span>
            )}
          </m.div>

          <m.hr
            variants={springReveal}
            className={cn(
              "my-6 border-0 border-t",
              isSupernova ? "border-electric-cyan/15" : "border-slate-soft/15"
            )}
          />

          <m.ul variants={staggerContainer} className="space-y-3">
            {points.map((point, i) => (
              <m.li
                key={i}
                variants={springReveal}
                className={cn(
                  "flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm leading-relaxed transition-colors",
                  isSupernova
                    ? "font-medium text-navy/80 hover:bg-electric-cyan/5"
                    : "text-slate-soft hover:bg-slate-soft/5"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    isSupernova
                      ? "bg-electric-cyan/15 text-electric-cyan ring-1 ring-electric-cyan/30"
                      : "bg-slate-soft/10 text-slate-soft/70"
                  )}
                >
                  <PointIcon className="h-3 w-3" strokeWidth={isSupernova ? 3 : 2.5} />
                </span>
                {point}
              </m.li>
            ))}
          </m.ul>
        </m.div>
      </GlassCard>
    </div>
  );
}
