"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { useAuth } from "@/hooks/use-auth";

import { CHART_ITEMS, COLORS } from "../constants";
import { ChartDataItem, PortfolioData } from "../types";

interface PortfolioRecommendProps {
  portfolios: PortfolioData[];
}

export default function PortfolioRecommend({
  portfolios,
}: PortfolioRecommendProps) {
  const { annualIncome } = useAuth();

  const getPortfolioTypeText = (type: PortfolioData["type"]) => {
    switch (type) {
      case "AGGRESSIVE":
        return { text: "적극적", color: "text-red-500", bgColor: "bg-red-50" };
      case "PASSIVE":
        return {
          text: "안정적",
          color: "text-blue-500",
          bgColor: "bg-blue-50",
        };
      case "NORMAL":
        return {
          text: "보통",
          color: "text-green-500",
          bgColor: "bg-green-50",
        };
      default:
        return { text: type, color: "text-gray-500", bgColor: "bg-gray-50" };
    }
  };

  const createChartData = (portfolio: PortfolioData): ChartDataItem[] => [
    { name: "주식", value: portfolio.stocks },
    { name: "저축", value: portfolio.savings },
    { name: "부동산", value: portfolio.realEstate },
    { name: "채권", value: portfolio.bonds },
  ];

  return (
    <div className="mx-auto max-w-1200 px-6 py-20">
      <div className="mb-30 flex items-center justify-between">
        <div className="max-w-1200">
          <h1 className="mb-10 text-24-700">가상 포트폴리오</h1>
          <p className="text-16-500 text-gray-800">
            가상 포트폴리오 기능은 사용자가 실제 돈을 투자하지 않고도 다양한
            투자 전략과 자산을 시뮬레이션하며 학습할 수 있는 기능입니다.
            사용자는 가상 자금을 바탕으로 주식, 채권, ETF 등 다양한 금융 상품에
            투자하고, 적극, 보통, 소극적 투자 방향을 설정해 자신의 리스크 성향에
            맞는 포트폴리오를 구성할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="mb-30 rounded-lg p-8 text-center">
        <h2 className="mb-5 text-24-400">연봉</h2>
        <p className="text-24-600">{annualIncome?.toLocaleString() ?? 0}원</p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {portfolios.map((portfolio) => {
          const typeStyle = getPortfolioTypeText(portfolio.type);
          return (
            <div
              key={`portfolio-${portfolio.type}`}
              className="shadow-sm hover:shadow-md overflow-hidden rounded-lg bg-white p-10 transition-all "
            >
              <div className="mb-8 text-center">
                <span
                  className={`inline-block rounded-full px-15 py-10 text-18-600 ${typeStyle.bgColor} ${typeStyle.color}`}
                >
                  {typeStyle.text} 투자방향
                </span>
              </div>
              <div className="h-300">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={createChartData(portfolio)}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                      label={({ name, value }) => `${name} ${value}%`}
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

              <div className="flex min-h-160 flex-col justify-between py-10">
                <p className="mb-15 text-center text-16-600 text-gray-600">
                  {portfolio.description}
                </p>
                <div className="grid grid-cols-2 gap-10">
                  {CHART_ITEMS.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center rounded-md bg-gray-50 p-8"
                    >
                      <div
                        className="mr-10 size-15 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-14-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
