import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Checkbox } from "@ui/checkbox";
import { useState } from "preact/hooks";

export function CheckboxSection() {
  const [c, setC] = useState(false);

  return (
    <div className="flex w-full flex-col items-start gap-10 pt-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms32" checked={c} onCheckedChange={setC} />
        <label
          htmlFor="terms32"
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions. Controlled Check
        </label>
      </div>

      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-muted-foreground text-sm">You agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" disabled />
        <label
          htmlFor="terms2"
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>

      <Card className="max-w-[350px]">
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>
          <CardDescription>Select the items you want to display in the sidebar.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="recents" defaultChecked />
            <label
              htmlFor="recents"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Recents
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="home" defaultChecked />
            <label
              htmlFor="home"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Home
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="app" />
            <label
              htmlFor="app"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Applications
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="desktop" />
            <label
              htmlFor="desktop"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Desktop
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="downloads" />
            <label
              htmlFor="downloads"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Downloads
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="docs" />
            <label
              htmlFor="docs"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Documents
            </label>
          </div>
        </CardContent>

        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
