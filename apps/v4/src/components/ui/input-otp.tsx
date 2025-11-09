import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-preact";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, useContext } from "preact/compat";
import { cn } from "./share/cn";

export type InputOTPProps = ComponentPropsWithoutRef<typeof OTPInput>;

export const InputOTP = forwardRef<ElementRef<typeof OTPInput>, InputOTPProps>(
  ({ className, containerClassName, ...props }, ref) => (
    // @ts-expect-error OTPInput ref type mismatch
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      data-slot="input-otp"
      {...props}
    />
  )
);
InputOTP.displayName = "InputOTP";

export type InputOTPGroupProps = ComponentPropsWithoutRef<"div">;

export const InputOTPGroup = forwardRef<ElementRef<"div">, InputOTPGroupProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center", className)}
    data-slot="input-otp-group"
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

export type InputOTPSlotProps = ComponentPropsWithoutRef<"div"> & { index: number };

export const InputOTPSlot = forwardRef<ElementRef<"div">, InputOTPSlotProps>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];

  if (!slot) {
    return null;
  }

  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-input border-y border-r text-sm shadow-sm first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      data-slot="input-otp-slot"
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

export type InputOTPSeparatorProps = ComponentPropsWithoutRef<"div">;

export const InputOTPSeparator = forwardRef<ElementRef<"div">, InputOTPSeparatorProps>(({ ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    tabIndex={-1}
    data-slot="input-otp-separator"
    {...props}
  >
    <Minus />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

