import { Check } from "lucide-preact";
import type { ComponentProps } from "preact";
import { forwardRef } from "preact/compat";
import { cn } from "./share/cn";
import { useControlledState } from "./share/useControlledState";

type CheckedState = boolean;

export type CheckboxProps = Omit<ComponentProps<"button">, "value"> & {
  /** The controlled checked state of the checkbox */
  checked?: CheckedState;
  /** The default checked state when uncontrolled */
  defaultChecked?: CheckedState;
  /** Whether the checkbox is required in a form */
  required?: boolean;
  /** Callback fired when the checked state changes */
  onCheckedChange?(checked: CheckedState): void;
  /** The name of the checkbox for form submission */
  name?: string;
  /** The form id this checkbox belongs to */
  form?: string;
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      disabled,
      className,
      checked: controlledChecked,
      defaultChecked,
      required,
      onCheckedChange,
      name,
      form,
      ...props
    },
    forwardedRef
  ) => {
    const [checked, setChecked] = useControlledState({
      defaultValue: Boolean(defaultChecked),
      controlledValue: controlledChecked,
      onChange: onCheckedChange,
    });

    const handleClick = () => {
      if (disabled) return;
      setChecked((prev) => !prev);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <>
        <button
          ref={forwardedRef}
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-required={required}
          disabled={disabled}
          data-state={checked ? "checked" : "unchecked"}
          data-disabled={disabled ? "true" : undefined}
          data-slot="checkbox"
          onClick={handleClick}
          onKeyDown={handleKeyDown as any}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-center text-current">
            {checked ? <Check className="h-4 w-4" /> : null}
          </div>
        </button>

        {/* Hidden input for form submission */}
        {name && (
          <input
            type="checkbox"
            name={name}
            form={form}
            checked={checked}
            required={required}
            aria-hidden="true"
            tabIndex={-1}
            value={checked ? "on" : "off"}
            data-state={checked ? "checked" : "unchecked"}
            data-disabled={disabled ? "true" : undefined}
            style={{
              transform: "translateX(-100%)",
              position: "absolute",
              pointerEvents: "none",
              opacity: 0,
              margin: 0,
              width: "25px",
              height: "25px",
            }}
            onChange={() => {}} // Controlled by button
          />
        )}
      </>
    );
  }
);
Checkbox.displayName = "Checkbox";
