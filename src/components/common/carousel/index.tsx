"use client";

import Arrowleft from "public/icons/arrow-left.svg";
import Arrowright from "public/icons/arrow-right.svg";
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

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
}: CarouselProps): JSX.Element {
  const SLIDE_WIDTH = 308;
  const SLIDE_MARGIN = 20;
  const VISIBLE_SLIDES = 3;

  const slideId = useId();

  // 원본 슬라이드 컴포넌트 준비
  const originalItems = useMemo(
    () =>
      Array.isArray(children)
        ? children.filter((child) => child !== null && child !== undefined)
        : [children].filter((child) => child !== null && child !== undefined),
    [children],
  );

  const originalLength = originalItems.length;

  // 컴포넌트 복제 및 key 할당
  const cloneSlide = useCallback(
    (item: React.ReactNode, index: number, prefix: string) => {
      if (isValidElement(item)) {
        return cloneElement(item, {
          key: `${slideId}-${prefix}-${index}`,
          ...item.props,
        });
      }
      return item;
    },
    [slideId],
  );

  // 슬라이드 세트 생성
  const slides = useMemo(() => {
    if (originalItems.length === 0) return [];

    // 원본 세트를 3개 만들어서 앞뒤로 배치
    return [
      ...originalItems.map((item, i) => ({
        id: `${slideId}-prev-${i}`,
        content: cloneSlide(item, i, "prev"),
        originalIndex: i,
      })),
      ...originalItems.map((item, i) => ({
        id: `${slideId}-main-${i}`,
        content: cloneSlide(item, i, "main"),
        originalIndex: i,
      })),
      ...originalItems.map((item, i) => ({
        id: `${slideId}-next-${i}`,
        content: cloneSlide(item, i, "next"),
        originalIndex: i,
      })),
    ];
  }, [originalItems, cloneSlide, slideId]);

  const [currentIndex, setCurrentIndex] = useState(originalLength);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const jumpToPosition = useCallback((index: number) => {
    setIsTransitioning(false);
    setTimeout(() => {
      setCurrentIndex(index);
    }, 0);
  }, []);

  const resetPosition = useCallback(() => {
    if (currentIndex >= originalLength * 2) {
      jumpToPosition(originalLength);
    } else if (currentIndex < originalLength) {
      jumpToPosition(originalLength * 2 - 1);
    } else {
      setIsTransitioning(false);
    }
  }, [currentIndex, originalLength, jumpToPosition]);

  const nextSlide = useCallback(() => {
    if (!isTransitioning && slides.length > 0) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning && slides.length > 0) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const shouldAutoPlay =
      autoPlay && !isHovered && !isTransitioning && slides.length > 0;
    if (shouldAutoPlay) {
      interval = setInterval(nextSlide, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    autoPlay,
    isHovered,
    isTransitioning,
    nextSlide,
    autoPlayInterval,
    slides.length,
  ]);

  if (slides.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="mb-10">
          <h2 className="text-20-700">{title}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-1400 ${className}`}>
      <div className="mb-20 flex w-full  items-center justify-between">
        <h2 className="text-20-700">{title}</h2>
        <div className="flex gap-10">
          <button
            type="button"
            onClick={prevSlide}
            className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <Arrowleft />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="rounded-full p-1 disabled:opacity-50"
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <Arrowright className="stroke-gray-100" />
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
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white/90 to-transparent" />

          <div
            className={`flex ${isTransitioning ? "transition-transform duration-300 ease-in-out" : ""}`}
            style={{
              transform: `translateX(-${currentIndex * (SLIDE_WIDTH + SLIDE_MARGIN)}px)`,
            }}
            onTransitionEnd={resetPosition}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="mr-20 shrink-0"
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
