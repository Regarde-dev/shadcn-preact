import { type PropsWithChildren, createContext } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { Button } from "./button";
import { Modal } from "./modal";
import { Show } from "./show";

const AlertContext = createContext<{
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
} | null>(null);

type AlertDialogProviderProps = PropsWithChildren & { open?: boolean; onChange?: (open: boolean) => void };

export function AlertDialog({ open: controlledIsOpen = false, children, onChange }: AlertDialogProviderProps) {
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

  return <AlertContext.Provider value={{ open, openDialog, closeDialog }}>{children}</AlertContext.Provider>;
}

export function useAlertDialog() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertDialog should be used inside of an AlertDialogProvider");
  }
  return context;
}

export function AlertDialogTrigger({ children }: PropsWithChildren) {
  const { openDialog } = useAlertDialog();

  return (
    <div
      onClick={openDialog}
      className="bg-transparent outline-none border-none p-0 m-0 w-fit h-fit max-w-fit max-h-fit"
    >
      {children}
    </div>
  );
}

export function AlertDialogContent({ children }: PropsWithChildren) {
  const { open, closeDialog } = useAlertDialog();

  return (
    <Show when={open}>
      <Modal onClose={closeDialog} show={true}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-state="open"
          className={
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
          }
        >
          {children}
        </div>
      </Modal>
    </Show>
  );
}

export const AlertDialogHeader = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col space-y-2 text-center sm:text-left">{children}</div>;
};
AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogFooter = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">{children}</div>;
};
AlertDialogFooter.displayName = "AlertDialogFooter";

export const AlertDialogTitle = ({ children }: PropsWithChildren) => {
  return <div className="text-lg font-semibold">{children}</div>;
};
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = ({ children }: PropsWithChildren) => {
  return <div className="text-sm text-muted-foreground">{children}</div>;
};
AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogCancel = ({ children, onCancel }: PropsWithChildren<{ onCancel?: () => void }>) => {
  const { closeDialog } = useAlertDialog();

  return (
    <Button
      variant="outline"
      onClick={() => {
        closeDialog();
        if (onCancel) onCancel();
      }}
      className="mt-2 sm:mt-0"
    >
      {children}
    </Button>
  );
};
AlertDialogCancel.displayName = "AlertDialogCancel";

export function AlertDialogAction({ children, onConfirm }: PropsWithChildren<{ onConfirm?: () => void }>) {
  const { closeDialog } = useAlertDialog();

  return (
    <Button
      onClick={() => {
        closeDialog();
        if (onConfirm) onConfirm();
      }}
    >
      {children}
    </Button>
  );
}
