import { createContext, createRef, PropsWithChildren } from "preact/compat";
import { useContext, useLayoutEffect, useState } from "preact/hooks";
import { cn } from "./share/cn";
import { debounce } from "./share/debounce";

type TooltipContextT = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const TooltipContext = createContext<TooltipContextT>(null);

type TooltipProviderProps = PropsWithChildren;

export function TooltipProvider({ children }: TooltipProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltip_ref = createRef<HTMLDivElement>();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useLayoutEffect(() => {
    if (!tooltip_ref.current) return;

    const $tooltipWrapper = tooltip_ref.current;
    const $tooltipContent = $tooltipWrapper.querySelector("[data-tooltip-content]") as HTMLDivElement;

    if (!$tooltipContent) return;

    const wrapper_coords = $tooltipWrapper.getBoundingClientRect();
    const content_coords = $tooltipContent.getBoundingClientRect();

    if (isOpen === false) {
      //----- Reseting Values, getting off the tooltip content
      $tooltipContent.style.opacity = `0`;
      $tooltipContent.style.top = `-9999px`;
      $tooltipContent.style.zIndex = `0`;
      return;
    }

    //----- Calculating Horizontal Position
    let leftOffset = 0;
    const dw = wrapper_coords.width - content_coords.width;

    if (window.innerWidth - wrapper_coords.left - content_coords.width - 10 <= 0) {
      leftOffset = window.innerWidth - content_coords.width - 5;
    } else if (wrapper_coords.left >= 20) {
      leftOffset = wrapper_coords.left + dw / 2;
    } else {
      leftOffset = wrapper_coords.left;
    }

    //----- Calculating Vertical Position
    let topOffset = wrapper_coords.top - 30;

    const contentMargin = 5;

    if (window.innerHeight < wrapper_coords.top + wrapper_coords.height + content_coords.height + contentMargin) {
      topOffset = wrapper_coords.top - content_coords.height - contentMargin / 4;
    } else {
      topOffset = wrapper_coords.top + wrapper_coords.height + contentMargin;
    }

    //----- Settings Styles Values
    $tooltipContent.style.left = `${leftOffset}px`;
    $tooltipContent.style.top = `${topOffset}px`;
    $tooltipContent.style.zIndex = `99999px`;
    $tooltipContent.style.opacity = "1";
  }, [open]);

  return (
    <TooltipContext.Provider value={{ isOpen, open, close }}>
      <div
        className="w-fit relative h-fit p-0 m-0"
        ref={tooltip_ref}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip debe ser usado dentro de un TooltipProvider");
  }
  return context;
}

export function Tooltip({ children }: PropsWithChildren) {
  return children;
}

export function TooltipTrigger({ children }: PropsWithChildren) {
  const { open, close } = useTooltip();

  const openDebounced = debounce(open, 100);
  const closeDebounced = debounce(close, 150);

  return (
    <div
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
  const { isOpen } = useTooltip();
  return (
    <div
      data-tooltip-content
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "fixed z-50 overflow-hidden max-md:hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      )}
    >
      {children}
    </div>
  );
}
