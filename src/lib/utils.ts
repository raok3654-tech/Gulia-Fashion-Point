import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string, rates: Record<string, number>) {
  const rate = rates[currency] || 1;
  const converted = price * rate;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'INR' ? 0 : 2,
  });

  return formatter.format(converted);
}
