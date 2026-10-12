"use client";

import * as m from "framer-motion/m";
import { TrendingDown, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/molecules/section-header";
import { SectionPlatformIcons } from "@/components/molecules/section-platform-icons";
import { GlassCard } from "@/components/atoms/glass-card";
import { useRoiStore, selectWasted, selectProgress, ROI_MIN, ROI_MAX, ROI_YEARS } from "@/stores/roi-store";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { formatIDR } from "@/lib/format/currency";
import { springReveal, staggerContainer, viewportOnce } from "@/lib/animations/variants";

/**
 * ROI Calculator Section — FOMO trigger.
 * Slider biaya SaaS bulanan → total uang terbuang dalam ROI_YEARS tahun,
 * dengan counter animasi (rAF cubic easing).
 */
export function RoiSection() {
  const monthly = useRoiStore((s) => s.monthly);
  const setMonthly = useRoiStore((s) => s.setMonthly);
  const wasted = useRoiStore(selectWasted);
  const progress = useRoiStore(selectProgress);
  const display = useAnimatedCounter(wasted, 700);

  return (
    <section id="roi" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionPlatformIcons
        positions={["left-[6%] top-[20%]", "right-[5%] top-[48%]", "left-[9%] bottom-[16%]"]}
      />

      <SectionHeader
        eyebrow="Hitung Sendiri"
        titleBefore="Berapa Uang yang Anda "
        titleShimmer="Bakar"
        titleAfter="?"
        description="Geser slider — lihat berapa banyak yang Anda bayarkan ke vendor SaaS selama bertahun-tahun tanpa memiliki apa pun."
      />

      <m.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-2xl"
      >
        <GlassCard className="p-8 sm:p-10">
          <m.div variants={springReveal}>
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-soft">
              <span>Biaya SaaS / Bulan</span>
              <m.span
                key={monthly}
                initial={{ scale: 1.2, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-heading text-base font-bold text-navy"
              >
                {formatIDR(monthly)}
              </m.span>
            </div>
            <input
              type="range"
              min={ROI_MIN}
              max={ROI_MAX}
              step={100_000}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-navy/[0.08] accent-electric-cyan"
              style={{
                background: `linear-gradient(to right, #06B6D4 0%, #06B6D4 ${progress}%, rgba(15,23,42,0.08) ${progress}%, rgba(15,23,42,0.08) 100%)`,
              }}
            />
            <div className="mt-1 flex justify-between text-[10px] font-semibold text-slate-soft/60">
              <span>{formatIDR(ROI_MIN)}</span>
              <span>{formatIDR(ROI_MAX)}</span>
            </div>
          </m.div>

          <m.div
            variants={springReveal}
            className="mt-8 rounded-2xl border border-hot-magenta/20 bg-gradient-to-br from-hot-magenta/[0.06] to-transparent p-6 text-center"
          >
            <div className="mb-2 flex items-center justify-center gap-2 text-hot-magenta">
              <TrendingDown className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Total Terbuang dalam {ROI_YEARS} Tahun
              </span>
            </div>
            <p className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              {formatIDR(display)}
            </p>
            <p className="mt-2 text-xs text-slate-soft">
              = {ROI_YEARS * 12} bulan × {formatIDR(monthly)} — dan Anda tetap{" "}
              <strong className="text-hot-magenta">tidak memiliki apa pun</strong>
            </p>
          </m.div>

          <m.div
            variants={springReveal}
            className="mt-5 rounded-2xl border border-electric-cyan/30 bg-gradient-to-br from-electric-cyan/[0.08] to-transparent p-6 text-center"
          >
            <div className="mb-2 flex items-center justify-center gap-2 text-electric-cyan">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Dengan Supernova Labs
              </span>
            </div>
            <p className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              1x Bayar — Milik Selamanya
            </p>
            <p className="mt-2 text-xs text-slate-soft">
              Sistem, source code, dan data — 100% milik Anda. Tidak ada lagi
              tagihan bulanan.
            </p>
          </m.div>
        </GlassCard>
      </m.div>
    </section>
  );
}
