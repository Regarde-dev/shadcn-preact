import { autoPlacement, autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/react-dom";
import { type CSSProperties, type MutableRefObject, type PropsWithChildren, createContext } from "preact/compat";
import { useContext, useState } from "preact/hooks";
import { cn } from "./share/cn";
import { debounce } from "./share/debounce";
import { Show } from "./show";

type TooltipContextT = {
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
};

const TooltipContext = createContext<TooltipContextT>(null);

type TooltipProviderProps = PropsWithChildren & {
  delay?: number;
  side?: "top" | "right" | "bottom" | "left";
  alignment?: "start" | "end";
  alignOffset?: number;
};

export function TooltipProvider({ children, ...props }: TooltipProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltip_id] = useState(Math.random().toString());

  const { refs, floatingStyles } = useFloating<HTMLDivElement>({
    open: isOpen,
    strategy: "fixed",
    placement: props.side,
    middleware: [
      autoPlacement({
        allowedPlacements: props.side ? [`${props.side}-end`, `${props.side}-start`, props.side] : undefined,
        alignment: props.alignment,
      }),
      shift(),
      offset(props.alignOffset || 4),
    ],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <TooltipContext.Provider
      value={{ isOpen, open, close, id: tooltip_id, ref: refs, floatingStyles, delay: props.delay }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip should be used within TooltipProvider");
  }
  return context;
}

export function Tooltip({ children }: PropsWithChildren) {
  return children;
}

export function TooltipTrigger({ children }: PropsWithChildren) {
  const { open, close, ref, delay } = useTooltip();

  const openDebounced = debounce(open, delay || 300);
  const closeDebounced = debounce(close, 300);

  return (
    <div
      ref={ref.setReference}
      onMouseEnter={openDebounced}
      onFocus={openDebounced}
      onMouseLeave={closeDebounced}
      onFocusOut={closeDebounced}
      onBlur={closeDebounced}
      className="bg-transparent p-0 m-0 w-fit relative border-none border-0 outline-none"
    >
      {children}
    </div>
  );
}

export function TooltipContent({ children }: PropsWithChildren) {
  const { isOpen, id, ref, floatingStyles } = useTooltip();

  return (
    <Show when={isOpen}>
      <div
        ref={ref.setFloating}
        style={floatingStyles}
        data-tooltip-content
        data-tooltip-id={id}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        )}
      >
        {children}
      </div>
    </Show>
  );
}
