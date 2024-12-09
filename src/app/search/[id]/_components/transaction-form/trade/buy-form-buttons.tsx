import Button from "@/components/common/button";
import cn from "@/utils/cn";

interface BuyFormButtonsProps {
  orderType: "buy" | "sell" | "edit";
  handleReset: () => void;
  handleSubmit: () => void;
}

export default function BuyFormButtons({
  orderType,
  handleReset,
  handleSubmit,
}: BuyFormButtonsProps) {
  let buttonText;
  if (orderType === "buy") {
    buttonText = "매수";
  } else if (orderType === "sell") {
    buttonText = "매도";
  } else if (orderType === "edit") {
    buttonText = "정정";
  }

  return (
    <div className={cn("relative top-90", orderType === "edit" && "top-110")}>
      <Button variant="outline-gray" onClick={handleReset}>
        초기화
      </Button>
      <Button
        variant="red"
        className={cn(
          "ml-7 w-160",
          orderType === "sell" && "bg-[#4882FA] hover:bg-[#4882FA]/95",
          orderType === "edit" && "bg-[#1DA65A] hover:bg-[#1DA65A]/95",
        )}
        onClick={handleSubmit}
      >
        {buttonText}
      </Button>
    </div>
  );
}
