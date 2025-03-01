import { CodePreviewTabs } from "@/components/CodePreview/CodePreviewTabs";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { AlertCircle, Terminal } from "lucide-preact";

export function AlertSection() {
  return (
    <div className="flex w-full max-w-screen-md flex-col gap-6">
      <CodePreviewTabs
        codeString={`
  import { Terminal } from "lucide-preact"
  
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@ui/alert"
  
  export function AlertDemo() {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    )
  }

`}
        previewElement={
          <Alert className="max-w-[500px]">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the cli.</AlertDescription>
          </Alert>
        }
      />

      <h2 className="w-full border-b-2 pb-2 font-semibold text-2xl">Examples</h2>

      <h3 className="mt-4 w-full font-semibold text-xl">Default</h3>

      <CodePreviewTabs
        codeString={`
  <Alert>
    <Terminal className="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>

`}
        previewElement={
          <Alert className="max-w-[500px]">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the cli.</AlertDescription>
          </Alert>
        }
      />

      <h3 className="mt-4 w-full font-semibold text-xl">Destructive</h3>

      <CodePreviewTabs
        codeString={`
  <Alert variant="destructive" className="max-w-[500px]">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>

`}
        previewElement={
          <Alert variant="destructive" className="max-w-[500px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </Alert>
        }
      />
    </div>
  );
}
