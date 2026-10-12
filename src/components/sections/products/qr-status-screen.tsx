"use client";

import * as m from "framer-motion/m";
import { QrCode, RefreshCw } from "lucide-react";
import { useQrOrderStore, selectQrCartTotal } from "@/stores/qr-order-store";
import { formatIDR } from "@/lib/format/currency";
import { cn } from "@/lib/utils/cn";

/** Layar phone — fase tracking status pesanan (progress bar bertahap). */
export function QrStatusScreen() {
  const status = useQrOrderStore((s) => s.status);
  const cartTotal = useQrOrderStore(selectQrCartTotal);
  const reset = useQrOrderStore((s) => s.reset);

  return (
    <div className="flex h-full flex-col items-center justify-center px-5 py-4 text-center">
      {status === "ready" ? (
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-electric-cyan shadow-[0_8px_30px_rgba(6,182,212,0.4)]"
        >
          <QrCode className="h-7 w-7 text-white" />
        </m.div>
      ) : (
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-navy/10 border-t-navy"
        >
          <QrCode className="h-6 w-6 text-navy/40" />
        </m.div>
      )}
      <p className="font-heading text-sm font-bold text-navy">
        {status === "new" && "Pesanan Terkirim"}
        {status === "accepted" && "Pesanan Dikonfirmasi"}
        {status === "cooking" && "Sedang Diproses Dapur"}
        {status === "ready" && "Siap Disajikan! 🎉"}
      </p>
      <p className="mt-1 text-[10px] text-slate-soft">
        Total: {formatIDR(cartTotal)} · Meja 12
      </p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-navy/[0.08]">
        <m.div
          animate={{
            width:
              status === "new"
                ? "25%"
                : status === "accepted"
                  ? "50%"
                  : status === "cooking"
                    ? "75%"
                    : "100%",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={cn(
            "h-full rounded-full",
            status === "ready" ? "bg-electric-cyan" : "bg-navy"
          )}
        />
      </div>
      <button
        onClick={reset}
        className="mt-5 flex items-center gap-1.5 rounded-xl border border-navy/[0.08] bg-white/60 px-5 py-2 text-[10px] font-bold text-navy transition-all duration-200 hover:shadow-glass active:scale-95"
      >
        <RefreshCw className="h-3 w-3" /> Ulangi Simulasi
      </button>
    </div>
  );
}
