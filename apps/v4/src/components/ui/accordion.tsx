import { ChevronDown } from "lucide-preact";
import type { ButtonHTMLAttributes } from "preact";
import { createContext, forwardRef, useContext, useMemo, type HTMLAttributes } from "preact/compat";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { cn } from "./share/cn";
import { useControlledState } from "./share/useControlledState";

export const AccordionContext = createContext<{
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?(value: string | string[]): void;
  collapsible?: boolean;
  type: "single" | "multiple";
  disabled: boolean;
  dir: "ltr" | "rtl";
  orientation: "horizontal" | "vertical";
} | null>(null);

export type AccordionProps = {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean;

  /**
   * The controlled value of the item to expand when type is "single".
   * Must be used in conjunction with onValueChange.
   */
  value?: string | string[];

  /**
   * The value of the item to expand when initially rendered and type is "single".
   * Use when you do not need to control the state of the items.
   */
  defaultValue?: string | string[];

  /**
   * Event handler called when the expanded state of an item changes.
   */
  onValueChange?(value: string | string[]): void;

  /**
   * When type is "single", allows closing content when clicking trigger for an open item.
   * @default false
   */
  collapsible?: boolean;

  /**
   * Determines whether one or multiple items can be opened at the same time.
   * @default "single"
   */
  type?: "single" | "multiple";

  /**
   * When true, prevents the user from interacting with the accordion and all its items.
   */
  disabled?: boolean;

  /**
   * The reading direction of the accordion when applicable.
   * @default "ltr"
   */
  dir?: "ltr" | "rtl";

  /**
   * The orientation of the accordion.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
} & HTMLAttributes<HTMLDivElement>;

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      disabled = false,
      orientation = "vertical",
      type = "single",
      collapsible = false,
      dir = "ltr",
      defaultValue,
      value: controlledValue,
      onValueChange,
      children,
      className,
      class: classNative,
      ...props
    },
    forwardedRef
  ) => {
    const default_value = Boolean(defaultValue) === true ? defaultValue : type === "single" ? "" : [];

    const [value, setValue] = useControlledState({
      defaultValue: default_value,
      controlledValue,
      onChange: onValueChange,
    });

    return (
      <AccordionContext.Provider
        value={{
          value,
          disabled,
          orientation,
          dir,
          type,
          collapsible,
          defaultValue: default_value,
          onValueChange: (value) => {
            if (!disabled) {
              setValue(value);
            }
          },
        }}
      >
        <div
          ref={forwardedRef}
          data-slot="accordion"
          data-orientation={orientation}
          className={cn(className, classNative)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

export function useAccordion() {
  const c = useContext(AccordionContext);
  if (!c) throw new Error("useAccordion should be used within Accordion");
  return c;
}

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean;

  /**
   * When true, prevents the user from interacting with the item.
   */
  disabled?: boolean;

  /**
   * A unique value for the item.
   */
  value: string;
};

export const AccordionItemContext = createContext<{
  state: "open" | "closed";
  disabled?: boolean;
  value: string;
  orientation: "horizontal" | "vertical";
} | null>(null);

export function useAccordionItem() {
  const c = useContext(AccordionItemContext);
  if (!c) throw new Error("useAccordionItem should be used within AccordionItem");
  return c;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, class: classNative, children, ...props }, forwardedRef) => {
    const { orientation, value, onValueChange, type } = useAccordion();

    const state: "open" | "closed" = useMemo(() => {
      if (!value) return "closed";

      if (type === "single" && typeof value === "string") {
        return value === props.value ? "open" : "closed";
      }

      if (type === "multiple" && Array.isArray(value)) {
        return value.includes(props.value) ? "open" : "closed";
      }

      return "closed";
    }, [value, props.value, type]);

    return (
      <AccordionItemContext.Provider
        value={{
          orientation,
          value: props.value,
          state,
          disabled: props.disabled,
        }}
      >
        <Collapsible
          ref={forwardedRef}
          data-slot="accordion-item"
          data-state={state}
          data-disabled={props.disabled ? "true" : undefined}
          data-orientation={orientation}
          className={cn("border-b", className, classNative)}
          open={state === "open"}
          onOpenChange={(open) => {
            if (type === "single") {
              if (open === true) {
                onValueChange?.(props.value);
              } else if (open === false) {
                onValueChange?.("");
              }
            }

            if (type === "multiple" && value !== undefined && typeof value !== "string") {
              if (open === true) {
                const newValue = [...value, props.value];
                onValueChange?.(newValue);
              } else if (open === false) {
                const newValue = value.filter((v) => v !== props.value);
                onValueChange?.(newValue);
              }
            }
          }}
          {...props}
        >
          {children}
        </Collapsible>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean;
};

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, class: classNative, children, ...props }, forwardedRef) => {
    const { state, orientation, disabled } = useAccordionItem();

    return (
      <h3 className="flex">
        <CollapsibleTrigger
          ref={forwardedRef}
          data-slot="accordion-trigger"
          data-state={state}
          data-disabled={disabled ? "true" : undefined}
          data-orientation={orientation}
          className={cn(
            "flex flex-1 items-center justify-between py-4 text-left font-medium text-sm transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
            className,
            classNative
          )}
          asChild={props.asChild}
          disabled={disabled}
          {...props}
        >
          {children}
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </CollapsibleTrigger>
      </h3>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean;
};

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, class: classNative, children, ...props }, forwardedRef) => {
    const { state, orientation, disabled } = useAccordionItem();

    return (
      <CollapsibleContent
        ref={forwardedRef}
        data-slot="accordion-content"
        data-state={state}
        data-disabled={disabled ? "true" : undefined}
        data-orientation={orientation}
        className={cn("overflow-hidden text-sm transition-all", state === "closed" ? "h-0" : "h-fit")}
        {...props}
      >
        <div className={cn("pt-0 pb-4", className, classNative)}>{children}</div>
      </CollapsibleContent>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

