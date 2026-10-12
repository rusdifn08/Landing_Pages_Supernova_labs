"use client";

import * as m from "framer-motion/m";
import { Loader2, Send } from "lucide-react";
import { MagneticButton } from "@/components/atoms/magnetic-button";
import { useLeadFormStore } from "@/stores/lead-form-store";
import { BUSINESS_OPTIONS } from "@/lib/constants/lead-form";

const fieldClass =
  "w-full rounded-2xl border border-navy/10 bg-white/80 px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-soft/50 focus:border-vivid-purple/40 focus:ring-2 focus:ring-vivid-purple/20";

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-soft";

/** Form fields lead — dipisah agar section utama tetap ramping. */
export function LeadFormFields() {
  const form = useLeadFormStore((s) => s.form);
  const loading = useLeadFormStore((s) => s.loading);
  const setField = useLeadFormStore((s) => s.setField);
  const submit = useLeadFormStore((s) => s.submit);

  return (
    <m.form
      key="form"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      <div>
        <label className={labelClass}>Nama Lengkap</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Contoh: Budi Santoso"
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass}>Jenis Bisnis</label>
        <select
          required
          value={form.business}
          onChange={(e) => setField("business", e.target.value)}
          className={fieldClass}
        >
          <option value="" disabled>
            Pilih jenis bisnis...
          </option>
          {BUSINESS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Nomor WhatsApp</label>
        <input
          type="tel"
          required
          value={form.whatsapp}
          onChange={(e) => setField("whatsapp", e.target.value)}
          placeholder="08xxxxxxxxxx"
          className={fieldClass}
        />
      </div>

      {/* Pulsing submit — CRO: inviting CTA */}
      <MagneticButton type="submit" pulse className="mt-2 w-full !py-4">
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Kirim & Dapatkan Konsultasi Gratis
            <Send className="h-4 w-4" />
          </>
        )}
      </MagneticButton>

      <p className="text-center text-[11px] text-slate-soft">
        Data Anda aman. Kami tidak akan spam atau menjual informasi Anda.
      </p>
    </m.form>
  );
}
