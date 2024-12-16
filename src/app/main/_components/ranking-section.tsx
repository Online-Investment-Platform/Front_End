"use client";

import { memo } from "react";

import FluctuationTable from "@/app/main/_components/flucctuate-table";
import RankingStock from "@/app/main/_components/ranking-stock";
import ErrorBoundary from "@/components/common/error-boundary";

import { Fluctuation, TradingVolume } from "../types";

interface RankingSectionProps {
  traddata: TradingVolume[];
  flucdata: Fluctuation[];
}

function RankingSection({ traddata, flucdata }: RankingSectionProps) {
  return (
    <div className="mb-30 flex flex-col gap-20">
      <h2 className="mt-80 text-24-700">실시간 랭킹</h2>
      <div className="flex w-full gap-30">
        <div className="mr-40 w-full">
          <ErrorBoundary errorMessage="거래량 순위를 불러올 수 없습니다">
            <RankingStock data={traddata} />
          </ErrorBoundary>
        </div>
        <div className="w-full">
          <ErrorBoundary errorMessage="변동폭 순위를 불러올 수 없습니다">
            <FluctuationTable data={flucdata} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default memo(RankingSection);
