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

interface OrderFieldProps {
  title: string;
  type: "count" | "bidding";
  placeholder: string;
  inputSuffix: string;
  state: number | undefined;
  setState: UseFormSetValue<BuyFormData>;
  control: Control<BuyFormData>;
  errors: FieldErrors<BuyFormData>["count"];
}

export default function OrderField({
  title,
  type,
  placeholder,
  inputSuffix,
  state,
  setState,
  control,
  errors,
}: OrderFieldProps) {
  const { stockInfo } = useStockInfoContext();

  return (
    <div className="relative flex justify-between gap-6">
      <CountDropdown
        title={title}
        state={state ?? ""}
        setState={(value) => setState(type, value ? Number(value) : 0)}
        stockPrice={stockInfo.stockPrice}
      />
      <Controller
        name={type}
        control={control}
        render={({ field }) => (
          <Input
            isForm
            placeholder={placeholder}
            inputSuffix={inputSuffix}
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
