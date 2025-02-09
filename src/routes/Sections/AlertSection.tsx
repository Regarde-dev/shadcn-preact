import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { AlertCircle, Terminal } from "lucide-preact";

export function AlertSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Alert</CardTitle>
        <CardDescription className="text-md">Displays a callout for user attention.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-10 max-w-[500px]">
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
      </CardContent>
    </Card>
  );
}
