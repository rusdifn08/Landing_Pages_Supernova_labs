"use client";

import { create } from "zustand";
import { WA_LEAD_NUMBER } from "@/lib/constants/whatsapp";
import { BUSINESS_LABELS } from "@/lib/constants/lead-form";
import type { LeadFormData } from "@/types";

/**
 * Lead Form Store — data form, status submit, dan aksi kirim ke WhatsApp.
 * Logika bisnis (penyusunan pesan & pembukaan WA) terpusat di store,
 * sehingga komponen tinggal render.
 */

interface LeadFormState {
  form: LeadFormData;
  loading: boolean;
  submitted: boolean;

  setField: (field: keyof LeadFormData, value: string) => void;
  submit: () => void;
  reset: () => void;
}

const initialForm: LeadFormData = { name: "", business: "", whatsapp: "" };

export const useLeadFormStore = create<LeadFormState>()((set, get) => ({
  form: initialForm,
  loading: false,
  submitted: false,

  setField: (field, value) =>
    set((s) => ({ form: { ...s.form, [field]: value } })),

  submit: () => {
    const { form } = get();
    if (!form.name || !form.business || !form.whatsapp) return;
    set({ loading: true });

    // Susun pesan berisi data form, lalu buka WhatsApp ke nomor bisnis —
    // pesan sudah terisi otomatis, pengunjung tinggal tekan kirim
    const message = [
      "Halo Supernova Labs Studio, saya ingin konsultasi gratis.",
      "",
      `Nama: ${form.name}`,
      `Jenis Bisnis: ${BUSINESS_LABELS[form.business] ?? form.business}`,
      `Nomor WhatsApp: ${form.whatsapp}`,
    ].join("\n");

    setTimeout(() => {
      window.open(
        `https://wa.me/${WA_LEAD_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
      set({ loading: false, submitted: true });
    }, 600);
  },

  reset: () => set({ form: initialForm, loading: false, submitted: false }),
}));
