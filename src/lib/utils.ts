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

/**
 * Gets an environment variable or throws an error if it doesn't exist
 * @param key - Environment variable key
 * @returns Environment variable value
 */
export function getEnv(key: string): string {
    const value = process.env[key];
    if (
        !value ||
        value.length === 0 ||
        value === "undefined" ||
        value === "null"
    ) {
        throw new Error(`Missing env variable ${key}`);
    }
    return value;
}
