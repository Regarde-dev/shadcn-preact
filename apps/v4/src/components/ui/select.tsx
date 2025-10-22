import { autoUpdate, flip, offset, shift, useFloating, type Placement } from "@floating-ui/react-dom";
import { Check, ChevronDown } from "lucide-preact";
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes } from "preact";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "preact/compat";
import { Portal } from "./portal";
import { cn } from "./share/cn";
import { useComposedRefs } from "./share/compose_ref";
import { Slot } from "./share/slot";
import { useControlledState } from "./share/useControlledState";

// Select Context

export type SelectSide = "top" | "right" | "bottom" | "left";
export type SelectAlign = "start" | "center" | "end";

type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  selectedLabel: string;
  setSelectedLabel: (label: string) => void;
  disabled?: boolean;
  refs: {
    reference: { current: HTMLElement | null };
    floating: { current: HTMLElement | null };
    setReference: (node: HTMLElement | null) => void;
    setFloating: (node: HTMLElement | null) => void;
  };
  floatingStyles: CSSProperties;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export type SelectProps = PropsWithChildren & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  side?: SelectSide;
  sideOffset?: number;
  align?: SelectAlign;
  alignOffset?: number;
};

export const Select = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled,
  name,
  required,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
}: SelectProps) => {
  const [selectedLabel, setSelectedLabel] = useState("");

  const [open, setOpen] = useControlledState({
    defaultValue: defaultOpen,
    controlledValue: controlledOpen,
    onChange: onOpenChange,
  });

  const [value, setValue] = useControlledState({
    defaultValue: defaultValue,
    controlledValue: controlledValue,
    onChange: onValueChange,
  });

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

  const { refs, floatingStyles } = useFloating<HTMLElement>({
    open: open,
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

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onValueChange: setValue,
        selectedLabel,
        setSelectedLabel,
        disabled,
        refs,
        floatingStyles,
      }}
    >
      {children}
      {/* Hidden native select for form integration */}
      {name && (
        <select
          name={name}
          disabled={disabled}
          required={required}
          defaultValue={defaultValue}
          tabIndex={-1}
          value={value}
          onChange={(e) => setValue((e.target as HTMLSelectElement).value)}
          className="-top-[99999px] pointer-events-none fixed h-1 w-1 cursor-none"
          aria-hidden="true"
        >
          <option value={value}>{value}</option>
        </select>
      )}
    </SelectContext.Provider>
  );
};

function useSelect() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select component");
  }
  return context;
}

// SelectTrigger

export type SelectTriggerProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, class: classNative, asChild = false, onClick, onKeyDown, ...props }, forwardedRef) => {
    const { open, setOpen, disabled, value, refs } = useSelect();
    const triggerRef = useRef<HTMLElement>(null);

    const composedRefs = useComposedRefs(
      triggerRef as any,
      forwardedRef as any,
      (node: HTMLElement | null) => refs.setReference(node)
    );

    const handleClick: typeof onClick = (e) => {
      if (disabled) return;
      setOpen(!open);
      if (onClick) onClick(e);
    };

    const handleKeyDown: typeof onKeyDown = (e) => {
      if (disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setOpen(true);
      }
      if (onKeyDown) onKeyDown(e);
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={composedRefs}
        type={asChild ? undefined : "button"}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        role="button"
        aria-expanded={open}
        aria-controls="select-content"
        data-slot="select-trigger"
        data-state={open ? "open" : "closed"}
        data-disabled={disabled ? "true" : undefined}
        data-placeholder={!value ? "" : undefined}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className,
          classNative
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Comp>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

// SelectValue

export type SelectValueProps = HTMLAttributes<HTMLSpanElement> & {
  placeholder?: string;
};

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, class: classNative, placeholder, ...props }, forwardedRef) => {
    const { value, selectedLabel } = useSelect();

    return (
      <span
        ref={forwardedRef}
        data-slot="select-value"
        className={cn(className, classNative)}
        {...props}
      >
        {value ? selectedLabel || value : <span className="text-muted-foreground">{placeholder}</span>}
      </span>
    );
  }
);
SelectValue.displayName = "SelectValue";

// SelectContent

export type SelectContentProps = HTMLAttributes<HTMLDivElement>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, class: classNative, children, ...props }, forwardedRef) => {
    const { open, setOpen, value, refs, floatingStyles } = useSelect();
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const contentRef = useRef<HTMLDivElement>(null);

    const composedRefs = useComposedRefs(
      contentRef,
      forwardedRef as any,
      (node: HTMLDivElement | null) => refs.setFloating(node)
    );

    // Get trigger width for min-width
    const [triggerWidth, setTriggerWidth] = useState(0);
    useEffect(() => {
      if (open && refs.reference.current) {
        setTriggerWidth(refs.reference.current.getBoundingClientRect().width);
      }
    }, [open, refs.reference]);

    // Reset focusedIndex when select closes to prevent focus position memory
    useEffect(() => {
      if (!open) {
        setFocusedIndex(-1);
      }
    }, [open]);

    // Auto-focus selected item or first item when opened (matches shadcn/ui Radix behavior)
    useEffect(() => {
      if (!open || !refs.floating.current) return;

      // Small delay to ensure items are rendered
      const timer = setTimeout(() => {
        if (!refs.floating.current) return;

        // Get all non-disabled items
        const items = Array.from(
          refs.floating.current.querySelectorAll<HTMLElement>('[role="option"]:not([data-disabled="true"])')
        );

        if (items.length === 0) return;

        // Try to focus the selected item first
        if (value) {
          const selectedIndex = items.findIndex((item) => item.getAttribute("data-state") === "checked");
          if (selectedIndex !== -1 && items[selectedIndex]) {
            items[selectedIndex].focus();
            setFocusedIndex(selectedIndex);
            return;
          }
        }

        // Otherwise focus the first non-disabled item
        if (items[0]) {
          items[0].focus();
          setFocusedIndex(0);
        }
      }, 0);

      return () => clearTimeout(timer);
    }, [open, value, refs.floating]);

    // Handle escape key and click outside
    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          refs.reference.current?.focus();
        }
      };

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          refs.reference.current &&
          !refs.reference.current.contains(e.target as Node)
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
    }, [open, setOpen, refs.reference, contentRef]);

    useEffect(() => {
      if (!open || !refs.floating.current) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        const items = Array.from(
          refs.floating.current?.querySelectorAll('[role="option"]:not([data-disabled="true"])') || []
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
    }, [open, focusedIndex, refs.floating]);

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={composedRefs}
          id="select-content"
          role="listbox"
          data-slot="select-content"
          data-state="open"
          style={{
            ...floatingStyles,
            minWidth: `${triggerWidth}px`,
          }}
          className={cn(
            "z-50 max-h-96 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "fade-in-0 zoom-in-95 animate-in",
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
SelectContent.displayName = "SelectContent";

// SelectGroup

export type SelectGroupProps = HTMLAttributes<HTMLDivElement>;

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      data-slot="select-group"
      role="group"
      className={cn("p-1", className, classNative)}
      {...props}
    />
  )
);
SelectGroup.displayName = "SelectGroup";

// SelectLabel

export type SelectLabelProps = HTMLAttributes<HTMLDivElement>;

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      data-slot="select-label"
      className={cn("py-1.5 pr-2 pl-8 font-semibold text-sm", className, classNative)}
      {...props}
    />
  )
);
SelectLabel.displayName = "SelectLabel";

// SelectItem

export type SelectItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  disabled?: boolean;
};

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, class: classNative, value: itemValue, disabled, children, onClick, ...props }, forwardedRef) => {
    const { value, onValueChange, setOpen, setSelectedLabel } = useSelect();
    const itemRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const isSelected = value === itemValue;

    const composedRefs = useComposedRefs(itemRef, forwardedRef as any);

    const handleClick: typeof onClick = (e) => {
      if (disabled) return;
      onValueChange(itemValue);
      const label = typeof children === "string" ? children : itemRef.current?.textContent || itemValue;
      setSelectedLabel(label);
      setOpen(false);
      if (onClick) onClick(e);
    };

    const handleMouseEnter = () => {
      if (disabled) return;
      itemRef.current?.focus();
      setIsFocused(true);
    };

    const handleMouseLeave = () => {
      setIsFocused(false);
    };

    const handleFocus = () => {
      if (disabled) return;
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <div
        ref={composedRefs}
        data-slot="select-item"
        data-disabled={disabled ? "true" : undefined}
        data-state={isSelected ? "checked" : "unchecked"}
        role="option"
        aria-selected={isSelected}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none",
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
          isFocused && "bg-accent text-accent-foreground",
          className,
          classNative
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4" />}
        </span>
        {children}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

// SelectSeparator

export type SelectSeparatorProps = HTMLAttributes<HTMLDivElement>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-muted", className, classNative)}
      {...props}
    />
  )
);
SelectSeparator.displayName = "SelectSeparator";

// TODO: SelectScrollUpButton and SelectScrollDownButton
