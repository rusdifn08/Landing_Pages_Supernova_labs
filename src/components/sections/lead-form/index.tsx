"use client";

import * as m from "framer-motion/m";
import { AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/molecules/section-header";
import { SectionPlatformIcons } from "@/components/molecules/section-platform-icons";
import { GlassCard } from "@/components/atoms/glass-card";
import { LeadFormFields } from "./lead-form-fields";
import { useLeadFormStore } from "@/stores/lead-form-store";

/**
 * Lead Form Section — konversi utama (id="contact").
 * Form → buka WhatsApp dengan pesan terisi otomatis (zero-friction CTA).
 */
export function LeadFormSection() {
  const submitted = useLeadFormStore((s) => s.submitted);
  const name = useLeadFormStore((s) => s.form.name);

  return (
    <section id="contact" className="relative mx-auto max-w-2xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "-left-[30%] top-[22%]",
          "-right-[32%] top-[12%]",
          "-right-[25%] bottom-[18%]",
        ]}
      />
      <SectionHeader
        eyebrow="Mulai Transformasi"
        titleBefore="Siap Memiliki Sistem "
        titleShimmer="Enterprise?"
        description="Isi form di bawah. Tim kami akan menghubungi Anda via WhatsApp untuk konsultasi gratis tanpa komitmen."
        className="mb-10"
      />

      <GlassCard className="p-8 sm:p-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            <m.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-electric-cyan shadow-glow-cyan"
              >
                <Check className="h-8 w-8 text-white" />
              </m.div>
              <h3 className="font-heading text-xl font-bold text-navy">
                Terima kasih, {name}!
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-soft">
                WhatsApp sudah terbuka dengan pesan Anda — cukup tekan tombol
                kirim untuk terhubung langsung dengan tim kami.
              </p>
            </m.div>
          ) : (
            <LeadFormFields />
          )}
        </AnimatePresence>
      </GlassCard>
    </section>
  );
}
