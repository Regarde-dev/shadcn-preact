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
    document.body.classList.add("overflow-hidden");
    $app_root_container.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
      $app_root_container.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        props.onClose();
      }}
      className={cn(
        "fixed overflow-hidden left-0 top-0 z-50 flex h-[100vh] w-[100vw] max-h-[100vh] max-w-[100vw] flex-col items-center justify-center bg-black/80 modal-in-animation",
        className
      )}
      {...props}
    >
      <div
        className="w-auto h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
});

export { Modal };
