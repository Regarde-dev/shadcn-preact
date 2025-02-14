import { Button } from "@ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";

export function TooltipSection() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-10">
      <TooltipProvider>
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
