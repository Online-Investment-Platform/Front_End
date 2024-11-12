import StockIndexCard from "./_components/stock-card";

export default function Home() {
  return (
    <div>
      <StockIndexCard endpoint="kospi" />
      <StockIndexCard endpoint="kosdaq" />
    </div>
  );
}
