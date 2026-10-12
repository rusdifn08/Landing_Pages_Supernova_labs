"use client";

import { create } from "zustand";
import type { CartItem } from "@/types";

/**
 * POS Simulation Store — scan QR → item masuk cart → stock turun otomatis.
 */

const SCAN_PRODUCT: CartItem = { name: "Premium Coffee", price: 35000 };

interface PosState {
  cart: CartItem[];
  stock: number;
  scanning: boolean;
  flashRow: boolean;

  simulateScan: () => void;
}

export const usePosStore = create<PosState>()((set, get) => ({
  cart: [],
  stock: 100,
  scanning: false,
  flashRow: false,

  simulateScan: () => {
    const { scanning, stock } = get();
    if (scanning || stock <= 0) return;
    set({ scanning: true });
    // Laser scan visual 700ms, lalu item masuk cart + stock turun
    setTimeout(() => {
      set((s) => ({
        cart: [...s.cart, { ...SCAN_PRODUCT }],
        stock: s.stock - 1,
        scanning: false,
        flashRow: true,
      }));
      setTimeout(() => set({ flashRow: false }), 800);
    }, 700);
  },
}));

/** Selector turunan — total harga cart */
export const selectCartTotal = (s: PosState) =>
  s.cart.reduce((sum, i) => sum + i.price, 0);
