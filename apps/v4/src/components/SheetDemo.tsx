import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@ui/sheet";

export function SheetDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Basic Sheet</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-right"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="username"
                  className="text-right"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  value="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Sheet with Different Sides</h2>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Top</Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Top Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the top.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Right</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Right Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the right (default).</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Bottom Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Left</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Left Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the left.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

