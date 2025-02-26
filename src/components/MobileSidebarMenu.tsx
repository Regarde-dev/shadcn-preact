import { Button } from "@ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@ui/drawer";
import { Menu } from "lucide-preact";
import { NavRoutesLinks } from "./ContentLayout";

export default function MobileSidebarMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>

        <div className="w-full flex flex-col gap-2 h-full overflow-auto px-4">
          <NavRoutesLinks />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
