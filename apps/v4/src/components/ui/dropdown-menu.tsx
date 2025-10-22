import { Check, Circle } from "lucide-preact";
import type { ButtonHTMLAttributes, HTMLAttributes } from "preact";
import { type PropsWithChildren, createContext, forwardRef, useEffect, useRef, useState } from "preact/compat";
import { useContext } from "preact/hooks";
import { Portal } from "./portal";
import { cn } from "./share/cn";
import { useComposedRefs } from "./share/compose_ref";
import { Slot } from "./share/slot";
import { useControlledState } from "./share/useControlledState";

// DropdownMenu Context
type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: { current: HTMLElement | null };
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export type DropdownMenuProps = PropsWithChildren & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const DropdownMenu = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DropdownMenuProps) => {
  const triggerRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useControlledState({
    defaultValue: defaultOpen,
    controlledValue: controlledOpen,
    onChange: onOpenChange,
  });

  return (
    <DropdownMenuContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
};

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenu components must be used within a DropdownMenu component");
  }
  return context;
}

// DropdownMenuTrigger
export type DropdownMenuTriggerProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, asChild = false, onClick, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef } = useDropdownMenu();

    const composedRefs = useComposedRefs(triggerRef as any, forwardedRef as any);

    const handleClick = (e: MouseEvent) => {
      setOpen(!open);
      onClick?.(e as any);
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={composedRefs}
        type={asChild ? undefined : "button"}
        onClick={handleClick}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="dropdown-menu-content"
        data-slot="dropdown-menu-trigger"
        data-state={open ? "open" : "closed"}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// DropdownMenuContent
export type DropdownMenuSide = "top" | "right" | "bottom" | "left";
export type DropdownMenuAlign = "start" | "center" | "end";

export type DropdownMenuContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: DropdownMenuSide;
  sideOffset?: number;
  align?: DropdownMenuAlign;
  alignOffset?: number;
};

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  (
    {
      className,
      class: classNative,
      side = "bottom",
      sideOffset = 4,
      align = "start",
      alignOffset = 0,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const { open, setOpen, triggerRef } = useDropdownMenu();
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const contentRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const composedRefs = useComposedRefs(contentRef, forwardedRef as any);

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

        // Calculate based on side
        switch (side) {
          case "top":
            top = triggerRect.top - contentRect.height - sideOffset;
            break;
          case "bottom":
            top = triggerRect.bottom + sideOffset;
            break;
          case "left":
            top = triggerRect.top;
            left = triggerRect.left - contentRect.width - sideOffset;
            break;
          case "right":
            top = triggerRect.top;
            left = triggerRect.right + sideOffset;
            break;
        }

        // Calculate based on align (for top/bottom)
        if (side === "top" || side === "bottom") {
          switch (align) {
            case "start":
              left = triggerRect.left + alignOffset;
              break;
            case "center":
              left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2 + alignOffset;
              break;
            case "end":
              left = triggerRect.right - contentRect.width + alignOffset;
              break;
          }
        }

        // Calculate based on align (for left/right)
        if (side === "left" || side === "right") {
          switch (align) {
            case "start":
              top = triggerRect.top + alignOffset;
              break;
            case "center":
              top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2 + alignOffset;
              break;
            case "end":
              top = triggerRect.bottom - contentRect.height + alignOffset;
              break;
          }
        }

        setPosition({ top, left });
      };

      updatePosition();

      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [open, side, sideOffset, align, alignOffset]);

    // Handle escape key and click outside
    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, setOpen]);

    // Consider optional: Auto-focus first item when dropdown opens?
    // useEffect(() => {
    //   if (!open || !contentRef.current) return;

    //   const items = Array.from(
    //     contentRef.current.querySelectorAll(
    //       '[role="menuitem"]:not([data-disabled="true"]), [role="menuitemcheckbox"]:not([data-disabled="true"]), [role="menuitemradio"]:not([data-disabled="true"])'
    //     )
    //   ) as HTMLElement[];

    //   if (items.length > 0) {
    //     // Auto-focus the first item when dropdown opens
    //     items[0]?.focus();
    //     setFocusedIndex(0);
    //   }
    // }, [open]);

    // Handle keyboard navigation
    useEffect(() => {
      if (!open || !contentRef.current) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        const items = Array.from(
          contentRef.current?.querySelectorAll(
            '[role="menuitem"]:not([data-disabled="true"]), [role="menuitemcheckbox"]:not([data-disabled="true"]), [role="menuitemradio"]:not([data-disabled="true"])'
          ) || []
        ) as HTMLElement[];

        if (items.length === 0) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setFocusedIndex((prev) => {
              const next = prev === -1 ? 0 : prev + 1 >= items.length ? 0 : prev + 1;
              items[next]?.focus();
              return next;
            });
            break;
          case "ArrowUp":
            e.preventDefault();
            setFocusedIndex((prev) => {
              const next = prev === -1 ? items.length - 1 : prev - 1 < 0 ? items.length - 1 : prev - 1;
              items[next]?.focus();
              return next;
            });
            break;
          case "Home":
            e.preventDefault();
            items[0]?.focus();
            setFocusedIndex(0);
            break;
          case "End":
            e.preventDefault();
            items[items.length - 1]?.focus();
            setFocusedIndex(items.length - 1);
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            if (focusedIndex >= 0 && focusedIndex < items.length) {
              items[focusedIndex]?.click();
            }
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [open, focusedIndex]);

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={composedRefs}
          id="dropdown-menu-content"
          data-slot="dropdown-menu-content"
          data-side={side}
          data-align={align}
          data-state="open"
          role="menu"
          tabIndex={-1}
          style={{
            position: "fixed",
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 50,
          }}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
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
DropdownMenuContent.displayName = "DropdownMenuContent";

// ============================================================================
// DropdownMenuItem
// ============================================================================

export type DropdownMenuItemProps = HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
  disabled?: boolean;
};

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, class: classNative, inset, disabled, onClick, onMouseEnter, ...props }, forwardedRef) => {
    const { setOpen } = useDropdownMenu();
    const itemRef = useRef<HTMLDivElement>(null);

    const composedRefs = useComposedRefs(itemRef, forwardedRef as any);

    const handleClick = (e: MouseEvent) => {
      if (disabled) return;
      onClick?.(e as any);
      setOpen(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (disabled) return;
      itemRef.current?.focus();
      onMouseEnter?.(e as any);
    };

    return (
      <div
        ref={composedRefs}
        data-slot="dropdown-menu-item"
        data-disabled={disabled ? "true" : undefined}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
          "focus:bg-accent focus:text-accent-foreground",
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
          "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          inset && "pl-8",
          className,
          classNative
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      />
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

// ============================================================================
// DropdownMenuCheckboxItem
// ============================================================================

export type DropdownMenuCheckboxItemProps = HTMLAttributes<HTMLDivElement> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  (
    { className, class: classNative, checked, onCheckedChange, disabled, onClick, onMouseEnter, children, ...props },
    forwardedRef
  ) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const composedRefs = useComposedRefs(itemRef, forwardedRef as any);

    const handleClick = (e: MouseEvent) => {
      if (disabled) return;
      onCheckedChange?.(!checked);
      onClick?.(e as any);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (disabled) return;
      itemRef.current?.focus();
      onMouseEnter?.(e as any);
    };

    return (
      <div
        ref={composedRefs}
        data-slot="dropdown-menu-checkbox-item"
        data-disabled={disabled ? "true" : undefined}
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors",
          "focus:bg-accent focus:text-accent-foreground",
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
          className,
          classNative
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Check className="h-4 w-4" />}
        </span>
        {children}
      </div>
    );
  }
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// ============================================================================
// DropdownMenuRadioGroup
// ============================================================================

type DropdownMenuRadioGroupContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const DropdownMenuRadioGroupContext = createContext<DropdownMenuRadioGroupContextValue | null>(null);

export type DropdownMenuRadioGroupProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  value?: string;
  onValueChange?: (value: string) => void;
};

export const DropdownMenuRadioGroup = forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  ({ className, class: classNative, value, onValueChange, children, ...props }, forwardedRef) => {
    return (
      <DropdownMenuRadioGroupContext.Provider value={{ value, onValueChange }}>
        <div
          ref={forwardedRef}
          data-slot="dropdown-menu-radio-group"
          role="group"
          className={cn(className, classNative)}
          {...props}
        >
          {children}
        </div>
      </DropdownMenuRadioGroupContext.Provider>
    );
  }
);
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

function useDropdownMenuRadioGroup() {
  const context = useContext(DropdownMenuRadioGroupContext);
  if (!context) {
    throw new Error("DropdownMenuRadioItem must be used within DropdownMenuRadioGroup");
  }
  return context;
}

// ============================================================================
// DropdownMenuRadioItem
// ============================================================================

export type DropdownMenuRadioItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  disabled?: boolean;
};

export const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ className, class: classNative, value, disabled, onClick, onMouseEnter, children, ...props }, forwardedRef) => {
    const { value: groupValue, onValueChange } = useDropdownMenuRadioGroup();
    const isSelected = groupValue === value;
    const itemRef = useRef<HTMLDivElement>(null);

    const composedRefs = useComposedRefs(itemRef, forwardedRef as any);

    const handleClick = (e: MouseEvent) => {
      if (disabled) return;
      onValueChange?.(value);
      onClick?.(e as any);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (disabled) return;
      itemRef.current?.focus();
      onMouseEnter?.(e as any);
    };

    return (
      <div
        ref={composedRefs}
        data-slot="dropdown-menu-radio-item"
        data-disabled={disabled ? "true" : undefined}
        role="menuitemradio"
        aria-checked={isSelected}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors",
          "focus:bg-accent focus:text-accent-foreground",
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
          className,
          classNative
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </div>
    );
  }
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// ============================================================================
// DropdownMenuLabel
// ============================================================================

export type DropdownMenuLabelProps = HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
};

export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, class: classNative, inset, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        data-slot="dropdown-menu-label"
        className={cn("px-2 py-1.5 font-semibold text-sm", inset && "pl-8", className, classNative)}
        {...props}
      />
    );
  }
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

// ============================================================================
// DropdownMenuSeparator
// ============================================================================

export type DropdownMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        data-slot="dropdown-menu-separator"
        role="presentation"
        aria-orientation="horizontal"
        className={cn("-mx-1 my-1 h-px bg-muted", className, classNative)}
        {...props}
      />
    );
  }
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// ============================================================================
// DropdownMenuShortcut
// ============================================================================

export type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;

export const DropdownMenuShortcut = ({ className, class: classNative, ...props }: DropdownMenuShortcutProps) => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest opacity-60", className, classNative)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// ============================================================================
// DropdownMenuGroup
// ============================================================================

export type DropdownMenuGroupProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        data-slot="dropdown-menu-group"
        role="group"
        className={cn(className, classNative)}
        {...props}
      />
    );
  }
);
DropdownMenuGroup.displayName = "DropdownMenuGroup";
