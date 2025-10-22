import { autoUpdate, flip, offset, shift, useFloating, type Placement } from "@floating-ui/react-dom";
import { Check, Circle } from "lucide-preact";
import type { ButtonHTMLAttributes, HTMLAttributes } from "preact";
import { createContext, forwardRef, useEffect, useMemo, useRef, useState, type PropsWithChildren } from "preact/compat";
import { useContext } from "preact/hooks";
import { Portal } from "./portal";
import { cn } from "./share/cn";
import { useComposedRefs } from "./share/compose_ref";
import { Slot } from "./share/slot";
import { useArrowKeyNavigation } from "./share/useArrowKeyNavigation";
import { useClickOutside } from "./share/useClickOutside";
import { useControlledState } from "./share/useControlledState";
import { useEscapeKeyDown } from "./share/useEscapeKeyDown";

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
    const contentRef = useRef<HTMLDivElement>(null);

    // Build placement based on side and align
    const placement = useMemo((): Placement => {
      if (align === "center" || align === "start") {
        if (side === "bottom" || side === "top") {
          return align === "start" ? `${side}-start` : side;
        }
        return align === "start" ? `${side}-start` : side;
      }
      return `${side}-end` as Placement;
    }, [side, align]);

    // Build fallback placements for flip middleware
    const fallbackPlacements = useMemo((): Placement[] => {
      const fallbacks: Placement[] = [];

      if (side === "bottom" || side === "top") {
        const oppositeSide = side === "bottom" ? "top" : "bottom";
        if (align === "start") {
          fallbacks.push(`${oppositeSide}-start`);
        } else if (align === "end") {
          fallbacks.push(`${oppositeSide}-end`);
        } else {
          fallbacks.push(oppositeSide);
        }
      } else {
        const oppositeSide = side === "left" ? "right" : "left";
        if (align === "start") {
          fallbacks.push(`${oppositeSide}-start`);
        } else if (align === "end") {
          fallbacks.push(`${oppositeSide}-end`);
        } else {
          fallbacks.push(oppositeSide);
        }
      }

      return fallbacks;
    }, [side, align]);

    const {
      refs,
      floatingStyles,
      placement: currentPlacement,
    } = useFloating({
      open,
      strategy: "fixed",
      placement: placement,
      middleware: [
        offset(sideOffset + alignOffset),
        flip({
          fallbackPlacements: fallbackPlacements,
        }),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
      transform: false,
    });

    const [maxHeight, setMaxHeight] = useState<number | undefined>();

    // Connect the trigger ref to floating-ui
    useEffect(() => {
      if (triggerRef.current) {
        refs.setReference(triggerRef.current);
      }
    }, [refs, triggerRef]);

    useEffect(() => {
      if (!open || !refs.floating.current || !refs.reference.current) {
        setMaxHeight(undefined);
        return;
      }

      const calculateMaxHeight = () => {
        const referenceRect = refs.reference.current!.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportPadding = 8;

        const actualPlacement = currentPlacement || placement;
        const isVertical = actualPlacement.startsWith("top") || actualPlacement.startsWith("bottom");

        let availableSpace: number;

        if (isVertical) {
          if (actualPlacement.startsWith("bottom")) {
            availableSpace = viewportHeight - referenceRect.bottom - viewportPadding - sideOffset;
          } else {
            availableSpace = referenceRect.top - viewportPadding - sideOffset;
          }
        } else {
          // For left/right placements, use full viewport height minus padding
          // (dropdown extends vertically regardless of horizontal placement)
          const spaceAbove = referenceRect.top - viewportPadding;
          const spaceBelow = viewportHeight - referenceRect.bottom - viewportPadding;
          availableSpace = Math.max(spaceAbove, spaceBelow, viewportHeight - viewportPadding * 2);
        }

        const cappedHeight = Math.max(100, Math.min(availableSpace, 384));
        setMaxHeight(cappedHeight);
      };

      calculateMaxHeight();
    }, [open, refs, currentPlacement, placement, sideOffset]);

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

    // Handle arrow key navigation
    useArrowKeyNavigation(contentRef, {
      enabled: open,
      selector:
        '[role="menuitem"]:not([data-disabled="true"]), [role="menuitemcheckbox"]:not([data-disabled="true"]), [role="menuitemradio"]:not([data-disabled="true"])',
      onSelect: (_index, element) => element.click(),
    });

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={composedRefs}
          id="dropdown-menu-content"
          data-slot="dropdown-menu-content"
          data-side={side}
          data-align={align}
          data-state={open ? "open" : "closed"}
          role="menu"
          tabIndex={-1}
          style={{
            ...floatingStyles,
            maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          }}
          className={cn(
            "z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
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
DropdownMenuContent.displayName = "DropdownMenuContent";

// DropdownMenuItem
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

// DropdownMenuCheckboxItem
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

// DropdownMenuRadioGroup
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

// DropdownMenuRadioItem
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

// DropdownMenuLabel
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

// DropdownMenuSeparator
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

// DropdownMenuShortcut
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

// DropdownMenuGroup
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
