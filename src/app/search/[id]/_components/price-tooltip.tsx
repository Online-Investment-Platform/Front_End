interface PriceTooltipProps {
  close: number;
  open: number;
  low: number;
  high: number;
  visible: boolean;
}

export default function PriceTooltip({
  close,
  open,
  low,
  high,
  visible,
}: PriceTooltipProps) {
  if (!visible) return null;

  return (
    <div className="text-sm rounded border border-gray-200 bg-white p-2 shadow-lg">
      <div>종가: {close.toLocaleString()}</div>
      <div>시가: {open.toLocaleString()}</div>
      <div className="text-[#007AFF]">최저가: {low.toLocaleString()}</div>
      <div className="text-[#FF3B30]">최고가: {high.toLocaleString()}</div>
    </div>
  );
}
