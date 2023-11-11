import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function arr_diff(a1: unknown[], a2: unknown[]) {
  if (a1.length === 0 && a2.length === 0) return false;
  if (a1.length === 0 && a2.length > 0) return true;
  if (a1.length > 0 && a2.length === 0) return true;
  return a1.filter((x) => !a2.includes(x)).length > 0;
}
