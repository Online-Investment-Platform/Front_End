import { useQuery } from "@tanstack/react-query";

import { getTrade } from "@/api/transaction";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";

export default function useLimitOrderData() {
  const { stockName } = useStockInfoContext();
  const { token, isAuthenticated } = useAuth();

  const queryResult = useQuery({
    queryKey: ["limitOrder", stockName],
    queryFn: () => getTrade(token, stockName),
    enabled: !!isAuthenticated && !!token,
  });

  const findOrderById = (orderId: string) =>
    queryResult.data?.find((data) => data.OrderId.toString() === orderId);

  return {
    ...queryResult,
    findOrderById,
  };
}
