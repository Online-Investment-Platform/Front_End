import { Dispatch, ReactNode, SetStateAction } from "react";

import Dropdown from "@/components/common/dropdown";

interface DropdownValue {
  value: string | number;
  valueName: string;
}

interface CustomDropdownProps<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  dropdownValue: Array<DropdownValue> | number;
  className: string;
  border?: boolean;
  children?: ReactNode;
}

export default function CustomDropdown<T extends string | number>({
  state,
  setState,
  dropdownValue,
  className,
  border,
  children,
}: CustomDropdownProps<T>) {
  const generatedItems =
    typeof dropdownValue === "number"
      ? Array.from({ length: dropdownValue }, (_, index) => ({
          value: index + 1,
          valueName: `${index + 1}`,
        }))
      : dropdownValue;

  return (
    <Dropdown
      selectedValue={state}
      onSelect={(value) => setState(value as T)}
      className={className}
    >
      <Dropdown.Toggle border={border}>{state || children}</Dropdown.Toggle>
      <Dropdown.Wrapper>
        {Array.isArray(generatedItems) &&
          generatedItems.map((item) => (
            <Dropdown.Item key={item.value} value={item.value}>
              {item.valueName}
            </Dropdown.Item>
          ))}
      </Dropdown.Wrapper>
    </Dropdown>
  );
}
