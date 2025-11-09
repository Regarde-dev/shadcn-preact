import { Button } from "@ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@ui/collapsible";
import { ChevronsUpDown } from "lucide-preact";
import { useState } from "preact/hooks";

export function CollapsibleDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Basic Collapsible</h2>
        <BasicCollapsibleExample />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Controlled Collapsible</h2>
        <ControlledCollapsibleExample />
      </div>
    </div>
  );
}

function BasicCollapsibleExample() {
  return (
    <Collapsible className="w-full max-w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="font-semibold text-sm">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
          >
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ControlledCollapsibleExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full max-w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="font-semibold text-sm">@shadcn starred 2 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
            >
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@shadcn/ui</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@shadcn/taxonomy</div>
        </CollapsibleContent>
      </Collapsible>
      <p className="text-muted-foreground text-sm">Status: {isOpen ? "Open" : "Closed"}</p>
    </div>
  );
}

