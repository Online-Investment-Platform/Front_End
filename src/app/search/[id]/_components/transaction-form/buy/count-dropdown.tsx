import { Dispatch, memo, SetStateAction } from "react";

import Dropdown from "@/components/common/dropdown";

interface CountDropdownProps<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  number: number;
  title: string;
}

function CountDropdown<T extends string | number>({
  state,
  setState,
  number,
  title,
}: CountDropdownProps<T>) {
  return (
    <Dropdown
      className="w-120"
      selectedValue={state}
      onSelect={(value) => setState(value as T)}
    >
      <Dropdown.Toggle border={false}>
        <span className="pr-10">{title}</span>
      </Dropdown.Toggle>
      <Dropdown.Wrapper>
        {Array.from({ length: number }, (_, index) => (
          <Dropdown.Item className="text-center" key={index} value={index + 1}>
            {index + 1}
          </Dropdown.Item>
        ))}
      </Dropdown.Wrapper>
    </Dropdown>
  );
}

export default memo(CountDropdown);
