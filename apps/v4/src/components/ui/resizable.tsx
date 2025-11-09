import { GripVertical } from "lucide-preact";
import type { ComponentProps } from "preact";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "./share/cn";

const ResizablePanelGroup = ({ className, ...props }: ComponentProps<typeof ResizablePrimitive.PanelGroup>) =>
  // Ensure that the component is only rendered in a browser environment
  // Will break if rendered on the server and client refresh the page
  typeof window !== "undefined" && (
    <ResizablePrimitive.PanelGroup
      className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
      data-slot="resizable-panel-group"
      {...props}
    />
  );

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "after:-translate-x-1/2 data-[panel-group-direction=vertical]:after:-translate-y-1/2 relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    data-slot="resizable-handle"
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };

