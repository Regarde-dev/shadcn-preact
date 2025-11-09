import { AspectRatio } from "@ui/aspect-ratio";

export function AspectRatioDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">16:9 Aspect Ratio</h2>
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9}>
            <img
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">1:1 (Square)</h2>
        <div className="w-full max-w-md">
          <AspectRatio ratio={1}>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&dpr=2&q=80"
              alt="Photo by Ayo Ogunseinde"
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
