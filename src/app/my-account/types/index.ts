export interface Stock {
  stockName: string; // 종목명
  currentPrice: number; // 현재가
  stockCount: number; // 보유수량
  prevChangeRate: number; // 전일 대비 등락률
  EvaluationProfit: number; // 평가손익
  ProfitRate: number; // 수익률
  purchaseAmount: number; // 매입단가
}

export interface TotalStocks {
  memberNickname: string;
  deposit: number; // 예수금
  totalEvaluationProfit: number; // 총 평가손익
  totalPurchaseAmount: number; // 총 매입금액
  totalEvaluationAmount: number; // 총 평가금액
  estimatedAsset: number; // 추정자산
  rank: number; // 순위
}
