import { useQuery } from "@tanstack/react-query";

import { getTradeHistory } from "@/api/transaction";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";

import TransactionTable from "./transaction-table";
import Image from "next/image";

export default function History() {
  const { token, isAuthenticated } = useAuth();
  const { stockName } = useStockInfoContext();

  const { data: tradeHistoryData } = useQuery({
    queryKey: ["tradeHistory"],
    queryFn: () => getTradeHistory(token, stockName),
    enabled: !!isAuthenticated && !!token,
  });

  return (
    <div className="flex h-470 flex-col gap-20 overflow-auto">
      {tradeHistoryData && tradeHistoryData?.length > 0 ? (
        tradeHistoryData.map((history) => (
          <TransactionTable
            key={history.OrderId}
            color="green"
            isSubmit={false}
            submittedData={{
              stockName: history.stockName,
              count: history.stockCount,
              bidding: history.buyPrice,
              totalAmount: history.buyPrice * history.stockCount,
              buyOrder: history.type,
            }}
          />
        ))
      ) : (
        <div className="py-20 font-medium leading-5 text-center">
          <Image
            src="/images/green-wallet.png"
            width={150}
            height={150}
            className="mx-auto mt-65 mb-30"
            alt="지갑 그림"
          />
          체결내역이 없습니다.
          <br />
          거래를 시작해보세요!
        </div>
      )}
    </div>
  );
}
