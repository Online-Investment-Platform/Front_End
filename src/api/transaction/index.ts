import {
  TradeAtLimitPriceFormDataType,
  TradeAtMarketPriceFormDataType,
} from "@/app/search/[id]/types";

// 현재가 매수
export async function buyAtMarketPrice({
  token,
  data,
}: TradeAtMarketPriceFormDataType): Promise<string> {
  if (token === null) {
    throw new Error();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/buy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to post transaction data: ${res.status}`);
    }

    return await res.json();
  } catch {
    throw new Error();
  }
}

// 지정가 매수
export async function buyAtLimitPrice({
  token,
  data,
}: TradeAtLimitPriceFormDataType): Promise<string> {
  if (token === null) {
    throw new Error();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/buy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to post transaction data: ${res.status}`);
    }

    return await res.json();
  } catch {
    throw new Error();
  }
}

// 현재가 매도
export async function sellAtMarketPrice({
  token,
  data,
}: TradeAtMarketPriceFormDataType): Promise<string> {
  if (token === null) {
    throw new Error();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/sell`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to post transaction data: ${res.status}`);
    }

    return await res.json();
  } catch {
    throw new Error();
  }
}

// 지정가 매도
export async function sellAtLimitPrice({
  token,
  data,
}: TradeAtLimitPriceFormDataType): Promise<string> {
  if (token === null) {
    throw new Error();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/sell`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to post transaction data: ${res.status}`);
    }

    return await res.json();
  } catch {
    throw new Error();
  }
}

// 체결내역 조회
export async function getHistory(
  token: string,
  stockName: string,
): Promise<string> {
  if (token === null) {
    throw new Error();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/${stockName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to post transaction data: ${res.status}`);
    }

    return await res.json();
  } catch {
    throw new Error();
  }
}

// // 지정가 정정/취소 가능한 거래내역
// export async function getTrade(
//   token: string | null,
//   stockName: string,
// ): Promise<string> {
//   if (token === null) {
//     throw new Error();
//   }
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/account/orders/${stockName}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to post transaction data: ${res.status}`);
//     }

//     return await res.json();
//   } catch {
//     throw new Error();
//   }
// }

export interface OrderHistory {
  OrderId: number;
  buyPrice: number;
  remainCount: number;
  stockCount: number;
  stockName: string;
}

export async function getTrade(
  token: string | null,
  stockName: string,
): Promise<OrderHistory[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/account/orders/${stockName}`,
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

// 지정가 정정
export async function modifyTrade({
  token,
  data,
}: TradeAtLimitPriceFormDataType): Promise<string> {
  if (token === null) {
    throw new Error();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/modify`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to post transaction data: ${res.status}`);
    }

    return await res.json();
  } catch {
    throw new Error();
  }
}

// 지정가 취소
export async function cancelTrade(
  token: string,
  orderId: string,
): Promise<string> {
  if (token === null) {
    throw new Error();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/${orderId}/cancel`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to post transaction data: ${res.status}`);
    }

    return await res.json();
  } catch {
    throw new Error();
  }
}
