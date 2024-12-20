"use client";

import FinancialStatements from "./financial-statements";
import TargetPrice from "./target-price";

export default function CompanyOverview() {
  return (
    <div>
      <div className="mb-10 flex justify-between">
        <div className="text-16-500">기업정보</div>
        <span className="text-14-500 text-gray-100">[기준: 2024. 08. 16]</span>
      </div>
      <ul className="list-style mb-24 border-y-2 border-solid border-gray-100 py-14 text-14-500">
        <li>한국 및 DX 부문 해외 9개</li>
        <li>한국 및 DX 부문 해외 9개</li>
        <li>한국 및 DX 부문 해외 9개</li>
      </ul>

      <FinancialStatements />
      <TargetPrice />
      <div className="text-14-500 text-gray-100">
        전 세계 1200개 리서치 회사의 정보를 종합적으로 분석합니다. <br />
        기준 2024.08.29 . 레피니티브 제공
      </div>
    </div>
  );
}
