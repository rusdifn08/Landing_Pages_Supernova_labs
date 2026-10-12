import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Font di-self-host dari public/fonts (unduhan Google Fonts, subset latin + latin-ext).
// Dipakai next/font/local — bukan next/font/google — supaya build TIDAK butuh
// akses jaringan ke fonts.googleapis.com. Ini yang membuat build gagal di Vercel.
// Space Grotesk: heading geometris modern dengan kerning rapat (otoritas visual)
const heading = localFont({
  src: [
    { path: "../public/fonts/space-grotesk-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/space-grotesk-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/space-grotesk-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/space-grotesk-700-latin.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/space-grotesk-400-latin-ext.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/space-grotesk-500-latin-ext.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/space-grotesk-600-latin-ext.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/space-grotesk-700-latin-ext.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

// Plus Jakarta Sans: body font bersih & sangat legible
const body = localFont({
  src: [
    { path: "../public/fonts/plus-jakarta-sans-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-700-latin.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-800-latin.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-400-latin-ext.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-500-latin-ext.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-600-latin-ext.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-700-latin-ext.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-800-latin-ext.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supernova Labs Studio — Premium Multiplatform Apps. 1x Bayar, Milik Anda Selamanya.",
  description:
    "Kami membangun sistem enterprise multiplatform (Web, Desktop, Mobile) yang 100% milik Anda. Tanpa langganan bulanan. Tanpa data disandera. Booking System, POS + Inventory, dan QR Table Ordering.",
  keywords: [
    "software agency",
    "aplikasi kasir",
    "booking system",
    "QR table ordering",
    "multiplatform apps",
    "one-time payment software",
  ],
  // Logo brand dipakai sebagai favicon / ikon tab browser.
  // app/icon.svg (konvensi App Router) juga otomatis di-inject oleh Next.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${heading.variable} ${body.variable} font-body bg-pearl text-navy antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
