"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { cancelTrade, getTrade } from "@/api/transaction";
import Button from "@/components/common/button";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/store/use-toast-store";

import TransactionTable from "../transaction-table";
import EditTableBody from "./edit-table-body";
import EditTableHeader from "./edit-table-header";

export default function EditCancel() {
  const { stockName } = useStockInfoContext();
  const { token, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data: limitOrderData } = useQuery({
    queryKey: ["limitOrder"],
    queryFn: () => getTrade(token, stockName),
    enabled: !!isAuthenticated && !!token,
  });

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isEditForm, setIsEditForm] = useState(false);
  const [isCancelTable, setIsCancelTable] = useState(false);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [orderId],
    );
  };

  const handleEdit = () => {
    setIsEditForm(true);
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
  });

  const handleCancelConfirm = (orderId: string) => {
    cancelTradeMutate({ token, orderId });
  };

  if (isEditForm) {
    return <div>수정</div>;
  }

  if (isCancelTable) {
    return (
      <>
        {selectedOrders.map((orderId) => {
          const order = limitOrderData?.find(
            (data) => data.OrderId.toString() === orderId,
          );
          return order ? (
            <TransactionTable
              key={orderId}
              color="green"
              submittedData={{
                stockName: order.stockName,
                count: order.remainCount,
                bidding: order.buyPrice,
                totalAmount: order.remainCount * order.buyPrice,
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
      <div className="h-430 w-full overflow-scroll">
        <table className="w-full text-center text-14-500">
          <EditTableHeader />
          {limitOrderData?.map((data) => (
            <EditTableBody
              key={data.OrderId}
              data={data}
              isChecked={selectedOrders.includes(data.OrderId.toString())}
              toggleSelection={toggleOrderSelection}
            />
          ))}
        </table>
      </div>
      <div className="mt-20 text-center">
        <Button
          variant="red"
          className="mr-10 w-120 bg-[#1DA65A] hover:bg-[#1DA65A]/95"
          onClick={handleEdit}
        >
          정정
        </Button>
        <Button variant="red" className="w-120" onClick={handleCancel}>
          취소
        </Button>
      </div>
    </>
  );
}
