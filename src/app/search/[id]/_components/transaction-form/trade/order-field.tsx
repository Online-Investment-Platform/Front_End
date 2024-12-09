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
  quantity?: number;
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
  quantity,
}: OrderFieldProps) {
  const { stockInfo } = useStockInfoContext();
  const numberRegex = /^[0-9,]*$/;

  const handleInputChange = (
    value: string,
    field: {
      onChange: (value: number | undefined) => void;
      value: number | undefined;
    },
  ) => {
    if (value === "") {
      field.onChange(undefined);
      return;
    }

    if (!numberRegex.test(value)) {
      return;
    }

    const cleanValue = value.replace(/,/g, "");

    if (cleanValue === "") {
      field.onChange(undefined);
      return;
    }

    const numValue = Number(cleanValue);

    if (Number.isNaN(numValue) || !Number.isFinite(numValue) || numValue <= 0) {
      return;
    }

    field.onChange(numValue);
  };

  return (
    <div className="relative flex justify-between gap-6">
      <CountDropdown
        title={title}
        number={type === "count" && quantity}
        state={state ?? ""}
        setState={(value) => setState(type, value ? Number(value) : 0)}
        stockPrice={type === "bidding" && stockInfo.stockPrice}
      />
      <Controller
        name={type}
        control={control}
        render={({ field }) => (
          <Input
            isForm
            placeholder={placeholder}
            inputSuffix={inputSuffix}
            value={field.value !== undefined ? getKoreanPrice(field.value) : ""}
            onChange={(e) => handleInputChange(e.target.value, field)}
            error={errors?.message}
          />
        )}
      />
    </div>
  );
}
