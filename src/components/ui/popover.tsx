import { autoPlacement, autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/react-dom";
import {
  type CSSProperties,
  type HTMLAttributes,
  type MutableRefObject,
  type PropsWithChildren,
  createContext,
  forwardRef,
} from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { Modal } from "./modal";
import { cn } from "./share/cn";
import { debounce } from "./share/debounce";

type PopoverContextT = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  id: string;
  ref: {
    reference: MutableRefObject<HTMLDivElement>;
    floating: React.MutableRefObject<HTMLElement | null>;
    setReference: (node: HTMLDivElement) => void;
    setFloating: (node: HTMLElement | null) => void;
  };
  floatingStyles: CSSProperties;
  delay?: number;
  side?: "top" | "right" | "bottom" | "left";
};

const PopoverContext = createContext<PopoverContextT>(null);

type PopoverProviderProps = PropsWithChildren & {
  delay?: number;
  side?: "top" | "right" | "bottom" | "left";
  alignOffset?: number;
};

export function Popover({ children, ...props }: PopoverProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [Popover_id] = useState(Math.random().toString());

  const { refs, floatingStyles } = useFloating<HTMLDivElement>({
    open: isOpen,
    strategy: "fixed",
    placement: props.side,
    middleware: [
      ...[
        props.side
          ? flip()
          : autoPlacement({
              allowedPlacements: ["top", "right", "bottom", "left"],
            }),
      ],
      shift(),
      offset(props.alignOffset || 4),
    ],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <PopoverContext.Provider
      value={{ isOpen, open, close, id: Popover_id, ref: refs, floatingStyles, delay: props.delay, side: props.side }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover should be used within PopoverProvider");
  }
  return context;
}

export function PopoverTrigger({ children }: PropsWithChildren) {
  const { open, isOpen, ref, delay } = usePopover();

  const openDebounced = debounce(open, delay || 50);

  return (
    <div
      ref={ref.setReference}
      onClick={openDebounced}
      onFocus={openDebounced}
      data-state={isOpen ? "open" : "closed"}
      className="bg-transparent p-0 m-0 w-fit relative border-none border-0 outline-none"
    >
      {children}
    </div>
  );
}

export const PopoverContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }) => {
    const { isOpen, ref, floatingStyles, side, close, id } = usePopover();

    useEffect(() => {
      if (isOpen) {
        ref.floating?.current?.querySelectorAll("input")[0]?.select();
      }
    }, [isOpen, ref.floating]);

    return (
      <Modal onClose={close} show={isOpen} className="bg-transparent">
        <div
          data-popover-id={id}
          ref={ref.setFloating}
          onClick={(e) => e.stopPropagation()}
          style={floatingStyles}
          data-state={isOpen ? "open" : "closed"}
          data-side={side || "bottom"}
          className={cn(
            "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </Modal>
    );
  }
);
