"use client";

import { ColorType, createChart, Time } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

import { ChartDTO } from "../types";
import PriceTooltip from "./price-tooltip";

interface Props {
  data: ChartDTO[];
}

interface PriceData {
  open: number;
  high: number;
  low: number;
  close: number;
}

function CandlestickChart({ data }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<PriceData>({
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  });

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer) {
      return undefined;
    }

    const chart = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#333",
      },
      width: 800,
      height: 400,
      timeScale: {
        timeVisible: true,
        borderColor: "#D1D4DC",
        visible: true,
        barSpacing: 15,
      },
      crosshair: {
        mode: 1,
      },
      grid: {
        vertLines: {
          color: "#E6E6E6",
        },
        horzLines: {
          color: "#E6E6E6",
        },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#FF3B30",
      downColor: "#007AFF",
      borderVisible: false,
      wickUpColor: "#FF3B30",
      wickDownColor: "#007AFF",
      priceFormat: {
        type: "price",
        precision: 2,
        minMove: 0.01,
      },
    });

    const transformedData = data
      .map((item) => ({
        time: item.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3") as Time,
        open: Number(item.endPrice) - Number(item.prevPrice),
        high: Number(item.highPrice),
        low: Number(item.lowPrice),
        close: Number(item.endPrice),
      }))
      .sort(
        (a, b) =>
          new Date(a.time as string).getTime() -
          new Date(b.time as string).getTime(),
      );

    candlestickSeries.setData(transformedData);

    // 툴팁 설정
    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const candleData = param.seriesData.get(candlestickSeries) as PriceData;
        if (candleData) {
          setTooltipData(candleData);
          setTooltipVisible(true);
        }
      } else {
        setTooltipVisible(false);
      }
    });

    chart.timeScale().setVisibleLogicalRange({
      from: Math.max(0, transformedData.length - 30),
      to: transformedData.length,
    });

    return () => {
      chart.remove();
      return undefined;
    };
  }, [data]);

  return (
    <div className="relative">
      <div ref={chartContainerRef} style={{ overflowX: "auto" }} />
      <div className="pointer-events-none absolute left-0 top-0 z-50">
        <PriceTooltip {...tooltipData} visible={tooltipVisible} />
      </div>
    </div>
  );
}

export default CandlestickChart;
