import { createContext, PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { Button } from "./button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
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
  }, [open]);

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
      className="bg-transparent outline-none border-none p-0 m-0 w-fit h-fit"
    >
      {children}
    </div>
  );
}

export function AlertDialogContent({ children }: PropsWithChildren) {
  const { open, closeDialog } = useAlertDialog();

  return (
    <Show when={open}>
      <Modal
        onClose={closeDialog}
        show={true}
      >
        <Card className="w-screen max-w-[520px]">{children}</Card>
      </Modal>
    </Show>
  );
}

export function AlertDialogHeader({ children }: PropsWithChildren) {
  return <CardHeader className="flex flex-col space-y-2 text-center pb-2 sm:text-left">{children}</CardHeader>;
}

export function AlertDialogTitle({ children }: PropsWithChildren) {
  return <CardTitle>{children}</CardTitle>;
}

export function AlertDialogDescription({ children }: PropsWithChildren) {
  return <CardDescription>{children}</CardDescription>;
}

export function AlertDialogFooter({ children }: PropsWithChildren) {
  return <CardFooter className="flex flex-row justify-end gap-4">{children}</CardFooter>;
}

export function AlertDialogCancel({ children, onCancel }: PropsWithChildren<{ onCancel?: () => void }>) {
  const { closeDialog } = useAlertDialog();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        closeDialog();
        if (onCancel) onCancel();
      }}
    >
      {children}
    </Button>
  );
}

export function AlertDialogAction({ children, onConfirm }: PropsWithChildren<{ onConfirm?: () => void }>) {
  const { closeDialog } = useAlertDialog();

  return (
    <Button
      variant="default"
      type="button"
      onClick={() => {
        closeDialog();
        if (onConfirm) onConfirm();
      }}
    >
      {children}
    </Button>
  );
}
