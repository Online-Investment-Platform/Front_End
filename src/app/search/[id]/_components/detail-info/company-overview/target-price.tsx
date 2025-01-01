import React from "react";

import { Consensus } from "@/types/company-details";
import { getKoreanPrice } from "@/utils/price";

interface TargetPriceProps {
  investmentRecommendationData: Consensus | undefined;
}

export default function TargetPrice({
  investmentRecommendationData,
}: TargetPriceProps) {
  if (!investmentRecommendationData) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        데이터를 로드하는 중입니다...
      </div>
    );
  }

  // 주가 대비 목표가의 상대적 위치를 계산 (0~100 사이의 값)
  const position = Math.min(
    Math.max(
      ((parseFloat(investmentRecommendationData.avgTargetPrice) -
        parseFloat(investmentRecommendationData.avgStockPrice)) /
        parseFloat(investmentRecommendationData.avgStockPrice)) *
        50 +
        50,
      0,
    ),
    100,
  );

  return (
    <div className="mb-20 mt-13">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg mb-4 font-medium">목표주가</div>
          <div className="text-2xl font-bold">
            {getKoreanPrice(investmentRecommendationData.avgTargetPrice)}원
          </div>
        </div>

        <div className="text-12 leading-5">
          <div>목표가 범위</div>
          <div>
            {getKoreanPrice(investmentRecommendationData.avgStockPrice)}~
            {getKoreanPrice(investmentRecommendationData.avgTargetPrice)}
          </div>
          <div className="relative mt-5 h-6 w-260 rounded-full bg-green-500">
            <div
              className="absolute top-1/2 size-16 -translate-y-1/2 rounded-full bg-lime-300"
              style={{ left: `${position}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
