"use client";

import { Check, CloudOff, Sparkles, X } from "lucide-react";
import { SectionHeader } from "@/components/molecules/section-header";
import { SectionPlatformIcons } from "@/components/molecules/section-platform-icons";
import { CompareCard } from "./compare-card";
import { SAAS_POINTS, SUPERNOVA_POINTS } from "@/lib/constants/content";

/**
 * Problem Section — Empati kontras (Problem/Agitation): visual SaaS vs
 * Supernova dengan interaksi tilt (data-driven feedback).
 */
export function ProblemSection() {
  return (
    <section id="difference" className="relative mx-auto max-w-6xl px-5 py-24">
      {/* Ikon platform menjelajah — identitas multiplatform terus hadir */}
      <SectionPlatformIcons
        positions={["left-[3%] top-[18%]", "right-[4%] top-[42%]", "left-[7%] bottom-[14%]"]}
      />

      <SectionHeader
        eyebrow="Subscription Fatigue Ends Here"
        titleBefore="SaaS Tradisional vs "
        titleShimmer="Supernova Labs"
        titleAfter=""
        description="Setiap bulan Anda menyewa. Kami memberikan Anda kepemilikan."
      />

      <div className="relative grid gap-6 md:grid-cols-2">
        <CompareCard
          variant="saas"
          title="SaaS Tradisional"
          subtitle="Bayar sewa selamanya"
          headerIcon={CloudOff}
          points={SAAS_POINTS}
          pointIcon={X}
        />
        <CompareCard
          variant="supernova"
          title="Supernova Labs"
          subtitle="1x Bayar · Milik Anda"
          headerIcon={Sparkles}
          badge="Recommended"
          points={SUPERNOVA_POINTS}
          pointIcon={Check}
        />
      </div>
    </section>
  );
}
