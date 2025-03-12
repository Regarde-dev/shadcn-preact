import { AppRoutes } from "@/routes/AppRoutes";
import { Button } from "@ui/button";
import { A } from "preact-hashish-router";

export default function NavRoutesLinks() {
  return (
    <>
      <div className="flex w-full flex-col gap-[2px]">
        <span className="flex h-9 w-full flex-row items-center justify-start p-1 font-semibold text-sm">
          Getting Started
        </span>
        <A href={AppRoutes.DOCS.INTRO} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Introduction
          </Button>
        </A>

        <A href={AppRoutes.DOCS.INSTALLATION} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Installation
          </Button>
        </A>

        <A href={AppRoutes.DOCS.THEMING} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Theming
          </Button>
        </A>

        <A href={AppRoutes.BLOCKS} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Blocks
          </Button>
        </A>
      </div>

      <div className="flex w-full flex-col gap-[2px]">
        <span className="flex h-9 w-full flex-row items-center justify-start p-1 font-semibold text-sm">
          Installation
        </span>

        <A href={AppRoutes.DOCS.INSTALLATION_VITE} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Vite
          </Button>
        </A>

        <A href={AppRoutes.DOCS.INSTALLATION_ASTRO} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Astro
          </Button>
        </A>
      </div>

      <div className="flex w-full flex-col gap-[2px] pb-4">
        <span className="flex h-9 w-full flex-row items-center justify-start p-1 font-semibold text-sm">
          Components
        </span>

        {Object.entries(AppRoutes.COMPONENTS)
          .sort()
          .map(([name, route]) => {
            return (
              <A href={route} className="group w-full" key={name}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start px-2 py-1 font-normal capitalize group-data-[route-active=true]:bg-accent"
                >
                  {name.split("_").join(" ").toLocaleLowerCase()}
                </Button>
              </A>
            );
          })}
      </div>
    </>
  );
}
