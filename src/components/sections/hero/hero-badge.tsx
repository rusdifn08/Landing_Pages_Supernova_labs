"use client";

import * as m from "framer-motion/m";
import { ShimmerText } from "@/components/atoms/shimmer-text";

/**
 * Hero badge — sub-badge spesialisasi dengan shimmer teks (loop).
 */
export function HeroBadge() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] sm:text-sm"
    >
      <span className="h-px w-6 bg-navy/20" />
      <ShimmerText>Specialist All-in-One Multiplatform Apps</ShimmerText>
      <span className="h-px w-6 bg-navy/20" />
    </m.div>
  );
}
