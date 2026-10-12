"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * LazyMotion wrapper — memuat fitur framer-motion secara lazy (domAnimation
 * saja, bukan domMax). Mengurangi ukuran bundle awal secara signifikan
 * (~20KB+ lebih kecil) tanpa mengubah animasi yang ada.
 *
 * Semua komponen menggunakan <m.div> (bukan <motion.div>) agar fitur
 * diresolve melalui konteks LazyMotion ini.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
