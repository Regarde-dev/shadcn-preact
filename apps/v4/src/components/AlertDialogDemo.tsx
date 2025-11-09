import { Button } from "@ui/button";
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
} from "@ui/alert-dialog";

export function AlertDialogDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Basic Alert Dialog</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
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
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Alert Dialog with Callbacks</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account. All your data will be lost and cannot be recovered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onCancel={() => console.log("Cancelled")}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onConfirm={() => console.log("Account deleted")}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

