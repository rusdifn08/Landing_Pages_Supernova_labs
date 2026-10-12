/**
 * Konten statis landing page — dipisah dari komponen agar mudah dirawat.
 */
import { Package, Wallet, Wrench } from "lucide-react";

/* --- Problem section: SaaS vs Supernova --- */
export const SAAS_POINTS = [
  "Beli Web & Mobile terpisah — biaya berlipat ganda",
  "Langganan bulanan mahal dan terus naik tiap tahun",
  "Data bisnis Anda disandera di cloud mereka",
  "Fitur dibatasi; setiap upgrade berbayar mahal",
  "Berhenti bayar → seluruh akses langsung hilang",
];

export const SUPERNOVA_POINTS = [
  "Bayar 1x untuk 3 platform: Web, Desktop & Mobile sekaligus",
  "Biaya layanan ringan — hanya mulai Rp49.000/bulan",
  "Tambah fitur kustom kapan pun dengan biaya terjangkau",
  "Source code & data 100% milik Anda selamanya",
  "Unlimited users, tanpa paywall & tanpa data disandera",
];

/* --- Hero --- */
export const HERO_HEADLINE = [
  "Premium",
  "Multiplatform",
  "Apps.",
  "1x",
  "Bayar.",
  "Milik",
  "Anda",
  "Selamanya.",
];

export const HERO_VALUE_CHIPS = [
  {
    icon: Package,
    title: "3 Platform Sekaligus",
    sub: "Web · Desktop · Mobile",
    iconBg: "bg-electric-cyan",
    subColor: "text-electric-cyan",
    hoverGlow: "0 16px 40px rgba(6,182,212,0.3)",
    hoverBorder: "hover:border-electric-cyan/50",
    sweep: "via-electric-cyan/10",
    delay: 0,
  },
  {
    icon: Wallet,
    title: "Biaya Layanan Rp49rb",
    sub: "Ringan per bulan",
    iconBg: "bg-vivid-purple",
    subColor: "text-vivid-purple",
    hoverGlow: "0 16px 40px rgba(124,58,237,0.3)",
    hoverBorder: "hover:border-vivid-purple/50",
    sweep: "via-vivid-purple/10",
    delay: 0.5,
  },
  {
    icon: Wrench,
    title: "Custom Fitur Fleksibel",
    sub: "Biaya terjangkau",
    iconBg: "bg-hot-magenta",
    subColor: "text-hot-magenta",
    hoverGlow: "0 16px 40px rgba(217,70,239,0.3)",
    hoverBorder: "hover:border-hot-magenta/50",
    sweep: "via-hot-magenta/10",
    delay: 1,
  },
];

/* --- Tech stack marquee (logo via Simple Icons CDN) --- */
export const TECH_STACK = [
  { name: "Next.js", slug: "nextdotjs/0F172A" },
  { name: "Rust", slug: "rust/CE412B" },
  { name: "Flutter", slug: "flutter" },
  { name: "Tauri", slug: "tauri" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Redis", slug: "redis" },
  { name: "Docker", slug: "docker" },
  { name: "TypeScript", slug: "typescript" },
];
