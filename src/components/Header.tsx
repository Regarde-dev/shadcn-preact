import { AppRoutes } from "@/routes/AppRoutes";
import { Button } from "@ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@ui/drawer";
import { useTheme } from "@ui/theme";
import { Menu, Moon, Sun } from "lucide-preact";
import { A } from "preact-hashish-router";
import { NavRoutesLinks } from "./ContentLayout";
import "./MobileNav.scss";

export function Header() {
  return (
    <header className="w-full border-b border-dashed border-accent items-center h-14 flex flex-row justify-center border-grid sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full h-full flex flex-row flex-1 max-w-screen-2xl 2xl:border-x px-0 md:px-2 border-dashed border-accent py-1 md:py-2">
        <HeaderLeftSide />
        <HeaderRightSide />
      </div>
    </header>
  );
}

function HeaderLeftSide() {
  return (
    <div className="flex h-full md:flex-1 flex-2 flex-row items-center max-md:border-none justify-start">
      <div className="flex max-w-fit flex-1 flex-row items-center justify-start gap-2 py-1 relative px-2">
        <div className="md:hidden flex w-fit h-fit pl-1">
          <MobileSidebarMenu />
        </div>

        <ShadcnIcon />

        <A
          className="flex items-center gap-2"
          href={AppRoutes.HOME}
        >
          <span className="text-primary font-bold inline-block text-sm md:text-base">
            shadcn-<span className="text-purple-500">preact</span>
          </span>
        </A>
      </div>

      <div className="ml-4 hidden text-sm text-muted-foreground md:flex flex-1 flex-row gap-6 items-center justify-start h-full">
        <A
          className="flex items-center data-[route-active=true]:text-primary"
          href={AppRoutes.DOCS.INTRO}
        >
          Docs
        </A>

        <A
          className="flex items-center data-[route-active=true]:text-primary"
          href={AppRoutes.COMPONENTS.BUTTON}
        >
          Components
        </A>

        <A
          className="flex items-center data-[route-active=true]:text-primary"
          href={AppRoutes.BLOCKS}
        >
          Blocks
        </A>
      </div>
    </div>
  );
}

function HeaderRightSide() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex h-full flex-row items-center justify-center flex-1">
      <div className="flex px-2 flex-1 flex-row justify-end items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="max-md:bg-accent"
        >
          {theme === "dark" && <Sun className="w-4 h-4 text-primary" />}
          {theme === "light" && <Moon className="w-4 h-4 text-primary" />}
        </Button>
      </div>
    </div>
  );
}

function ShadcnIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="h-4 w-4 text-primary"
    >
      <rect
        width="256"
        height="256"
        fill="none"
      ></rect>
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      ></line>
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      ></line>
    </svg>
  );
}

export function MobileSidebarMenu() {
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
