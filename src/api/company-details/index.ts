import { FinancialRatio } from "@/types/company-details";

import makeApiRequest from "../make-api-request";

// 기업 상세정보의 재무제표 조회
export default async function getFinancialStatements(
  stockName: string,
): Promise<FinancialRatio[]> {
  return makeApiRequest(
    "GET",
    `/search/financialRatio?stockName=${stockName}`,
    {},
  );
}
