"use client";

import {
  ColorType,
  createChart,
  HistogramData,
  Time,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

import { ChartDTO, VolumeDTO } from "../types";
import PriceTooltip from "./price-tooltip";

interface Props {
  data: ChartDTO[];
  volumeData: VolumeDTO[];
}

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface TooltipData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

function CandlestickChart({ data, volumeData }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<TooltipData>({
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
  });

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer) return undefined;

    const chart = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#333",
      },
      width: 615,
      height: 476,
      grid: {
        vertLines: { color: "#E6E6E6" },
        horzLines: { color: "#E6E6E6" },
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.3,
        },
      },
    });

    // 캔들스틱 차트 (메인 차트)
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#FF3B30",
      downColor: "#007AFF",
      borderVisible: false,
      wickUpColor: "#FF3B30",
      wickDownColor: "#007AFF",
      priceScaleId: "right",
    });

    // 거래량 차트 (하단에 표시)
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "volume", // 별도의 스케일 ID 지정
    });

    // 거래량 차트의 스케일 설정
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8, // 상단 여백 (캔들차트 영역)
        bottom: 0, // 하단 여백
      },
      visible: false, // 거래량 차트의 가격 스케일 숨김
    });

    const transformedCandleData = data
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

    const transformedVolumeData = volumeData
      .map((item) => ({
        time: item.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3") as Time,
        value: Number(item.cumulativeVolume),
        color: item.changeDirection === "increase" ? "#FF3B30" : "#007AFF",
      }))
      .sort(
        (a, b) =>
          new Date(a.time as string).getTime() -
          new Date(b.time as string).getTime(),
      );

    candlestickSeries.setData(transformedCandleData);
    volumeSeries.setData(transformedVolumeData);

    // 툴팁 설정
    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const crosshairCandleData = param.seriesData.get(
          candlestickSeries,
        ) as CandleData;
        const crosshairVolumeData = param.seriesData.get(
          volumeSeries,
        ) as HistogramData;

        if (crosshairCandleData) {
          setTooltipData({
            ...crosshairCandleData,
            volume: crosshairVolumeData ? crosshairVolumeData.value : 0,
          });
          setTooltipVisible(true);
        }
      } else {
        setTooltipVisible(false);
      }
    });

    chart.timeScale().setVisibleLogicalRange({
      from: Math.max(0, transformedCandleData.length - 30),
      to: transformedCandleData.length,
    });

    return () => {
      chart.remove();
      return undefined;
    };
  }, [data, volumeData]);

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
