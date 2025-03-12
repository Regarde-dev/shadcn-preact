import { DocsLayout } from "@/components/Layout/DocsLayout";
import { Button } from "@ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-preact";
import { A } from "preact-hashish-router";
import { AppRoutes } from "../AppRoutes";

export default function ThemingPage() {
  const firstAlphaComponentKey = Object.keys(AppRoutes.COMPONENTS).sort()[0] as keyof typeof AppRoutes.COMPONENTS;

  return (
    <DocsLayout title="Theming" description="Using CSS Variables or Tailwind CSS for theming.">
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
