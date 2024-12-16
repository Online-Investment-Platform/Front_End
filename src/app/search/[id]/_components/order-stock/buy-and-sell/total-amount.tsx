import { calculateTotalOrderAmount, getKoreanPrice } from "@/utils/price";

interface TotalAmountProps {
  count: number;
  bidding: number;
}

export default function TotalAmount({ count, bidding }: TotalAmountProps) {
  const totalAmount = getKoreanPrice(calculateTotalOrderAmount(count, bidding));

  return (
    <>
      <div className="flex items-center gap-14">
        <div>총 주문 금액</div>
        <div className="max-w-167 flex-1 rounded-8 bg-blue-200 p-8 text-right">
          {totalAmount}원
        </div>
      </div>
      <div className="p-8 text-right text-red-400">{totalAmount}원</div>
    </>
  );
}
