"use client";

import { useEffect } from "react";
import { useUiStore } from "@/stores/ui-store";

/**
 * Deteksi apakah halaman di-scroll melewati ambang (navbar berubah gaya).
 * rAF-throttled + passive listener agar scroll tetap 60fps.
 */
export function useNavbarScrolled(threshold = 40) {
  const setNavbarScrolled = useUiStore((s) => s.setNavbarScrolled);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setNavbarScrolled(window.scrollY > threshold);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setNavbarScrolled, threshold]);
}
