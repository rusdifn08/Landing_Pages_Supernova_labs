"use client";

import { create } from "zustand";

/**
 * ROI Calculator Store — nilai slider biaya langganan bulanan.
 * Selector turunan (derived) dihitung di komponen agar store tetap minimal.
 */

export const ROI_MIN = 500_000;
export const ROI_MAX = 10_000_000;
export const ROI_YEARS = 5;

interface RoiState {
  monthly: number;
  setMonthly: (value: number) => void;
}

export const useRoiStore = create<RoiState>()((set) => ({
  monthly: 2_000_000,
  setMonthly: (value) => set({ monthly: value }),
}));

/** Selector turunan — total uang terbuang selama ROI_YEARS tahun */
export const selectWasted = (s: RoiState) => s.monthly * 12 * ROI_YEARS;
/** Selector turunan — progres slider 0–100% */
export const selectProgress = (s: RoiState) =>
  ((s.monthly - ROI_MIN) / (ROI_MAX - ROI_MIN)) * 100;
