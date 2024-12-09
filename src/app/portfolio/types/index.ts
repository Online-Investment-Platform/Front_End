export type ChartItemType = "주식" | "저축" | "부동산" | "채권";

export interface PortfolioData {
  type: "AGGRESSIVE" | "PASSIVE" | "NORMAL";
  stocks: number;
  bonds: number;
  realEstate: number;
  savings: number;
  description: string;
}

export interface ChartDataItem {
  name: ChartItemType;
  value: number;
}
