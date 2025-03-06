import ContentLayout from "@/components/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadCrumb";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Pagination, PaginationContent, PaginationItem } from "@ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-preact";
import { A } from "preact-hashish-router";
import { Header } from "../../components/Header";
import { AppRoutes } from "../AppRoutes";

export default function ThemingPage() {
  const firstAlphaComponentKey = Object.keys(AppRoutes.COMPONENTS).sort()[0] as keyof typeof AppRoutes.COMPONENTS;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-1 flex-col items-center justify-start bg-background">
      <Header />

      <div className="relative mt-0 flex w-full flex-1 flex-col items-center justify-start border-accent border-b border-dashed p-0">
        <div className="flex w-full max-w-screen-2xl flex-col gap-4 border-accent border-dashed *:max-w-[100vw] *:overflow-auto md:border-x md:px-1 md:pt-2">
          <ContentLayout>
            <Card className="flex w-full max-w-screen-md flex-col border border-primary border-none pt-0 shadow-none max-md:*:px-2">
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
                      <BreadcrumbPage>Theming</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <CardTitle className="text-3xl">Theming</CardTitle>

                <CardDescription className="text-md">Using CSS Variables or Tailwind CSS for theming.</CardDescription>
              </CardHeader>

              <CardContent>
                <Pagination className="mt-10">
                  <PaginationContent className="flex w-full flex-row justify-between">
                    <PaginationItem>
                      <A href={AppRoutes.DOCS.INSTALLATION}>
                        <Button className="gap-1 pl-1" variant="outline">
                          <ChevronLeft />
                          Installation
                        </Button>
                      </A>
                    </PaginationItem>
                    <PaginationItem>
                      <A href={AppRoutes.COMPONENTS[firstAlphaComponentKey]}>
                        <Button className="gap-1 pr-1 capitalize" variant="outline">
                          {firstAlphaComponentKey.toLocaleLowerCase()}
                          <ChevronRight />
                        </Button>
                      </A>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </ContentLayout>
        </div>
      </div>
    </div>
  );
}
