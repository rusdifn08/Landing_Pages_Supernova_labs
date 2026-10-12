"use client";

import * as m from "framer-motion/m";
import { useQrOrderStore, STATUS_STEP } from "@/stores/qr-order-store";
import { QrScanScreen } from "./qr-scan-screen";
import { QrMenuScreen } from "./qr-menu-screen";
import { QrStatusScreen } from "./qr-status-screen";
import { QrKdsScreen, QrCashierScreen } from "./qr-display-screens";
import { QR_PHONE_STEPS } from "@/lib/constants/products";
import { cn } from "@/lib/utils/cn";

/**
 * Simulasi QR Ordering 3-layer:
 * Phone (Customer) → KDS (Kitchen) → Cashier/Dashboard.
 * Status tracking menunjukkan journey order. State: qr-order-store (Zustand).
 */
export function QrOrderSim() {
  const phase = useQrOrderStore((s) => s.phase);
  const status = useQrOrderStore((s) => s.status);
  const scanTable = useQrOrderStore((s) => s.scanTable);

  const phoneStep =
    phase === "scan" || phase === "scanning"
      ? 0
      : phase === "menu"
        ? 1
        : STATUS_STEP[status];

  return (
    <div className="relative z-0 grid gap-6 text-left lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      {/* Phone (Customer) — frame potret + tombol home */}
      <div className="mx-auto w-full max-w-[304px]">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/60 shadow-glass-lg backdrop-blur-2xl">
          {/* Notch / dynamic island */}
          <div className="absolute left-1/2 top-2 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-navy/85" />

          <div className="flex h-[500px] flex-col pt-7">
            <div className="border-b border-navy/[0.06] px-5 pb-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-navy">
                  Customer Phone
                </span>
                <span className="flex h-5 items-center gap-1 rounded-full bg-navy/[0.06] px-2 text-[9px] font-bold text-slate-soft">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      phase === "status" ? "animate-pulse bg-electric-cyan" : "bg-green-500"
                    )}
                  />
                  {phase === "scan" || phase === "scanning" ? "KAMERA" : "AKTIF"}
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-slate-soft">
                {phase === "scan" && "Siap scan QR meja"}
                {phase === "scanning" && "Memindai kode meja…"}
                {phase === "menu" && "Pilih menu favorit Anda"}
                {phase === "status" && "Melacak status pesanan"}
              </p>
            </div>

            {/* Step rail — progres journey */}
            <div className="flex items-center gap-1 border-b border-navy/[0.06] px-5 py-2.5">
              {QR_PHONE_STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-1">
                  <m.span
                    animate={{
                      backgroundColor:
                        i <= phoneStep ? "#06B6D4" : "rgba(15,23,42,0.10)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
                  >
                    {i < phoneStep ? "✓" : i + 1}
                  </m.span>
                  {i < QR_PHONE_STEPS.length - 1 && (
                    <div className="h-0.5 flex-1 rounded-full bg-navy/10">
                      <m.div
                        animate={{ width: i < phoneStep ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                        className="h-full rounded-full bg-electric-cyan"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-5 py-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-soft">
                {QR_PHONE_STEPS[phoneStep]}
              </span>
              <span className="text-[9px] text-slate-soft">
                {phoneStep + 1}/{QR_PHONE_STEPS.length}
              </span>
            </div>

            {/* Layar aktif */}
            <div className="min-h-0 flex-1">
              {(phase === "scan" || phase === "scanning") && (
                <QrScanScreen onScan={scanTable} />
              )}
              {phase === "menu" && <QrMenuScreen />}
              {phase === "status" && <QrStatusScreen />}
            </div>
          </div>

          <div className="flex items-center justify-center pb-2 pt-1">
            <span className="h-1 w-24 rounded-full bg-navy/20" />
          </div>
        </div>
      </div>

      {/* KDS + Kasir — panel Operasional */}
      <div className="grid gap-6 sm:grid-cols-2 lg:sticky lg:top-24">
        <QrKdsScreen />
        <QrCashierScreen />
      </div>
    </div>
  );
}
