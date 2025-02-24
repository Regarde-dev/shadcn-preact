import { Button } from "@ui/button";
import { Loader2, MailOpen, User } from "lucide-preact";

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
    </div>
  );
}
