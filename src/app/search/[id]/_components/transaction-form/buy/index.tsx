/* eslint-disable react/no-array-index-key */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { buyAtLimitPrice, buyAtMarketPrice } from "@/api/transaction";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { useTabsContext } from "@/components/common/tabs";
import { useAuth } from "@/hooks/use-auth";
import { calculateTotalOrderAmount, getKoreanPrice } from "@/utils/price";
import {
  BuyFormData,
  BuyFormSchema,
} from "@/validation/schema/transaction-form";

import { StockInfo } from "../../../types";
import TransactionTable from "../transaction-table";
import CountDropdown from "./count-dropdown";
import PriceTypeDropdown from "./price-type-dropdown";

interface BuyProps {
  stockName: string;
  initialStockInfo: StockInfo;
}

const INPUT_WRAPPER_STYLE = "relative flex justify-between gap-6";

export default function Buy({ stockName, initialStockInfo }: BuyProps) {
  const [priceType, setPriceType] = useState("지정가");
  const [isConfirmationPage, setIsConfirmationPage] = useState(false);
  const [submittedData, setSubmittedData] = useState<BuyFormData | null>(null);
  const { setActiveTab } = useTabsContext();

  const { token } = useAuth();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BuyFormData>({
    resolver: zodResolver(BuyFormSchema),
    defaultValues: {
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
      setValue("bidding", Number(initialStockInfo.stockPrice));
    } else {
      setValue("bidding", 0);
    }
  };

  const handleConfirmPurchase = (data: BuyFormData) => {
    setSubmittedData(data);
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
    },
  });

  const handlePurchase = () => {
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

  if (isConfirmationPage && submittedData) {
    return (
      <TransactionTable
        color="red"
        submittedData={{
          stockName,
          count: watchedCount,
          bidding: watchedBidding,
          totalAmount: calculateTotalOrderAmount(watchedCount, watchedBidding),
        }}
        onClickGoBack={() => setIsConfirmationPage(false)}
        onClickConfirm={handlePurchase}
      />
    );
  }

  return (
    <div className="flex">
      <div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-127 bg-[#EDF1FC] py-11 text-center">
            {getKoreanPrice(initialStockInfo.stockPrice)}
          </div>
        ))}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-127 bg-[#FDEBEB] py-11 text-center">
            {getKoreanPrice(initialStockInfo.stockPrice)}
          </div>
        ))}
      </div>

      <div className="flex w-270 flex-col gap-16 pl-11">
        <div className="flex gap-8">
          <PriceTypeDropdown
            priceType={priceType}
            setPriceType={handlePriceTypeChange}
          />
          <span className="mb-4 w-100 rounded-2 border border-solid border-[#B6B6B6] p-13">
            시장가
          </span>
        </div>

        <form className={INPUT_WRAPPER_STYLE}>
          <CountDropdown
            title="수량"
            state={watchedCount ?? ""}
            setState={(value) => setValue("count", value ? Number(value) : 0)}
            number={10}
          />
          <Controller
            name="count"
            control={control}
            render={({ field }) => (
              <Input
                isForm
                placeholder="수량입력"
                inputSuffix="주"
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : Number(e.target.value),
                  )
                }
                error={errors.count?.message}
              />
            )}
          />
        </form>

        <div className={INPUT_WRAPPER_STYLE}>
          <span className="w-94">매수 가능 주식</span>
          <div className="flex-1 cursor-not-allowed border-b border-solid border-[#505050] pb-2 text-right">
            <span className="pr-5 text-[#B7B7B7]">300</span>주
          </div>
        </div>

        <div className={INPUT_WRAPPER_STYLE}>
          <CountDropdown
            title="호가"
            state={watchedBidding ?? ""}
            setState={(value) => setValue("bidding", value ? Number(value) : 0)}
            stockPrice={initialStockInfo.stockPrice}
          />
          <Controller
            name="bidding"
            control={control}
            render={({ field }) => (
              <Input
                isForm
                placeholder="호가 입력"
                inputSuffix="원"
                value={field.value ? getKoreanPrice(field.value) : ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : Number(e.target.value),
                  )
                }
                error={errors.bidding?.message}
              />
            )}
          />
        </div>

        <div className="flex items-center gap-14">
          <div>총 주문 금액</div>
          <div className="flex-1 rounded-8 bg-[#F5F6F8] p-8 text-right">
            {getKoreanPrice(
              calculateTotalOrderAmount(watchedCount, watchedBidding),
            )}
            원
          </div>
        </div>
        <div className="p-8 text-right text-[#EB0000]">
          {getKoreanPrice(
            calculateTotalOrderAmount(watchedCount, watchedBidding),
          )}
          원
        </div>

        <div className="relative top-90">
          <Button variant="outline-gray" onClick={handleReset}>
            초기화
          </Button>
          <Button
            variant="red"
            className="ml-7 w-160"
            onClick={() => handleSubmit(handleConfirmPurchase)()}
          >
            매수
          </Button>
        </div>
      </div>
    </div>
  );
}
