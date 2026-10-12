"use client";

import * as m from "framer-motion/m";
import { Globe, Monitor, Phone, Smartphone } from "lucide-react";
import { MagneticButton } from "@/components/atoms/magnetic-button";
import { NavLinks } from "./nav-links";
import { scrollToSection } from "@/hooks/use-scroll-spy";
import { useNavbarScrolled } from "@/hooks/use-navbar-scrolled";
import { useUiStore } from "@/stores/ui-store";
import { openWhatsApp, WA_CONSULT_URL } from "@/lib/constants/whatsapp";
import { cn } from "@/lib/utils/cn";

const BRAND_ICONS = [
  { icon: Monitor, color: "text-vivid-purple", bg: "bg-vivid-purple/10", delay: 0 },
  { icon: Globe, color: "text-electric-cyan", bg: "bg-electric-cyan/10", delay: 0.35 },
  { icon: Smartphone, color: "text-hot-magenta", bg: "bg-hot-magenta/10", delay: 0.7 },
];

/**
 * Navbar fixed — transparan di atas, glass saat scroll. Brand + trio ikon
 * platform + nav links + CTA konsultasi.
 */
export function Navbar() {
  useNavbarScrolled(40);
  const scrolled = useUiStore((s) => s.navbarScrolled);

  return (
    <m.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/60 bg-white/70 py-3 shadow-glass backdrop-blur-2xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <button
          onClick={() => scrollToSection("hero")}
          className="group flex items-center gap-2.5"
        >
          <m.span
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white/70 shadow-lg backdrop-blur-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Logo Supernova Labs Studio"
              width={30}
              height={30}
              className="h-[30px] w-[30px] object-contain"
            />
          </m.span>
          <span className="font-heading text-lg font-bold tracking-tight text-navy">
            Supernova Labs{" "}
            <span className="text-electric-cyan">Studio</span>
          </span>
          {/* Trio ikon platform — kecil tapi jelas, penegasan bisnis technology */}
          <span className="ml-1 hidden items-center gap-1 sm:flex">
            {BRAND_ICONS.map((p, i) => (
              <m.span
                key={i}
                animate={{ y: [0, -2.5, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
                }}
                whileHover={{ scale: 1.2 }}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-md border border-white/80 backdrop-blur-xl",
                  p.bg
                )}
              >
                <p.icon className={cn("h-3 w-3", p.color)} />
              </m.span>
            ))}
          </span>
        </button>

        {/* Nav links berdampingan dengan CTA — tanpa pembungkus */}
        <div className="flex items-center gap-4">
          <NavLinks />
          <MagneticButton
            onClick={() => openWhatsApp(WA_CONSULT_URL)}
            className="!px-5 !py-2.5 text-xs"
          >
            <Phone className="h-3.5 w-3.5" />
            Konsultasi Gratis
          </MagneticButton>
        </div>
      </div>
    </m.header>
  );
}
