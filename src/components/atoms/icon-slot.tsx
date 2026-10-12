import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * IconSlot — renderer ikon data-driven.
 * Dipakai agar ikon dari array of objects dapat dirender tanpa JSX
 * member-expression (mis. `<item.icon />`) yang ambigu bagi parser TSX.
 */
export function IconSlot({
  icon: Icon,
  className,
  strokeWidth,
}: {
  icon: LucideIcon;
  className?: string;
  strokeWidth?: number | string;
}) {
  return <Icon className={cn(className)} strokeWidth={strokeWidth} />;
}