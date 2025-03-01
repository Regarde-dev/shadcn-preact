import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Switch } from "@ui/switch";

export function SwitchSection() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>

      <div className="w-full max-w-[500px] space-y-6 rounded-lg border border-border p-4 shadow-md">
        <div>
          <h3 className="mb-4 font-medium text-lg">Email Notifications</h3>
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
    </div>
  );
}
