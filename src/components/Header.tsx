import { AppRoutes } from "@/routes/AppRoutes";
import { A } from "@packages/Router";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Modal } from "@ui/modal";
import { useTheme } from "@ui/theme";
import { Menu, Moon, Sun, X } from "lucide-preact";
import { useState } from "preact/hooks";
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

        <Badge
          variant="secondary"
          className="absolute top-0 left-[98%] md:flex hidden"
        >
          {process.env.VITE_PACKAGE_VERSION}
        </Badge>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu />
      </Button>
      <Modal
        show={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <div className="max-w-screen animation-mobile-menu w-full pt-6 p-4 flex flex-col items-start justify-start overflow-hidden z-40 h-screen max-h-[400px] bg-background border-x border-t rounded-lg fixed bottom-0 left-0">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsMenuOpen(false)}
            className="absolute w-fit h-fit right-6 top-2 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="w-full flex flex-col gap-2 h-full overflow-auto pb-6">
            <NavRoutesLinks />
          </div>
        </div>
      </Modal>
    </>
  );
}
