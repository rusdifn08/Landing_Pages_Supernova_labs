"use client";

import * as m from "framer-motion/m";
import { AnimatePresence } from "framer-motion";
import { Coffee, ScanLine } from "lucide-react";
import { GlassCard } from "@/components/atoms/glass-card";
import { usePosStore, selectCartTotal } from "@/stores/pos-store";
import { formatIDR } from "@/lib/format/currency";
import { cn } from "@/lib/utils/cn";

/** POS + Inventory simulation — scan QR → item masuk cart → stock turun. */
export function PosSim() {
  const cart = usePosStore((s) => s.cart);
  const stock = usePosStore((s) => s.stock);
  const scanning = usePosStore((s) => s.scanning);
  const flashRow = usePosStore((s) => s.flashRow);
  const simulateScan = usePosStore((s) => s.simulateScan);
  const total = usePosStore(selectCartTotal);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* LEFT: POS Checkout */}
      <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/60 p-5 shadow-glass backdrop-blur-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-heading text-sm font-bold text-navy">POS Checkout</h4>
          <span className="rounded-full bg-vivid-purple/10 px-2 py-0.5 text-[10px] font-bold text-vivid-purple">LIVE</span>
        </div>
        <m.button
          onClick={simulateScan}
          disabled={scanning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative mb-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-vivid-purple/40 bg-vivid-purple/5 py-4 text-sm font-semibold text-vivid-purple"
        >
          {scanning && (
            <m.div
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.7, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-luminous-pink to-transparent shadow-[0_0_12px_#EC4899]"
            />
          )}
          <ScanLine className={cn("h-4 w-4", scanning && "animate-pulse")} />
          {scanning ? "Scanning QR..." : "Simulate Scan QR: Add 'Premium Coffee'"}
        </m.button>
        <div className="min-h-[140px] space-y-2">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 && (
              <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8 text-center text-xs text-slate-soft">
                Keranjang kosong — scan untuk menambah item
              </m.p>
            )}
            {cart.map((item, i) => (
              <m.div
                key={`${item.name}-${i}`}
                initial={{ opacity: 0, x: -30, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-vivid-purple" />
                  <span className="text-sm font-medium text-navy">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-navy">{formatIDR(item.price)}</span>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
        {cart.length > 0 && (
          <div className="mt-3 flex items-center justify-between border-t border-navy/5 pt-3">
            <span className="text-xs font-semibold text-slate-soft">Total ({cart.length} item)</span>
            <m.span key={total} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="font-heading text-base font-bold text-navy">
              {formatIDR(total)}
            </m.span>
          </div>
        )}
      </div>
      {/* RIGHT: Inventory Database */}
      <GlassCard className="p-5" tilt>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-heading text-sm font-bold text-navy">Inventory Database</h4>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-soft">Auto Sync</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-navy/5">
          <div className="grid grid-cols-3 bg-navy/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-soft">
            <span>SKU</span>
            <span>Item</span>
            <span className="text-right">Stock</span>
          </div>
          <m.div
            animate={flashRow ? { backgroundColor: ["rgb(220,252,231)", "rgba(255,255,255,0.8)"] } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-3 items-center bg-white/80 px-3 py-3 text-sm"
          >
            <span className="font-mono text-xs text-slate-soft">CF-001</span>
            <span className="font-medium text-navy">Premium Coffee</span>
            <m.span
              key={stock}
              initial={{ scale: 1.3, color: "#16a34a" }}
              animate={{ scale: 1, color: "#0F172A" }}
              className="text-right font-heading text-base font-bold"
            >
              {stock}
            </m.span>
          </m.div>
          {[
            { sku: "TF-012", name: "Truffle Fries", stock: 48 },
            { sku: "ML-003", name: "Matcha Latte", stock: 72 },
          ].map((row) => (
            <div
              key={row.sku}
              className="grid grid-cols-3 border-t border-navy/5 bg-white/50 px-3 py-3 text-sm"
            >
              <span className="font-mono text-xs text-slate-soft">{row.sku}</span>
              <span className="font-medium text-navy">{row.name}</span>
              <span className="text-right font-heading font-bold text-navy">{row.stock}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-soft">
          Stock berkurang otomatis saat scan — zero lag inventory
        </p>
      </GlassCard>
    </div>
  );
}

