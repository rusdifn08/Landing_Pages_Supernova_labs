/**
 * Footer — identitas brand + tagline. Server component (tanpa interaksi).
 */
export function Footer() {
  return (
    <footer className="border-t border-navy/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Logo Supernova Labs Studio"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          </span>
          <span className="font-heading text-sm font-bold text-navy">
            Supernova Labs Studio
          </span>
        </div>
        <p className="text-xs text-slate-soft">
          © {new Date().getFullYear()} · Specialist All-in-One Multiplatform
          Apps · 1x Bayar, Milik Anda Selamanya
        </p>
      </div>
    </footer>
  );
}
