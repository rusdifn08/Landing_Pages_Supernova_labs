import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes dengan aman (clsx + tailwind-merge).
 * Dipakai di seluruh komponen untuk className yang kondisional.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
