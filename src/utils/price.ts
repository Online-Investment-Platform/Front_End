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
