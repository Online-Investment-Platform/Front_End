// import { getFluctuation, getTradingVolume } from "@/api/ranking-table/index";

// import FluctuationTable from "./_components/flucctuate-table";
// import RankingStock from "./_components/ranking-stock";
// import SearchStock from "./_components/search-stock";
// import StockIndexCarousel from "./_components/stock-carousel";

// export default async function Home() {
//   const traddata = await getTradingVolume();
//   const flucdata = await getFluctuation();

//   return (
//     <div className="flex flex-col gap-40">
//       <SearchStock />
//       <StockIndexCarousel />
//       <div className="flex flex-col gap-10">
//         <h2 className="text-24-700">실시간 랭킹</h2>
//         <div className="flex w-full gap-30">
//           <div className="w-400">
//             <RankingStock data={traddata} />
//           </div>
//           <div className="w-400">
//             <FluctuationTable data={flucdata} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
