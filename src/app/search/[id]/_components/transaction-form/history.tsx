import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { getTradeHistory } from "@/api/transaction";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";

import LoadingSpinner from "../loading-spiner";
import TransactionTable from "./transaction-table";

export default function History() {
  const { token, isAuthenticated } = useAuth();
  const { stockName } = useStockInfoContext();

  const {
    data: tradeHistoryData,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["tradeHistory", `${stockName}`],
    queryFn: () => getTradeHistory(token, stockName),
    enabled: !!isAuthenticated && !!token,
  });

  if (isLoading || isPending) {
    return <LoadingSpinner className="mt-230" />;
  }

  return (
    <div className="flex h-470 flex-col gap-20 overflow-auto">
      {tradeHistoryData && tradeHistoryData?.length > 0 ? (
        [...tradeHistoryData]
          .sort((a, b) => b.id - a.id)
          .map((history) => (
            <TransactionTable
              key={history.id}
              color={history.buyOrder === "매수" ? "red" : "blue"}
              isSubmit={false}
              submittedData={{
                stockName: history.stockName,
                count: history.stockCount,
                bidding: history.buyPrice,
                totalAmount: history.buyPrice * history.stockCount,
                buyOrder: history.buyOrder,
              }}
            />
          ))
      ) : (
        <div className="py-20 text-center font-medium leading-5">
          <Image
            src="/images/green-wallet.png"
            width={150}
            height={150}
            className="mx-auto mb-30 mt-65"
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
