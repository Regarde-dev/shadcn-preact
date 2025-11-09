import { Switch } from "@ui/switch";
import { useState } from "preact/hooks";

export function SwitchDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Basic Switch</h2>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <label
            htmlFor="airplane-mode"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Airplane Mode
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Controlled Switch</h2>
        <ControlledSwitchExample />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Disabled</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="disabled-on"
            disabled
            defaultChecked
          />
          <label
            htmlFor="disabled-on"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disabled
          </label>
        </div>
      </div>
    </div>
  );
}

function ControlledSwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Switch
          id="controlled"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <label
          htmlFor="controlled"
          className="font-medium text-sm leading-none"
        >
          Marketing emails
        </label>
      </div>
      <p className="text-muted-foreground text-sm">
        Status: {checked ? "Enabled" : "Disabled"}
      </p>
    </div>
  );
}

