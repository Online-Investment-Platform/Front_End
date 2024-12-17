import { QueryClient } from "@tanstack/react-query";

import getInitialStockData from "@/api/kospi-kosdac/index";
import getNews from "@/api/news";
import { getFluctuation, getTradingVolume } from "@/api/ranking-table/index";
import MainContent from "@/app/main/_components/main-contents";
import Sidebar from "@/app/main/_components/my-info";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: 1,
      },
    },
  });

  const initialStockData = await getInitialStockData();
  await queryClient.prefetchQuery({
    queryKey: ["stockIndex"],
    queryFn: getInitialStockData,
    initialData: initialStockData,
  });

  const initialNews = await getNews();
  await queryClient.prefetchQuery({
    queryKey: ["news"],
    queryFn: getNews,
    initialData: initialNews,
  });

  const [traddata, flucdata] = await Promise.all([
    getTradingVolume(),
    getFluctuation(),
  ]);

  return (
    <div className="flex xxl:px-230">
      <MainContent
        initialStockData={initialStockData}
        initialNews={initialNews}
        traddata={traddata}
        flucdata={flucdata}
      />
      <Sidebar />
    </div>
  );
}
