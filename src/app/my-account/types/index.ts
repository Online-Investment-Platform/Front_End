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
  totalEvaluationProfit: number;
  totalPurchaseAmount: number;
  totalProfit: number;
  totalEvaluationAmount: number;
  rank: number;
}
