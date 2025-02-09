import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";

export function LabelSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Label</CardTitle>
        <CardDescription className="text-md">Renders an accessible label associated with controls.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-10">
        <div className="flex items-center space-x-2 justify-start flex-row">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </CardContent>
    </Card>
  );
}
