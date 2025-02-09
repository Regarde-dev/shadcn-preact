import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alertDialog";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";

export function AlertDialogSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Alert Dialog</CardTitle>
        <CardDescription className="text-md">
          A modal dialog that interrupts the user with important content and expects a response.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-10">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
