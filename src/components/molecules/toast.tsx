"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { Check } from "lucide-react";

/**
 * Toast notifikasi sukses — muncul fixed di kanan bawah, auto-dismiss
 * dikelola oleh store pemanggil.
 */
export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <m.div
          initial={{ opacity: 0, y: 40, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-28 right-6 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-electric-cyan/30 bg-white/90 p-4 shadow-glass-lg backdrop-blur-2xl"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric-cyan">
            <Check className="h-4 w-4 text-white" />
          </div>
          <p className="text-sm font-medium leading-snug text-navy">{message}</p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
