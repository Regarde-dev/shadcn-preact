/**
 * Throttle Utility
 * 
 * Framework-agnostic throttle function for rate-limiting callbacks.
 * Based on @ai-sdk/react throttle implementation.
 */

/**
 * Throttles a function to execute at most once per specified wait time.
 * 
 * @param func - Function to throttle
 * @param wait - Minimum time between executions in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => void>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: unknown[] | null = null;

  const throttled = (...args: unknown[]) => {
    lastArgs = args;

    if (timeout === null) {
      func(...args);
      lastArgs = null;

      timeout = setTimeout(() => {
        timeout = null;
        if (lastArgs !== null) {
          throttled(...lastArgs);
        }
      }, wait);
    }
  };

  return throttled as T;
}

