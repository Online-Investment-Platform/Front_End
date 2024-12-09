"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  buyAtLimitPrice,
  buyAtMarketPrice,
  OrderHistory,
  sellAtLimitPrice,
  sellAtMarketPrice,
} from "@/api/transaction";
import { useTabsContext } from "@/components/common/tabs";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";
import { calculateTotalOrderAmount } from "@/utils/price";
import {
  BuyFormData,
  BuyFormSchema,
} from "@/validation/schema/transaction-form";

import { ModifyTradeFormData } from "../../../types";
import TransactionTable from "../transaction-table";
import BuyFormButtons from "./buy-form-buttons";
import BuyableQuantity from "./buyable-quantity";
import CurrentPrice from "./current-price";
import OrderField from "./order-field";
import PriceTypeDropdown from "./price-type-dropdown";
import TotalAmount from "./total-amount";

interface TradeProps {
  type: "buy" | "sell" | "edit";
  defaultData?: OrderHistory;
  handleMutate?: (data: ModifyTradeFormData) => void;
}

export default function Trade({ type, defaultData, handleMutate }: TradeProps) {
  const [priceType, setPriceType] = useState("지정가");
  const [isConfirmationPage, setIsConfirmationPage] = useState(false);
  const { setActiveTab } = useTabsContext();
  const { stockName, stockInfo } = useStockInfoContext();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    control,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BuyFormData>({
    resolver: zodResolver(BuyFormSchema),
    defaultValues:
      type === "edit" && defaultData
        ? {
            count: defaultData.stockCount,
            bidding: defaultData.buyPrice,
          }
        : {
            count: undefined,
            bidding: undefined,
          },
  });

  const watchedCount = watch("count");
  const watchedBidding = watch("bidding");

  const handleReset = () => {
    reset({
      count: undefined,
      bidding: undefined,
    });
  };

  const handlePriceTypeChange = (newPriceType: string) => {
    setPriceType(newPriceType);
    if (newPriceType === "현재가") {
      setValue("bidding", Number(stockInfo.stockPrice));
    } else {
      setValue("bidding", 0);
    }
  };

  const handleConfirmPurchase = () => {
    setIsConfirmationPage(true);
  };

  const { mutate: buyAtMarketPriceMutate } = useMutation({
    mutationFn: buyAtMarketPrice,
    onSuccess: () => {
      setActiveTab("history");
    },
  });

  const { mutate: buyAtLimitPriceMutate } = useMutation({
    mutationFn: buyAtLimitPrice,
    onSuccess: () => {
      setActiveTab("history");
      queryClient.invalidateQueries({ queryKey: ["limitOrder"] });
    },
  });

  const { mutate: sellAtMarketPriceMutate } = useMutation({
    mutationFn: sellAtMarketPrice,
    onSuccess: () => {
      setActiveTab("history");
    },
  });

  const { mutate: sellAtLimitPriceMutate } = useMutation({
    mutationFn: sellAtLimitPrice,
    onSuccess: () => {
      setActiveTab("history");
      queryClient.invalidateQueries({ queryKey: ["limitOrder"] });
    },
  });

  const handleBuy = () => {
    if (priceType === "현재가") {
      buyAtMarketPriceMutate({
        token,
        data: { stockName, quantity: watchedCount },
      });
    } else {
      buyAtLimitPriceMutate({
        token,
        data: { stockName, limitPrice: watchedBidding, quantity: watchedCount },
      });
    }
  };

  const handleSell = () => {
    if (priceType === "현재가") {
      sellAtMarketPriceMutate({
        token,
        data: { stockName, quantity: watchedCount },
      });
    } else {
      sellAtLimitPriceMutate({
        token,
        data: { stockName, limitPrice: watchedBidding, quantity: watchedCount },
      });
    }
  };

  const handleEdit = () => {
    if (type !== "edit" || !handleMutate) return;

    handleMutate({
      token,
      orderId: defaultData?.OrderId,
      data: { stockName, limitPrice: watchedBidding, quantity: watchedCount },
    });
  };

  let onClickConfirmHandler;

  if (type === "buy") {
    onClickConfirmHandler = handleBuy;
  } else if (type === "sell") {
    onClickConfirmHandler = handleSell;
  } else if (type === "edit") {
    onClickConfirmHandler = handleEdit;
  }

  let color;
  if (type === "buy") {
    color = "red" as const;
  } else if (type === "sell") {
    color = "blue" as const;
  } else if (type === "edit") {
    color = "green" as const;
  }

  if (isConfirmationPage) {
    return (
      <TransactionTable
        color={color}
        submittedData={{
          stockName,
          count: watchedCount,
          bidding: watchedBidding,
          totalAmount: calculateTotalOrderAmount(watchedCount, watchedBidding),
          buyOrder: type === "buy" ? "매수" : "매도",
        }}
        onClickGoBack={() => setIsConfirmationPage(false)}
        onClickConfirm={onClickConfirmHandler}
      />
    );
  }

  return (
    <div className="flex">
      <CurrentPrice />
      <div className="flex w-270 flex-col gap-16 pl-11">
        <PriceTypeDropdown
          orderType={type}
          priceType={priceType}
          setPriceType={handlePriceTypeChange}
        />
        <OrderField
          title="수량"
          type="count"
          placeholder="수량 입력"
          inputSuffix="주"
          state={watchedCount}
          setState={setValue}
          control={control}
          errors={errors.count}
          quantity={10}
        />

        {type !== "edit" && (
          <BuyableQuantity bidding={watchedBidding} type={type} />
        )}

        <OrderField
          title="호가"
          type="bidding"
          placeholder="호가 입력"
          inputSuffix="원"
          state={watchedBidding}
          setState={setValue}
          control={control}
          errors={errors.bidding}
        />
        <TotalAmount count={watchedCount} bidding={watchedBidding} />
        <BuyFormButtons
          orderType={type}
          handleReset={handleReset}
          handleSubmit={() => handleSubmit(handleConfirmPurchase)()}
        />
      </div>
    </div>
  );
}
