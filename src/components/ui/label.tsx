import { type VariantProps, cva } from "class-variance-authority";
import { type LabelHTMLAttributes, forwardRef } from "preact/compat";
import { cn } from "./share/cn";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes & VariantProps<typeof labelVariants>>(
  // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
  ({ className, ...props }, ref) => <label ref={ref} className={cn(labelVariants(), className)} {...props} />
);
Label.displayName = "Label";

export { Label };
