import Button from "@/components/common/button";
import cn from "@/utils/cn";
import { getKoreanPrice } from "@/utils/price";

const COLOR_VARIANTS = {
  red: {
    background: "bg-red-100",
    button: "bg-red-500 hover:bg-red-500/80",
  },
  green: {
    background: "bg-green-100",
    button: "bg-green-500 hover:bg-green-500/80",
  },
  blue: {
    background: "bg-blue-100",
    button: "bg-blue-500 hover:bg-blue-500/80",
  },
} as const;

function TableRow({
  label,
  value,
  color = "red",
  className,
}: {
  label: string;
  value: string | number;
  color?: keyof typeof COLOR_VARIANTS;
  className?: string;
}) {
  return (
    <tr className="h-65 border-y border-solid">
      <th
        className={cn(
          "w-91 border-r border-solid text-14-500",
          COLOR_VARIANTS[color].background,
          className,
        )}
      >
        {label}
      </th>
      <td className="pl-30 text-16-500">{value}</td>
    </tr>
  );
}

interface TradeTableProps {
  color?: keyof typeof COLOR_VARIANTS;
  isSubmit?: boolean;
  submittedData: {
    stockName: string;
    count: number;
    bidding: number;
    totalAmount: number;
    buyOrder?: string;
  };
  onClickGoBack?: () => void;
  onClickConfirm?: () => void;
}

export default function TradeTable({
  color = "red",
  isSubmit = true,
  submittedData,
  onClickGoBack,
  onClickConfirm,
}: TradeTableProps) {
  return (
    <div>
      <table className="w-full">
        <tbody>
          <TableRow
            label="종목명"
            value={submittedData.stockName}
            color={color}
          />
          <TableRow
            label={`${submittedData.buyOrder} 수량`}
            value={getKoreanPrice(submittedData.count)}
            color={color}
          />
          <TableRow
            label={`${submittedData.buyOrder} 가격`}
            value={getKoreanPrice(submittedData.bidding)}
            color={color}
          />
          <TableRow
            label="총 주문 금액"
            value={getKoreanPrice(submittedData.totalAmount)}
            color={color}
          />
        </tbody>
      </table>
      {isSubmit && (
        <div className="mt-24 w-full text-center">
          <Button
            variant="outline-gray"
            className="w-140"
            onClick={onClickGoBack}
          >
            뒤로가기
          </Button>
          <Button
            variant="custom"
            className={cn("ml-5 w-140", COLOR_VARIANTS[color].button)}
            onClick={onClickConfirm}
          >
            확인
          </Button>
        </div>
      )}
    </div>
  );
}
