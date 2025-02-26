import { Button } from "@ui/button";
import { ToastAction, toast } from "@ui/toast";

export function ToastSection() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-10">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
          });
        }}
      >
        Add to calendar
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      >
        Show Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
}
