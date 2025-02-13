import { Button } from "@ui/button";
import { Toggle } from "@ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";
import { Bold, Italic, Loader2, MailOpen, Underline, User } from "lucide-preact";
import toast from "react-hot-toast";

export function ButtonsSection() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-10">
      <Button variant="default">Button</Button>

      <Button variant="secondary">Button</Button>

      <Button variant="outline">Button</Button>

      <Button variant="ghost">Button</Button>

      <Button variant="link">Button</Button>

      <Button variant="destructive">Button</Button>

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

      <Toggle aria-label="Toggle italic">
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        variant="outline"
        aria-label="Toggle italic"
      >
        <Italic />
      </Toggle>

      <Toggle aria-label="Toggle italic">
        <Italic />
        Italic
      </Toggle>

      <Toggle
        aria-label="Toggle italic"
        disabled
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      <Button
        onClick={() => {
          toast.loading("Making Transaction");
          toast.success("Transaction Success");
          toast.error("Transaction Success");
        }}
      >
        Toast Me
      </Button>

      <Button>
        <MailOpen /> Login with Email
      </Button>

      <Button disabled>
        <Loader2 className="animate-spin" />
        Please wait
      </Button>

      <Button
        variant="secondary"
        className="gap-2"
      >
        <User />
        Login
      </Button>
    </div>
  );
}
