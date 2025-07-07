export interface CancelData {
  orderId: string;
}

export interface LimitPriceOrderHistory {
  OrderId: number;
  buyPrice: number;
  remainCount: number;
  stockCount: number;
  stockName: string;
  type: string;
}

export interface TradeHistory {
  id: number;
  buyPrice: number;
  remainCount: number;
  stockCount: number;
  stockName: string;
  buyOrder: string;
}

export interface MarketPriceHistoryResponse {
  id: number;
  memberId: number;
  stockName: string;
  buyPrice: number;
  stockCount: number;
  buyOrder: string;
}

export interface BuyMarketPriceResponse {
  memberId: number;
  stockName: string;
  currentPrice: number;
  quantity: number;
  deposit: number;
}

export interface TradeLimitPriceResponse {
  memberId: number;
  stockName: string;
  limitPrice: number;
  quantity: number;
  type: string;
}

export interface SellMarketPriceResponse {
  memberId: number;
  stockName: string;
  currentPrice: number;
  remainNumbers: number;
}

export interface TradeAtMarketPriceFormDataType {
  data: {
    stockName: string;
    quantity: number;
  };
}

export interface TradeAtLimitPriceFormDataType {
  data: {
    stockName: string;
    limitPrice: number;
    quantity: number;
  };
}

export interface ModifyTradeFormData extends TradeAtLimitPriceFormDataType {
  orderId: string | number | undefined;
}
