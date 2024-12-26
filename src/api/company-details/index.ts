import { FinancialRatio, RelativeNews } from "@/types/company-details";

import makeApiRequest from "../make-api-request";

// 기업 상세정보의 재무제표 조회
export async function getFinancialStatements(
  stockName: string,
): Promise<FinancialRatio[]> {
  return makeApiRequest(
    "GET",
    `/search/financialRatio?stockName=${stockName}`,
    {},
  );
}

// 기업 관련 뉴스 조회
export async function getRelativeNews(
  stockName: string,
): Promise<RelativeNews[]> {
  return makeApiRequest("GET", `/search/news?stockName=${stockName}`, {});
}
