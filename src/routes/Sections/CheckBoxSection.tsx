import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Checkbox } from "@ui/checkbox";

export function CheckboxSection() {
  return (
    <div className="w-full flex flex-col gap-10  items-start pt-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms32" />
        <label
          htmlFor="terms32"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>

      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">You agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms2"
          disabled
        />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
            <Checkbox
              id="recents"
              defaultChecked
            />
            <label
              htmlFor="recents"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Recents
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="home"
              defaultChecked
            />
            <label
              htmlFor="home"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Home
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="app" />
            <label
              htmlFor="app"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Applications
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="desktop" />
            <label
              htmlFor="desktop"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Desktop
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="downloads" />
            <label
              htmlFor="downloads"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Downloads
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="docs" />
            <label
              htmlFor="docs"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
