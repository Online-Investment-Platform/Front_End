import { useAuth } from "@/hooks/use-auth";
import { calculateBuyableQuantity, getKoreanPrice } from "@/utils/price";

interface BuyableQuantityProps {
  type: "buy" | "sell";
  bidding: number;
}

export default function BuyableQuantity({
  type,
  bidding,
}: BuyableQuantityProps) {
  const { deposit } = useAuth();

  return (
    <div className="relative flex justify-between gap-6">
      <span className="w-94">{type === "buy" ? "매수" : "매도"} 가능 주식</span>
      <div className="flex-1 cursor-not-allowed border-b border-solid border-[#505050] pb-2 text-right">
        <span className="pr-5 text-[#B7B7B7]">
          {type === "buy"
            ? getKoreanPrice(calculateBuyableQuantity(deposit, bidding))
            : ""}
        </span>
        주
      </div>
    </div>
  );
}
