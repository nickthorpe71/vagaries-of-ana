import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names and tailwind classes
 * @param inputs - Class names and tailwind classes
 * @returns Combined class names and tailwind classes
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
