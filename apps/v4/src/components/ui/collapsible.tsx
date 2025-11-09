import type { ButtonHTMLAttributes } from "preact";
import { type HTMLAttributes, type PropsWithChildren, createContext, forwardRef } from "preact/compat";
import { useContext } from "preact/hooks";
import { cn } from "./share/cn";
import { Slot } from "./share/slot";
import { useControlledState } from "./share/useControlledState";
import { Show } from "./show";

export type CollapsibleContextT = {
  open: boolean;
  openCollapsible: () => void;
  closeCollapsible: () => void;
  disabled: boolean;
};

export const CollapsibleContext = createContext<CollapsibleContextT | null>(null);

export type CollapsibleProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean;

  /**
   * The default open state when uncontrolled.
   */
  defaultOpen?: boolean;

  /**
   * The controlled open state of the collapsible.
   */
  open?: boolean;

  /**
   * Event handler called when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * When true, prevents the user from interacting with the collapsible.
   */
  disabled?: boolean;
};

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      children,
      open: controlledOpen,
      onOpenChange,
      defaultOpen,
      class: classNative,
      className,
      disabled,
      asChild,
      ...props
    },
    forwardedRef
  ) => {
    const [open, setOpen] = useControlledState({
      defaultValue: Boolean(defaultOpen),
      controlledValue: controlledOpen,
      onChange: onOpenChange,
    });

    const Comp = asChild ? Slot : "div";

    return (
      <CollapsibleContext.Provider
        value={{
          open,
          openCollapsible: () => setOpen(true),
          closeCollapsible: () => setOpen(false),
          disabled: Boolean(disabled),
        }}
      >
        <Comp
          ref={forwardedRef}
          data-slot="collapsible"
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "true" : undefined}
          className={cn(className, classNative)}
          {...props}
        >
          {children}
        </Comp>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = "Collapsible";

export function useCollapsible() {
  const c = useContext(CollapsibleContext);
  if (!c) throw new Error("useCollapsible should be used within Collapsible");
  return c;
}

export type CollapsibleTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean;
};

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ children, asChild, className, class: classNative, onClick, ...props }, forwardedRef) => {
    const { openCollapsible, closeCollapsible, open, disabled } = useCollapsible();
    const Comp = asChild ? Slot : "button";

    const handleClick: typeof onClick = (e) => {
      if (disabled) return;
      open ? closeCollapsible() : openCollapsible();
      onClick?.(e);
    };

    return (
      <Comp
        ref={forwardedRef}
        type="button"
        aria-expanded={open}
        aria-disabled={disabled}
        data-slot="collapsible-trigger"
        data-state={open ? "open" : "closed"}
        data-disabled={disabled ? "true" : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cn(className, classNative)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export type CollapsibleContentProps = HTMLAttributes<HTMLDivElement>;

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, className, class: classNative, ...props }, forwardedRef) => {
    const { open, disabled } = useCollapsible();

    return (
      <Show when={open}>
        <div
          ref={forwardedRef}
          data-slot="collapsible-content"
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "true" : undefined}
          className={cn(className, classNative)}
          {...props}
        >
          {children}
        </div>
      </Show>
    );
  }
);
CollapsibleContent.displayName = "CollapsibleContent";

