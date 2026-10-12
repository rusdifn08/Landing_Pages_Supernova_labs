"use client";

import * as m from "framer-motion/m";
import { AnimatePresence } from "framer-motion";
import { Clock, RefreshCw } from "lucide-react";
import { useQrOrderStore } from "@/stores/qr-order-store";
import { formatIDR } from "@/lib/format/currency";
import { cn } from "@/lib/utils/cn";
import type { OrderStatus } from "@/types";

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: "border-amber-300/30 bg-amber-500/10",
  accepted: "border-electric-cyan/30 bg-electric-cyan/10",
  cooking: "border-orange-400/30 bg-orange-500/10",
  ready: "border-green-400/30 bg-green-500/10",
};

/** Kitchen Display System — pesanan masuk real-time, dapur advance status. */
export function QrKdsScreen() {
  const order = useQrOrderStore((s) => s.order);
  const status = useQrOrderStore((s) => s.status);
  const setStatus = useQrOrderStore((s) => s.setStatus);

  return (
    <div className="flex h-[336px] flex-col overflow-hidden rounded-2xl border border-navy/[0.08] bg-white shadow-glass-lg">
      <div className="flex items-center justify-between rounded-t-2xl bg-navy px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", order && status !== "ready" ? "animate-pulse bg-amber-400" : order ? "bg-green-500" : "bg-slate-500")} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Kitchen Display</span>
        </div>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white">{order ? (status === "ready" ? "DONE" : "ACTIVE") : "WAITING"}</span>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden bg-slate-50 p-3">
        <AnimatePresence mode="wait">
          {!order ? (
            <m.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center text-slate-soft">
              <Clock className="mb-2 h-8 w-8 opacity-30" />
              <p className="text-[11px]">Menunggu pesanan masuk...</p>
            </m.div>
          ) : (
            <m.div key="order" initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 16 }} className={cn("rounded-xl border bg-white p-3 shadow-sm", STATUS_STYLE[status])}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-soft">Order #0412 · Meja 4</span>
                {status === "new" && <m.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1, repeat: Infinity }} className="rounded-full bg-luminous-pink px-2 py-0.5 text-[9px] font-bold uppercase text-white">Baru</m.span>}
              </div>
              <div className="mb-2 space-y-1">
                {order.items.map((it) => (
                  <div key={it.name} className="flex items-center justify-between text-[11px]">
                    <span className="text-navy">{it.emoji} {it.name} ×{it.qty}</span>
                    <span className="font-semibold text-slate-soft">{formatIDR(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
              {status !== "ready" ? (
                <m.button onClick={() => setStatus(status === "new" ? "accepted" : status === "accepted" ? "cooking" : "ready")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} className="w-full rounded-lg bg-navy py-2 text-[11px] font-bold text-white">
                  {status === "new" ? "Terima Order" : status === "accepted" ? "Mulai Masak" : "Selesai"}
                </m.button>
              ) : (
                <p className="rounded-lg bg-green-50 py-1.5 text-center text-[10px] font-bold text-green-600">✓ Pesanan siap diantar</p>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Cashier/Dashboard — total transaksi & status sinkron real-time. */
export function QrCashierScreen() {
  const order = useQrOrderStore((s) => s.order);
  const status = useQrOrderStore((s) => s.status);
  const cashierAck = useQrOrderStore((s) => s.cashierAck);
  const acceptByCashier = useQrOrderStore((s) => s.acceptByCashier);
  const reset = useQrOrderStore((s) => s.reset);

  return (
    <div className="flex h-[336px] flex-col rounded-2xl border border-navy/[0.08] bg-white shadow-glass-lg">
      <div className="mb-3 flex items-center justify-between border-b border-navy/[0.06] px-4 pb-3 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-soft">Kasir / Dashboard</p>
        <span className={cn("flex items-center gap-1.5 text-[10px] font-bold", order ? "text-electric-cyan" : "text-slate-soft")}>
          <span className={cn("h-1.5 w-1.5 rounded-full", order && status === "ready" ? "animate-pulse bg-green-500" : order ? "animate-pulse bg-electric-cyan" : "bg-slate-300")} />
          {order ? (status === "ready" ? "READY" : "MONITORING") : "WAITING"}
        </span>
      </div>
      <div className="min-h-0 flex-1 px-4 pt-3">
        <AnimatePresence mode="wait">
          {!order ? (
            <m.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center text-slate-soft">
              <p className="text-[11px]">Belum ada transaksi baru...</p>
            </m.div>
          ) : (
            <m.div key="order" initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.15 }}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-navy">Order #0412 · Meja 4</span>
              {!cashierAck && <m.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1, repeat: Infinity }} className="rounded-full bg-luminous-pink px-2 py-0.5 text-[9px] font-bold uppercase text-white">Baru</m.span>}
            </div>
            <div className="mb-2 space-y-1">
              {order.items.map((it) => (
                <div key={it.name} className="flex items-center justify-between text-[11px]">
                  <span className="text-navy">{it.emoji} {it.name} ×{it.qty}</span>
                  <span className="font-semibold text-navy">{formatIDR(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mb-3 flex items-center justify-between border-t border-navy/5 pt-2">
              <span className="text-[11px] font-semibold text-slate-soft">Total</span>
              <span className="font-heading text-sm font-bold text-navy">{formatIDR(order.total)}</span>
            </div>
            {!cashierAck ? (
              <m.button onClick={acceptByCashier} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} className="w-full rounded-lg bg-navy py-2 text-[11px] font-bold text-white shadow-lg">✓ Terima Order</m.button>
            ) : (
              <div className="space-y-1.5">
                <p className="rounded-lg bg-electric-cyan/10 py-1.5 text-center text-[10px] font-bold text-electric-cyan">Order diterima kasir ✓</p>
                {status !== "ready" && (
                  <div className={cn("flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10px] font-bold", status === "new" && "bg-amber-50 text-amber-600", status === "accepted" && "bg-electric-cyan/10 text-electric-cyan", status === "cooking" && "bg-orange-50 text-orange-600")}>
                    {status === "new" && "Menunggu dapur menerima..."}
                    {status === "accepted" && "Dapur menerima pesanan"}
                    {status === "cooking" && <m.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>🔥 Dapur sedang memasak...</m.span>}
                  </div>
                )}
              </div>
            )}
            <AnimatePresence>
              {status === "ready" && (
                <m.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 rounded-lg bg-green-500 py-2.5 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-white">🍽️ Pesanan Ready!</p>
                  <p className="text-[9px] text-green-100">Antar ke Meja 4 sekarang</p>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        )}
        </AnimatePresence>
      </div>
      <div className="px-4 pb-4">
        <button onClick={reset} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-navy/[0.08] bg-white/60 py-2 text-[10px] font-bold text-navy transition-all duration-200 hover:shadow-glass active:scale-[0.98]">
          <RefreshCw className="h-3 w-3" /> Reset
        </button>
      </div>
    </div>
  );
}

