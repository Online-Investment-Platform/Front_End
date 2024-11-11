import Arrowleft from "public/icons/arrow-left.svg";
import Arrowright from "public/icons/arrow-right.svg";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CarouselProps } from "./types";

/**
 * 슬라이드 형태로 컨텐츠를 표시하는 캐러셀 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Carousel title="주가 지수">
 *   <StockCard title="코스닥" value={35.33347} change={-200.2} />
 *   <StockCard title="코스피" value={42.12345} change={150.8} />
 *   <StockCard title="나스닥" value={28.98765} change={-180.5} />
 * </Carousel>
 *
 * // 자동 재생 비활성화
 * <Carousel
 *   title="실시간 지수"
 *   autoPlay={false}
 * >
 *   <StockCard title="코스닥" value={35.33347} change={-200.2} />
 *   <StockCard title="코스피" value={42.12345} change={150.8} />
 * </Carousel>
 *
 * // 재생 간격 조정 및 스타일 커스터마이징
 * <Carousel
 *   title="글로벌 지수"
 *   autoPlayInterval={5000}
 *   className="bg-gray-50 p-4 rounded-xl"
 * >
 *   <StockCard title="코스닥" value={35.33347} change={-200.2} />
 *   <StockCard title="코스피" value={42.12345} change={150.8} />
 *   <StockCard title="나스닥" value={28.98765} change={-180.5} />
 * </Carousel>
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.title - 캐러셀 제목
 * @param {ReactNode} props.children - 캐러셀에 표시될 컨텐츠
 * @param {boolean} [props.autoPlay=true] - 자동 재생 여부
 * @param {number} [props.autoPlayInterval=3000] - 자동 재생 간격 (밀리초)
 * @param {string} [props.className] - 추가 스타일 클래스
 *
 * @returns {JSX.Element} Carousel 컴포넌트
 */

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
