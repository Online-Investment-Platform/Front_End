import { TradeType } from "@/app/search/[id]/types";

export const colorMap = {
  [TradeType.Buy]: "red",
  [TradeType.Sell]: "blue",
  [TradeType.Edit]: "green",
} as const;

export const textMap = {
  [TradeType.Buy]: "매수",
  [TradeType.Sell]: "매도",
  [TradeType.Edit]: "정정",
} as const;
