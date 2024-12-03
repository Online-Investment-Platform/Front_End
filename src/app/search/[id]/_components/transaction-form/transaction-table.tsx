import Button from "@/components/common/button";
import cn from "@/utils/cn";

interface TransactionTableProps {
  color: "red" | "green" | "blue";
  isSubmit?: boolean;
}
export default function TransactionTable({
  color,
  isSubmit = true,
}: TransactionTableProps) {
  const getBackgroundColor = () => {
    const colorMap: { [key in TransactionTableProps["color"]]: string } = {
      red: "bg-[#FDEBEB]",
      green: "bg-[#E9FFF0]",
      blue: "bg-[#EDF1FC]",
    };
    return colorMap[color];
  };

  return (
    <form>
      <table className="w-full">
        <tbody>
          <tr className="h-65 border-y border-solid">
            <th
              className={cn(
                "w-91 border-r border-solid text-14-500",
                getBackgroundColor(),
              )}
            >
              종목명
            </th>
            <td className="pl-30 text-16-500">카카오게임즈</td>
          </tr>
          <tr className="h-65 border-y border-solid">
            <th
              className={cn(
                "w-91 border-r border-solid text-14-500",
                getBackgroundColor(),
              )}
            >
              매수 수량
            </th>
            <td className="pl-30 text-16-500">4</td>
          </tr>
          <tr className="h-65 border-y border-solid">
            <th
              className={cn(
                "w-91 border-r border-solid text-14-500",
                getBackgroundColor(),
              )}
            >
              매수 가격
            </th>
            <td className="pl-30 text-16-500">2.350</td>
          </tr>
        </tbody>
      </table>
      {isSubmit && (
        <div className="mt-24 text-center">
          <Button variant="outline-gray" className="w-140">
            뒤로가기
          </Button>
          <Button
            variant="red"
            className={cn("ml-20 w-140", {
              "bg-[#4882FA] hover:bg-[#4882FA]/95": color === "blue",
              "bg-[#1DA65A] hover:bg-[#1DA65A]/95": color === "green",
            })}
          >
            확인
          </Button>
        </div>
      )}
    </form>
  );
}
