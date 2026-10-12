"use client";

import { create } from "zustand";

/**
 * UI Store — state global yang ringan untuk elemen UI lintas-section.
 * Zustand: ~1KB, tanpa boilerplate, selector-based re-render (sangat efisien).
 */

interface UiState {
  /** Section aktif hasil scrollspy */
  activeSection: string;
  /** Apakah halaman sudah di-scroll melewati ambang navbar */
  navbarScrolled: boolean;
  /** Tab produk aktif (0=booking, 1=pos, 2=qr) */
  activeProductTab: number;
  /** FAQ yang sedang terbuka (index) — null = semua tertutup */
  openFaq: number | null;

  setActiveSection: (id: string) => void;
  setNavbarScrolled: (scrolled: boolean) => void;
  setActiveProductTab: (index: number) => void;
  toggleFaq: (index: number) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  activeSection: "",
  navbarScrolled: false,
  activeProductTab: 0,
  openFaq: 0,

  setActiveSection: (id) =>
    set((s) => (s.activeSection === id ? s : { activeSection: id })),
  setNavbarScrolled: (scrolled) =>
    set((s) => (s.navbarScrolled === scrolled ? s : { navbarScrolled: scrolled })),
  setActiveProductTab: (index) => set({ activeProductTab: index }),
  toggleFaq: (index) =>
    set((s) => ({ openFaq: s.openFaq === index ? null : index })),
}));
