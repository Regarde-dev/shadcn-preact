import { type RefObject, useEffect, useState } from "preact/compat";

export interface UseArrowKeyNavigationOptions {
  enabled?: boolean;
  selector?: string;
  orientation?: "vertical" | "horizontal" | "both";
  loop?: boolean;
  onSelect?: (index: number, element: HTMLElement) => void;
}

/**
 * Hook to handle arrow key navigation within a container
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 * @returns Object containing focusedIndex state
 */
export function useArrowKeyNavigation(
  containerRef: RefObject<HTMLElement>,
  options: UseArrowKeyNavigationOptions = {}
) {
  const {
    enabled = true,
    selector = '[role="option"]:not([data-disabled="true"])',
    orientation = "vertical",
    loop = true,
    onSelect,
  } = options;

  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const items = Array.from(containerRef.current?.querySelectorAll<HTMLElement>(selector) || []);

      if (items.length === 0) return;

      const isVertical = orientation === "vertical" || orientation === "both";
      const isHorizontal = orientation === "horizontal" || orientation === "both";

      switch (e.key) {
        case "ArrowDown":
          if (!isVertical) return;
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev === -1 ? 0 : loop ? (prev + 1) % items.length : Math.min(prev + 1, items.length - 1);
            items[next]?.focus();
            return next;
          });
          break;

        case "ArrowUp":
          if (!isVertical) return;
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next =
              prev === -1 ? items.length - 1 : loop ? (prev - 1 + items.length) % items.length : Math.max(prev - 1, 0);
            items[next]?.focus();
            return next;
          });
          break;

        case "ArrowRight":
          if (!isHorizontal) return;
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev === -1 ? 0 : loop ? (prev + 1) % items.length : Math.min(prev + 1, items.length - 1);
            items[next]?.focus();
            return next;
          });
          break;

        case "ArrowLeft":
          if (!isHorizontal) return;
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next =
              prev === -1 ? items.length - 1 : loop ? (prev - 1 + items.length) % items.length : Math.max(prev - 1, 0);
            items[next]?.focus();
            return next;
          });
          break;

        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          items[0]?.focus();
          break;

        case "End":
          e.preventDefault();
          setFocusedIndex(items.length - 1);
          items[items.length - 1]?.focus();
          break;

        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < items.length && items[focusedIndex]) {
            onSelect?.(focusedIndex, items[focusedIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, containerRef, selector, orientation, loop, focusedIndex, onSelect]);

  return { focusedIndex, setFocusedIndex };
}
