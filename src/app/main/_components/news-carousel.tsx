"use client";

import { useQuery } from "@tanstack/react-query";
import { useId } from "react";

import getNews from "@/api/news";
import Carousel from "@/components/common/carousel";

import { News } from "../types";
import NewsCard from "./news-card";

interface NewsCarouselProps {
  initialData: News[];
}

function NewsCarousel({ initialData }: NewsCarouselProps) {
  const newsId = useId();

  const { data } = useQuery<News[]>({
    queryKey: ["news"],
    queryFn: getNews,
    refetchInterval: 300000, // 5분
    initialData,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <Carousel title="실시간 뉴스">
      {data.map((news: News) => (
        <NewsCard
          key={`${newsId}-${news.title}`}
          title={news.title}
          link={news.link}
        />
      ))}
    </Carousel>
  );
}

export default NewsCarousel;
