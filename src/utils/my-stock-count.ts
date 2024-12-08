import { StockHolding } from "@/api/side-Info/index";

class MyStockMap {
  private stockMap: Map<string, number>;

  constructor(array: StockHolding[] | undefined) {
    this.stockMap = new Map(
      array?.map((stock) => [stock.stockName, stock.stockCount]) ?? [],
    );
  }

  findStockCount(stockName: string) {
    return this.stockMap.get(stockName);
  }
}

export default MyStockMap;
