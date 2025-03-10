import ContentLayout from "@/components/ContentLayout";
import { Footer } from "@/components/Footer";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@ui/breadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { A } from "preact-hashish-router";
import { Header } from "../../components/Header";
import { AppRoutes } from "../AppRoutes";
import { TextareaSection } from "./Sections/TextareaSection";

export default function TextareaPage() {
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
                    <BreadcrumbPage>Textarea</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
                <CardTitle className="text-3xl">Textarea</CardTitle>

                <CardDescription className="text-md">
                  Displays a form textarea or a component that looks like a textarea.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <TextareaSection />
              </CardContent>
            </Card>
          </ContentLayout>
        </div>
      </div>
      <Footer />
    </div>
  );
}
