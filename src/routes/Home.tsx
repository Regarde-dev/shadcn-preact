import { Footer } from "@/components/Layout/Footer";
import { Button } from "@ui/button";
import { A } from "preact-hashish-router";
import { Header } from "../components/Layout/Header";
import { AppRoutes } from "./AppRoutes";

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-1 flex-col items-center justify-start bg-background">
      <Header />

      <div className="relative flex w-full flex-1 flex-col items-center justify-start border-accent border-b border-dashed">
        <div className="flex min-h-[calc(100vh-4rem)] w-full max-w-screen-2xl flex-col gap-4 border-accent border-dashed px-1 py-4 *:max-w-[100vw] *:overflow-auto 2xl:border-x 2xl:px-4">
          <div className=" flex flex-col items-start gap-1 px-7 py-4 md:p-2">
            <h1 className="font-bold text-3xl leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
              Build your component library
            </h1>
            <p className="max-w-2xl font-light text-foreground text-lg">
              A set of beautifully-designed, accessible, and customizable components to help you build your component
              library. Open Source.
            </p>
            <p className="max-w-2xl font-light text-foreground text-lg">
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

      <Footer />
    </div>
  );
}
