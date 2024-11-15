export interface StockIndexResponse {
  indexName: string;
  indexValue: string;
  fluctuationRate: string;
}

export interface TradingVolume {
  stockName: string;
  rank: number;
  currentPrice: number;
  totalVolume: number;
  prevVolume: number;
  volumeChangeRate: number;
}
