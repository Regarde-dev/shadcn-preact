import ContentLayout from "@/components/ContentLayout";
import { A } from "@packages/Router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Header } from "../../components/Header";
import { AppRoutes } from "../AppRoutes";

export default function IntroductionPage() {
  return (
    <div className="flex flex-1 min-h-screen h-auto w-full flex-col items-center justify-start relative bg-background">
      <Header />

      <div className="w-full flex flex-1 flex-col items-center justify-start p-0 mt-0  relative border-b border-accent border-dashed">
        <div className="max-w-screen-2xl md:border-x border-accent border-dashed *:max-w-[100vw] *:overflow-auto flex md:px-1 flex-col w-full md:pt-2 gap-4">
          <ContentLayout>
            <Card className="w-full flex flex-col border-none shadow-none pt-0 max-md:*:px-2 pr-64 border border-primary">
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
                <div class="pb-12 pt-0">
                  <div class="mdx">
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      <strong>This is not a component library. It is how you build your component library.</strong>
                    </p>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      You know how most traditional component libraries work: you install a package from NPM, import the
                      components, and use them in your app.
                    </p>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      This approach works well until you need to customize a component to fit your design system or
                      require one that isn’t included in the library.{" "}
                      <strong>
                        Often, you end up wrapping library components, writing workarounds to override styles, or mixing
                        components from different libraries with incompatible APIs.
                      </strong>
                    </p>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      This is what shadcn/ui aims to solve. It is built around the following principles:
                    </p>
                    <ul class="my-6 ml-6 list-disc">
                      <li class="mt-2">
                        <strong>Open Code:</strong> The top layer of your component code is open for modification.
                      </li>
                      <li class="mt-2">
                        <strong>Composition:</strong> Every component uses a common, composable interface, making them
                        predictable.
                      </li>
                      <li class="mt-2">
                        <strong>Distribution:</strong> A flat-file schema and command-line tool make it easy to
                        distribute components.
                      </li>
                      <li class="mt-2">
                        <strong>Beautiful Defaults:</strong> Carefully chosen default styles, so you get great design
                        out-of-the-box.
                      </li>
                    </ul>
                    <h2
                      class="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
                      id="open-code"
                    >
                      <a
                        class="font-medium underline underline-offset-4 subheading-anchor"
                        aria-label="Link to section"
                        href="#open-code"
                      >
                        <span class="icon icon-link"></span>
                      </a>
                      Open Code
                    </h2>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      shadcn/ui hands you the actual component code. You have full control to customize and extend the
                      components to your needs. This means:
                    </p>
                    <ul class="my-6 ml-6 list-disc">
                      <li class="mt-2">
                        <strong>Full Transparency:</strong> You see exactly how each component is built.
                      </li>
                      <li class="mt-2">
                        <strong>Easy Customization:</strong> Modify any part of a component to fit your design and
                        functionality requirements.
                      </li>
                      <li class="mt-2">
                        <strong>AI Integration:</strong> Access to the code makes it straightforward for LLMs to read,
                        understand, and even improve your components.
                      </li>
                    </ul>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      <em>
                        In a typical library, if you need to change a button’s behavior, you have to override styles or
                        wrap the component. With shadcn/ui, you simply edit the button code directly.
                      </em>
                    </p>

                    <h2
                      class="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
                      id="composition"
                    >
                      <a
                        class="font-medium underline underline-offset-4 subheading-anchor"
                        aria-label="Link to section"
                        href="#composition"
                      >
                        <span class="icon icon-link"></span>
                      </a>
                      Composition
                    </h2>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      Every component in shadcn/ui shares a common, composable interface.{" "}
                      <strong>
                        If a component does not exist, we bring it in, make it composable, and adjust its style to match
                        and work with the rest of the design system.
                      </strong>
                    </p>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      <em>
                        A shared, composable interface means it's predictable for both your team and LLMs. You are not
                        learning different APIs for every new component. Even for third-party ones.
                      </em>
                    </p>
                    <h2
                      class="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
                      id="distribution"
                    >
                      <a
                        class="font-medium underline underline-offset-4 subheading-anchor"
                        aria-label="Link to section"
                        href="#distribution"
                      >
                        <span class="icon icon-link"></span>
                      </a>
                      Distribution
                    </h2>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      shadcn/ui is also a code distribution system. It defines a schema for components and a CLI to
                      distribute them.
                    </p>
                    <ul class="my-6 ml-6 list-disc">
                      <li class="mt-2">
                        <strong>Schema:</strong> A flat-file structure that defines the components, their dependencies,
                        and properties.
                      </li>
                      <li class="mt-2">
                        <strong>CLI:</strong> A command-line tool to distribute and install components across projects
                        with cross-framework support.
                      </li>
                    </ul>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      <em>
                        You can use the schema to distribute your components to other projects or have AI generate
                        completely new components based on existing schema.
                      </em>
                    </p>
                    <h2
                      class="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
                      id="beautiful-defaults"
                    >
                      <a
                        class="font-medium underline underline-offset-4 subheading-anchor"
                        aria-label="Link to section"
                        href="#beautiful-defaults"
                      >
                        <span class="icon icon-link"></span>
                      </a>
                      Beautiful Defaults
                    </h2>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      shadcn/ui comes with a large collection of components that have carefully chosen default styles.
                      They are designed to look good on their own and to work well together as a consistent system:
                    </p>
                    <ul class="my-6 ml-6 list-disc">
                      <li class="mt-2">
                        <strong>Good Out-of-the-Box:</strong> Your UI has a clean and minimal look without extra work.
                      </li>
                      <li class="mt-2">
                        <strong>Unified Design:</strong> Components naturally fit with one another. Each component is
                        built to match the others, keeping your UI consistent.
                      </li>
                      <li class="mt-2">
                        <strong>Easily Customizable:</strong> If you want to change something, it's simple to override
                        and extend the defaults.
                      </li>
                    </ul>

                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      The design of shadcn/ui makes it easy for AI tools to work with your code. Its open code and
                      consistent API allow AI models to read, understand, and even generate new components.
                    </p>
                    <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
                      <em>
                        An AI model can learn how your components work and suggest improvements or even create new
                        components that integrate with your existing design.
                      </em>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ContentLayout>
        </div>
      </div>
    </div>
  );
}
