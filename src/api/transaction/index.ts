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
