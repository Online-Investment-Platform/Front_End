export interface CarouselProps {
  title: string;
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}
