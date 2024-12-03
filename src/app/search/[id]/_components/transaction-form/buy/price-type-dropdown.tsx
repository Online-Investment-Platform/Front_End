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
  );
}
