export interface ChartDTO {
  date: string; // "20241127" 형식
  endPrice: string; // 종가
  highPrice: string; // 최고가
  lowPrice: string; // 최저가
  prevPrice: string; // 전일 대비
}

export interface ChartResponse {
  chartDTOS: ChartDTO[];
}

export interface CandlestickData {
  time: string; // "2024-11-27" 형식 (날짜 포맷 변경 필요)
  open: number; // 시가 (종가 - 전일대비로 계산)
  high: number; // 최고가
  low: number; // 최저가
  close: number; // 종가
}

export type PeriodType = "day" | "week" | "month";
