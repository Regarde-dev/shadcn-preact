import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Label } from "@ui/label";
import { Switch } from "@ui/switch";

export function SwitchSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Switch</CardTitle>
        <CardDescription className="text-md">
          A control that allows the user to toggle between checked and not checked.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-10">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>

        <div className="w-full space-y-6 border border-border p-4 max-w-[500px] rounded-lg shadow-md">
          <div>
            <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Label>Marketing emails</Label>
                  <p>Receive emails about new products, features, and more.</p>
                </div>
                <Switch />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Label>Security emails</Label>
                  <p>Receive emails about your account security.</p>
                </div>
                <div>
                  <Switch disabled />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
