"use client";

import { create } from "zustand";
import type { BookingPackage, BookingStudio } from "@/lib/constants/products";

/**
 * Booking Simulation Store — alur 4 langkah:
 * Pilih Studio → Jadwal & Paket → Pembayaran → Sinkronisasi.
 */

interface BookingState {
  step: 0 | 1 | 2 | 3;
  studio: BookingStudio | null;
  slot: string | null;
  pkg: BookingPackage | null;
  paying: boolean;
  toast: string | null;

  selectStudio: (studio: BookingStudio) => void;
  setSlot: (slot: string) => void;
  setPkg: (pkg: BookingPackage) => void;
  goToStep: (step: BookingState["step"]) => void;
  pay: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>()((set, get) => ({
  step: 0,
  studio: null,
  slot: null,
  pkg: null,
  paying: false,
  toast: null,

  selectStudio: (studio) => set({ studio, step: 1 }),
  setSlot: (slot) => set({ slot }),
  setPkg: (pkg) => set({ pkg }),
  goToStep: (step) => set({ step }),

  pay: () => {
    const { studio, slot } = get();
    set({ paying: true });
    // Simulasi proses payment gateway 1.2 detik
    setTimeout(() => {
      set({
        paying: false,
        step: 3,
        toast: `Pembayaran berhasil! Booking ${studio?.name} ${slot} tersinkron ke Customer & Admin di 3 platform.`,
      });
      setTimeout(() => set({ toast: null }), 4500);
    }, 1200);
  },

  reset: () => set({ step: 0, studio: null, slot: null, pkg: null }),
}));

/** Selector turunan — total harga (harga studio + tambahan paket) */
export const selectBookingTotal = (s: BookingState) =>
  (s.studio?.from ?? 0) + (s.pkg?.add ?? 0);
