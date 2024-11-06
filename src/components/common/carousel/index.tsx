import Arrowleft from "public/icons/arrow-left.svg";
import Arrowright from "public/icons/arrow-right.svg";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CarouselProps } from "./types";

function Carousel({
  title,
  children,
  autoPlay = true,
  autoPlayInterval = 3000,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsToShow = 3;

  // index 파라미터 제거
  const slides = useMemo(() => {
    const items = Array.isArray(children) ? children : [children];
    return items.map((slide) => ({
      id: `slide-${crypto.randomUUID()}`,
      content: slide,
    }));
  }, [children]);

  const slidesCount = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= slidesCount ? 0 : prev + 1,
    );
  }, [slidesCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, slidesCount - itemsToShow) : prev - 1,
    );
  }, [slidesCount]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (autoPlay && !isHovered) {
      interval = setInterval(nextSlide, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay, isHovered, nextSlide, autoPlayInterval]);

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-20-700">{title}</h2>
        <div className="flex gap-10">
          <button
            type="button"
            onClick={prevSlide}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Previous slide"
          >
            <Arrowleft />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Next slide"
          >
            <Arrowright />
          </button>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 오버플로우 컨테이너 */}
        <div className="relative overflow-hidden">
          {/* 블러 효과를 위한 그라데이션 오버레이 */}
          <div className="absolute right-0 top-0 z-10 h-full w-100 bg-gradient-to-r from-transparent to-white/90" />

          {/* 캐러셀 컨텐츠 */}
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              width: `${(slidesCount * 100) / itemsToShow}%`,
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="shrink-0 px-2"
                style={{ width: `${100 / slidesCount}%` }}
              >
                {slide.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
