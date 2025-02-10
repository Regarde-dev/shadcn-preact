import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Toggle } from "@ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";
import { Bold, Italic, Loader2, MailOpen, Underline, User } from "lucide-preact";
import toast from "react-hot-toast";

export function ButtonsSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Buttons</CardTitle>
        <CardDescription className="text-md">
          Displays a button or a component that looks like a button.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-row flex-wrap gap-10">
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
      </CardContent>
    </Card>
  );
}
