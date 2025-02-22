import { AreaChartDemo1 } from "./Charts/AreaChartDemo1";
import { BarChartDemo1 } from "./Charts/BarChartDemo1";
import { PieChartDemo1 } from "./Charts/PieChartDemo1";

export default function ChartSection() {
  return (
    <div className="w-full flex flex-col gap-10 ">
      <PieChartDemo1 />
      <BarChartDemo1 />
      <AreaChartDemo1 />
    </div>
  );
}
