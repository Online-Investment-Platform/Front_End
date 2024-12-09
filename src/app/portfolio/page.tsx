import { redirect } from "next/navigation";

import fetchPortfolios from "@/api/portfolio/index";
import { getCookie } from "@/utils/next-cookies";

import PortfolioRecommend from "./_components/portfoilo-card";

export default async function PortfolioPage() {
  const token = await getCookie("token");

  if (!token) {
    redirect("/login");
  }

  try {
    const portfolios = await fetchPortfolios(token);
    return <PortfolioRecommend portfolios={portfolios} />;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "포트폴리오를 불러오는 중 오류가 발생했습니다",
    );
  }
}
