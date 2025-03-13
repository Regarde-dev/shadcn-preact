import type { HTMLAttributes } from "preact/compat";
import { cn } from "./share/cn";

function Skeleton({ className, class: classNative, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-primary/10", className, classNative)} {...props} />;
}

export { Skeleton };
