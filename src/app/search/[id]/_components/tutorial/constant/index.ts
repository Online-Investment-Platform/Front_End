import { TutorialStep } from "../types";

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "차트 보기",
    content: [
      {
        subtitle: "기간 설정",
        description: "일/주/월 버튼으로 원하는 기간의 차트를 확인하세요.",
      },
      {
        subtitle: "이동평균선(MA)",
        description: "MA 버튼으로 주가의 평균 추세선을 표시할 수 있어요.",
      },
    ],
  },
  {
    title: "거래하기",
    content: [
      {
        subtitle: "매수/매도",
        description: "원하는 거래 유형을 선택하고 수량과 가격을 입력하세요.",
      },
      {
        subtitle: "실시간 호가",
        description: "현재 매수/매도 호가를 실시간으로 확인할 수 있어요.",
      },
    ],
  },
  {
    title: "주문 관리",
    content: [
      {
        subtitle: "체결 내역",
        description: "체결내역 탭에서 완료된 거래를 확인하세요.",
      },
      {
        subtitle: "미체결 주문",
        description: "정정/취소 탭에서 아직 체결되지 않은 주문을 관리하세요.",
      },
    ],
  },
];

export default TUTORIAL_STEPS;
