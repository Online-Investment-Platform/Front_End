import {
  BuyMarketPriceResponse,
  CancelData,
  LimitPriceOrderHistory,
  MarketPriceHistoryResponse,
  ModifyTradeFormData,
  SellMarketPriceResponse,
  TradeAtLimitPriceFormDataType,
  TradeAtMarketPriceFormDataType,
  TradeHistory,
  TradeLimitPriceResponse,
} from "@/types/transaction";

import makeApiRequest from "../make-api-request";

// 현재가 매수
export async function buyAtMarketPrice({
  data,
}: TradeAtMarketPriceFormDataType): Promise<BuyMarketPriceResponse> {
  return makeApiRequest("POST", "/api/account/buy", { data });
}

// 현재가 매도
export async function sellAtMarketPrice({
  data,
}: TradeAtMarketPriceFormDataType): Promise<SellMarketPriceResponse> {
  return makeApiRequest("POST", "/api/account/sell", { data });
}

// 지정가 매수
export async function buyAtLimitPrice({
  data,
}: TradeAtLimitPriceFormDataType): Promise<TradeLimitPriceResponse> {
  return makeApiRequest("POST", "/api/account/order/buy", { data });
}

// 지정가 매도
export async function sellAtLimitPrice({
  data,
}: TradeAtLimitPriceFormDataType): Promise<TradeLimitPriceResponse> {
  return makeApiRequest("POST", "/api/account/order/sell", { data });
}

// 정정취소 화면의 매수/매도 체결내역 조회
export async function getHistory(
  stockName: string,
): Promise<MarketPriceHistoryResponse[]> {
  return makeApiRequest("GET", `/api/account/${stockName}`, {});
}

// 지정가 매수/매도 내역
export async function getTrade(
  stockName: string,
): Promise<LimitPriceOrderHistory[]> {
  return makeApiRequest("GET", `/api/account/orders/${stockName}`, {});
}

// 지정가 정정
export async function modifyTrade({
  orderId,
  data,
}: ModifyTradeFormData): Promise<string> {
  return makeApiRequest("PUT", `/api/account/order/${orderId}/modify`, {
    data,
    responseType: "text",
  });
}

// 지정가 취소
export async function cancelTrade({ orderId }: CancelData): Promise<string> {
  return makeApiRequest("DELETE", `/api/account/order/${orderId}/cancel`, {
    responseType: "text",
  });
}

// 체결내역
export async function getTradeHistory(
  stockName: string,
): Promise<TradeHistory[]> {
  return makeApiRequest("GET", `/api/account/accounts/save/${stockName}`, {});
}
