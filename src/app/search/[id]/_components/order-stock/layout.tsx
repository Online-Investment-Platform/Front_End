import { ReactNode } from "react";

export default function OrderStockLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="ml-17 h-630 min-w-450 rounded-10 bg-white px-22 py-30">
      <h3 className="mb-25 text-20-700">거래하기</h3>
      {children}
    </div>
  );
}
