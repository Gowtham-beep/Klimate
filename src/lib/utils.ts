/**
 * Combines multiple class names into one string.
 * Useful for conditionally applying Tailwind or CSS classes.
 * @param classes - Array of class names or falsy values.
 * @returns A single string of combined class names.
 */
export function cn(...classes: (string | false | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
  }
  
  /**
   * A delay function that creates a promise for adding delays.
   * @param ms - Milliseconds to delay.
   * @returns A promise that resolves after the specified time.
   */
  export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  /**
   * Converts a string to title case.
   * @param str - The input string.
   * @returns The string in title case.
   */
  export function toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  