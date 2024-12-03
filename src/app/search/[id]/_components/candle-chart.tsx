"use client";

import {
  ColorType,
  createChart,
  HistogramData,
  Time,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

import { ChartDTO, VolumeDTO } from "../types";
import LoadingSpinner from "./loading-spiner";
import PriceTooltip from "./price-tooltip";

interface Props {
  data: ChartDTO[];
  volumeData: VolumeDTO[];
  isLoading?: boolean;
  showMA: boolean;
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

interface MAData {
  time: Time;
  value: number;
}

function calculateMA(
  data: { close: number; time: Time }[],
  period: number,
): MAData[] {
  const result: MAData[] = [];
  for (let i = period - 1; i < data.length; i += 1) {
    let sum = 0;
    for (let j = 0; j < period; j += 1) {
      sum += data[i - j].close;
    }
    result.push({
      time: data[i].time,
      value: sum / period,
    });
  }
  return result;
}

function CandlestickChart({ data, volumeData, isLoading, showMA }: Props) {
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
    if (!data?.length || !volumeData?.length || isLoading) return undefined;

    const chartContainer = chartContainerRef.current;
    if (!chartContainer) return undefined;

    const chart = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#333",
      },
      width: 700,
      height: 426,
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

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#FF3B30",
      downColor: "#007AFF",
      borderVisible: false,
      wickUpColor: "#FF3B30",
      wickDownColor: "#007AFF",
      priceScaleId: "right",
    });

    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
      visible: false,
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
        color: item.changeDirection === "increase" ? "#F05650" : "#00CFFA",
      }))
      .sort(
        (a, b) =>
          new Date(a.time as string).getTime() -
          new Date(b.time as string).getTime(),
      );

    candlestickSeries.setData(transformedCandleData);
    volumeSeries.setData(transformedVolumeData);

    if (showMA) {
      const ma5Series = chart.addLineSeries({
        color: "#FF9800",
        lineWidth: 2,
        priceScaleId: "right",
      });

      const ma20Series = chart.addLineSeries({
        color: "#7B1FA2",
        lineWidth: 2,
        priceScaleId: "right",
      });

      const ma60Series = chart.addLineSeries({
        color: "#2FF221",
        lineWidth: 2,
        priceScaleId: "right",
      });

      const ma5Data = calculateMA(transformedCandleData, 5);
      const ma20Data = calculateMA(transformedCandleData, 20);
      const ma60Data = calculateMA(transformedCandleData, 60);

      ma5Series.setData(ma5Data);
      ma20Series.setData(ma20Data);
      ma60Series.setData(ma60Data);
    }

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
  }, [data, volumeData, isLoading, showMA]);

  if (isLoading || !data?.length || !volumeData?.length) {
    return (
      <div className="flex h-476 w-615 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

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
