import {
  ModifyTradeFormData,
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

export interface OrderHistory {
  OrderId: number;
  buyPrice: number;
  remainCount: number;
  stockCount: number;
  stockName: string;
  type: string;
}

// 지정가 매수/매도 내역
export async function getTrade(
  token: string | null,
  stockName: string,
): Promise<OrderHistory[]> {
  if (token === null) {
    throw new Error();
  }

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
  orderId,
  data,
}: ModifyTradeFormData): Promise<string> {
  if (token === null || orderId === undefined) {
    throw new Error();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/${orderId}/modify`,
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

    return await res.text();
  } catch {
    throw new Error();
  }
}

interface CancelData {
  token: string | null;
  orderId: string;
}
// 지정가 취소
export async function cancelTrade({
  token,
  orderId,
}: CancelData): Promise<string> {
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

    return await res.text();
  } catch {
    throw new Error();
  }
}

export interface TradeHistory {
  OrderId: number;
  buyPrice: number;
  remainCount: number;
  stockCount: number;
  stockName: string;
  buyOrder: string;
}

// 매수/매도 체결내역
export async function getTradeHistory(
  token: string | null,
  stockName: string,
): Promise<TradeHistory[]> {
  if (token === null) {
    throw new Error();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/account/accounts/save/${stockName}`,
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
