import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

export function SheetSection() {
  return (
    <div className="w-full flex flex-col gap-10 items-center">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">Open</Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="sheet-1-name"
                className="text-right"
              >
                Name
              </Label>
              <Input
                id="sheet-1-name"
                value="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="sheet-1-username"
                className="text-right"
              >
                Username
              </Label>
              <Input
                id="sheet-1-username"
                value="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>

          <SheetFooter>
            <SheetClose>
              <Button>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className="grid grid-cols-2 gap-2">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger>
              <Button variant="outline">{side}</Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
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
                <SheetClose>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}
