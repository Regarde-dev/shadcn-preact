import { forwardRef, HTMLAttributes } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { Input } from "./ui/input";
import { cn } from "./ui/share/cn";

type NumberInputProps = HTMLAttributes<HTMLInputElement> & {
  onNumberChange: (v: number) => void;
  initial_value: number;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({ className, ...props }, ref) => {
  const [value, setValue] = useState<string>(props.initial_value.toString());

  useEffect(() => {
    setValue(props.initial_value.toString());
  }, [props.initial_value]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (value === "-") return;
      const parseRes = parseFloat(value);
      if (isNaN(parseRes)) {
        setValue("0");
        props.onNumberChange(0);
        return;
      }
      props.onNumberChange(parseRes);
    }, 100);

    return () => clearTimeout(timeOut);
  }, [value]);

  return (
    <Input
      ref={ref}
      onInput={(e) => {
        e.preventDefault();
        setValue(e.currentTarget.value);
      }}
      onFocusOut={(e) => {
        e.preventDefault();
        setValue(e.currentTarget.value);
      }}
      value={value === "0" ? "" : value}
      type="text"
      className={cn("w-full flex-1 p-1 outline-none", className)}
      inputMode={"number"}
      style={props.style}
      {...props}
    />
  );
});
