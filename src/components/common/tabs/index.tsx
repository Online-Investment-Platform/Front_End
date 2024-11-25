"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import cn from "@/utils/cn";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Tabs 컴포넌트는 <Tabs> provider와 함께 사용되어야 합니다.",
    );
  }
  return context;
};

function Tabs({
  children,
  defaultValue,
}: {
  children: ReactNode;
  defaultValue: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const contextValue = useMemo(
    () => ({ activeTab, setActiveTab }),
    [activeTab, setActiveTab],
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
}

function TabsList({ children }: { children: ReactNode }) {
  return <div className="flex">{children}</div>;
}

function TabsTrigger({
  value,
  children,
  buttonColor = "green",
  rounded = "sm",
  padding = "sm",
}: {
  value: string;
  children: ReactNode;
  buttonColor?: "green" | "red" | "blue";
  rounded?: "sm" | "md";
  padding?: "sm" | "md";
}) {
  const { activeTab, setActiveTab } = useTabsContext();

  const isActive = activeTab === value;
  const backgroundColors: { [key in "green" | "red" | "blue"]: string } = {
    green: "bg-[#E9FFF0]",
    red: "bg-[#FDEBEB]",
    blue: "bg-[#EDF1FC]",
  };

  return (
    <button
      type="button"
      className={cn(
        "px-4 py-2 rounded-2",
        isActive ? backgroundColors[buttonColor] : "text-[#B6B6B6]",
        rounded === "md" && "rounded-4",
        padding === "md" && "px-16 py-4",
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;

  return <div className={cn("mt-20", className)}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
