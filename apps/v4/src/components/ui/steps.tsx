import { type HTMLAttributes, type PropsWithChildren, forwardRef } from "preact/compat";
import { cn } from "./share/cn";

export type StepsProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  ({ class: classNative, className, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        data-slot="steps"
        className={cn(
          "flex h-auto w-full flex-col gap-10 md:border-l md:border-l-border md:pl-8",
          className,
          classNative
        )}
        {...props}
      />
    );
  }
);
Steps.displayName = "Steps";

export type StepProps = HTMLAttributes<HTMLElement> & PropsWithChildren;

export const Step = forwardRef<HTMLElement, StepProps>(({ class: classNative, className, ...props }, forwardedRef) => {
  return (
    <section
      ref={forwardedRef}
      data-slot="step"
      className={cn("flex w-full flex-col gap-2", className, classNative)}
      {...props}
    />
  );
});
Step.displayName = "Step";

export type StepTitleProps = PropsWithChildren & {
  /**
   * The label to guide the user, typically 1, 2, 3, 4...
   */
  label: string;
} & HTMLAttributes<HTMLHeadingElement>;

export const StepTitle = forwardRef<HTMLHeadingElement, StepTitleProps>(
  ({ className, class: classNative, children, label, ...props }, forwardedRef) => {
    return (
      <h2
        ref={forwardedRef}
        data-slot="step-title"
        data-step-label={label}
        className={cn(
          "relative flex w-full flex-row items-center gap-2 text-start font-semibold text-lg",
          className,
          classNative
        )}
        {...props}
      >
        <span
          tabindex={-1}
          aria-hidden="true"
          className="md:-left-[2.82rem] rounded-full bg-muted px-2 py-0.5 text-center font-semibold text-primary text-sm md:absolute md:top-0"
        >
          {label}
        </span>
        {children}
      </h2>
    );
  }
);
StepTitle.displayName = "StepTitle";

export type StepContentProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

export const StepContent = forwardRef<HTMLDivElement, StepContentProps>(
  ({ class: classNative, className, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        data-slot="step-content"
        className={cn("flex w-full flex-col gap-2", className, classNative)}
        {...props}
      />
    );
  }
);
StepContent.displayName = "StepContent";

