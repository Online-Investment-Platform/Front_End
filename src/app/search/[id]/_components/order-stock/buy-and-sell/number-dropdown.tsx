import clsx from "clsx";
import { Dispatch, memo, SetStateAction } from "react";

import Dropdown from "@/components/common/dropdown";
import { getKoreanPrice } from "@/utils/price";

interface NumberDropdownProps<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  title: string;
  number?: number | boolean;
  stockPrice?: string | boolean;
}

function NumberDropdown<T extends string | number>({
  state,
  setState,
  number,
  title,
  stockPrice,
}: NumberDropdownProps<T>) {
  return (
    <Dropdown
      className="w-120"
      selectedValue={state}
      onSelect={(value) => setState(value as T)}
    >
      <Dropdown.Toggle border={false} className={clsx(stockPrice && "mb-2")}>
        <span className="pr-10">{title}</span>
      </Dropdown.Toggle>
      <Dropdown.Wrapper
        className={clsx(
          "h-300 overflow-scroll",
          stockPrice && "w-120 break-keep",
        )}
      >
        {typeof number === "number" &&
          number > 0 &&
          Array.from({ length: number }, (_, index) => (
            <Dropdown.Item
              className="text-center"
              key={index}
              value={index + 1}
            >
              {index + 1}
            </Dropdown.Item>
          ))}
        {stockPrice &&
          Array.from(
            { length: 21 },
            (_, index) => Number(stockPrice) - 10000 + index * 1000,
          ).map((price) => (
            <Dropdown.Item className="text-center" key={price} value={price}>
              {getKoreanPrice(price)} 원
            </Dropdown.Item>
          ))}
      </Dropdown.Wrapper>
    </Dropdown>
  );
}

export default memo(NumberDropdown);
