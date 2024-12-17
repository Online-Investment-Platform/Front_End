"use client";

import { memo, PropsWithChildren } from "react";

function TableWrapper({ children }: PropsWithChildren) {
  return <div className="w-full">{children}</div>;
}

export default memo(TableWrapper);
