/**
 * Data produk & simulasi — tiga pilar utama.
 */
import {
  Camera,
  Clock,
  Package,
  QrCode,
  ScanLine,
  Smartphone,
  Users,
  CreditCard,
  Wallet,
} from "lucide-react";

/* --- Products (meta per pilar; komponen simulasi dipasang di section) --- */
export const PRODUCT_TABS = [
  {
    id: "booking",
    label: "Booking System",
    icon: Clock,
    title: "Booking Apps with Management Operational",
    desc: "Real-time multiplatform booking yang mencegah double-booking. Zero missed revenue untuk studio foto, PS rental, klinik, dan arena olahraga.",
    market: "Photo Studios · PS Rentals · Clinics · Sports Arenas",
  },
  {
    id: "pos",
    label: "Cashier & Inventory",
    icon: ScanLine,
    title: "Cashier Apps & Automatic Stock Opname",
    desc: "POS secepat kilat terintegrasi native dengan inventory otomatis & QR barcode scanning. Stop kehilangan aset fisik.",
    market: "Retail · Pharmacy · F&B · Warehouse · Boutique",
  },
  {
    id: "qr",
    label: "QR Table Ordering",
    icon: Smartphone,
    title: "Fully Integrated Contactless QR Table Ordering",
    desc: "Pelanggan cukup scan QR di meja, pilih menu, dan pesan dari HP. Order otomatis masuk ke Kitchen Display System & Cashier Display secara bersamaan — dapur memasak, kasir memantau, pelanggan melihat status live.",
    market: "Restaurant · Cafe · Coffee Shop · Beach Club",
  },
];

/* --- Booking simulation --- */
export const BOOKING_STUDIOS = [
  { id: "A", name: "Studio A", type: "Self Photo", icon: Camera, from: 150000 },
  { id: "B", name: "Studio B", type: "Family & Group", icon: Users, from: 250000 },
  { id: "C", name: "Studio C", type: "Product Shoot", icon: Package, from: 350000 },
];

export type BookingStudio = (typeof BOOKING_STUDIOS)[number];

export const BOOKING_TIMES = ["13:00", "14:00", "15:00", "16:00"];

export const BOOKING_PACKAGES = [
  { id: "basic", name: "Basic", dur: "30 menit", add: 0 },
  { id: "premium", name: "Premium", dur: "60 menit", add: 100000 },
  { id: "exclusive", name: "Exclusive", dur: "90 menit + Editing", add: 250000 },
];

export type BookingPackage = (typeof BOOKING_PACKAGES)[number];

export const BOOKING_STEP_LABELS = [
  "Pilih Studio",
  "Jadwal & Paket",
  "Pembayaran",
  "Sinkronisasi",
];

export const BOOKING_PAYMENT_METHODS = [
  { icon: QrCode, label: "QRIS" },
  { icon: CreditCard, label: "Kartu" },
  { icon: Wallet, label: "E-Wallet" },
];

/* --- QR ordering simulation --- */
export const QR_MENU = [
  { id: "fries", name: "Truffle Fries", emoji: "🍟", price: 45000 },
  { id: "burger", name: "Wagyu Burger", emoji: "🍔", price: 85000 },
  { id: "matcha", name: "Matcha Latte", emoji: "🍵", price: 38000 },
];

export const QR_PHONE_STEPS = ["Terkirim", "Diterima", "Dimasak", "Ready"];
