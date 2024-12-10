import CheckButton from "@/components/common/check-button";

const titles = [
  <CheckButton key="check" isChecked isStatic className="ml-8" />,
  "주문 정보",
  "잔량",
  "주문 수량",
  "주문 가격",
];

export default function EditTableHeader() {
  return (
    <thead>
      <tr className="h-48 border-y border-solid text-[#A1A1A1]">
        {titles.map((title, index) => (
          <th
            // eslint-disable-next-line react/no-array-index-key
            key={`title-${index}`}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
