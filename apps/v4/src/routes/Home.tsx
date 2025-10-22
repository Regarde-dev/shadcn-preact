import { AlertDemo } from "@/components/AlertDemo";
import { AvatarDemo } from "@/components/AvatarDemo";
import { BadgeDemo } from "@/components/BadgeDemo";
import { ButtonDemo } from "@/components/ButtonDemo";
import { CardDemo } from "@/components/CardDemo";
import { DialogDemo } from "@/components/DialogDemo";
import { DropdownMenuDemo } from "@/components/DropdownMenuDemo";
import { InputDemo } from "@/components/InputDemo";
import { SelectDemo } from "@/components/SelectDemo";
import { SpinnerDemo } from "@/components/SpinnerDemo";
import { TooltipDemo } from "@/components/TooltipDemo";
import { Header } from "@/layout/Header";

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-1 flex-col items-center justify-start bg-background">
      <div className="flex w-full max-w-5xl flex-1 flex-col items-center justify-start gap-4 self-center overflow-hidden p-2">
        <Header />

        <div className="flex h-auto w-full flex-col gap-4 rounded p-2 pt-12">
          <div className="flex flex-col gap-4">
            <h1 class={"font-bold"}>Buttons</h1>
            <ButtonDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Avatars</h1>
            <AvatarDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Alert</h1>
            <AlertDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Spinner</h1>
            <SpinnerDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Card</h1>
            <CardDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Input</h1>
            <InputDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Badges</h1>
            <BadgeDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Dialog</h1>
            <DialogDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Tooltip</h1>
            <TooltipDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Dropdown Menu</h1>
            <DropdownMenuDemo />
          </div>

          <Separator />

          <div className="flex h-auto w-full flex-col gap-4 rounded p-2">
            <h1>Select</h1>
            <SelectDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

const Separator = () => {
  return <div class="h-[1px] w-full bg-border" />;
};
