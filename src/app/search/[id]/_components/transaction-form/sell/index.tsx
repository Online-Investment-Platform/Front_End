import Button from "@/components/common/button";
import CheckButton from "@/components/common/check-button";
import ArrowRight from "@/icons/arrow-right.svg";

const titles = [
  <CheckButton key="check" isChecked isStatic className="ml-8" />,
  "주문 정보",
  "잔량",
  "주문 수량",
  "주문 가격",
];

export default function Sell() {
  return (
    <div>
      <table className="w-full text-center text-14-500">
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
        <tr className="border-b border-solid text-center text-14-500">
          <td className="py-12 pl-10">
            <CheckButton isChecked />
          </td>
          <td className=" py-10 pl-20 text-left">
            <div className="pb-6 text-12-400">
              <span className="pr-3 text-[#F20000]">매수 정정</span>
              <span className="text-[#9B9B9B]">NO289971</span>
            </div>
            카카오 게임즈
          </td>
          <td>1</td>
          <td>1</td>
          <td>48500원</td>
        </tr>
      </table>
      <div className="mt-20 text-center">
        <Button
          variant="red"
          className="w-140 bg-[#4882FA] hover:bg-[#4882FA]/95"
        >
          다음
          <ArrowRight className="ml-6 stroke-white" />
        </Button>
      </div>
    </div>
  );
}
