import { DocsLayout } from "@/components/Layout/DocsLayout";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadCrumb";
import { Button } from "@ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@ui/pagination";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-preact";
import { A } from "preact-hashish-router";
import { AppRoutes } from "../AppRoutes";

export default function InstallationAstroPage() {
  return (
    <DocsLayout
      breadcrumbs={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <A href={AppRoutes.DOCS.INTRO}>Docs</A>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <A href={AppRoutes.DOCS.INSTALLATION}>Installation</A>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Astro</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      title="Astro Installation"
      description="How to install dependencies and structure your app with Astro."
    >
      <Alert className="border-yellow-400">
        <AlertCircle className="h-4 w-4" color="#facc15" />
        <AlertTitle>Page under construction</AlertTitle>
        <AlertDescription>Astro guide page is on work in progress.</AlertDescription>
      </Alert>

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
            <A href={AppRoutes.DOCS.THEMING}>
              <Button className="gap-1 pr-1" variant="outline">
                Theming
                <ChevronRight />
              </Button>
            </A>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </DocsLayout>
  );
}
