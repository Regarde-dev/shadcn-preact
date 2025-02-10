import { createContext, createRef, forwardRef, HTMLAttributes, PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";

import { X } from "lucide-preact";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Modal } from "./modal";
import { cn } from "./share/cn";
import { Show } from "./show";

const DialogContext = createContext<{
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
} | null>(null);

type DialogProviderProps = PropsWithChildren & { open?: boolean; onChange?: (open: boolean) => void };

export function Dialog({ open: controlledIsOpen = false, children, onChange }: DialogProviderProps) {
  const [open, setOpen] = useState(controlledIsOpen);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  useEffect(() => {
    if (onChange) {
      onChange(open);
    }
  }, [open]);

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
    <div
      onClick={openDialog}
      className="bg-transparent p-0 m-0 w-fit"
    >
      {children}
    </div>
  );
}

export const DialogContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { autoSelect?: boolean }>(
  ({ className, children, ...props }, ref) => {
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
    }, [open]);

    return (
      <Show when={open}>
        <Modal
          onClose={closeDialog}
          show={true}
        >
          <div
            className="w-fit h-fit"
            ref={contentRef}
          >
            <Card
              ref={ref}
              className={cn(
                "w-screen py-1 relative min-w-[520px] [&>:not(:first-child):not(:last-child)]:px-6 ",
                className
              )}
              {...props}
            >
              <button
                onClick={closeDialog}
                className="absolute w-fit h-fit right-6 top-4 p-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              >
                <X className="w-4 h-4" />
              </button>
              {children}
            </Card>
          </div>
        </Modal>
      </Show>
    );
  }
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = CardHeader;
DialogHeader.displayName = "DialogHeader";

export const DialogTitle = CardTitle;
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = CardDescription;
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-end px-6 py-4", className)}
      {...props}
    />
  )
);
DialogFooter.displayName = "DialogFooter";

export const DialogClose = ({ children, onCancel }: PropsWithChildren<{ onCancel?: () => void }>) => {
  const { closeDialog } = useDialog();

  return (
    <div
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
