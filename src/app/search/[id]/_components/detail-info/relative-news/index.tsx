"use client";

export default function RelativeNews() {
  return (
    <table className="border-y border-solid border-gray-100">
      <caption className="text-left">관련뉴스</caption>
      <thead>
        <tr className="bg-green-100">
          <th>제목</th>
          <th>정보 제공</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-y border-solid border-gray-100">
          <td>
            코스피, 외국인 &quot;바이 코리아&quot;에 2680 선 마감.. LG 에너지
            솔루
          </td>
          <td>머니 투데이</td>
          <td>2024.09.02 </td>
        </tr>
      </tbody>
    </table>
  );
}
