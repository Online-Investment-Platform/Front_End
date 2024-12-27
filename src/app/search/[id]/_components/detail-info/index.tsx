"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/tabs";

import CompanyOverview from "./company-overview";
import RelativeNews from "./relative-news";

export default function DetailInfo() {
  return (
    <div className="mt-16 rounded-10 bg-white p-30">
      <h3 className="mb-25 text-20-700">상세 정보</h3>
      <Tabs defaultValue="company-overview">
        <TabsList>
          <TabsTrigger value="company-overview">기업 개요</TabsTrigger>
          <TabsTrigger value="relative-news">관련 뉴스</TabsTrigger>
        </TabsList>
        <TabsContent value="company-overview">
          <CompanyOverview />
        </TabsContent>
        <TabsContent value="relative-news">
          <RelativeNews />
        </TabsContent>
      </Tabs>
    </div>
  );
}