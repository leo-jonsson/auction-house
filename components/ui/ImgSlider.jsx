"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ImgSlider({ carouselItems }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      carousel.classList.add("active");
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      carousel.classList.remove("active");
    };

    const onMouseUp = () => {
      isDown = false;
      carousel.classList.remove("active");
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    };

    carousel.addEventListener("mousedown", onMouseDown);
    carousel.addEventListener("mouseleave", onMouseLeave);
    carousel.addEventListener("mouseup", onMouseUp);
    carousel.addEventListener("mousemove", onMouseMove);

    return () => {
      carousel.removeEventListener("mousedown", onMouseDown);
      carousel.removeEventListener("mouseleave", onMouseLeave);
      carousel.removeEventListener("mouseup", onMouseUp);
      carousel.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Ensure carouselItems is always an array
  const items = Array.isArray(carouselItems) ? carouselItems : [];

  const showCarouselButtons = items.length > 1; // Only show buttons if more than 1 item

  return (
    <Carousel className="w-full">
      <CarouselContent
        ref={carouselRef}
        className="cursor-grab active:cursor-grabbing mt-5"
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <CarouselItem key={index}>
              <Card className={`overflow-hidden border-0 rounded-lg shadow-md`}>
                <CardContent className="p-0 size-full flex flex-col justify-between">
                  <img src={item.url} className="aspect-[4/3] object-cover" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        ) : (
          <p>No media available</p>
        )}
      </CarouselContent>

      {/* Show buttons only if there are more than one image */}
      {showCarouselButtons && (
        <div className="flex justify-between items-center pt-2">
          <div className="flex space-x-2">
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-8 w-8 dark:bg-none text-gray-700 dark:text-gray-300">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-8 w-8 dark:bg-none text-gray-700 dark:text-gray-300">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </div>
      )}
    </Carousel>
  );
}
