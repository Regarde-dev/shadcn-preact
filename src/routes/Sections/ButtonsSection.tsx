import { Button } from "@ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";
import { Loader2, MailOpen, User } from "lucide-preact";
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

      <Button
        onClick={() => {
          toast.loading("Making Transaction");
          toast.success("Transaction Success");
          toast.error("Transaction Success");
        }}
      >
        Toast Me
      </Button>
    </div>
  );
}
