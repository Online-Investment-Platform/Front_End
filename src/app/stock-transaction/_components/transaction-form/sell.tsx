const titles = ["체크", "주문 정보", "잔량", "주문 수량", "주문 가격"];

export default function Sell() {
  return (
    <div>
      <table className="w-full">
        <tr className="h-65 border-y border-solid">
          {titles.map((title) => (
            <th
              key={title}
              className="w-91 border-r border-solid bg-[#FDEBEB] text-14-500"
            >
              {title}
            </th>
          ))}
        </tr>
        <tr className="text-center text-14-500">
          <td className="">체크</td>
          <td className="">카카오 게임즈</td>
          <td className="">1</td>
          <td className="">1</td>
          <td className="">48500원</td>
        </tr>
      </table>
    </div>
  );
}
