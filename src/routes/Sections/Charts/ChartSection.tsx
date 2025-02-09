import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { AreaChartDemo1 } from "./AreaChartDemo1";
import { BarChartDemo1 } from "./BarChartDemo1";
import { PieChartDemo1 } from "./PieChartDemo1";

export default function ChartSection() {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Charts</CardTitle>
        <CardDescription>Beautiful charts. Built using Recharts. Copy and paste into your apps. </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-row flex-wrap gap-10">
        <PieChartDemo1 />
        <BarChartDemo1 />
        <AreaChartDemo1 />
      </CardContent>
    </Card>
  );
}
