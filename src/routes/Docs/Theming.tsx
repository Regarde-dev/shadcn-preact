import { DocsLayout } from "@/components/Layout/DocsLayout";
import { Button } from "@ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@ui/pagination";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-preact";
import { A } from "preact-hashish-router";
import { AppRoutes } from "../AppRoutes";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";

export default function ThemingPage() {
  const firstAlphaComponentKey = Object.keys(AppRoutes.COMPONENTS).sort()[0] as keyof typeof AppRoutes.COMPONENTS;

  return (
    <DocsLayout title="Theming" description="Using CSS Variables or Tailwind CSS for theming.">
      <Alert className="border-yellow-400">
        <AlertCircle className="h-4 w-4" color="#facc15" />
        <AlertTitle>Page under construction</AlertTitle>
        <AlertDescription>Theming guide page is on work in progress.</AlertDescription>
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
            <A href={AppRoutes.COMPONENTS[firstAlphaComponentKey]}>
              <Button className="gap-1 pr-1 capitalize" variant="outline">
                {firstAlphaComponentKey.toLocaleLowerCase()}
                <ChevronRight />
              </Button>
            </A>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </DocsLayout>
  );
}
