/**
 * Shared domain types — Supernova Labs Studio landing page.
 */

export type OrderStatus = "new" | "accepted" | "cooking" | "ready";

export interface OrderItem {
  name: string;
  emoji: string;
  price: number;
  qty: number;
}

export interface Order {
  items: OrderItem[];
  total: number;
}

export interface CartItem {
  name: string;
  price: number;
}

export interface LeadFormData {
  name: string;
  business: string;
  whatsapp: string;
}

export type QrPhase = "scan" | "scanning" | "menu" | "status";
