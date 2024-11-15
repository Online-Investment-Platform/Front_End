import { ReactNode } from "react";

export interface CarouselProps {
  title: string;
  children: ReactNode | ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}
