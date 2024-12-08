export const getKoreanPrice = (price: string | number | null): string => {
  if (price === null || price === "") return "";

  return new Intl.NumberFormat("ko-KR").format(Number(price));
};

export const calculateTotalOrderAmount = (
  count: number | null,
  bidding: number | null,
): number => {
  if (count && bidding) {
    return count * bidding;
  }
  return 0;
};

export const calculateBuyableQuantity = (
  deposit: string | number | null,
  bidding: number,
) => {
  if (deposit && bidding) {
    return Math.floor(Number(deposit) / bidding);
  }
  return 0;
};
