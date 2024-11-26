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

/**
 * Tabs 컴포넌트는 탭을 관리하는 최상위 컴포넌트입니다.
 * 자식 컴포넌트에 activeTab과 setActiveTab을 제공하는 역할을 합니다.
 * @param {ReactNode} children 탭 내에서 사용할 자식 요소입니다.
 * @param {string} defaultValue 활성화될 탭의 초기값입니다.
 * @returns {JSX.Element} TabsContext.Provider로 자식 컴포넌트를 래핑한 JSX 요소입니다.
 */
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

/**
 * 탭 항목을 나열하는 컨테이너입니다.
 * 자식으로 탭 항목들이 들어갑니다.
 * @param {ReactNode} children 탭 항목들을 렌더링할 자식 요소입니다.
 * @returns {JSX.Element} 자식 요소들을 포함한 div 요소입니다.
 */
function TabsList({ children }: { children: ReactNode }) {
  return <div className="flex">{children}</div>;
}

/**
 * 각 탭을 나타내는 트리거 버튼입니다. 클릭하면 해당 탭을 활성화합니다.
 * @param {string} value 탭을 식별하는 값입니다. 활성화된 탭과 비교하여 해당 탭을 활성화합니다.
 * @param {ReactNode} children 버튼 내에 렌더링될 텍스트나 요소입니다.
 * @param {string} buttonColor 버튼의 색상입니다. 기본값은 'green'입니다.
 * @param {string} rounded 버튼의 모서리 크기입니다. 'sm:rounded-2' 또는 'md:rounded-4' 값이 가능합니다.
 * @param {string} padding 버튼의 패딩 크기입니다. 'sm:px-4 py-2' 또는 'md:px-16 py-4' 값이 가능합니다.
 * @param {string} className 추가적인 CSS 클래스를 지정할 수 있습니다.
 * @returns {JSX.Element} 클릭 시 활성 탭을 변경하는 버튼을 렌더링합니다.
 */
function TabsTrigger({
  value,
  children,
  buttonColor = "green",
  rounded = "sm",
  padding = "sm",
  className,
}: {
  value: string;
  children: ReactNode;
  buttonColor?: "green" | "red" | "blue";
  rounded?: "sm" | "md";
  padding?: "sm" | "md";
  className?: string;
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
        className,
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

/**
 * 활성화된 탭에 해당하는 내용을 렌더링합니다.
 * activeTab과 value가 일치하는 경우에만 내용이 표시됩니다.
 * @param {string} value 해당 탭의 값입니다.
 * @param {ReactNode} children 해당 탭에 표시할 내용입니다.
 * @param {string} className 추가적인 CSS 클래스를 지정할 수 있습니다.
 * @returns {JSX.Element | null} 활성화된 탭에 해당하는 내용을 렌더링합니다. 일치하지 않으면 null을 반환합니다.
 */
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
