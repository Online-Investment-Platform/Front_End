interface BuyAtMarketPriceFormDataType {
  token: string | null;
  data: {
    stockName: string;
    quantity: number;
  };
}

export async function buyAtMarketPrice({
  token,
  data,
}: BuyAtMarketPriceFormDataType): Promise<string> {
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

interface BuyAtLimitPriceFormDataType {
  token: string | null;
  data: {
    stockName: string;
    limitPrice: number;
    quantity: number;
  };
}

export async function buyAtLimitPrice({
  token,
  data,
}: BuyAtLimitPriceFormDataType): Promise<string> {
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
