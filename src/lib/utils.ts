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

/**
 * Constructs a chat URL segment (or identifier) by sorting two IDs and joining them with a double hyphen (`--`).
 * This ensures consistent and unique chat URLs or identifiers for two given IDs regardless of their order.
 *
 * @param {string} id1 - The first identifier.
 * @param {string} id2 - The second identifier.
 * @returns {string} The constructed chat URL segment or identifier.
 * @example
 * // returns "123--456"
 * chatHrefConstructor('456', '123');
 *
 * // returns "123--456"
 * chatHrefConstructor('123', '456');
 */
export function chatHrefConstructor(id1: string, id2: string): string {
    const sortedIds = [id1, id2].sort();
    return `${sortedIds[0]}--${sortedIds[1]}`;
}

/**
 * Converts a given key by replacing all colons (:) with double underscores (__).
 * This is typically useful for transforming keys to be compliant with certain systems,
 * like Pusher, which might have restrictions on characters used in keys.
 *
 * @param {string} key - The original key containing colons.
 * @returns {string} The transformed key with colons replaced by double underscores.
 */
export function toPusherKey(key: string): string {
    return key.replace(/:/g, "__");
}
