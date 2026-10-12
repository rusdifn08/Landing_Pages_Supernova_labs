"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { SectionHeader } from "@/components/molecules/section-header";
import { SectionPlatformIcons } from "@/components/molecules/section-platform-icons";
import { BookingSim } from "./booking-sim";
import { PosSim } from "./pos-sim";
import { QrOrderSim } from "./qr-order-sim";
import { useUiStore } from "@/stores/ui-store";
import { PRODUCT_TABS } from "@/lib/constants/products";
import { springReveal, viewportOnce } from "@/lib/animations/variants";
import { IconSlot } from "@/components/atoms/icon-slot";
import { cn } from "@/lib/utils/cn";

/**
 * Products Section — Interactive Proof.
 * Tab switcher (layoutId underline) + 3 simulasi live:
 * Booking flow, POS scan, QR Ordering (Phone→KDS→Cashier).
 */
export function ProductsSection() {
  const activeTab = useUiStore((s) => s.activeProductTab);
  const setActiveTab = useUiStore((s) => s.setActiveProductTab);

  return (
    <section id="products" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionPlatformIcons
        positions={["right-[6%] top-[15%]", "left-[5%] top-[45%]", "right-[8%] bottom-[12%]"]}
      />

      <SectionHeader
        eyebrow="Lihat Langsung"
        titleBefore="Simulasi Produk "
        titleShimmer="Real-Time"
        titleAfter=""
        description="Bukan mockup. Ini simulasi fungsional dari sistem yang akan Anda miliki — klik, scan, dan rasakan alurnya."
      />

      {/* Tab switcher */}
      <m.div
        variants={springReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {PRODUCT_TABS.map((tab, i) => {
          const isActive = activeTab === i;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={cn(
                "group relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300",
                isActive ? "text-white" : "text-slate-soft hover:text-navy"
              )}
            >
              {isActive && (
                <m.span
                  layoutId="product-tab-bg"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-navy shadow-lg"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <IconSlot icon={tab.icon} className="h-4 w-4" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </m.div>

      {/* Simulasi aktif — AnimatePresence crossfade */}
      <AnimatePresence mode="wait">
        <m.div
          key={activeTab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {activeTab === 0 && <BookingSim />}
          {activeTab === 1 && <PosSim />}
          {activeTab === 2 && <QrOrderSim />}
        </m.div>
      </AnimatePresence>
    </section>
  );
}
