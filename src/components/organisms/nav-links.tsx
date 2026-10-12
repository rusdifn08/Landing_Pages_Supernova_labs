"use client";

import * as m from "framer-motion/m";
import { NAV_SECTIONS } from "@/lib/constants/navigation";
import { useScrollSpy, scrollToSection } from "@/hooks/use-scroll-spy";
import { useUiStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils/cn";

/**
 * Nav links dengan scrollspy otomatis. Saat user scroll, menu yang sesuai
 * section aktif ter-highlight dan indikator underline cyan MELUNCUR antar
 * tombol (layoutId). Klik = smooth scroll.
 */
export function NavLinks() {
  const active = useUiStore((s) => s.activeSection);
  const setActiveSection = useUiStore((s) => s.setActiveSection);
  const { lock } = useScrollSpy();

  const handleClick = (id: string) => {
    // Indikator langsung meluncur ke menu tujuan dalam SATU gerakan mulus,
    // scrollspy dikunci selama animasi scroll berjalan
    setActiveSection(id);
    lock(1000);
    scrollToSection(id);
  };

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {NAV_SECTIONS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "group relative px-3.5 py-2 text-sm font-semibold transition-colors duration-300",
              isActive ? "text-navy" : "text-slate-soft hover:text-navy"
            )}
          >
            <m.span
              className="relative inline-block"
              whileHover={{ y: -1.5 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
            >
              {item.label}
            </m.span>
            {/* Indikator aktif — spring lembut, meluncur mulus antar menu */}
            {isActive && (
              <m.span
                layoutId="nav-active-indicator"
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
                className="absolute inset-x-2.5 -bottom-0.5 h-[2.5px] rounded-full bg-electric-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              />
            )}
            {/* Underline hover untuk menu non-aktif */}
            {!isActive && (
              <span className="absolute inset-x-2.5 -bottom-0.5 h-[2.5px] origin-left scale-x-0 rounded-full bg-navy/25 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
