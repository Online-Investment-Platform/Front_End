import { useQuery } from "@tanstack/react-query";

import { getTradeHistory } from "@/api/transaction";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";

import TransactionTable from "./transaction-table";

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
        <div>체결내역이 없습니다. 거래를 시작해보세요!</div>
      )}
    </div>
  );
}
