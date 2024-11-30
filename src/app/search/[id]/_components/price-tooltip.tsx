import React from "react";

interface PriceTooltipProps {
  close: number;
  open: number;
  low: number;
  high: number;
  visible: boolean;
}

function PriceTooltip({ close, open, low, high, visible }: PriceTooltipProps) {
  if (!visible) return null;

  return (
    <div className="max-w-300 rounded-md border border-gray-200 bg-white p-4 text-12-400 shadow-md">
      <div className="flex justify-between">
        <div>종가:</div>
        <div>{close.toLocaleString()}</div>
      </div>
      <div className="flex justify-between">
        <div>시가:</div>
        <div>{open.toLocaleString()}</div>
      </div>
      <div className="flex justify-between text-blue-500">
        <div>최저가:</div>
        <div>{low.toLocaleString()}</div>
      </div>
      <div className="flex justify-between text-red-500">
        <div>최고가:</div>
        <div>{high.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default PriceTooltip;
