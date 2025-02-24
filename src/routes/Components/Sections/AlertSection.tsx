import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { AlertCircle, Terminal } from "lucide-preact";

export function AlertSection() {
  return (
    <div className="w-full max-w-[500px] justify-center items-center flex flex-col gap-6">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  );
}
