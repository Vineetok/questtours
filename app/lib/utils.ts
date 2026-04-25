import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null) return '₹0';
  const numericAmount = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
  if (isNaN(numericAmount)) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericAmount);
}
