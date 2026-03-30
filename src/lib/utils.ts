import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Platform } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const PLATFORM_CONFIG: Record<Platform, { label: string; color: string; bgColor: string }> = {
  whatsapp: { label: 'WhatsApp', color: 'text-green-800',  bgColor: 'bg-green-100' },
  telegram: { label: 'Telegram', color: 'text-blue-700',   bgColor: 'bg-blue-100' },
  discord:  { label: 'Discord',  color: 'text-purple-700', bgColor: 'bg-purple-100' },
  signal:   { label: 'Signal',   color: 'text-teal-700',   bgColor: 'bg-teal-100' },
  facebook: { label: 'Facebook', color: 'text-blue-800',   bgColor: 'bg-blue-50' },
  nextdoor: { label: 'Nextdoor', color: 'text-green-800',  bgColor: 'bg-green-50' },
  other:    { label: 'Other',    color: 'text-muted',      bgColor: 'bg-paper' },
}
