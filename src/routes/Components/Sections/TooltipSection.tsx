import { Button } from "@ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";

export function TooltipSection() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-10">
      <TooltipProvider side="bottom" alignOffset={4}>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">Hover</Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
