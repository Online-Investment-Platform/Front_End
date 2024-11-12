import Carousel from "@/components/common/carousel/index";

import StockIndexCard from "./_components/stock-card";

export default function Home() {
  return (
    <div className="p-20">
      <Carousel
        title="주가 지수"
        autoPlay // false로 설정하면 자동 재생 비활성화
        autoPlayInterval={5000} // 5초로 변경
      >
        <StockIndexCard endpoint="kospi" />
        <StockIndexCard endpoint="kosdaq" />
        <StockIndexCard endpoint="kospi" />
        <StockIndexCard endpoint="kosdaq" />
      </Carousel>
    </div>
  );
}
