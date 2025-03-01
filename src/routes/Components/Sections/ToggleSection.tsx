import { Toggle } from "@ui/toggle";
import { Bold, Italic, Underline } from "lucide-preact";

export function ToggleSection() {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-10">
      <Toggle aria-label="Toggle italic">
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic />
      </Toggle>

      <Toggle aria-label="Toggle italic">
        <Italic />
        Italic
      </Toggle>

      <Toggle aria-label="Toggle italic" disabled>
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
