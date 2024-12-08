"use client";

import { useQuery } from "@tanstack/react-query";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { useAuth } from "@/hooks/use-auth";

const CHART_ITEMS = ["소비", "금융", "부동산", "투자"] as const;
const COLORS = ["#40c057", "#2b7a3e", "#245530", "#868e96"] as const;
type ChartItemType = (typeof CHART_ITEMS)[number];

interface ChartDataItem {
  name: ChartItemType;
  value: number;
}

interface PortfolioData {
  type: "AGGRESSIVE" | "PASSIVE" | "NORMAL";
  stocks: number;
  bonds: number;
  realEstate: number;
  savings: number;
  description: string;
}

const fetchPortfolios = async (token: string): Promise<PortfolioData[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolio/recommend`,
    {
      method: "GET",
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

export default function PortfolioRecommend() {
  const { annualIncome, token } = useAuth();

  const {
    data: portfolios,
    isLoading,
    error,
  } = useQuery<PortfolioData[]>({
    queryKey: ["portfolios"],
    queryFn: () => fetchPortfolios(token!),
    enabled: !!token,
  });

  const getPortfolioTypeText = (type: PortfolioData["type"]) => {
    switch (type) {
      case "AGGRESSIVE":
        return { text: "적극적", color: "text-red-500" };
      case "PASSIVE":
        return { text: "안정적", color: "text-blue-500" };
      case "NORMAL":
        return { text: "보통", color: "text-green-500" };
      default:
        return { text: type, color: "text-gray-500" };
    }
  };

  const createChartData = (portfolio: PortfolioData): ChartDataItem[] => [
    { name: "소비", value: portfolio.stocks },
    { name: "금융", value: portfolio.bonds },
    { name: "부동산", value: portfolio.realEstate },
    { name: "투자", value: portfolio.savings },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-400 items-center justify-center">
        <div className="size-30 animate-spin rounded-full border-b-2 border-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-400 items-center justify-center">
        <div className="text-red-500">
          {error instanceof Error ? error.message : "오류가 발생했습니다"}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-1200 px-6 py-20">
      <div className="mb-30 flex items-start justify-between">
        <div className="max-w-1200">
          <h1 className="mb-10 text-24-700">가장 포트폴리오</h1>
          <p className="text-gray-600">
            가장 포트폴리오 기능은 사용자가 실제 돈을 투자하지 않고도 다양한
            투자 전략과 자산을 시뮬레이션시켜볼 목적을 수 있는 기능입니다.
            사용자는 가상 자금을 바탕으로 주식, 채권, ETF 등 다양한 금융 상품에
            투자하고, 적극, 보통, 소극적 투자 방향을 설정해 자신의 리스크 성향에
            맞는 포트폴리오를 구성할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="mb-16 text-center">
        <h2 className="mb-5 text-24-400">연봉</h2>
        <p className="text-20-600">
          {annualIncome?.toLocaleString() ?? 0} 만원
        </p>
        <div className="mx-auto mt-4 h-px w-32 bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-3">
        {portfolios?.map((portfolio) => (
          <div
            key={`portfolio-${portfolio.type}`}
            className="shadow-sm rounded-lg bg-white p-15"
          >
            <div className="mb-8 text-center">
              <h3 className="text-24-600">
                <span className={getPortfolioTypeText(portfolio.type).color}>
                  {getPortfolioTypeText(portfolio.type).text}
                </span>{" "}
                투자방향
              </h3>
            </div>
            <div className="h-370">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={createChartData(portfolio)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }: ChartDataItem) =>
                      `${name} ${value}%`
                    }
                  >
                    {createChartData(portfolio).map((entry) => (
                      <Cell
                        key={`cell-${portfolio.type}-${entry.name}`}
                        fill={COLORS[CHART_ITEMS.indexOf(entry.name)]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex min-h-130 flex-col justify-between">
              <p className="text-16-400 text-gray-600">
                {portfolio.description}
              </p>
              <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-16-600">
                <div className="flex items-center">
                  <div className="mr-2 size-15 rounded-sm bg-[#40c057]" />
                  소비
                </div>
                <div className="flex items-center">
                  <div className="mr-2 size-15 rounded-sm bg-[#2b7a3e]" />
                  금융
                </div>
                <div className="flex items-center">
                  <div className="mr-2 size-15 rounded-sm bg-[#245530]" />
                  부동산
                </div>
                <div className="flex items-center">
                  <div className="mr-2 size-15 rounded-sm bg-[#868e96]" />
                  투자
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
