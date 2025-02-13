import { AppRoutes } from "@/routes/AppRoutes";
import { A } from "@packages/Router";
import { Button } from "@ui/button";
import { PropsWithChildren } from "preact/compat";

export default function MainLayout(props: PropsWithChildren) {
  return (
    <div className="md:grid md:grid-cols-[1fr,5fr] md:grid-rows-1 flex flex-col h-auto w-full p-0">
      <aside class="md:flex z-30 h-[calc(100vh-4.3rem)] w-full shrink-0 overflow-auto hidden min-w-[220px]">
        <div className="w-full h-full md:p-4 px-1 py-2">
          <div className="w-full gap-[2px] flex flex-col">
            <span className="text-sm font-semibold px-1 py-1 h-9 w-full justify-start flex flex-row items-center">
              Getting Started
            </span>
            <A
              href={AppRoutes.DOCS.INTRO}
              className="w-full group"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start px-2 py-1 group-data-[route-active=true]:bg-accent"
              >
                Introduction
              </Button>
            </A>

            <A
              href={AppRoutes.DOCS.INSTALLATION}
              className="w-full group"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start px-2 py-1 group-data-[route-active=true]:bg-accent"
              >
                Installation
              </Button>
            </A>

            <A
              href={AppRoutes.DOCS.THEMING}
              className="w-full group"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start px-2 py-1 group-data-[route-active=true]:bg-accent"
              >
                Theming
              </Button>
            </A>

            <A
              href={AppRoutes.BLOCKS}
              className="w-full group"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start px-2 py-1 group-data-[route-active=true]:bg-accent"
              >
                Blocks
              </Button>
            </A>
          </div>

          <div className="w-full gap-[2px] flex flex-col">
            <span className="text-sm font-semibold px-1 py-1 h-9 w-full justify-start flex flex-row items-center">
              Components
            </span>
            <A
              href={AppRoutes.COMPONENTS.BUTTON}
              className="w-full group"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start px-2 py-1 group-data-[route-active=true]:bg-accent"
              >
                Button
              </Button>
            </A>

            <A
              href={AppRoutes.COMPONENTS.CARD}
              className="w-full group"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start px-2 py-1 group-data-[route-active=true]:bg-accent"
              >
                Card
              </Button>
            </A>

            <A
              href={AppRoutes.COMPONENTS.DIALOG}
              className="w-full group"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start px-2 py-1 group-data-[route-active=true]:bg-accent"
              >
                Dialog
              </Button>
            </A>

            <A
              href={AppRoutes.COMPONENTS.ALERT_DIALOG}
              className="w-full group"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start px-2 py-1 group-data-[route-active=true]:bg-accent"
              >
                Alert Dialog
              </Button>
            </A>
          </div>
        </div>
      </aside>
      <main className="w-full flex px-1 flex-col justify-start items-start md:border-l md:border-l-accent md:border-dashed h-[calc(100vh-4.3rem)] overflow-auto">
        {props.children}
      </main>
    </div>
  );
}
