import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(val: string) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function text(val: string) {
	return capitalize(val).replace('_', '-');
}
