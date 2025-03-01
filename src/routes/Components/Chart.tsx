import ContentLayout from "@/components/ContentLayout";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@ui/breadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Loader } from "lucide-preact";
import { A } from "preact-hashish-router";
import { Suspense, lazy } from "preact/compat";
import { Header } from "../../components/Header";
import { AppRoutes } from "../AppRoutes";

const ChartSection = lazy(() => import("./Sections/ChartSection"));

export default function ChartPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-1 flex-col items-center justify-start bg-background">
      <Header />

      <div className="relative mt-0 mb-1 flex w-full flex-1 flex-col items-center justify-start border-accent border-b border-dashed p-0">
        <div className="flex w-full max-w-screen-2xl flex-col gap-4 border-accent border-dashed pb-4 *:max-w-[100vw] *:overflow-auto md:border-x md:px-1 md:pt-2">
          <ContentLayout>
            <Card className="flex w-full flex-col border border-primary border-none pt-0 shadow-none max-md:*:px-2">
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
                      <Loader className="h-4 w-4 animate-spin" />
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
