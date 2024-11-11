import type { Meta } from "@storybook/react";

import CommonTable from "./index";

const meta = {
  title: "Components/CommonTable",
  component: CommonTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommonTable>;

export default meta;

// 기본 테이블 - 행 구분선이 있는 버전
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const userData: UserData[] = [
  { id: "1", name: "홍길동", email: "hong@test.com", role: "관리자" },
  { id: "2", name: "김철수", email: "kim@test.com", role: "일반" },
  { id: "3", name: "이영희", email: "lee@test.com", role: "일반" },
];

export const DefaultTable = {
  args: {
    columns: [
      { key: "name", header: "이름" },
      { key: "email", header: "이메일" },
      { key: "role", header: "권한", align: "center" },
    ],
    data: userData,
    rowKeyField: "id",
    className:
      "w-full [&_th]:p-4 [&_td]:p-4 [&_tr]:border-b [&_tr]:border-gray-200",
  },
};

// 주식 테이블
interface StockData {
  rank: string;
  name: string;
  price: string;
  change: string;
  changeRate: string;
}

const stockData: StockData[] = [
  {
    rank: "1",
    name: "삼성전자",
    price: "80,000",
    change: "-3,500",
    changeRate: "-4.2",
  },
  {
    rank: "2",
    name: "SK하이닉스",
    price: "80,000",
    change: "-3,500",
    changeRate: "-4.2",
  },
  {
    rank: "3",
    name: "LG에너지솔루션",
    price: "80,000",
    change: "+3,500",
    changeRate: "+4.2",
  },
];

export const StockTable = {
  args: {
    columns: [
      { key: "rank", header: "", width: "40px", align: "center" },
      { key: "name", header: "종목명" },
      { key: "price", header: "", align: "right" },
      { key: "change", header: "", align: "right" },
    ],
    data: stockData,
    rowKeyField: "rank",
    className: `w-full
     [&_th]:p-4 
     [&_td]:p-4 
     [&_tr]:border-b 
     [&_tr]:border-gray-100 
     [&_td:nth-child(1)]:text-gray-400
     [&_td:nth-child(3)]:font-medium
     [&_td:nth-child(4)]:text-sm
     [&_td:last-child]:text-blue-500
     [&_tr:nth-child(3)_td:last-child]:text-red-500`,
  },
};

// 내 보유 주식 테이블
interface MyStockData {
  symbol: string;
  name: string;
  price: string;
  amount: string;
  days: string;
}

const myStockData: MyStockData[] = [
  {
    symbol: "M",
    name: "삼성전자",
    price: "33,444,000",
    amount: "-1,200",
    days: "5주",
  },
  {
    symbol: "M",
    name: "SK하이닉스",
    price: "33,444,000",
    amount: "-1,200",
    days: "5주",
  },
];

export const MyStockTable = {
  args: {
    columns: [
      { key: "symbol", header: "", width: "40px" },
      { key: "name", header: "종목명" },
      { key: "price", header: "", align: "right" },
      { key: "amount", header: "", align: "right" },
      { key: "days", header: "", align: "center" },
    ],
    data: myStockData,
    rowKeyField: "name",
    className: `w-full
     [&_th]:p-4 
     [&_td]:p-4 
     [&_tr]:border-b 
     [&_tr]:border-gray-100
     [&_td:nth-child(3)]:font-medium
     [&_td:nth-child(4)]:text-gray-500
     [&_td:last-child]:text-gray-400`,
  },
};

// 심플 버전
export const SimpleTable = {
  args: {
    columns: [
      { key: "name", header: "이름" },
      { key: "email", header: "이메일" },
    ],
    data: userData,
    rowKeyField: "id",
    className: "w-full [&_th]:p-4 [&_td]:p-4",
  },
};
