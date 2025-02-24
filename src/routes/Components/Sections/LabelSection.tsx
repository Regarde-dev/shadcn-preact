import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";

export function LabelSection() {
  return (
    <div className="w-full flex flex-col gap-10 items-center">
      <div className="flex items-center space-x-2 justify-start flex-row">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
}
