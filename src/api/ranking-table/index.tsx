export interface TradingVolume {
  stockName: string;
  rank: number;
  currentPrice: number;
  totalVolume: number;
  prevVolume: number;
  volumeChangeRate: number;
}

interface Fluctuation {
  rank: number;
  stockName: string;
  currentPrice: number;
  prevChangePrice: number;
  prevSign: string;
  prevChangeRate: number;
}

export async function getTradingVolume(): Promise<TradingVolume[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home/tradingVolume`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trading volume data");
  }

  return res.json();
}

export async function getFluctuation(): Promise<Fluctuation[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home/fluctuation`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch fluctuation data: ${res.status}`);
  }

  return res.json();
}
