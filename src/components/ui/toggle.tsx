import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef, useEffect, useState } from "preact/compat";
import { cn } from "./share/cn";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ToggleProps = ButtonHTMLAttributes &
  VariantProps<typeof toggleVariants> & {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?(pressed: boolean): void;
  };

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(({ className, variant, size, ...props }, ref) => {
  const [isOn, setIsOn] = useState(props.pressed ? props.pressed : props.defaultPressed || false);

  useEffect(() => {
    if (props.onPressedChange) {
      props.onPressedChange(isOn);
    }
  }, [isOn]);

  useEffect(() => {
    setIsOn(props.pressed);
  }, [props.pressed]);

  return (
    <button
      ref={ref}
      data-state={isOn ? "on" : "off"}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
      onClick={() => setIsOn(!isOn)}
    />
  );
});
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
