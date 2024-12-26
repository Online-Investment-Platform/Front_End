"use client";

import dayjs from "dayjs";

import { RelativeNews as RelativeNewsType } from "@/types/company-details";
import cleanText from "@/utils/cleanText";

interface RelativeNewsProps {
  newsData: RelativeNewsType[] | undefined;
}

export default function RelativeNews({ newsData }: RelativeNewsProps) {
  return (
    <table className="mb-100 w-full border-y border-solid border-gray-100 ">
      <caption className="mb-14 text-left text-16-500">관련뉴스</caption>
      <thead>
        <tr className="h-45 bg-green-100">
          <th>제목</th>
          {/* <th>정보 제공</th> */}
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        {newsData?.map((news) => (
          <tr
            key={news.title}
            className="h-38 border-y border-solid border-gray-100"
          >
            <td className="pl-40">
              <a href={news.link} target="_blank">
                {cleanText(news.title)}
              </a>
            </td>
            {/* <td>ㅇㅇ</td> */}
            <td className="text-center text-gray-700">
              {dayjs(news.pubDate).format("YYYY-MM-DD HH:mm")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
