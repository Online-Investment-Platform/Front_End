import type { PortfolioData } from "@/app/portfolio/types";

const fetchPortfolios = async (token: string): Promise<PortfolioData[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolio/recommend`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("포트폴리오 데이터를 불러오는데 실패했습니다");
  }

  return response.json();
};

export default fetchPortfolios;
