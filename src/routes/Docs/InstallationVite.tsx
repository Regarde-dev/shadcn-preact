import { DocsLayout } from "@/components/Layout/DocsLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
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
import { ChevronLeft, ChevronRight } from "lucide-preact";
import { A } from "preact-hashish-router";
import { Suspense, lazy } from "preact/compat";
import { AppRoutes } from "../AppRoutes";

const InstallationGuideVite = lazy(() => import("../../components/InstallationForVite"));

export default function InstallationVitePage() {
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
              <BreadcrumbPage>Vite</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      title="Vite Installation"
      description="How to install dependencies and structure your app with vite."
    >
      <Suspense fallback={<LoadingSpinner />}>
        <InstallationGuideVite />
      </Suspense>

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
