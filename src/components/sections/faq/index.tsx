"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/molecules/section-header";
import { SectionPlatformIcons } from "@/components/molecules/section-platform-icons";
import { useUiStore } from "@/stores/ui-store";
import { FAQS } from "@/lib/constants/faq";
import { springReveal, staggerContainer, viewportOnce } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/**
 * FAQ Section — objection handling (CRO).
 * Accordion dengan AnimatePresence height animation + chevron rotate.
 */
export function FaqSection() {
  const openIndex = useUiStore((s) => s.openFaq);
  const toggleFaq = useUiStore((s) => s.toggleFaq);

  return (
    <section id="faq" className="relative mx-auto max-w-4xl px-5 py-24">
      <SectionPlatformIcons
        positions={["right-[4%] top-[18%]", "left-[5%] top-[52%]", "right-[7%] bottom-[14%]"]}
      />

      <SectionHeader
        eyebrow="Masih Ragu?"
        titleBefore="Pertanyaan yang Sering "
        titleShimmer="Ditanyakan"
        titleAfter=""
      />

      <m.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-3"
      >
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <m.div
              key={i}
              variants={springReveal}
              className={cn(
                "overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors duration-300",
                isOpen
                  ? "border-electric-cyan/30 bg-white/80 shadow-glass"
                  : "border-navy/[0.06] bg-white/50 hover:border-navy/15 hover:bg-white/70"
              )}
            >
              <button
                onClick={() => toggleFaq(i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-heading text-sm font-bold text-navy sm:text-base">
                  {faq.q}
                </span>
                <m.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                    isOpen ? "bg-electric-cyan text-white" : "bg-navy/[0.06] text-navy"
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </m.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-slate-soft">
                      {faq.a}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          );
        })}
      </m.div>
    </section>
  );
}
