"use client";

import * as m from "framer-motion/m";
import { Camera, Check, QrCode, ScanLine } from "lucide-react";
import { useQrOrderStore } from "@/stores/qr-order-store";
import { cn } from "@/lib/utils/cn";

/**
 * Layar phone — fase scan QR (simulasi kamera viewfinder).
 * Animasi laser sweep vertikal di atas barcode QR + konfirmasi sukses.
 */
export function QrScanScreen({ onScan }: { onScan: () => void }) {
  const phase = useQrOrderStore((s) => s.phase);
  const scanOk = useQrOrderStore((s) => s.scanOk);
  const scanning = phase === "scanning";

  return (
    <div className="flex h-full flex-col px-5 py-4">
      <div className="mb-3 flex items-center gap-2">
        <Camera className="h-3.5 w-3.5 text-slate-soft" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-soft">
          Kamera · Scan QR Meja
        </span>
      </div>

      {/* Viewfinder — bingkai scan 4 sudut */}
      <div className="relative mx-auto w-full max-w-[210px] overflow-hidden rounded-2xl border border-navy/[0.06] bg-navy/[0.03] p-6">
        <div className="relative mx-auto flex h-[132px] w-[132px] items-center justify-center rounded-xl bg-white shadow-glass">
          <QrCode className="h-[104px] w-[104px] text-navy" strokeWidth={1.4} />

          {/* Animasi laser scanning — sweep vertikal */}
          {scanning && (
            <m.div
              aria-hidden
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 60, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-x-2 h-0.5 rounded-full bg-electric-cyan shadow-[0_0_14px_3px_rgba(6,182,212,0.75)]"
            />
          )}
          {scanning && (
            <m.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.28, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 rounded-xl bg-electric-cyan"
            />
          )}

          {/* Konfirmasi sukses */}
          {scanOk && (
            <m.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-green-500/15 backdrop-blur-[1px]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 shadow-[0_8px_24px_rgba(34,197,94,0.45)]">
                <Check className="h-6 w-6 text-white" strokeWidth={3} />
              </span>
            </m.div>
          )}
        </div>

        {/* Sudut bingkai */}
        {[
          "left-2 top-2 border-l-2 border-t-2 rounded-tl-lg",
          "right-2 top-2 border-r-2 border-t-2 rounded-tr-lg",
          "left-2 bottom-2 border-b-2 border-l-2 rounded-bl-lg",
          "right-2 bottom-2 border-b-2 border-r-2 rounded-br-lg",
        ].map((pos) => (
          <span
            key={pos}
            className={cn(
              "pointer-events-none absolute h-5 w-5 border-electric-cyan transition-opacity",
              pos,
              scanning ? "opacity-100" : "opacity-60"
            )}
          />
        ))}
      </div>

      <div className="mt-3 text-center">
        <p className="font-heading text-xs font-bold text-navy">Meja 12 · Lantai 1</p>
        <p className="mt-0.5 text-[10px] text-slate-soft">
          {scanning ? "Membaca kode…" : scanOk ? "QR terverifikasi!" : "Arahkan kamera ke QR di meja"}
        </p>
      </div>

      <m.button
        onClick={onScan}
        disabled={scanning || scanOk}
        whileHover={{ scale: scanning ? 1 : 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-200 disabled:cursor-not-allowed",
          scanOk
            ? "bg-green-500 text-white"
            : "bg-navy text-white shadow-lg hover:shadow-glass-lg disabled:opacity-50"
        )}
      >
        {scanOk ? (
          <>
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> Terverifikasi
          </>
        ) : (
          <>
            <ScanLine className={cn("h-3.5 w-3.5", scanning && "animate-pulse")} />
            {scanning ? "Mengscan…" : "Simulasi Scan QR"}
          </>
        )}
      </m.button>
    </div>
  );
}
