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

  const select_title = useMemo(() => {
    return data.find((item) => item.value === value)?.title || props.title || "Seleccionar";
  }, [data, value, props.title]);

  return (
    <div className="relative w-fit min-w-[200px] p-0 *:w-full *:justify-between">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="z-20 relative"
      >
        <span>{select_title}</span>
        <ChevronDown
          width={18}
          height={18}
        />
      </Button>

      <Show when={open}>
        <>
          <div className="absolute top-10 z-20 flex w-full flex-col rounded border border-gray-300 bg-white shadow">
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
          <div
            className="fixed top-0 left-0 h-screen w-screen z-10 bg-white/50"
            onClick={() => setOpen(false)}
          ></div>
        </>
      </Show>
    </div>
  );
}

function InternalOption(props: { value: string; title: string; selected: boolean; onSelect: () => void }) {
  if (props.selected) return null;

  return (
    <div className="*:w-full *:justify-start">
      <Button
        variant="ghost"
        onClick={props.onSelect}
      >
        <span>{props.title}</span>
      </Button>
    </div>
  );
}
