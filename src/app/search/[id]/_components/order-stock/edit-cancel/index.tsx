// "use client";

import { useState } from "react";

import Button from "@/components/common/button";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/store/use-toast-store";

import useLimitOrderData from "../../../hooks/use-limit-order-data";
import useOrderMutations from "../../../hooks/use-limit-order-mutations";
import { TradeType } from "../../../types";
import LoadingSpinner from "../../loading-spinner";
import BuyAndSell from "../buy-and-sell";
import TradeTable from "../trade-table";
import EditTable from "./edit-table";

export default function EditCancel() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isEditForm, setIsEditForm] = useState(false);
  const [isCancelTable, setIsCancelTable] = useState(false);

  const { showToast } = useToast();
  const { token } = useAuth();
  const {
    data: limitOrderData,
    isLoading,
    isPending,
    findOrderById,
  } = useLimitOrderData();
  const { cancelTradeMutation, modifyTradeMutation } = useOrderMutations();

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

  const handleCancelConfirm = (orderId: string) => {
    cancelTradeMutation.mutate({ token, orderId });
    setIsCancelTable(false);
  };

  if (isLoading || isPending) {
    return <LoadingSpinner className="mt-230" />;
  }

  if (isEditForm) {
    const order = findOrderById(selectedOrders[0]);
    return (
      <BuyAndSell
        type={TradeType.Edit}
        defaultData={order}
        handleMutate={modifyTradeMutation.mutate}
      />
    );
  }

  if (isCancelTable) {
    return (
      <>
        {selectedOrders.map((orderId) => {
          const order = findOrderById(orderId);
          return order ? (
            <TradeTable
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
      <EditTable
        limitPriceHistory={limitOrderData}
        selectedOrders={selectedOrders}
        setSelectedOrders={setSelectedOrders}
      />
      {limitOrderData && limitOrderData.length > 0 && (
        <div className="mt-20 text-center">
          <Button
            variant="custom"
            className="mr-10 w-120 bg-lime-500 text-black hover:bg-lime-500/80"
            onClick={handleEdit}
          >
            정정
          </Button>
          <Button
            variant="custom"
            className="w-120 bg-red-500 hover:bg-red-500/80"
            onClick={handleCancel}
          >
            취소
          </Button>
        </div>
      )}
    </>
  );
}
