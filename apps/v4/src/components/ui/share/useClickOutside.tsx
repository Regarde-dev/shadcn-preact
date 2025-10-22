import { type RefObject, useEffect } from "preact/compat";

export interface UseClickOutsideOptions {
  enabled?: boolean;
}

/**
 * Hook to detect clicks outside of specified elements
 * @param refs - Array of refs to check against
 * @param callback - Function to call when click is outside all refs
 * @param options - Configuration options
 */
export function useClickOutside(
  refs: Array<RefObject<HTMLElement>>,
  callback: () => void,
  options: UseClickOutsideOptions = {}
) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      const isOutside = refs.every((ref) => {
        return ref.current && !ref.current.contains(e.target as Node);
      });

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [enabled, callback, refs]);
}
