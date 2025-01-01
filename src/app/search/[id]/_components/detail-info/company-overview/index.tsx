"use client";

import { useQuery } from "@tanstack/react-query";

import { getConsensus } from "@/api/company-details";
import { useStockInfoContext } from "@/context/stock-info-context";
import { RelativeNews } from "@/types/company-details";
import cleanText from "@/utils/clean-text";

import Consensus from "./consensus";
import FinancialStatements from "./financial-statements";
import TargetPrice from "./target-price";

interface CompanyOverviewProps {
  newsData: RelativeNews[] | undefined;
}

export default function CompanyOverview({ newsData }: CompanyOverviewProps) {
  const { stockName } = useStockInfoContext();
  const { data: investmentRecommendationData } = useQuery({
    queryKey: ["investmentRecommendation", `${stockName}`],
    queryFn: () => getConsensus(stockName),
  });
  return (
    <div>
      <div className="mb-10 flex justify-between">
        <div className="text-16-500">기업정보</div>
        <span className="text-14-500 text-gray-100">[기준: 2024. 08. 16]</span>
      </div>
      <ul className="list-style mb-24 border-y-2 border-solid border-gray-100 py-14 text-14-500">
        {newsData
          ?.map((news) => (
            <li key={news.title}>
              <a href={news.link} target="_blank">
                {cleanText(news.title)}
              </a>
            </li>
          ))
          .slice(0, 3)}
      </ul>

      <FinancialStatements />
      <Consensus investmentRecommendationData={investmentRecommendationData} />
      <TargetPrice
        investmentRecommendationData={investmentRecommendationData}
      />
      <div className="text-14-500 text-gray-100">
        전 세계 1200개 리서치 회사의 정보를 종합적으로 분석합니다. <br />
        기준 2024.08.29 . 레피니티브 제공
      </div>
    </div>
  );
}
