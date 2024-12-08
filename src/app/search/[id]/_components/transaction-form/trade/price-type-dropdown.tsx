import Dropdown from "@/components/common/dropdown";

interface PriceTypeDropdownProps {
  priceType: string;
  setPriceType: (value: string) => void;
}
export default function PriceTypeDropdown({
  priceType,
  setPriceType,
}: PriceTypeDropdownProps) {
  return (
    <div className="flex gap-8">
      <Dropdown
        selectedValue={priceType}
        onSelect={(value) => setPriceType(value as string)}
        className="flex-1"
      >
        <Dropdown.Toggle>{priceType}</Dropdown.Toggle>
        <Dropdown.Wrapper>
          <Dropdown.Item value="지정가">지정가</Dropdown.Item>
          <Dropdown.Item value="현재가">현재가</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>
      <span className="mb-4 w-100 rounded-2 border border-solid border-[#B6B6B6] p-13">
        시장가
      </span>
    </div>
  );
}
