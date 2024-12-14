import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import CheckButton from "@/components/common/check-button";
import { LimitPriceOrderHistory } from "@/types/transaction";

import EditTableRow from "./edit-table-row";

const titles = [
  <CheckButton key="check" isChecked isStatic className="ml-8" />,
  "주문 정보",
  "잔량",
  "주문 수량",
  "주문 가격",
];

interface EditTableProps {
  limitPriceHistory: LimitPriceOrderHistory[] | undefined;
  selectedOrders: string[];
  setSelectedOrders: Dispatch<SetStateAction<string[]>>;
}

export default function EditTable({
  limitPriceHistory,
  selectedOrders,
  setSelectedOrders,
}: EditTableProps) {
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [orderId],
    );
  };

  return (
    <div className="h-400 w-full overflow-scroll">
      <table className="w-full text-center text-14-500">
        <thead>
          <tr className="h-48 border-y border-solid text-[#A1A1A1]">
            {titles.map((title, index) => (
              <th
                // eslint-disable-next-line react/no-array-index-key
                key={`title-${index}`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {limitPriceHistory && limitPriceHistory.length > 0 ? (
            [...limitPriceHistory]
              .sort((a, b) => b.OrderId - a.OrderId)
              .map((data) => (
                <EditTableRow
                  key={data.OrderId}
                  data={data}
                  isChecked={selectedOrders.includes(data.OrderId.toString())}
                  toggleSelection={toggleOrderSelection}
                />
              ))
          ) : (
            <tr>
              <td colSpan={5} className="py-20 text-center text-16-500">
                <Image
                  src="/images/green-wallet.png"
                  width={150}
                  height={150}
                  className="mx-auto my-30"
                  alt="지갑 그림"
                />
                지정가 거래 내역이 없습니다!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
