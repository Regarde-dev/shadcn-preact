import { autoPlacement, autoUpdate, offset, shift, useFloating } from "@floating-ui/react-dom";
import { ChevronDown } from "lucide-preact";
import { type HTMLAttributes, type PropsWithChildren, forwardRef, useEffect, useMemo, useState } from "preact/compat";
import { Button } from "./button";
import { Modal } from "./modal";
import { cn } from "./share/cn";

type SelectProps = PropsWithChildren & {
  onChange?: (value: string) => void;
  value?: string;
  data: { value: string; title: string }[];
  title?: string;
  alignment?: "start" | "end";
};

export const SimpleSelect = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & SelectProps>(
  ({ className, ...props }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(props.value || "");
    const data = useMemo(() => props.data, [props.data]);

    const select_title = useMemo(() => {
      return data.find((item) => item.value === value)?.title || props.title || "Select";
    }, [data, value, props.title]);

    const { refs, floatingStyles } = useFloating<HTMLButtonElement>({
      open: open,
      strategy: "fixed",
      middleware: [
        autoPlacement({
          allowedPlacements: ["bottom-end", "bottom-start", "top-start", "top-end"],
          alignment: props.alignment || "start",
        }),
        shift(),
        offset(4),
      ],
      whileElementsMounted: autoUpdate,
      transform: false,
    });

    useEffect(() => {
      setValue(props.value || "");
    }, [props.value]);

    return (
      <>
        <Button
          ref={refs.setReference}
          variant="outline"
          className={cn("w-fit min-w-[200px] justify-between", className)}
          onClick={() => setOpen(!open)}
          onFocus={() => setOpen(true)}
        >
          <span className="text-foreground text-sm">{select_title}</span>
          <ChevronDown className="w-4 h-4 text-foreground" />
        </Button>

        <Modal show={open} onClose={() => setOpen(false)} className="bg-transparent">
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="flex min-w-[200px] max-h-[96vh] overflow-auto w-fit flex-col rounded-md border border-border bg-background shadow p-1"
          >
            {props.data.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                title={item.title}
                className={className}
                selected={item.value === value}
                onSelect={() => {
                  setValue(item.value);
                  setOpen(false);
                  if (props.onChange !== undefined) {
                    props.onChange(item.value);
                  }
                }}
              />
            ))}
          </div>
        </Modal>
      </>
    );
  }
);

type SelectItemProps = { value: string; title: string; selected: boolean; onSelect: () => void };

const SelectItem = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & SelectItemProps>((props, ref) => {
  if (props.selected) return null;

  return (
    <Button
      ref={ref}
      size="sm"
      variant="ghost"
      onClick={props.onSelect}
      className={cn("justify-start items-center min-h-9", props.className)}
    >
      {props.title}
    </Button>
  );
});
