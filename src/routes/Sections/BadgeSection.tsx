import { Badge } from "@ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";

export function BadgesSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Badge</CardTitle>
        <CardDescription className="text-md">Displays a badge or a component that looks like a badge.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-row flex-wrap gap-10">
        <Badge variant="default">Badge</Badge>

        <Badge variant="secondary">Badge</Badge>

        <Badge variant="outline">Badge</Badge>

        <Badge variant="destructive">Badge</Badge>
      </CardContent>
    </Card>
  );
}
