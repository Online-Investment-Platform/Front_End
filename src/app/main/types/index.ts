export interface StockIndexResponse {
  indexName: string;
  indexValue: string;
  fluctuationRate: string;
}

export interface StockData {
  kospi: StockIndexResponse | null;
  kosdaq: StockIndexResponse | null;
}

export interface News {
  title: string;
  link: string;
}

export interface TradingVolume {
  stockName: string;
  rank: number;
  currentPrice: number;
  totalVolume: number;
  prevVolume: number;
  volumeChangeRate: number;
}

export interface Fluctuation {
  rank: number;
  stockName: string;
  currentPrice: number;
  prevChangePrice: number;
  prevSign: string;
  prevChangeRate: number;
}
