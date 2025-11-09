import { ChevronRight, MoreHorizontal } from "lucide-preact";
import type { AnchorHTMLAttributes, ComponentProps } from "preact";
import { type ComponentPropsWithoutRef, forwardRef } from "preact/compat";
import { cn } from "./share/cn";
import { Slot } from "./share/slot";

export type BreadcrumbProps = ComponentPropsWithoutRef<"nav">;

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <nav
      ref={forwardedRef}
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className, classNative)}
      {...props}
    />
  )
);
Breadcrumb.displayName = "Breadcrumb";

export type BreadcrumbListProps = ComponentPropsWithoutRef<"ol">;

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <ol
      ref={forwardedRef}
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5",
        className,
        classNative
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

export type BreadcrumbItemProps = ComponentPropsWithoutRef<"li">;

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <li
      ref={forwardedRef}
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className, classNative)}
      {...props}
    />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export type BreadcrumbLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean;
};

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild = false, className, class: classNative, children, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={forwardedRef}
        data-slot="breadcrumb-link"
        className={cn("transition-colors hover:text-foreground", className, classNative)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbPageProps = ComponentPropsWithoutRef<"span">;

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <span
      ref={forwardedRef}
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn("font-normal text-foreground", className, classNative)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export type BreadcrumbSeparatorProps = ComponentProps<"li">;

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  ({ children, className, class: classNative, ...props }, forwardedRef) => (
    <li
      ref={forwardedRef}
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className, classNative)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export type BreadcrumbEllipsisProps = ComponentProps<"span">;

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <span
      ref={forwardedRef}
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      className={cn("flex h-9 w-9 items-center justify-center", className, classNative)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  )
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

