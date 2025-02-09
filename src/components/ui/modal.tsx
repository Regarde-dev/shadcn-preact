import { createPortal, HTMLAttributes, PropsWithChildren } from "preact/compat";
import { cn } from "./share/cn";
import { Show } from "./show";

type ModalProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    onClose: () => void;
    show: boolean;
  }
>;

const $container = document.querySelector<HTMLDivElement>("#app-modal");

if (!$container) {
  throw new Error("Root App Modal dom element do not exist");
}

const Modal = ({ show, className, ...props }: ModalProps) => {
  return createPortal(
    <Show when={show}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.onClose();
        }}
        className={cn(
          "fixed left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black/80 modal-animated",
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
    </Show>,
    $container
  );
};
Modal.displayName = "Modal";

export { Modal };
