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

export async function fetchMyStocks(): Promise<StockHolding[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/account/accounts`,
    {
      credentials: "include", // httpOnly 쿠키 자동 포함
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stocks");
  }

  return response.json();
}

export async function fetchStockCount(): Promise<StockCountResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home/sidebar/myStockCount`,
    {
      credentials: "include", // httpOnly 쿠키 자동 포함
      headers: {
        "Content-Type": "application/json",
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
