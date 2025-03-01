import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import type { VNode } from "preact";
import { Suspense, lazy } from "preact/compat";
import { LoadingSpinner } from "../LoadingSpinner";

const HighlightCode = lazy(() => import("./HighlightCode"));

export function CodePreviewTabs(props: { codeString: string; previewElement: VNode<any> }) {
  return (
    <Tabs defaultValue="preview" className="w-full self-start">
      <TabsList className="grid max-w-fit grid-cols-2 bg-transparent">
        <TabsTrigger
          value="preview"
          className="rounded-none border-b-primary transition-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="rounded-none border-b-primary transition-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Code
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="preview"
        className="broder-border flex min-h-[300px] w-full flex-col items-center justify-center rounded-lg border p-4"
      >
        {props.previewElement}
      </TabsContent>

      <TabsContent
        value="code"
        className="broder-border flex max-h-[500px] w-full flex-col items-center justify-center rounded-lg border *:overflow-auto"
      >
        <Suspense
          fallback={
            <div className="flex h-20 w-full flex-col items-center justify-center pt-4">
              <LoadingSpinner />
            </div>
          }
        >
          <HighlightCode lang="tsx" codeString={props.codeString} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
