import { Button } from "@ui/button";
import { ToastAction, toast } from "@ui/toast";

export function ToastDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Basic Toast</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              });
            }}
          >
            Show Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                description: "Your message has been sent.",
              });
            }}
          >
            Simple Toast
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Toast with Action</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: (
                  <ToastAction
                    altText="Try again"
                    onClick={() => console.log("Retry clicked")}
                  >
                    Try again
                  </ToastAction>
                ),
              });
            }}
          >
            With Action
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Error",
                description: "Your session has expired. Please log in again.",
                action: (
                  <ToastAction
                    altText="Log in"
                    onClick={() => console.log("Log in clicked")}
                  >
                    Log in
                  </ToastAction>
                ),
              });
            }}
          >
            Destructive
          </Button>
        </div>
      </div>
    </div>
  );
}

