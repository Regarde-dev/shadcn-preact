import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Loader2, MailOpen, User } from "lucide-preact";

export function ButtonsSection() {
  return (
    <Card className="w-full border-none shadow-none">
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
