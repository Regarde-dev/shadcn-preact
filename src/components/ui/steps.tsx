import { cn } from "@ui/share/cn";
import { type HTMLAttributes, type PropsWithChildren, forwardRef } from "preact/compat";

export const Steps = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & PropsWithChildren>(
  ({ class: classNative, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
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

export const Step = forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & PropsWithChildren>(
  ({ class: classNative, className, ...props }, ref) => {
    return <section ref={ref} className={cn("flex w-full flex-col gap-2", className, classNative)} {...props} />;
  }
);

type StepTitleProps = PropsWithChildren & {
  /**
   * The label to guide the user, tipically 1,2,3,4...
   * @type {string}
   **/
  label: string;
};

export const StepTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement> & StepTitleProps>(
  ({ className, class: classNative, children, label, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "relative flex w-full flex-row items-center gap-2 text-start font-semibold text-lg",
          className,
          classNative
        )}
        {...props}
      >
        <span
          tabindex={-1}
          data-step-label={label}
          className="md:-left-[2.82rem] rounded-full bg-muted px-2 py-0.5 text-center font-semibold text-primary text-sm md:absolute md:top-0"
        >
          {label}
        </span>
        {children}
      </h2>
    );
  }
);

export const StepContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & PropsWithChildren>(
  ({ class: classNative, className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex w-full flex-col gap-2", className, classNative)} {...props} />;
  }
);
