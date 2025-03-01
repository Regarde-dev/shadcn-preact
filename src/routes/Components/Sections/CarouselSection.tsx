import { Card, CardContent } from "@ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@ui/carousel";

export function CarouselSection() {
  return (
    <div className="flex w-full flex-col gap-10 pb-12">
      <p class="leading-7 [&amp;:not(:first-child)]:mt-6">
        The carousel component is built using the{" "}
        <a
          class="font-medium underline underline-offset-4"
          href="https://www.embla-carousel.com/"
          target="_blank"
          rel="noreferrer"
        >
          Embla Carousel
        </a>{" "}
        library.
      </p>

      <div className="flex w-full flex-col items-center justify-center gap-12">
        <Carousel
          className="w-full max-w-md"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((c, index) => (
              <CarouselItem key={c}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="font-semibold text-4xl">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="mt-10 w-full max-w-xs"
        >
          <CarouselContent className="-mt-1 h-[200px]">
            {Array.from({ length: 5 }).map((c, index) => (
              <CarouselItem key={c} className="pt-1 md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="font-semibold text-3xl">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
