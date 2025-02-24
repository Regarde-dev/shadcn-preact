import { Badge } from "@ui/badge";

export function BadgesSection() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-10">
      <Badge variant="default">Badge</Badge>

      <Badge variant="secondary">Badge</Badge>

      <Badge variant="outline">Badge</Badge>

      <Badge variant="destructive">Badge</Badge>
    </div>
  );
}
