import { ChevronDown } from "lucide-preact";
import { PropsWithChildren, useEffect, useMemo, useState } from "preact/compat";
import { Button } from "./button";
import { Show } from "./show";

type SelectProps = PropsWithChildren & {
  onChange: (value: string) => void;
  value?: string;
  data: { value: string; title: string }[];
  title?: string;
};

export function SimpleSelect(props: SelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.value || "");
  const data = useMemo(() => props.data, [props.data]);

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  useEffect(() => {
    // TODO: FIX this for not break sticky components
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  const select_title = useMemo(() => {
    return data.find((item) => item.value === value)?.title || props.title || "Select";
  }, [data, value, props.title]);

  return (
    <div className="relative w-fit bg-transparent border-none outline-none min-w-[200px] p-0 *:w-full *:justify-between">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="relative z-[1px]"
      >
        <span className="text-foreground text-sm">{select_title}</span>
        <ChevronDown className="w-4 h-4 text-foreground" />
      </Button>

      <Show when={open}>
        <>
          <div
            className="fixed top-0 left-0 h-screen w-screen z-[2px] bg-transparent"
            onClick={() => setOpen(false)}
          ></div>
          <div className="absolute top-10 z-[2px] flex w-full flex-col rounded-md border border-border bg-background shadow p-1">
            {props.data.map((item) => (
              <InternalOption
                key={item.value}
                value={item.value}
                title={item.title}
                selected={item.value === value}
                onSelect={() => {
                  setValue(item.value);
                  setOpen(false);
                  props.onChange(item.value);
                }}
              />
            ))}
          </div>
        </>
      </Show>
    </div>
  );
}

function InternalOption(props: { value: string; title: string; selected: boolean; onSelect: () => void }) {
  if (props.selected) return null;

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={props.onSelect}
      className="justify-start items-center relative z-[2px]"
    >
      {props.title}
    </Button>
  );
}
