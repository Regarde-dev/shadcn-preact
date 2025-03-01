import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { SimpleSelect } from "@ui/simple_select";
import { Switch } from "@ui/switch";
import { BellRing, Check } from "lucide-preact";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export function CardsSection() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <Card className="h-fit w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <SimpleSelect
                  title="Select"
                  data={[
                    {
                      value: "next",
                      title: "Next.js",
                    },
                    {
                      value: "sveltekit",
                      title: "SvelteKit",
                    },
                    {
                      value: "astro",
                      title: "Astro",
                    },
                    {
                      value: "nuxt",
                      title: "Nuxt.js",
                    },
                  ]}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-row items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm leading-none">Push Notifications</p>
              <p className="text-muted-foreground text-sm">Send notifications to device.</p>
            </div>
            <Switch />
          </div>
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.title}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="font-medium text-sm leading-none">{notification.title}</p>
                  <p className="text-muted-foreground text-sm">{notification.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
