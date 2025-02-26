import { Card, CardContent } from "@ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@ui/carousel";

export function CarouselSection() {
  return (
    <div className="w-full flex flex-col gap-10 pb-12">
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

      <div className="w-full flex flex-col justify-center items-center gap-12">
        <Carousel
          className="w-full max-w-md"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
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
          className="w-full max-w-xs mt-10"
        >
          <CarouselContent className="-mt-1 h-[200px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{index + 1}</span>
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
