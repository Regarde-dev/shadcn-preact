import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-preact";
import type { ButtonHTMLAttributes } from "preact";
import { type HTMLAttributes, type PropsWithChildren, createContext, createRef, forwardRef } from "preact/compat";
import { useContext, useEffect, useRef } from "preact/hooks";
import { Modal } from "./modal";
import { cn } from "./share/cn";
import { useComposedRefs } from "./share/compose_ref";
import { Slot } from "./share/slot";
import { useControlledState } from "./share/useControlledState";
import { useEscapeKeyDown } from "./share/useEscapeKeyDown";
import { useFocusTrap } from "./share/useFocusTrap";
import { useId } from "./share/useId";
import { Show } from "./show";

const SheetContext = createContext<{
  open: boolean;
  defaultOpen?: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  triggerRef: { current: HTMLElement | null };
  titleId: string;
  descriptionId: string;
} | null>(null);

export type SheetProps = PropsWithChildren & {
  /**
   * The controlled open state of the sheet.
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

export const Sheet = ({ open: controlledOpen, defaultOpen, children, onOpenChange }: SheetProps) => {
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId("sheet-title");
  const descriptionId = useId("sheet-description");

  const [open, setOpen] = useControlledState({
    defaultValue: Boolean(defaultOpen),
    controlledValue: controlledOpen,
    onChange: onOpenChange,
  });

  return (
    <SheetContext.Provider
      value={{
        open,
        closeSheet: () => setOpen(false),
        openSheet: () => setOpen(true),
        defaultOpen,
        triggerRef,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </SheetContext.Provider>
  );
};
Sheet.displayName = "Sheet";

export function useSheet() {
  const c = useContext(SheetContext);
  if (!c) throw new Error("useSheet should be used within Sheet");
  return c;
}

export type SheetTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    /**
     * Change the default rendered element for the one passed as a child,
     * merging their props and behavior.
     */
    asChild?: boolean;
  };

export const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ children, asChild, ...props }, forwardedRef) => {
    const { openSheet, triggerRef, open } = useSheet();
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
        data-slot="sheet-trigger"
        data-state={open ? "open" : "closed"}
        onClick={openSheet}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
SheetTrigger.displayName = "SheetTrigger";

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom max-h-[50vh]",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export type SheetContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof sheetVariants> & {
    /**
     * When true, automatically selects the first input when the sheet opens.
     * @default false
     */
    autoSelect?: boolean;
  };

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, class: classNative, children, autoSelect, ...props }, forwardedRef) => {
    const { open, closeSheet, triggerRef, titleId, descriptionId } = useSheet();
    const contentRef = createRef<HTMLDivElement>();

    const composedRefs = useComposedRefs(contentRef, forwardedRef);

    // Auto-focus first input when sheet opens
    useEffect(() => {
      if (open && contentRef.current) {
        const firstInput = contentRef.current.querySelector("input");
        if (firstInput) {
          if (autoSelect) {
            firstInput.select();
          } else {
            firstInput.focus();
          }
        }
      }
    }, [open, autoSelect]);

    // Escape key handler with focus restoration
    useEscapeKeyDown(closeSheet, {
      enabled: open,
      restoreFocus: triggerRef,
    });

    // Focus trap
    useFocusTrap(contentRef, {
      enabled: open,
      restoreFocus: false, // We handle this manually with triggerRef
    });

    return (
      <Show when={open}>
        <Modal onClose={closeSheet}>
          <div
            ref={composedRefs}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            data-slot="sheet-content"
            data-state={open ? "open" : "closed"}
            data-side={side}
            onMouseDown={(e) => e.stopPropagation()}
            className={cn("rounded-sm", sheetVariants({ side }), className, classNative)}
            {...props}
          >
            <button
              onClick={closeSheet}
              type="button"
              data-state={open ? "open" : "closed"}
              className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
            {children}
          </div>
        </Modal>
      </Show>
    );
  }
);
SheetContent.displayName = "SheetContent";

export type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      data-slot="sheet-header"
      className={cn("flex flex-col space-y-2 text-center sm:text-left", className, classNative)}
      {...props}
    />
  )
);
SheetHeader.displayName = "SheetHeader";

export type SheetFooterProps = HTMLAttributes<HTMLDivElement>;

export const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      data-slot="sheet-footer"
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className, classNative)}
      {...props}
    />
  )
);
SheetFooter.displayName = "SheetFooter";

export type SheetTitleProps = HTMLAttributes<HTMLDivElement>;

export const SheetTitle = forwardRef<HTMLDivElement, SheetTitleProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => {
    const { titleId } = useSheet();
    return (
      <div
        ref={forwardedRef}
        id={titleId}
        role="heading"
        aria-level={2}
        data-slot="sheet-title"
        className={cn("font-semibold text-foreground text-lg", className, classNative)}
        {...props}
      />
    );
  }
);
SheetTitle.displayName = "SheetTitle";

export type SheetDescriptionProps = HTMLAttributes<HTMLDivElement>;

export const SheetDescription = forwardRef<HTMLDivElement, SheetDescriptionProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => {
    const { descriptionId } = useSheet();
    return (
      <div
        ref={forwardedRef}
        id={descriptionId}
        data-slot="sheet-description"
        className={cn("text-muted-foreground text-sm", className, classNative)}
        {...props}
      />
    );
  }
);
SheetDescription.displayName = "SheetDescription";

export type SheetCloseProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    /**
     * Callback function called when the close button is clicked.
     */
    onCancel?: () => void;

    /**
     * Change the default rendered element for the one passed as a child,
     * merging their props and behavior.
     */
    asChild?: boolean;
  };

export const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ children, onCancel, asChild, ...props }, forwardedRef) => {
    const { closeSheet } = useSheet();
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={forwardedRef}
        type="button"
        onClick={() => {
          closeSheet();
          onCancel?.();
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
SheetClose.displayName = "SheetClose";

