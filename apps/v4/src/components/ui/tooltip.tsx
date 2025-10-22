import type { ButtonHTMLAttributes } from "preact";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  createContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "preact/compat";
import { useContext } from "preact/hooks";
import { Portal } from "./portal";
import { cn } from "./share/cn";
import { Slot } from "./share/slot";
import { useControlledState } from "./share/useControlledState";

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
  <TooltipProviderContext.Provider value={{ delayDuration }}>
    {children}
  </TooltipProviderContext.Provider>
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
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`);

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
        tooltipId: tooltipId.current,
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
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return;

      const updatePosition = () => {
        const trigger = triggerRef.current;
        const content = contentRef.current;
        if (!trigger || !content) return;

        const triggerRect = trigger.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (side) {
          case "top":
            top = triggerRect.top - contentRect.height - sideOffset;
            left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
            break;
          case "bottom":
            top = triggerRect.bottom + sideOffset;
            left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
            break;
          case "left":
            top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
            left = triggerRect.left - contentRect.width - sideOffset;
            break;
          case "right":
            top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
            left = triggerRect.right + sideOffset;
            break;
        }

        setPosition({ top, left });
      };

      updatePosition();

      // Update position on scroll/resize
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [open, side, sideOffset]);

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={(node) => {
            (contentRef as any).current = node;
            if (typeof forwardedRef === "function") {
              forwardedRef(node);
            } else if (forwardedRef) {
              (forwardedRef as any).current = node;
            }
          }}
          id={tooltipId}
          data-slot="tooltip-content"
          data-side={side}
          data-state="open"
          role="tooltip"
          style={{
            position: "fixed",
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 50,
          }}
          className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-popover-foreground text-sm shadow-md",
            "fade-in-0 zoom-in-95 animate-in",
            side === "top" && "slide-in-from-bottom-2",
            side === "bottom" && "slide-in-from-top-2",
            side === "left" && "slide-in-from-right-2",
            side === "right" && "slide-in-from-left-2",
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
