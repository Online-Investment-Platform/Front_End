import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";

import Input from "@/components/common/input";
import { useStockInfoContext } from "@/context/stock-info-context";
import { getKoreanPrice } from "@/utils/price";
import { BuyFormData } from "@/validation/schema/transaction-form";

import CountDropdown from "./count-dropdown";

interface BiddingProps {
  state: number | undefined;
  setState: UseFormSetValue<BuyFormData>;
  control: Control<BuyFormData>;
  errors: FieldErrors<BuyFormData>["bidding"];
}

export default function Bidding({
  state,
  setState,
  control,
  errors,
}: BiddingProps) {
  const { stockInfo } = useStockInfoContext();

  return (
    <div className="relative flex justify-between gap-6">
      <CountDropdown
        title="호가"
        state={state ?? ""}
        setState={(value) => setState("bidding", value ? Number(value) : 0)}
        stockPrice={stockInfo.stockPrice}
      />
      <Controller
        name="bidding"
        control={control}
        render={({ field }) => (
          <Input
            isForm
            placeholder="호가 입력"
            inputSuffix="원"
            value={
              field.value ? getKoreanPrice(field.value) : (field.value ?? "")
            }
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
            error={errors?.message}
          />
        )}
      />
    </div>
  );
}
