export type ChartItemType = "소비" | "금융" | "부동산" | "투자";

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
