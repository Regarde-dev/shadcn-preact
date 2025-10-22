import { type RefObject, useEffect } from "preact/compat";

export interface UseEscapeKeyDownOptions {
  enabled?: boolean;
  restoreFocus?: RefObject<HTMLElement>;
}

/**
 * Hook to handle Escape key press with optional focus restoration
 * @param callback - Function to call when Escape is pressed
 * @param options - Configuration options
 */
export function useEscapeKeyDown(callback: () => void, options: UseEscapeKeyDownOptions = {}) {
  const { enabled = true, restoreFocus } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
        if (restoreFocus?.current) {
          restoreFocus.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, callback, restoreFocus]);
}
