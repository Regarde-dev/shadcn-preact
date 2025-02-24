import ContentLayout from "@/components/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { A } from "preact-hashish-router";
import { Header } from "../../components/Header";
import { AppRoutes } from "../AppRoutes";

export default function IntroductionPage() {
  return (
    <div className="flex flex-1 min-h-screen h-auto w-full flex-col items-center justify-start relative bg-background">
      <Header />

      <div className="w-full flex flex-1 flex-col items-center justify-start p-0 mt-0  relative border-b border-accent border-dashed">
        <div className="max-w-screen-2xl md:border-x border-accent border-dashed *:max-w-[100vw] *:overflow-auto flex md:px-1 flex-col w-full md:pt-2 gap-4">
          <ContentLayout>
            <Card className="w-full flex flex-col border-none shadow-none pt-0 max-md:*:px-2 md:pr-12 lg:pr-64 border border-primary">
              <CardHeader>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <A href={AppRoutes.DOCS.INTRO}>Docs</A>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Introduction</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <CardTitle className="text-3xl">Introduction</CardTitle>

                <CardDescription className="text-md">
                  A set of beautifully-designed, accessible, and customizable components to help you build your
                  component library. Open Source.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="max-w-full pb-12 *:my-1">
                  <p className="break-words leading-7 [&amp;:not(:first-child)]:mt-6 *:mx-2">
                    An unofficial,
                    <a
                      className="font-medium underline underline-offset-4"
                      href="https://preactjs.com/"
                      target="_blank"
                    >
                      Preact
                    </a>
                    port of
                    <a
                      className="font-medium underline underline-offset-4"
                      href="https://ui.shadcn.com"
                      target="_blank"
                    >
                      shadcn/ui
                    </a>
                    .
                  </p>
                  <p className="break-words leading-7 [&amp;:not(:first-child)]:mt-6">
                    This is <strong>NOT</strong> a component library. It’s a collection of re-usable components that you
                    can copy and paste into your apps.
                  </p>
                  <p className="break-words leading-7 [&amp;:not(:first-child)]:mt-6">
                    <strong>What do you mean by not a component library?</strong>
                  </p>
                  <p className="break-words leading-7 [&amp;:not(:first-child)]:mt-6">
                    I mean you do not install it as a dependency. It is not available or distributed via npm. I have no
                    plans to publish it as an npm package (for now).
                  </p>
                  <p className="break-words leading-7 [&amp;:not(:first-child)]:mt-6">
                    Pick the components you need. Copy and paste the code into your project and customize to your needs.
                    The code is yours.
                  </p>
                  <p className="break-words leading-7 [&amp;:not(:first-child)]:mt-6">
                    <em>Use this as a reference to build your own component libraries.</em>
                  </p>

                  <p className="break-words leading-7 [&amp;:not(:first-child)]:mt-6">
                    <strong>Why if Preact is compatible with React?</strong>
                  </p>

                  <p className="break-words leading-7 [&amp;:not(:first-child)]:mt-6">
                    Shadcn/ui is built on top of Radix UI and Tailwind CSS. Radix is a heavyweight component library and
                    i have tried to port them to Preact for better integration and builint with the minimum external
                    dependencies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ContentLayout>
        </div>
      </div>
    </div>
  );
}
