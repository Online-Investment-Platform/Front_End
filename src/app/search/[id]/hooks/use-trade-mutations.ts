import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  buyAtLimitPrice,
  buyAtMarketPrice,
  sellAtLimitPrice,
  sellAtMarketPrice,
} from "@/api/transaction";
import { useTabsContext } from "@/components/common/tabs";
import { useToast } from "@/store/use-toast-store";

export default function useTradeMutations() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { setActiveTab } = useTabsContext();

  const createMutationConfig = (
    successMessage: string,
    tabName: string,
    queryKey: string,
  ) => ({
    onSuccess: () => {
      setActiveTab(tabName);
      showToast(successMessage, "success");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error: Error) => {
      showToast(error.message, "error");
    },
  });

  return {
    buyAtMarketPrice: useMutation({
      mutationFn: buyAtMarketPrice,
      ...createMutationConfig(
        "현재가로 매수가 완료되었습니다.",
        "history",
        "tradeHistory",
      ),
    }),
    sellAtMarketPrice: useMutation({
      mutationFn: sellAtMarketPrice,
      ...createMutationConfig(
        "현재가로 매도가 완료되었습니다.",
        "history",
        "tradeHistory",
      ),
    }),
    buyAtLimitPrice: useMutation({
      mutationFn: buyAtLimitPrice,
      ...createMutationConfig(
        "지정가로 매수가 완료되었습니다.",
        "edit-cancel",
        "limitOrder",
      ),
    }),
    sellAtLimitPrice: useMutation({
      mutationFn: sellAtLimitPrice,
      ...createMutationConfig(
        "지정가로 매도가 완료되었습니다.",
        "edit-cancel",
        "limitOrder",
      ),
    }),
  };
}
