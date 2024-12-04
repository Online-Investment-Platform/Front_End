export interface Stock {
  stockName: string;
  currentPrice: number;
  stockCount: number;
  prevChangeRate: number;
  EvaluationProfit: number;
  ProfitRate: number;
  purchaseAmount: number;
  EvalutionAmount: number;
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
