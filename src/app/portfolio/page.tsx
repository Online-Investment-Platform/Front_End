import fetchPortfolios from "@/api/portfolio/index";
import { requireAuth } from "@/lib/auth-server";

import PortfolioRecommend from "./_components/portfoilo-card";

export default async function PortfolioPage() {
  await requireAuth(); // 간단한 인증 확인

  try {
    const portfolios = await fetchPortfolios(); // 토큰 제거
    return <PortfolioRecommend portfolios={portfolios} />;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "포트폴리오를 불러오는 중 오류가 발생했습니다",
    );
  }
}
