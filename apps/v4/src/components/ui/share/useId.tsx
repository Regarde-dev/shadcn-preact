import { useRef } from "preact/compat";

/**
 * Hook to generate a unique ID for accessibility attributes
 * @param prefix - Optional prefix for the ID (useful for debugging)
 * @returns Unique ID string
 */
export function useId(prefix?: string): string {
  const idRef = useRef<string>();

  if (!idRef.current) {
    const randomId = Math.random().toString(36).substring(2, 9);
    idRef.current = prefix ? `${prefix}-${randomId}` : randomId;
  }

  return idRef.current;
}
