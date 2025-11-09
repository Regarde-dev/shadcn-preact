import type { ButtonHTMLAttributes } from "preact";
import { forwardRef } from "preact/compat";
import { cn } from "./share/cn";
import { useControlledState } from "./share/useControlledState";

export type SwitchProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * The controlled checked state of the switch.
   */
  checked?: boolean;

  /**
   * The default checked state when uncontrolled.
   */
  defaultChecked?: boolean;

  /**
   * Event handler called when the checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * When true, prevents the user from interacting with the switch.
   */
  disabled?: boolean;

  /**
   * The name of the switch. Submitted with its owning form as part of a name/value pair.
   */
  name?: string;

  /**
   * The value given as data when submitted with a name.
   */
  value?: string;

  /**
   * When true, indicates that the user must check the switch before the owning form can be submitted.
   */
  required?: boolean;
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      class: classNative,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      name,
      value = "on",
      required,
      onClick,
      ...props
    },
    forwardedRef
  ) => {
    const [checked, setChecked] = useControlledState({
      defaultValue: defaultChecked,
      controlledValue: controlledChecked,
      onChange: onCheckedChange,
    });

    const handleClick: typeof onClick = (e) => {
      if (disabled) return;
      setChecked(!checked);
      onClick?.(e);
    };

    return (
      <>
        <button
          ref={forwardedRef}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-required={required}
          data-slot="switch"
          data-state={checked ? "checked" : "unchecked"}
          data-disabled={disabled ? "true" : undefined}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            className,
            classNative
          )}
          {...props}
        >
          <span
            data-slot="switch-thumb"
            data-state={checked ? "checked" : "unchecked"}
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
              "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
            )}
          />
        </button>
        {/* Hidden input for form integration */}
        {name && (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            required={required}
            disabled={disabled}
            onChange={() => {}} // Controlled by button
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none fixed -top-[99999px] h-1 w-1 cursor-none"
          />
        )}
      </>
    );
  }
);
Switch.displayName = "Switch";

