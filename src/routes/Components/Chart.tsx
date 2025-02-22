import ContentLayout from "@/components/ContentLayout";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@ui/breadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Loader } from "lucide-preact";
import { A } from "preact-hashish-router";
import { lazy, Suspense } from "preact/compat";
import { Header } from "../../components/Header";
import { AppRoutes } from "../AppRoutes";

const ChartSection = lazy(() => import("../Sections/ChartSection"));

export default function ChartPage() {
  return (
    <div className="flex flex-1 min-h-screen h-auto w-full flex-col items-center justify-start relative bg-background">
      <Header />

      <div className="w-full flex flex-1 flex-col items-center justify-start p-0 mt-0 mb-1 relative border-b border-accent border-dashed">
        <div className="max-w-screen-2xl md:border-x border-accent border-dashed *:max-w-[100vw] *:overflow-auto flex md:px-1 flex-col w-full pb-4 md:pt-2 gap-4">
          <ContentLayout>
            <Card className="w-full flex flex-col border-none shadow-none pt-0 max-md:*:px-2 border border-primary">
              <CardHeader>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <A href={AppRoutes.DOCS.INTRO}>Docs</A>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Chart</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
                <CardTitle className="text-3xl">Chart</CardTitle>

                <CardDescription className="text-md">
                  Beautiful charts. Built using Recharts. Copy and paste into your apps.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Suspense
                  fallback={
                    <div className="flex flex-row items-center justify-center">
                      <Loader className="w-4 h-4 animate-spin" />
                    </div>
                  }
                >
                  <ChartSection />
                </Suspense>
              </CardContent>
            </Card>
          </ContentLayout>
        </div>
      </div>
    </div>
  );
}
