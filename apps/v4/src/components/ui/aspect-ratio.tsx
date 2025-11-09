import { forwardRef, type HTMLAttributes } from "preact/compat";
import { cn } from "./share/cn";

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The desired aspect ratio (width / height).
   * @default 1 (square)
   * @example 16/9 for widescreen, 4/3 for standard
   */
  ratio?: number;
};

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, style, className, class: classNative, children, ...props }, forwardedRef) => {
    return (
      <div
        data-slot="aspect-ratio-wrapper"
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${100 / ratio}%`,
        }}
      >
        <div
          ref={forwardedRef}
          data-slot="aspect-ratio"
          className={cn(className, classNative)}
          style={Object.assign({}, style, {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          })}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);
AspectRatio.displayName = "AspectRatio";

