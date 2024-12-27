import { Consensus } from "@/types/company-details";

export const calculateDifferencePercentage = (
  investmentRecommendationData: Consensus,
) => {
  const targetPrice = parseFloat(investmentRecommendationData.avgTargetPrice);
  const currentPrice = parseFloat(investmentRecommendationData.avgStockPrice);
  return ((targetPrice - currentPrice) / currentPrice) * 100;
};

export const getRelativePosition = (
  range: readonly [number, number],
  value: number,
) => {
  if (range[0] === range[1]) return 0;
  return ((value - range[0]) / (range[1] - range[0])) * 100;
};
