import { type VariantProps } from "class-variance-authority";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-preact";
import type { ComponentProps } from "preact";
import { forwardRef } from "preact/compat";
import { buttonVariants } from "./button";
import { cn } from "./share/cn";

export type PaginationProps = ComponentProps<"nav">;

export const Pagination = ({ className, class: classNative, ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    className={cn("mx-auto flex w-full justify-center", className, classNative)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

export type PaginationContentProps = ComponentProps<"ul">;

export const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <ul
      ref={forwardedRef}
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className, classNative)}
      {...props}
    />
  )
);
PaginationContent.displayName = "PaginationContent";

export type PaginationItemProps = ComponentProps<"li">;

export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, class: classNative, ...props }, forwardedRef) => (
    <li
      ref={forwardedRef}
      data-slot="pagination-item"
      className={cn("", className, classNative)}
      {...props}
    />
  )
);
PaginationItem.displayName = "PaginationItem";

export type PaginationLinkProps = {
  /**
   * Whether this page link is the currently active page.
   */
  isActive?: boolean;
} & Pick<VariantProps<typeof buttonVariants>, "size"> &
  ComponentProps<"a">;

export const PaginationLink = ({
  className,
  class: classNative,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    data-slot="pagination-link"
    data-active={isActive ? "true" : "false"}
    className={cn(
      "cursor-pointer",
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
      classNative
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

export type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;

export const PaginationPrevious = ({ className, class: classNative, size, ...props }: PaginationPreviousProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    size={size ?? "default"}
    data-slot="pagination-previous"
    className={cn("gap-1 pl-2.5", className, classNative)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

export type PaginationNextProps = ComponentProps<typeof PaginationLink>;

export const PaginationNext = ({ className, class: classNative, size, ...props }: PaginationNextProps) => (
  <PaginationLink
    aria-label="Go to next page"
    size={size ?? "default"}
    data-slot="pagination-next"
    className={cn("gap-1 pr-2.5", className, classNative)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

export type PaginationEllipsisProps = ComponentProps<"span">;

export const PaginationEllipsis = ({ className, class: classNative, ...props }: PaginationEllipsisProps) => (
  <span
    aria-hidden="true"
    data-slot="pagination-ellipsis"
    className={cn("flex h-9 w-9 items-center justify-center", className, classNative)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

