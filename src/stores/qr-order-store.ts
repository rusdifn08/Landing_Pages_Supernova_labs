"use client";

import { create } from "zustand";
import { QR_MENU } from "@/lib/constants/products";
import type { Order, OrderStatus, QrPhase } from "@/types";

/**
 * QR Ordering Simulation Store — alur: Scan meja → pilih menu → pesan →
 * status tersinkron real-time di Customer Phone, KDS (Kitchen), & Cashier.
 */

interface QrOrderState {
  phase: QrPhase;
  scanOk: boolean;
  cart: Record<string, number>;
  order: Order | null;
  status: OrderStatus;
  cashierAck: boolean;

  scanTable: () => void;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  placeOrder: () => void;
  setStatus: (status: OrderStatus) => void;
  acceptByCashier: () => void;
  reset: () => void;
}

export const useQrOrderStore = create<QrOrderState>()((set, get) => ({
  phase: "scan",
  scanOk: false,
  cart: {},
  order: null,
  status: "new",
  cashierAck: false,

  scanTable: () => {
    if (get().phase !== "scan") return;
    set({ phase: "scanning" });
    // Laser sweep ~1.8s → flash sukses hijau → masuk ke menu
    setTimeout(() => set({ scanOk: true }), 1800);
    setTimeout(() => set({ phase: "menu" }), 2500);
  },

  addItem: (id) => set((s) => ({ cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + 1 } })),

  removeItem: (id) =>
    set((s) => {
      const qty = (s.cart[id] ?? 0) - 1;
      const next = { ...s.cart };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return { cart: next };
    }),

  placeOrder: () => {
    const { cart } = get();
    const totalQty = Object.values(cart).reduce((sum, q) => sum + q, 0);
    if (totalQty === 0) return;
    const items = QR_MENU.filter((m) => cart[m.id]).map((m) => ({
      name: m.name,
      emoji: m.emoji,
      price: m.price,
      qty: cart[m.id],
    }));
    const total = QR_MENU.reduce((sum, m) => sum + (cart[m.id] ?? 0) * m.price, 0);
    set({ order: { items, total }, status: "new", cashierAck: false, phase: "status" });
  },

  setStatus: (status) => set({ status }),
  acceptByCashier: () => set({ cashierAck: true }),

  reset: () =>
    set({
      phase: "scan",
      scanOk: false,
      cart: {},
      order: null,
      status: "new",
      cashierAck: false,
    }),
}));

/** Selector turunan — jumlah total item di cart */
export const selectTotalQty = (s: QrOrderState) =>
  Object.values(s.cart).reduce((sum, q) => sum + q, 0);

/** Selector turunan — total harga cart */
export const selectQrCartTotal = (s: QrOrderState) =>
  QR_MENU.reduce((sum, m) => sum + (s.cart[m.id] ?? 0) * m.price, 0);

/** Posisi status pada timeline HP customer */
export const STATUS_STEP: Record<OrderStatus, number> = {
  new: 0,
  accepted: 1,
  cooking: 2,
  ready: 3,
};
