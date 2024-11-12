"use client";

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
  const SLIDE_WIDTH = 308; // 고정 슬라이드 너비
  const SLIDE_MARGIN = 20; // 오른쪽 마진
  const VISIBLE_SLIDES = 3; // 한 번에 보여질 슬라이드 수

  const slides = useMemo(() => {
    const items = Array.isArray(children) ? children : [children];
    return items.map((slide) => ({
      id: `slide-${crypto.randomUUID()}`,
      content: slide,
    }));
  }, [children]);

  const slidesCount = slides.length;
  const maxIndex = Math.max(0, slidesCount - VISIBLE_SLIDES);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

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
        <div
          className="relative overflow-hidden"
          style={{
            width: `${(SLIDE_WIDTH + SLIDE_MARGIN) * VISIBLE_SLIDES - SLIDE_MARGIN}px`,
          }}
        >
          {/* 양쪽 블러 효과 */}
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white/90 to-transparent" />

          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (SLIDE_WIDTH + SLIDE_MARGIN)}px)`,
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="mr-20 shrink-0" // mx-10을 mr-20으로 변경
                style={{ width: `${SLIDE_WIDTH}px` }}
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
