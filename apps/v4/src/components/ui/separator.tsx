import type { ComponentProps } from "preact";
import { forwardRef } from "preact/compat";
import { cn } from "./share/cn";

const DEFAULT_ORIENTATION = "horizontal";

const ORIENTATIONS = ["horizontal", "vertical"] as const;

type Orientation = (typeof ORIENTATIONS)[number];

export type SeparatorProps = ComponentProps<"div"> & {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation;
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean;
};

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation: orientationProp = DEFAULT_ORIENTATION, decorative, ...props }, forwardedRef) => {
    const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;

    const ariaOrientation = orientation === "vertical" ? orientation : undefined;

    return (
      <div
        ref={forwardedRef}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : ariaOrientation}
        data-orientation={orientation}
        data-slot="separator"
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

function isValidOrientation(orientation: any): orientation is Orientation {
  return ORIENTATIONS.includes(orientation);
}
