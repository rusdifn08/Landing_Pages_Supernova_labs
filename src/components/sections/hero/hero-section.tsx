"use client";

import * as m from "framer-motion/m";
import { ArrowRight, Layers, Lock, Phone, Shield, Zap } from "lucide-react";
import { FloatingPlatformIcons } from "@/components/molecules/floating-platform-icons";
import { FloatingSignal } from "@/components/atoms/floating-signal";
import { MagneticButton } from "@/components/atoms/magnetic-button";
import { HeroBadge } from "./hero-badge";
import { HeroHeadline } from "./hero-headline";
import { HeroValueChips } from "./hero-value-chips";
import { scrollToSection } from "@/hooks/use-scroll-spy";
import { openWhatsApp, WA_CONSULT_URL } from "@/lib/constants/whatsapp";

/**
 * Hero Section — The Hook.
 * CRO: headline ownership, value chips, dual CTA (zero-friction WA +
 * engagement loop ke simulasi), trust micro-signals.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 pb-14 pt-28 text-center"
    >
      {/* Ikon 3 platform glass melayang — penegasan keunggulan multiplatform */}
      <FloatingPlatformIcons />

      <HeroBadge />
      <HeroHeadline />

      <m.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 100, damping: 20 }}
        className="mt-7 max-w-2xl text-base leading-relaxed text-slate-soft sm:text-lg"
      >
        <strong className="text-navy">Tinggalkan vendor lama.</strong> Kami
        hadirkan ekosistem lengkap (Web, Desktop, &amp; Mobile) yang
        terintegrasi penuh hanya dengan{" "}
        <strong className="text-navy">sekali bayar!</strong>{" "}
        <strong className="text-electric-cyan">Bebas Tambah Fitur Kapan Saja.</strong>
      </m.p>

      <HeroValueChips />

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, type: "spring", stiffness: 100, damping: 20 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        {/* Primary CTA — langsung buka chat WhatsApp (CRO: zero friction) */}
        <MagneticButton onClick={() => openWhatsApp(WA_CONSULT_URL)} pulse>
          <Phone className="h-4 w-4" />
          Konsultasi Gratis
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>
        {/* Secondary CTA — menuju simulasi (CRO: engagement loop) */}
        <MagneticButton variant="secondary" onClick={() => scrollToSection("products")}>
          Lihat Simulasi
          <Zap className="h-4 w-4 text-vivid-purple" />
        </MagneticButton>
      </m.div>

      {/* Trust micro-signals — mengambang bergiliran (loop) + ikon berdenyut */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <FloatingSignal icon={Shield} text="Source Code 100% Anda" delay={0} />
        <FloatingSignal icon={Lock} text="Data Tidak Disandera" delay={0.4} />
        <FloatingSignal icon={Layers} text="Web · Desktop · Mobile" delay={0.8} />
      </m.div>
    </section>
  );
}
