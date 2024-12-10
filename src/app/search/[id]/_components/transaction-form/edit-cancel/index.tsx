"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import { cancelTrade, getTrade, modifyTrade } from "@/api/transaction";
import Button from "@/components/common/button";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/store/use-toast-store";

import LoadingSpinner from "../../loading-spiner";
import Trade from "../trade";
import TransactionTable from "../transaction-table";
import EditTableBody from "./edit-table-body";
import EditTableHeader from "./edit-table-header";

export default function EditCancel() {
  const { stockName } = useStockInfoContext();
  const { token, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: limitOrderData,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["limitOrder", `${stockName}`],
    queryFn: () => getTrade(token, stockName),
    enabled: !!isAuthenticated && !!token,
  });

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isEditForm, setIsEditForm] = useState(false);
  const [isCancelTable, setIsCancelTable] = useState(false);

  const findOrder = (orderId: string) =>
    limitOrderData?.find((data) => data.OrderId.toString() === orderId);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [orderId],
    );
  };

  const handleEdit = () => {
    if (selectedOrders.length > 0) {
      setIsEditForm(true);
    } else {
      showToast("정정할 데이터를 선택해주세요.", "error");
    }
  };

  const handleCancel = () => {
    if (selectedOrders.length > 0) {
      setIsCancelTable(true);
    } else {
      showToast("취소할 데이터를 선택해주세요.", "error");
    }
  };

  const { mutate: cancelTradeMutate } = useMutation({
    mutationFn: cancelTrade,
    onSuccess: () => {
      showToast("주문이 취소되었습니다", "success");
      queryClient.invalidateQueries({ queryKey: ["limitOrder"] });
    },
    onSettled: () => {
      setIsCancelTable(false);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const { mutate: modifyTradeMutate } = useMutation({
    mutationFn: modifyTrade,
    onSuccess: () => {
      showToast("주문을 수정했습니다.", "success");
      queryClient.invalidateQueries({ queryKey: ["limitOrder"] });
    },
    onSettled: () => {
      setIsEditForm(false);
      setSelectedOrders([]);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const handleCancelConfirm = (orderId: string) => {
    cancelTradeMutate({ token, orderId });
  };

  if (isEditForm) {
    const order = findOrder(selectedOrders[0]);
    return (
      <Trade type="edit" defaultData={order} handleMutate={modifyTradeMutate} />
    );
  }

  if (isLoading || isPending) {
    return <LoadingSpinner className="mt-230" />;
  }

  if (isCancelTable) {
    return (
      <>
        {selectedOrders.map((orderId) => {
          const order = findOrder(orderId);
          return order ? (
            <TransactionTable
              key={orderId}
              color="green"
              submittedData={{
                stockName: order.stockName,
                count: order.remainCount,
                bidding: order.buyPrice,
                totalAmount: order.remainCount * order.buyPrice,
                buyOrder: order.type,
              }}
              onClickGoBack={() => setIsCancelTable(false)}
              onClickConfirm={() => {
                handleCancelConfirm(orderId);
              }}
            />
          ) : (
            "취소 정보를 받아오지 못했습니다."
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="h-400 w-full overflow-scroll">
        <table className="w-full text-center text-14-500">
          <EditTableHeader />
          <tbody>
            {limitOrderData && limitOrderData.length > 0 ? (
              [...limitOrderData]
                .sort((a, b) => b.OrderId - a.OrderId)
                .map((data) => (
                  <EditTableBody
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
      {limitOrderData && limitOrderData.length > 0 && (
        <div className="mt-20 text-center">
          <Button
            variant="custom"
            className="mr-10 w-120 bg-[#0FED78] text-black hover:bg-[#0FED78]/95"
            onClick={handleEdit}
          >
            정정
          </Button>
          <Button
            variant="custom"
            className="w-120 bg-[#F12E35] hover:bg-[#F12E35]/95"
            onClick={handleCancel}
          >
            취소
          </Button>
        </div>
      )}
    </>
  );
}
