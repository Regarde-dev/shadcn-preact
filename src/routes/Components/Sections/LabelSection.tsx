import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";

export function LabelSection() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-row items-center justify-start space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
}
