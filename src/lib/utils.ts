import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateName = (name: string): boolean => {
  return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

export const commonNigerianNames = [
  'Oluwaseun',
  'Chioma',
  'Adebayo',
  'Ngozi',
  'Olayinka',
  'Chidi',
  'Folake',
  'Babajide',
  'Chinua',
  'Aisha',
];