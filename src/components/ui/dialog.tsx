import { type HTMLAttributes, type PropsWithChildren, createContext, createRef, forwardRef } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";

import { X } from "lucide-preact";
import { Modal } from "./modal";
import { cn } from "./share/cn";
import { Show } from "./show";

const DialogContext = createContext<{
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
} | null>(null);

export type DialogProviderProps = PropsWithChildren & { open?: boolean; onChange?: (open: boolean) => void };

export function Dialog({ open: controlledIsOpen = false, children, onChange }: DialogProviderProps) {
  const [open, setOpen] = useState(controlledIsOpen);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  useEffect(() => {
    if (onChange) {
      onChange(open);
    }
  }, [open, onChange]);

  useEffect(() => {
    setOpen(controlledIsOpen);
  }, [controlledIsOpen]);

  return <DialogContext.Provider value={{ open, openDialog, closeDialog }}>{children}</DialogContext.Provider>;
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog should be used within DialogProvider");
  }
  return context;
}

export function DialogTrigger({ children }: PropsWithChildren) {
  const { openDialog } = useDialog();

  return (
    <div onClick={openDialog} className="bg-transparent p-0 m-0 w-fit">
      {children}
    </div>
  );
}

export const DialogContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { autoSelect?: boolean }>(
  ({ className, children, ...props }) => {
    const { open, closeDialog } = useDialog();
    const contentRef = createRef<HTMLDivElement>();

    useEffect(() => {
      if (open) {
        if (props.autoSelect) {
          contentRef.current?.parentElement?.querySelectorAll("input")[0]?.select();
        } else {
          contentRef.current?.parentElement?.querySelectorAll("input")[0]?.focus();
        }
      }
    }, [open, props.autoSelect, contentRef]);

    return (
      <Show when={open}>
        {/* biome-ignore lint/a11y/useSemanticElements: */}
        <Modal onClose={closeDialog} show={true} role="dialog">
          <div
            ref={contentRef}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={cn(
              "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
              className
            )}
            {...props}
          >
            <button
              onClick={closeDialog}
              type="button"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            {children}
          </div>
        </Modal>
      </Show>
    );
  }
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
  )
);
DialogHeader.displayName = "DialogHeader";

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  )
);
DialogFooter.displayName = "DialogFooter";

export const DialogTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
DialogDescription.displayName = "DialogDescription";

export const DialogClose = ({ children, onCancel }: PropsWithChildren<{ onCancel?: () => void }>) => {
  const { closeDialog } = useDialog();

  return (
    <div
      className="*:w-full"
      onClick={() => {
        closeDialog();
        if (onCancel) onCancel();
      }}
    >
      {children}
    </div>
  );
};
DialogClose.displayName = "DialogClose";
