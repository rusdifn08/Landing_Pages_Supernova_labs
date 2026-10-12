"use client";

import * as m from "framer-motion/m";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useQrOrderStore, selectTotalQty, selectQrCartTotal } from "@/stores/qr-order-store";
import { QR_MENU } from "@/lib/constants/products";
import { formatIDR } from "@/lib/format/currency";

/** Layar phone — fase menu (pilih item + keranjang real-time). */
export function QrMenuScreen() {
  const cart = useQrOrderStore((s) => s.cart);
  const totalQty = useQrOrderStore(selectTotalQty);
  const cartTotal = useQrOrderStore(selectQrCartTotal);
  const addItem = useQrOrderStore((s) => s.addItem);
  const removeItem = useQrOrderStore((s) => s.removeItem);
  const placeOrder = useQrOrderStore((s) => s.placeOrder);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-navy/[0.06] px-5 py-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-soft">
          Menu · Meja 12
        </span>
        <div className="relative">
          <ShoppingCart className="h-4 w-4 text-navy" />
          {totalQty > 0 && (
            <m.span
              key={totalQty}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-hot-magenta text-[8px] font-bold text-white"
            >
              {totalQty}
            </m.span>
          )}
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-5 py-3">
        {QR_MENU.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-navy/[0.06] bg-white px-3 py-2 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/[0.04] text-lg">
                {item.emoji}
              </span>
              <div>
                <p className="text-[11px] font-bold text-navy">{item.name}</p>
                <p className="text-[10px] font-semibold text-electric-cyan">
                  {formatIDR(item.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <m.button
                onClick={() => removeItem(item.id)}
                whileTap={{ scale: 0.85 }}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-navy/10 bg-white text-navy transition-colors hover:border-hot-magenta/40 disabled:opacity-40"
                disabled={(cart[item.id] ?? 0) === 0}
              >
                <Minus className="h-3 w-3" />
              </m.button>
              <span className="w-5 text-center text-xs font-bold text-navy">
                {cart[item.id] ?? 0}
              </span>
              <m.button
                onClick={() => addItem(item.id)}
                whileTap={{ scale: 0.85 }}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-navy/10 bg-white text-navy transition-colors hover:border-electric-cyan/40"
              >
                <Plus className="h-3 w-3" />
              </m.button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-navy/[0.06] px-5 py-3">
        <div className="mb-2 flex justify-between text-xs font-bold text-navy">
          <span>Total</span>
          <m.span key={cartTotal} initial={{ scale: 1.25 }} animate={{ scale: 1 }}>
            {formatIDR(cartTotal)}
          </m.span>
        </div>
        <m.button
          onClick={placeOrder}
          disabled={totalQty === 0}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-xl bg-navy py-2.5 text-xs font-bold text-white shadow-lg transition-all duration-200 hover:shadow-glass-lg active:shadow-sm disabled:opacity-40"
        >
          Pesan Sekarang
        </m.button>
      </div>
    </div>
  );
}
