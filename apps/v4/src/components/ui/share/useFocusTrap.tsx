import { type RefObject, useEffect } from "preact/compat";

export interface UseFocusTrapOptions {
  enabled?: boolean;
  initialFocus?: "first" | "last" | RefObject<HTMLElement>;
  restoreFocus?: boolean;
}

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Hook to trap focus within a container (for modals/dialogs)
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 */
export function useFocusTrap(containerRef: RefObject<HTMLElement>, options: UseFocusTrapOptions = {}) {
  const { enabled = true, initialFocus = "first", restoreFocus = true } = options;

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const previouslyFocused = document.activeElement as HTMLElement;

    // Set initial focus
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusableElements.length > 0) {
      if (initialFocus === "first") {
        focusableElements[0]?.focus();
      } else if (initialFocus === "last") {
        focusableElements[focusableElements.length - 1]?.focus();
      } else if (initialFocus && "current" in initialFocus) {
        initialFocus.current?.focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (restoreFocus && previouslyFocused) {
        previouslyFocused.focus();
      }
    };
  }, [enabled, containerRef, initialFocus, restoreFocus]);
}
