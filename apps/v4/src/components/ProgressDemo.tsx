import { Progress } from "@ui/progress";
import { useEffect, useState } from "preact/hooks";

export function ProgressDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Basic Progress</h2>
        <Progress value={60} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Animated Progress</h2>
        <AnimatedProgressExample />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Indeterminate</h2>
        <Progress value={null} />
        <p className="text-muted-foreground text-sm">
          Use null or undefined for indeterminate state
        </p>
      </div>
    </div>
  );
}

function AnimatedProgressExample() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Progress value={progress} />
      <p className="text-muted-foreground text-sm">Progress: {progress}%</p>
    </div>
  );
}

