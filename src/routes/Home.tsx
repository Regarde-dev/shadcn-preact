import { Button } from "@ui/button";
import { A } from "preact-hashish-router";
import { Header } from "../components/Header";
import { AppRoutes } from "./AppRoutes";

export default function HomePage() {
  return (
    <div className="flex flex-1 min-h-screen h-auto w-full flex-col items-center justify-start relative bg-background">
      <Header />

      <div className="w-full flex flex-1 flex-col items-center border-b border-dashed border-accent justify-start relative">
        <div className="max-w-screen-2xl min-h-[calc(100vh-4rem)] *:max-w-[100vw] *:overflow-auto flex px-1 2xl:px-4 flex-col w-full 2xl:border-x border-dashed border-accent py-4 gap-4">
          <div className=" flex flex-col items-start gap-1 py-4 md:p-2 px-7">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
              Build your component library
            </h1>
            <p className="max-w-2xl text-lg font-light text-foreground">
              A set of beautifully-designed, accessible, and customizable components to help you build your component
              library. Open Source.
            </p>
            <p className="max-w-2xl text-lg font-light text-foreground">
              This is a direct port of shadcn components api and ui/ux to <strong>preact</strong>.
            </p>
            <div className="flex w-full items-center justify-start gap-2 pt-2">
              <A href={AppRoutes.DOCS.INTRO}>
                <Button size="sm">Get Started</Button>
              </A>
              <A href={AppRoutes.BLOCKS}>
                <Button variant="ghost">Blocks</Button>
              </A>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
