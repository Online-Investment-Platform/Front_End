import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelTrade, modifyTrade } from "@/api/transaction";
import { useToast } from "@/store/use-toast-store";

export default function useOrderMutations() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const cancelTradeMutation = useMutation({
    mutationFn: cancelTrade,
    onSuccess: () => {
      showToast("주문이 취소되었습니다", "success");
      queryClient.invalidateQueries({ queryKey: ["limitOrder"] });
    },
    onError: (error: Error) => {
      showToast(error.message, "error");
    },
  });

  const modifyTradeMutation = useMutation({
    mutationFn: modifyTrade,
    onSuccess: () => {
      showToast("주문을 수정했습니다.", "success");
      queryClient.invalidateQueries({ queryKey: ["limitOrder"] });
    },
    onError: (error: Error) => {
      showToast(error.message, "error");
    },
  });

  return { cancelTradeMutation, modifyTradeMutation };
}
