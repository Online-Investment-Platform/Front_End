import React from "react";

import categories from "@/constants/company-details";
import { Consensus as ConsensusType } from "@/types/company-details";
import {
  calculateDifferencePercentage,
  getRelativePosition,
} from "@/utils/calculate-consensus";
import cn from "@/utils/cn";

interface ConsensusProps {
  investmentRecommendationData: ConsensusType | undefined;
}

export default function Consensus({
  investmentRecommendationData,
}: ConsensusProps) {
  if (!investmentRecommendationData) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        데이터를 로드하는 중입니다...
      </div>
    );
  }

  const difference = calculateDifferencePercentage(
    investmentRecommendationData,
  );
  const cappedDifference = Math.max(Math.min(difference, 100), -100);

  return (
    <>
      <div className="mb-8 mt-13 text-16-500 text-black">컨센서스</div>
      <div className="relative flex w-full justify-between gap-8 text-center text-14-500 text-gray-100">
        {categories.map((category, index) => {
          const isActive =
            cappedDifference > category.range[0] &&
            cappedDifference <= category.range[1];

          const relativePosition = getRelativePosition(
            category.range,
            cappedDifference,
          );

          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="relative flex-1">
              {isActive && (
                <div
                  className="absolute bottom-36 w-max -translate-x-1/2"
                  style={{
                    left: `${relativePosition}%`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="rounded bg-lime-300 px-7 py-3 text-14-500 text-black">
                      {difference.toFixed(2)}%
                    </div>
                    <div
                      className="size-0 border-x-8 border-t-8 border-x-transparent border-t-lime-300"
                      style={{ marginTop: "-1px" }}
                    />
                  </div>
                </div>
              )}
              <div
                className={cn(
                  "mb-6 h-9 w-full transition-colors",
                  isActive ? "bg-lime-300" : "bg-green-900",
                )}
              />
              <span>{category.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
