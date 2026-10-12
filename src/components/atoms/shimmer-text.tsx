import { cn } from "@/lib/utils/cn";

/**
 * Teks dengan sapuan kilau (shimmer) yang berjalan terus — aksen premium.
 * Basis warna navy, kilau cyan; menghindari kesan "gradasi AI".
 * Animasi CSS murni (background-position) — GPU-friendly, tanpa JS.
 */
export function ShimmerText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-[linear-gradient(110deg,#0F172A_35%,#06B6D4_50%,#0F172A_65%)]",
        "bg-[length:250%_100%] animate-shimmer",
        className
      )}
    >
      {children}
    </span>
  );
}
