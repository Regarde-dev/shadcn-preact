import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/react-dom";
import type { ButtonHTMLAttributes } from "preact";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  createContext,
  forwardRef,
  useEffect,
  useRef,
} from "preact/compat";
import { useContext } from "preact/hooks";
import { Portal } from "./portal";
import { cn } from "./share/cn";
import { useComposedRefs } from "./share/compose_ref";
import { Slot } from "./share/slot";
import { useControlledState } from "./share/useControlledState";
import { useId } from "./share/useId";

// TooltipProvider Context
type TooltipProviderContextValue = {
  delayDuration?: number;
};

const TooltipProviderContext = createContext<TooltipProviderContextValue>({
  delayDuration: 700,
});

export type TooltipProviderProps = PropsWithChildren<{
  delayDuration?: number;
}>;

export const TooltipProvider = ({ children, delayDuration = 700 }: TooltipProviderProps) => (
  <TooltipProviderContext.Provider value={{ delayDuration }}>{children}</TooltipProviderContext.Provider>
);

// Tooltip Context
type TooltipContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: { current: HTMLElement | null };
  delayDuration: number;
  tooltipId: string;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

export type TooltipProps = PropsWithChildren & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
};

export const Tooltip = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration: tooltipDelayDuration,
}: TooltipProps) => {
  const providerContext = useContext(TooltipProviderContext);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipId = useId("tooltip");

  const [open, setOpen] = useControlledState({
    defaultValue: defaultOpen,
    controlledValue: controlledOpen,
    onChange: onOpenChange,
  });

  const delayDuration = tooltipDelayDuration ?? providerContext.delayDuration ?? 700;

  return (
    <TooltipContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        delayDuration,
        tooltipId,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip component");
  }
  return context;
}

// TooltipTrigger
export type TooltipTriggerProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ children, asChild = false, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef, delayDuration, tooltipId } = useTooltip();
    const timeoutRef = useRef<number>();

    const handleMouseEnter = (e: MouseEvent) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setOpen(true);
      }, delayDuration);
      onMouseEnter?.(e as any);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      clearTimeout(timeoutRef.current);
      setOpen(false);
      onMouseLeave?.(e as any);
    };

    const handleFocus = (e: FocusEvent) => {
      clearTimeout(timeoutRef.current);
      setOpen(true);
      onFocus?.(e as any);
    };

    const handleBlur = (e: FocusEvent) => {
      clearTimeout(timeoutRef.current);
      setOpen(false);
      onBlur?.(e as any);
    };

    useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, []);

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={open ? tooltipId : undefined}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

// TooltipContent
export type TooltipSide = "top" | "right" | "bottom" | "left";

export type TooltipContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: TooltipSide;
  sideOffset?: number;
};

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, class: classNative, side = "top", sideOffset = 4, children, ...props }, forwardedRef) => {
    const { open, triggerRef, tooltipId } = useTooltip();
    const contentRef = useRef<HTMLDivElement>(null);

    const { refs, floatingStyles } = useFloating({
      open,
      strategy: "fixed",
      placement: side,
      middleware: [offset(sideOffset), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
      transform: false,
    });

    // Connect the trigger ref to floating-ui
    useEffect(() => {
      if (triggerRef.current) {
        refs.setReference(triggerRef.current);
      }
    }, [refs, triggerRef]);

    const composedRefs = useComposedRefs(contentRef, forwardedRef as any, (node: HTMLDivElement | null) =>
      refs.setFloating(node)
    );

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={composedRefs}
          id={tooltipId}
          data-slot="tooltip-content"
          data-side={side}
          data-state={open ? "open" : "closed"}
          role="tooltip"
          style={floatingStyles}
          className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-popover-foreground text-sm shadow-md",
            "fade-in-0 zoom-in-95 animate-in data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out",
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
TooltipContent.displayName = "TooltipContent";
