import { createPortal, forwardRef, HTMLAttributes, PropsWithChildren, useEffect } from "preact/compat";
import { cn } from "./share/cn";
import { Show } from "./show";

type ModalProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    onClose: () => void;
    show: boolean;
  }
>;

const $app_modal_container = document.querySelector<HTMLDivElement>("#app-modal");
const $app_root_container = document.querySelector<HTMLDivElement>("#app-root");

if (!$app_modal_container || !$app_root_container) {
  throw new Error("`#app-modal` or `#app-root` DOM elements does not exist");
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ show, ...props }, ref) => {
  return createPortal(
    <Show when={show}>
      <ModalContent
        {...props}
        ref={ref}
      />
    </Show>,
    $app_modal_container
  );
});
Modal.displayName = "Modal";

type ModalContentProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    onClose: () => void;
  }
>;

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({ className, ...props }, ref) => {
  useEffect(() => {
    // TODO: FIX this for not break sticky components or implement Scrollarea component
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={props.onClose}
      data-state="open"
      className={cn("fixed inset-0 z-50 bg-black/80 animate-in fade-in-0", className)}
      {...props}
    >
      {props.children}
    </div>
  );
});

export { Modal };
