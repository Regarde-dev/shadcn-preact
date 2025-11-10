import { type RefObject, useEffect } from "preact/compat";

export interface UseEnterKeySubmitOptions {
  /**
   * Whether the hook is enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Whether to allow Shift+Enter for new lines (prevents submit)
   * @default true
   */
  allowShiftEnter?: boolean;

  /**
   * Whether to prevent default behavior
   * @default true
   */
  preventDefault?: boolean;
}

/**
 * Hook to handle Enter key press for form submission
 * Useful for input fields that should submit on Enter
 * 
 * @param inputRef - Ref to the input element
 * @param callback - Function to call when Enter is pressed (typically form.requestSubmit())
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * const inputRef = useRef<HTMLInputElement>(null);
 * 
 * useEnterKeySubmit(inputRef, () => {
 *   formRef.current?.requestSubmit();
 * });
 * 
 * return <input ref={inputRef} />;
 * ```
 */
export function useEnterKeySubmit(
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>,
  callback: () => void,
  options: UseEnterKeySubmitOptions = {}
) {
  const { enabled = true, allowShiftEnter = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled || !inputRef.current) return;

    const handleKeyDown = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      // Check if Enter key is pressed
      if (keyboardEvent.key === "Enter") {
        // If Shift+Enter is allowed and Shift is pressed, don't submit
        if (allowShiftEnter && keyboardEvent.shiftKey) {
          return;
        }

        if (preventDefault) {
          keyboardEvent.preventDefault();
        }

        callback();
      }
    };

    const element = inputRef.current;
    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [enabled, callback, inputRef, allowShiftEnter, preventDefault]);
}

