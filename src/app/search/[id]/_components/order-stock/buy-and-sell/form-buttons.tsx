import Button from "@/components/common/button";
import { textMap } from "@/constants/trade";
import cn from "@/utils/cn";

import { TradeType } from "../../../types";

interface FormButtonsProps {
  orderType: TradeType;
  handleReset: () => void;
  handleSubmit: () => void;
}

export default function FormButtons({
  orderType,
  handleReset,
  handleSubmit,
}: FormButtonsProps) {
  return (
    <div
      className={cn(
        "relative top-90 w-300",
        orderType === TradeType.Edit && "top-110",
      )}
    >
      <Button variant="outline-gray" onClick={handleReset}>
        초기화
      </Button>
      <Button
        variant="custom"
        className={cn(
          "ml-7 w-160",
          orderType === TradeType.Buy && "bg-red-500 hover:bg-red-500/80",
          orderType === TradeType.Sell && "bg-blue-500 hover:bg-blue-500/80",
          orderType === TradeType.Edit && "bg-green-500 hover:bg-green-500/80",
        )}
        onClick={handleSubmit}
      >
        {textMap[orderType]}
      </Button>
    </div>
  );
}
