import { memo } from "react";

import AssetInfo from "@/app/main/_components/asset-info";
import MyStockInfo from "@/app/main/_components/stock-info";
import ErrorBoundary from "@/components/common/error-boundary";

function Sidebar() {
  return (
    <div className="w-330 shrink-0">
      <div className="sticky top-24 flex flex-col gap-16">
        <ErrorBoundary errorMessage="자산 정보를 불러올 수 없습니다">
          <AssetInfo />
        </ErrorBoundary>
        <ErrorBoundary errorMessage="관심 종목을 불러올 수 없습니다">
          <MyStockInfo />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default memo(Sidebar);
