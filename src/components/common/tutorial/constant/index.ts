import { TutorialStep } from "../types";

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "홈",
    content: [
      {
        subtitle: "투자 현황",
        description:
          "전체 계좌의 수익률과 포트폴리오 현황을 한눈에 확인하세요.",
      },
      {
        subtitle: "실시간 인기 종목",
        description: "거래량이 많은 인기 종목들을 실시간으로 확인할 수 있어요.",
      },
    ],
  },
  {
    title: "주식 조회",
    content: [
      {
        subtitle: "종목 검색",
        description: "원하는 주식 종목을 검색하고 상세 정보를 확인하세요.",
      },
      {
        subtitle: "차트 분석",
        description:
          "주식을 클릭하면 일별/주별/월별 주가 변동과 거래량을 분석할 수 있어요.",
      },
    ],
  },
  {
    title: "내 계좌",
    content: [
      {
        subtitle: "계좌 현황",
        description: "보유 중인 주식과 예수금을 실시간으로 확인하세요.",
      },
      {
        subtitle: "거래 내역",
        description: "매수/매도 거래 내역을 확인할수 있어요.",
      },
    ],
  },
  {
    title: "포트폴리오",
    content: [
      {
        subtitle: "자산 배분",
        description: "투자 종목별 비중과 섹터별 분포를 한눈에 보세요.",
      },
      {
        subtitle: "분석 보고서",
        description: "내게 필요한 투자 정보를 확인할 수 있어요.",
      },
    ],
  },
];

export default TUTORIAL_STEPS;
