import type { ButtonHTMLAttributes } from "preact";
import { type HTMLAttributes, type PropsWithChildren, createContext, createRef, forwardRef } from "preact/compat";
import { useContext, useRef } from "preact/hooks";
import { Button } from "./button";
import { Modal } from "./modal";
import { cn } from "./share/cn";
import { useComposedRefs } from "./share/compose_ref";
import { Slot } from "./share/slot";
import { useControlledState } from "./share/useControlledState";
import { useEscapeKeyDown } from "./share/useEscapeKeyDown";
import { useFocusTrap } from "./share/useFocusTrap";
import { useId } from "./share/useId";
import { Show } from "./show";

const AlertDialogContext = createContext<{
  open: boolean;
  defaultOpen?: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  triggerRef: { current: HTMLElement | null };
  titleId: string;
  descriptionId: string;
} | null>(null);

export type AlertDialogProps = PropsWithChildren & {
  /**
   * The controlled open state of the alert dialog.
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

export const AlertDialog = ({ open: controlledOpen, defaultOpen, children, onOpenChange }: AlertDialogProps) => {
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId("alert-dialog-title");
  const descriptionId = useId("alert-dialog-description");

  const [open, setOpen] = useControlledState({
    defaultValue: Boolean(defaultOpen),
    controlledValue: controlledOpen,
    onChange: onOpenChange,
  });

  return (
    <AlertDialogContext.Provider
      value={{
        open,
        closeDialog: () => setOpen(false),
        openDialog: () => setOpen(true),
        defaultOpen,
        triggerRef,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
};
AlertDialog.displayName = "AlertDialog";

export function useAlertDialog() {
  const c = useContext(AlertDialogContext);
  if (!c) throw new Error("useAlertDialog should be used within AlertDialog");
  return c;
}

export type AlertDialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    /**
     * Change the default rendered element for the one passed as a child,
     * merging their props and behavior.
     */
    asChild?: boolean;
  };

export const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ children, asChild, className, class: classNative, ...props }, forwardedRef) => {
    const { openDialog, open, triggerRef } = useAlertDialog();
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
        data-slot="alert-dialog-trigger"
        data-state={open ? "open" : "closed"}
        onClick={openDialog}
        className={cn(className, classNative)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
AlertDialogTrigger.displayName = "AlertDialogTrigger";

export type AlertDialogContentProps = HTMLAttributes<HTMLDivElement>;

export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ children, className, class: classNative, ...props }, forwardedRef) => {
    const { open, closeDialog, triggerRef, titleId, descriptionId } = useAlertDialog();
    const contentRef = createRef<HTMLDivElement>();

    const composedRefs = useComposedRefs(contentRef, forwardedRef);

    // Escape key handler with focus restoration
    useEscapeKeyDown(closeDialog, {
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
        <Modal onClose={closeDialog}>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              ref={composedRefs}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              data-slot="alert-dialog-content"
              data-state={open ? "open" : "closed"}
              onMouseDown={(e) => e.stopPropagation()}
              className={cn(
                "relative grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
                className,
                classNative
              )}
              {...props}
            >
              {children}
            </div>
          </div>
        </Modal>
      </Show>
    );
  }
);
AlertDialogContent.displayName = "AlertDialogContent";

export type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export const AlertDialogHeader = forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ children, className, class: classNative, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        data-slot="alert-dialog-header"
        className={cn("flex flex-col space-y-2 text-center sm:text-left", className, classNative)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";

export type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>;

export const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ children, className, class: classNative, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        data-slot="alert-dialog-footer"
        className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className, classNative)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";

export type AlertDialogTitleProps = HTMLAttributes<HTMLDivElement>;

export const AlertDialogTitle = forwardRef<HTMLDivElement, AlertDialogTitleProps>(
  ({ children, className, class: classNative, ...props }, forwardedRef) => {
    const { titleId } = useAlertDialog();
    return (
      <div
        ref={forwardedRef}
        id={titleId}
        role="heading"
        aria-level={2}
        data-slot="alert-dialog-title"
        className={cn("font-semibold text-lg", className, classNative)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AlertDialogTitle.displayName = "AlertDialogTitle";

export type AlertDialogDescriptionProps = HTMLAttributes<HTMLDivElement>;

export const AlertDialogDescription = forwardRef<HTMLDivElement, AlertDialogDescriptionProps>(
  ({ children, className, class: classNative, ...props }, forwardedRef) => {
    const { descriptionId } = useAlertDialog();
    return (
      <div
        ref={forwardedRef}
        id={descriptionId}
        data-slot="alert-dialog-description"
        className={cn("text-muted-foreground text-sm", className, classNative)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AlertDialogDescription.displayName = "AlertDialogDescription";

export type AlertDialogCancelProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    /**
     * Callback function called when the cancel button is clicked.
     */
    onCancel?: () => void;

    /**
     * Change the default rendered element for the one passed as a child,
     * merging their props and behavior.
     */
    asChild?: boolean;
  };

export const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ children, className, class: classNative, onCancel, asChild, ...props }, forwardedRef) => {
    const { closeDialog } = useAlertDialog();

    if (asChild) {
      const Comp = Slot;
      return (
        <Comp
          ref={forwardedRef}
          onClick={() => {
            closeDialog();
            onCancel?.();
          }}
          className={cn("mt-2 sm:mt-0", className, classNative)}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Button
        ref={forwardedRef}
        variant="outline"
        onClick={() => {
          closeDialog();
          onCancel?.();
        }}
        className={cn("mt-2 sm:mt-0", className, classNative)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export type AlertDialogActionProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    /**
     * Callback function called when the action button is clicked.
     */
    onConfirm?: () => void;

    /**
     * Change the default rendered element for the one passed as a child,
     * merging their props and behavior.
     */
    asChild?: boolean;
  };

export const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ children, className, class: classNative, onConfirm, asChild, ...props }, forwardedRef) => {
    const { closeDialog } = useAlertDialog();

    if (asChild) {
      const Comp = Slot;
      return (
        <Comp
          ref={forwardedRef}
          onClick={() => {
            closeDialog();
            onConfirm?.();
          }}
          className={cn(className, classNative)}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Button
        ref={forwardedRef}
        onClick={() => {
          closeDialog();
          onConfirm?.();
        }}
        className={cn(className, classNative)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
AlertDialogAction.displayName = "AlertDialogAction";

