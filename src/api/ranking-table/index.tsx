export interface TradingVolume {
  stockName: string;
  rank: number;
  currentPrice: number;
  totalVolume: number;
  prevVolume: number;
  volumeChangeRate: number;
}

// app/lib/api.ts
export async function getTradingVolume(): Promise<TradingVolume[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home/tradingVolume`,
    {
      next: {
        revalidate: 60, // 1분마다 재검증
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trading volume data");
  }

  return res.json();
}
