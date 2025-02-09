import { Check } from "lucide-preact";
import { forwardRef, HTMLAttributes, useLayoutEffect, useState } from "preact/compat";
import { cn } from "./share/cn";

type CheckedState = boolean;

type CheckboxProps = HTMLAttributes<HTMLButtonElement> & {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  required?: boolean;
  onCheckedChange?(checked: CheckedState): void;
  disabled?: boolean;
};

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, defaultChecked, required, onCheckedChange, ...props }, ref) => {
    const [internalIsChecked, setIsChecked] = useState<CheckedState>(checked || defaultChecked || false);

    useLayoutEffect(() => {
      onCheckedChange && onCheckedChange(internalIsChecked);
    }, [internalIsChecked]);

    return (
      <>
        <button
          disabled={props.disabled || false}
          className={cn(
            "border-primary shadow border w-4 h-4 rounded-sm flex flex-row justify-center items-center disabled:cursor-not-allowed",
            `${internalIsChecked ? "bg-primary text-primary-foreground" : ""}`,
            className
          )}
          type="button"
          ref={ref}
          aria-checked={internalIsChecked}
          role={"checkbox"}
          value={internalIsChecked ? "on" : "off"}
          onClick={() => setIsChecked((prev) => !prev)}
          {...props}
        >
          {internalIsChecked ? <Check className="h-4 w-4" /> : null}
        </button>

        <input
          type="checkbox"
          aria-hidden="true"
          style="transform: translateX(-100%); position: absolute; pointer-events: none; opacity: 0; margin: 0px; width: 25px; height: 25px;"
          tabIndex={-1}
          value={internalIsChecked ? "on" : "off"}
          checked={internalIsChecked}
        />
      </>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
