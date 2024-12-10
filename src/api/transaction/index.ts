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
  token,
  data,
}: TradeAtMarketPriceFormDataType): Promise<BuyMarketPriceResponse> {
  return makeApiRequest("POST", "/api/account/buy", { token, data });
}

// 현재가 매도
export async function sellAtMarketPrice({
  token,
  data,
}: TradeAtMarketPriceFormDataType): Promise<SellMarketPriceResponse> {
  return makeApiRequest("POST", "/api/account/sell", { token, data });
}

// 지정가 매수
export async function buyAtLimitPrice({
  token,
  data,
}: TradeAtLimitPriceFormDataType): Promise<TradeLimitPriceResponse> {
  return makeApiRequest("POST", "/api/account/order/buy", { token, data });
}

// 지정가 매도
export async function sellAtLimitPrice({
  token,
  data,
}: TradeAtLimitPriceFormDataType): Promise<TradeLimitPriceResponse> {
  return makeApiRequest("POST", "/api/account/order/sell", { token, data });
}

// 정정취소 화면의 매수/매도 체결내역 조회
export async function getHistory(
  token: string,
  stockName: string,
): Promise<MarketPriceHistoryResponse[]> {
  return makeApiRequest("GET", `/api/account/${stockName}`, {
    token,
  });
}

// 지정가 매수/매도 내역
export async function getTrade(
  token: string | null,
  stockName: string,
): Promise<LimitPriceOrderHistory[]> {
  return makeApiRequest("GET", `/api/account/orders/${stockName}`, {
    token,
  });
}

// 지정가 정정
export async function modifyTrade({
  token,
  orderId,
  data,
}: ModifyTradeFormData): Promise<string> {
  return makeApiRequest("PUT", `/api/account/order/${orderId}/modify`, {
    token,
    data,
    responseType: "text",
  });
}

// 지정가 취소
export async function cancelTrade({
  token,
  orderId,
}: CancelData): Promise<string> {
  return makeApiRequest("DELETE", `/api/account/order/${orderId}/cancel`, {
    token,
    responseType: "text",
  });
}

// 체결내역
export async function getTradeHistory(
  token: string | null,
  stockName: string,
): Promise<TradeHistory[]> {
  return makeApiRequest("GET", `/api/account/accounts/save/${stockName}`, {
    token,
  });
}
