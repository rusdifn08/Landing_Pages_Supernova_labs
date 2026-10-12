"use client";

import { useEffect, useRef } from "react";
import { NAV_SECTIONS } from "@/lib/constants/navigation";
import { useUiStore } from "@/stores/ui-store";

/**
 * Scrollspy KONTINU: pilih section terakhir yang sudah terlewati probe.
 * Indikator tidak pernah hilang di antara dua section (mis. saat melewati
 * Tech Stack antara ROI dan FAQ) — transisi selalu meluncur dari menu satu
 * ke menu berikutnya.
 *
 * `lockRef` mengunci scrollspy sesaat setelah klik agar indikator tidak
 * "loncat-loncat" melewati menu lain selama smooth scroll berlangsung.
 */
export function useScrollSpy() {
  const setActiveSection = useUiStore((s) => s.setActiveSection);
  const lockUntil = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      // rAF throttle — hanya 1 kalkulasi per frame (ringan saat scroll)
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (Date.now() < lockUntil.current) return;
        const probe = window.innerHeight * 0.42;
        let current = "";
        for (const s of NAV_SECTIONS) {
          const el = document.getElementById(s.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= probe) current = s.id;
        }
        setActiveSection(current);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setActiveSection]);

  /** Kunci scrollspy selama durasi smooth scroll (dipanggil saat klik menu) */
  const lock = (ms = 1000) => {
    lockUntil.current = Date.now() + ms;
  };

  return { lock };
}

/** Smooth scroll ke section by id */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
