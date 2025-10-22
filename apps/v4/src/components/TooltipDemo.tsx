import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function TooltipDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 font-bold text-2xl">Tooltip Component</h2>
        <p className="mb-6 text-muted-foreground">
          Hover or focus on the buttons to see tooltips in different positions.
        </p>
      </div>

      <TooltipProvider>
        <div className="space-y-6">
          {/* Basic Tooltip - Top */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm">Top Position (Default)</h3>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tooltip appears on top</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* All Positions */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm">All Positions</h3>
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Tooltip on top</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tooltip on bottom</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Tooltip on left</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tooltip on right</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm">Icon Buttons</h3>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Add New Item"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new item</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Edit"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Delete"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Custom Delay */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm">Custom Delay (Instant)</h3>
            <div className="flex gap-4">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="outline">No Delay</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tooltip appears instantly</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Longer Content */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm">Longer Content</h3>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover for details</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    <p className="mb-1 font-semibold">Detailed Information</p>
                    <p className="text-xs">
                      This tooltip contains more detailed information about the action you're about to perform.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
