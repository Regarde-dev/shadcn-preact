import { autoUpdate, flip, offset, shift, useFloating, type Placement } from "@floating-ui/react-dom";
import type { ButtonHTMLAttributes } from "preact";
import { type HTMLAttributes, type PropsWithChildren, createContext, forwardRef, useEffect, useRef } from "preact/compat";
import { useContext } from "preact/hooks";
import { Portal } from "./portal";
import { cn } from "./share/cn";
import { useComposedRefs } from "./share/compose_ref";
import { Slot } from "./share/slot";
import { useClickOutside } from "./share/useClickOutside";
import { useControlledState } from "./share/useControlledState";
import { useEscapeKeyDown } from "./share/useEscapeKeyDown";

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: { current: HTMLElement | null };
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

export type PopoverProps = PropsWithChildren & {
  /**
   * The controlled open state of the popover.
   */
  open?: boolean;

  /**
   * The default open state when uncontrolled.
   */
  defaultOpen?: boolean;

  /**
   * Event handler called when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
};

export const Popover = ({ children, open: controlledOpen, defaultOpen, onOpenChange }: PopoverProps) => {
  const triggerRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useControlledState({
    defaultValue: Boolean(defaultOpen),
    controlledValue: controlledOpen,
    onChange: onOpenChange,
  });

  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};
Popover.displayName = "Popover";

export function usePopover() {
  const c = useContext(PopoverContext);
  if (!c) throw new Error("usePopover should be used within Popover");
  return c;
}

export type PopoverTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    /**
     * Change the default rendered element for the one passed as a child,
     * merging their props and behavior.
     */
    asChild?: boolean;
  };

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild, ...props }, forwardedRef) => {
    const { setOpen, triggerRef, open } = usePopover();
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={(node: HTMLElement | null) => {
          triggerRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node as any);
          } else if (forwardedRef) {
            (forwardedRef as any).current = node;
          }
        }}
        type="button"
        data-slot="popover-trigger"
        data-state={open ? "open" : "closed"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

export type PopoverContentProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The preferred side of the trigger to render against when open.
   * @default "bottom"
   */
  side?: "top" | "right" | "bottom" | "left";

  /**
   * The preferred alignment against the trigger.
   * @default "center"
   */
  align?: "start" | "center" | "end";

  /**
   * The distance in pixels from the trigger.
   * @default 4
   */
  sideOffset?: number;

  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: number;
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { className, class: classNative, children, side = "bottom", align = "center", sideOffset = 4, alignOffset = 0, ...props },
    forwardedRef
  ) => {
    const { open, setOpen, triggerRef } = usePopover();
    const contentRef = useRef<HTMLDivElement>(null);

    // Build placement from side and align
    let placement: Placement = side;
    if (align !== "center") {
      placement = `${side}-${align}` as Placement;
    }

    const { refs, floatingStyles } = useFloating({
      open,
      strategy: "fixed",
      placement,
      middleware: [offset(sideOffset + alignOffset), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
      transform: false,
    });

    // Connect the trigger ref to floating-ui
    useEffect(() => {
      if (triggerRef.current) {
        refs.setReference(triggerRef.current);
      }
    }, [refs, triggerRef]);

    // Auto-focus first input when popover opens
    useEffect(() => {
      if (open && contentRef.current) {
        const firstInput = contentRef.current.querySelector("input");
        if (firstInput) {
          firstInput.select();
        }
      }
    }, [open]);

    const composedRefs = useComposedRefs(contentRef, forwardedRef as any, (node: HTMLDivElement | null) =>
      refs.setFloating(node)
    );

    // Handle escape key with focus restoration
    useEscapeKeyDown(() => setOpen(false), {
      enabled: open,
      restoreFocus: triggerRef as any,
    });

    // Handle click outside
    useClickOutside([contentRef, triggerRef as any], () => setOpen(false), {
      enabled: open,
    });

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={composedRefs}
          data-slot="popover-content"
          data-side={side}
          data-align={align}
          data-state={open ? "open" : "closed"}
          role="dialog"
          aria-modal="false"
          style={floatingStyles}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
            "fade-in-0 zoom-in-95 animate-in data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
            classNative
          )}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

