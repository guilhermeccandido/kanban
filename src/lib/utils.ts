import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEarilerDate(d1: number | undefined, d2: number | undefined) {
  if (!d1 && !d2) return undefined
  if (!d1) return d2
  if (!d2) return d1
  return d1 < d2 ? d1 : d2
}