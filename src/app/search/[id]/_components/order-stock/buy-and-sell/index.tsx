"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { colorMap } from "@/constants/trade";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";
import {
  LimitPriceOrderHistory,
  ModifyTradeFormData,
} from "@/types/transaction";
import { calculateTotalOrderAmount } from "@/utils/price";
import {
  BuyFormData,
  BuyFormSchema,
} from "@/validation/schema/transaction-form";

import useTradeMutations from "../../../hooks/use-trade-mutations";
import { PriceType, TradeType } from "../../../types";
import TradeTable from "../trade-table";
import BuyableQuantity from "./buyable-quantity";
import CurrentPrice from "./current-price";
import FormButtons from "./form-buttons";
import InputField from "./input-field";
import PriceTypeDropdown from "./price-type-dropdown";
import TotalAmount from "./total-amount";

interface TradeProps {
  type: TradeType;
  defaultData?: LimitPriceOrderHistory;
  handleMutate?: UseMutateFunction<string, Error, ModifyTradeFormData, unknown>;
}

export default function BuyAndSell({
  type,
  defaultData,
  handleMutate,
}: TradeProps) {
  const [priceType, setPriceType] = useState(PriceType.Limit);
  const [isConfirmationPage, setIsConfirmationPage] = useState(false);

  const { stockName, stockInfo } = useStockInfoContext();
  const { token } = useAuth();
  const trades = useTradeMutations();

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
      type === TradeType.Edit && defaultData
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

  const handlePriceTypeChange = (newPriceType: PriceType) => {
    setPriceType(newPriceType);
    setValue(
      "bidding",
      newPriceType === PriceType.Market ? Number(stockInfo.stockPrice) : 0,
    );
  };

  const handleConfirmPurchase = () => {
    setIsConfirmationPage(true);
  };

  const transactionHandlers = {
    [TradeType.Buy]: () =>
      priceType === PriceType.Market
        ? trades.buyAtMarketPrice.mutate({
            token,
            data: { stockName, quantity: watchedCount },
          })
        : trades.buyAtLimitPrice.mutate({
            token,
            data: {
              stockName,
              limitPrice: watchedBidding,
              quantity: watchedCount,
            },
          }),

    [TradeType.Sell]: () =>
      priceType === PriceType.Market
        ? trades.sellAtMarketPrice.mutate({
            token,
            data: { stockName, quantity: watchedCount },
          })
        : trades.sellAtLimitPrice.mutate({
            token,
            data: {
              stockName,
              limitPrice: watchedBidding,
              quantity: watchedCount,
            },
          }),

    [TradeType.Edit]: () => {
      if (type !== TradeType.Edit || !handleMutate) return;
      handleMutate({
        token,
        orderId: defaultData?.OrderId,
        data: {
          stockName,
          limitPrice: watchedBidding,
          quantity: watchedCount,
        },
      });
    },
  };

  const handleConfirm = transactionHandlers[type];

  if (isConfirmationPage) {
    return (
      <TradeTable
        color={colorMap[type]}
        submittedData={{
          stockName,
          count: watchedCount,
          bidding: watchedBidding,
          totalAmount: calculateTotalOrderAmount(watchedCount, watchedBidding),
          buyOrder: type === TradeType.Buy ? "매수" : "매도",
        }}
        onClickGoBack={() => setIsConfirmationPage(false)}
        onClickConfirm={handleConfirm}
      />
    );
  }

  return (
    <div className="flex">
      <CurrentPrice />
      <form className="flex w-270 flex-col gap-16 pl-11">
        <PriceTypeDropdown
          orderType={type}
          priceType={priceType}
          setPriceType={handlePriceTypeChange}
        />
        <InputField
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

        <InputField
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
        <FormButtons
          orderType={type}
          handleReset={handleReset}
          handleSubmit={() => handleSubmit(handleConfirmPurchase)()}
        />
      </form>
    </div>
  );
}
