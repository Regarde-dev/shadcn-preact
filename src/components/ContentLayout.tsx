import { AppRoutes } from "@/routes/AppRoutes";
import { Button } from "@ui/button";
import { A } from "preact-hashish-router";
import type { PropsWithChildren } from "preact/compat";

export default function MainLayout(props: PropsWithChildren) {
  return (
    <div className="flex h-auto w-full flex-col p-0 md:grid md:grid-cols-[1fr,5fr] md:grid-rows-1">
      <aside class="z-30 hidden h-[calc(100vh-4.3rem)] w-full min-w-[220px] shrink-0 overflow-auto md:flex">
        <div className="h-full w-full px-1 py-2 md:p-4">
          <NavRoutesLinks />
        </div>
      </aside>
      <main className="flex h-[calc(100vh-4.3rem)] w-full flex-col items-start justify-start overflow-auto px-1 md:border-l md:border-l-accent md:border-dashed">
        {props.children}
      </main>
    </div>
  );
}

export function NavRoutesLinks() {
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
            className="w-full justify-start px-1 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Introduction
          </Button>
        </A>

        <A href={AppRoutes.DOCS.INSTALLATION} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-1 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Installation
          </Button>
        </A>

        <A href={AppRoutes.DOCS.THEMING} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-1 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Theming
          </Button>
        </A>

        <A href={AppRoutes.BLOCKS} className="group w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-1 py-1 font-normal group-data-[route-active=true]:bg-accent"
          >
            Blocks
          </Button>
        </A>
      </div>

      <div className="flex w-full flex-col gap-[2px]">
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
                  className="w-full justify-start px-1 py-1 font-normal capitalize group-data-[route-active=true]:bg-accent"
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
