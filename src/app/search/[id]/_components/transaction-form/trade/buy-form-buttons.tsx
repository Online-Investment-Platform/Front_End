import Button from "@/components/common/button";
import cn from "@/utils/cn";

interface BuyFormButtonsProps {
  orderType: "buy" | "sell";
  handleReset: () => void;
  handleSubmit: () => void;
}

export default function BuyFormButtons({
  orderType,
  handleReset,
  handleSubmit,
}: BuyFormButtonsProps) {
  return (
    <div className="relative top-90">
      <Button variant="outline-gray" onClick={handleReset}>
        초기화
      </Button>
      <Button
        variant="red"
        className={cn(
          "ml-7 w-160",
          orderType === "sell" && "bg-[#4882FA] hover:bg-[#4882FA]/95",
        )}
        onClick={handleSubmit}
      >
        {orderType === "buy" ? "매수" : "매도"}
      </Button>
    </div>
  );
}
