import { forwardRef, type HTMLAttributes } from "preact/compat";
import { cn } from "./share/cn";

type ProgressState = "indeterminate" | "complete" | "loading";

const DEFAULT_MAX = 100;

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The progress value. Set to null or undefined for indeterminate state.
   */
  value?: number | null | undefined;

  /**
   * The maximum progress value.
   * @default 100
   */
  max?: number;

  /**
   * A function to get the accessible label text representing the current value.
   */
  getValueLabel?(value: number, max: number): string;
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, class: classNative, value: valueProp = null, max: maxProp, getValueLabel = defaultGetValueLabel, ...props }, forwardedRef) => {
    // Validate max
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }

    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;

    // Validate value
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }

    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : undefined;
    const progressState = getProgressState(value, max);

    return (
      <div
        ref={forwardedRef}
        role="progressbar"
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={isNumber(value) ? value : undefined}
        aria-valuetext={valueLabel}
        data-slot="progress"
        data-state={progressState}
        data-value={value ?? undefined}
        data-max={max}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          className,
          classNative
        )}
        {...props}
      >
        <div
          data-slot="progress-indicator"
          data-state={progressState}
          data-value={value ?? undefined}
          data-max={max}
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{
            transform: `translateX(-${100 - (value ?? 0)}%)`,
          }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

/* ---------------------------------------------------------------------------------------------- */

function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`;
}

function getProgressState(value: number | undefined | null, maxValue: number): ProgressState {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}

function isNumber(value: any): value is number {
  return typeof value === "number";
}

function isValidMaxNumber(max: any): max is number {
  return isNumber(max) && !Number.isNaN(max) && max > 0;
}

function isValidValueNumber(value: any, max: number): value is number {
  return isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0;
}

function getInvalidMaxError(propValue: string, componentName: string) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}

function getInvalidValueError(propValue: string, componentName: string) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}

