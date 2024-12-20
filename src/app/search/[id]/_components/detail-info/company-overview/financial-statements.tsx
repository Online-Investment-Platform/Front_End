"use client";

export default function FinancialStatements() {
  return (
    <table className="mb-20 w-full">
      <caption className="mb-10 text-left text-16-500">재무재표</caption>
      <thead className="border-y border-solid border-gray-100 bg-green-100">
        <tr className="h-45">
          <th
            rowSpan={2}
            className="border-r border-solid border-gray-100 text-16-500"
          >
            주요재무정보
          </th>
          <th colSpan={5} className="text-16-500">
            연간
          </th>
        </tr>
        <tr className="h-45 border-t border-solid border-gray-100">
          <th className="border-x border-solid border-gray-100 text-16-500">
            2020/12
          </th>
          <th className="border-x border-solid border-gray-100 text-16-500">
            2021/12
          </th>
          <th className="border-x border-solid border-gray-100 text-16-500">
            2022/12
          </th>
          <th className="text-16-500">2023/12</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr className="h-45 border-y border-solid border-gray-100">
          <th className="border-r border-solid border-gray-100 text-16-500">
            매출액
          </th>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td>100000000</td>
        </tr>
        <tr className="h-45 border-y border-solid border-gray-100">
          <th className="border-r border-solid border-gray-100  text-16-500">
            자산 총계
          </th>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td>100000000</td>
        </tr>
        <tr className="h-45 border-y border-solid border-gray-100">
          <th className="border-r border-solid border-gray-100 text-16-500">
            ROA
          </th>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td>100000000</td>
        </tr>
        <tr className="h-45 border-y border-solid border-gray-100">
          <th className="border-r border-solid border-gray-100 text-16-500">
            ROE
          </th>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td>100000000</td>
        </tr>
        <tr className="h-45 border-y border-solid border-gray-100">
          <th className="border-r border-solid border-gray-100 text-16-500">
            EPS
          </th>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td>100000000</td>
        </tr>
        <tr className="h-45 border-y border-solid border-gray-100">
          <th className="border-r border-solid border-gray-100 text-16-500">
            PER
          </th>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td>100000000</td>
        </tr>
        <tr className="h-45 border-y border-solid border-gray-100">
          <th className="border-r border-solid border-gray-100 text-16-500">
            영업 이익율
          </th>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td className="border-r border-solid border-gray-100">100000000</td>
          <td>100000000</td>
        </tr>
      </tbody>
    </table>
  );
}
