const categories = [
  { label: "적극 매도", range: [-100, -60] },
  { label: "매도", range: [-60, -20] },
  { label: "중립", range: [-20, 20] },
  { label: "매수", range: [20, 60] },
  { label: "적극 매수", range: [60, 100] },
] as const;

export default categories;
