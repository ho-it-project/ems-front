import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function api<T>(
  url: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  return fetch(url, init).then((res) => {
    return res.json() as Promise<T>;
  });
}
