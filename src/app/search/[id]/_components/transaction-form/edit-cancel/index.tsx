"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

import { getTrade } from "@/api/transaction";
import Button from "@/components/common/button";
import { useStockInfoContext } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";

import EditTableBody from "./edit-table-body";
import EditTableHeader from "./edit-table-header";

export default function EditCancel() {
  const { stockName } = useStockInfoContext();
  const { token, isAuthenticated } = useAuth();

  const { data: limitOrderData } = useQuery({
    queryKey: ["limitOrder"],
    queryFn: () => getTrade(token, stockName),
    enabled: !!isAuthenticated && !!token,
  });

  return (
    <>
      <table className="w-full text-center text-14-500">
        <EditTableHeader />
        {limitOrderData?.map((data) => (
          <EditTableBody key={data.OrderId} data={data} />
        ))}
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
    </>
  );
}
