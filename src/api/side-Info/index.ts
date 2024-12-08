interface StockHolding {
  id: number;
  memberId: number;
  stockName: string;
  buyPrice: number;
  stockCount: number;
}

interface StockCountResponse {
  count: string;
}

export async function fetchMyStocks(token: string): Promise<StockHolding[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/account/accounts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stocks");
  }

  return response.json();
}

export async function fetchStockCount(
  token: string,
): Promise<StockCountResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home/sidebar/myStockCount`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stock count");
  }

  return response.json();
}

// 타입 내보내기
export type { StockHolding, StockCountResponse };
