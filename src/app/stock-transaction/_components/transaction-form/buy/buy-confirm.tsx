import Button from "@/components/common/button";

export default function BuyConfirm() {
  return (
    <form>
      <table className="w-full">
        <tbody>
          <tr className="h-65 border-y border-solid">
            <th className="w-91 border-r border-solid bg-[#FDEBEB] text-14-500">
              종목명
            </th>
            <td className="pl-30 text-16-500">카카오게임즈</td>
          </tr>
          <tr className="h-65 border-y border-solid">
            <th className="w-91 border-r border-solid bg-[#FDEBEB] text-14-500">
              매수 수량
            </th>
            <td className="pl-30 text-16-500">4</td>
          </tr>
          <tr className="h-65 border-y border-solid">
            <th className="w-91 border-r border-solid bg-[#FDEBEB] text-14-500">
              매수 가격
            </th>
            <td className="pl-30 text-16-500">2.350</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-24 text-center">
        <Button variant="outline-gray" className="w-140">
          뒤로가기
        </Button>
        <Button variant="red" className="ml-20 w-140">
          확인
        </Button>
      </div>
    </form>
  );
}
