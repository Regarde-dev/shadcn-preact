import { Button } from "@ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Copy } from "lucide-preact";
import { useState } from "preact/hooks";

export function DialogSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <Dialog onChange={setOpen} open={open}>
        <DialogTrigger>
          <Button variant="default">Edit Profile</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Share</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md" autoSelect>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-row items-end space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">Link</Label>
              <Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
            </div>
            <Button type="submit" size="sm" className="px-3">
              <span>Copy</span>
              <Copy />
            </Button>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
