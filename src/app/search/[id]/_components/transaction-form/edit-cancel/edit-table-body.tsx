import { useState } from "react";

import { OrderHistory } from "@/api/transaction";
import CheckButton from "@/components/common/check-button";
import { getKoreanPrice } from "@/utils/price";

interface EditTableBodyProps {
  data: OrderHistory;
}

export default function EditTableBody({ data }: EditTableBodyProps) {
  const [checked, setIsChecked] = useState(false);

  return (
    <tr
      className="border-b border-solid text-center text-14-500"
      key={data.OrderId}
    >
      <td className="py-12 pl-10">
        <CheckButton
          isChecked={checked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
      </td>
      <td className=" py-10 pl-20 text-left">
        <div className="pb-6 text-12-400">
          <span className="pr-3 text-[#F20000]">매수 정정</span>
          <span className="text-[#9B9B9B]">{data.OrderId}</span>
        </div>
        {data.stockName}
      </td>
      <td>{data.remainCount}</td>
      <td>{data.stockCount}</td>
      <td>{getKoreanPrice(data.buyPrice)}원</td>
    </tr>
  );
}
