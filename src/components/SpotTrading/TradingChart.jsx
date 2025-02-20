/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import {
  ChartBar,
  TrendingUp,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Settings,
  Maximize2,
  PenTool,
  Minimize2,
  Square,
  Triangle,
  Circle,
  Type,
} from "lucide-react";

// Helper function to format price
const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Data generation utility
const generateDummyData = (count = 300) => {
  const data = [];
  let lastPrice = 50000;

  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * 500;
    const open = lastPrice;
    const close = open + change;
    const volume = Math.random() * 1000000;

    data.push({
      x: new Date().getTime() - (count - i) * 60000,
      y: [
        open,
        Math.max(open, close) + Math.random() * 100,
        Math.min(open, close) - Math.random() * 100,
        close,
      ],
      volume,
    });

    lastPrice = close;
  }

  return data;
};

const TradingChart = ({ symbol = "BTC/USDT" }) => {
  // State Management
  const [chartType, setChartType] = useState("candlestick");
  const [timeframe, setTimeframe] = useState("1m");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [height, setHeight] = useState(500);
  const [drawingMode, setDrawingMode] = useState(null);
  const [drawingStart, setDrawingStart] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [showDrawingTools, setShowDrawingTools] = useState(false);

  // Refs
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  // Chart Configuration
  const chartOptions = {
    chart: {
      type: chartType,
      height: height,
      fontFamily: "Inter, sans-serif",
      foreColor: "#999",
      toolbar: { show: false },
      zoom: { enabled: true, type: "xy", autoScaleYaxis: true },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        dynamicAnimation: { enabled: true, speed: 350 },
      },
      background: "#1E1E1E",
      events: {
        mounted: function (chartContext, config) {
          if (chartRef.current) {
            chartRef.current.chart = chartContext;
          }
        },
        mouseDown: handleChartMouseDown,
        mouseMove: handleChartMouseMove,
        mouseUp: handleChartMouseUp,
      },
    },
    grid: {
      show: true,
      borderColor: "#2A2A2A",
      strokeDashArray: 0,
      position: "back",
      xaxis: { lines: { show: true, color: "#2A2A2A" } },
      yaxis: { lines: { show: true, color: "#2A2A2A" } },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    xaxis: {
      type: "datetime",
      axisBorder: { show: true, color: "#2A2A2A" },
      axisTicks: { show: true, color: "#2A2A2A" },
      labels: {
        style: {
          colors: "#999",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
          minute: "HH:mm:ss",
        },
      },
      crosshairs: {
        show: true,
        stroke: { color: "#666", width: 1, dashArray: 0 },
      },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        style: {
          colors: "#999",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
        formatter: formatPrice,
      },
      axisBorder: { show: true, color: "#2A2A2A" },
      axisTicks: { show: true, color: "#2A2A2A" },
    },
    plotOptions: {
      candlestick: {
        colors: { upward: "#26A69A", downward: "#EF5350" },
        wick: { useFillColor: true },
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        const time = w.globals.categoryLabels[dataPointIndex];

        return `
          <div class="bg-[#1E1E1E] p-3 rounded-lg shadow-lg border border-gray-800">
            <div class="text-sm text-gray-400 mb-2">${time}</div>
            <div class="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
              <div class="text-gray-400">Open</div>
              <div class="text-right font-mono">${formatPrice(o)}</div>
              <div class="text-gray-400">High</div>
              <div class="text-right font-mono text-green-400">${formatPrice(
                h
              )}</div>
              <div class="text-gray-400">Low</div>
              <div class="text-right font-mono text-red-400">${formatPrice(
                l
              )}</div>
              <div class="text-gray-400">Close</div>
              <div class="text-right font-mono">${formatPrice(c)}</div>
              <div class="text-gray-400 mt-2">Change</div>
              <div class="text-right font-mono ${
                c >= o ? "text-green-400" : "text-red-400"
              } mt-2">
                ${(((c - o) / o) * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        `;
      },
    },
  };

  // Drawing Tools Configuration
  const drawingTools = [
    {
      id: "trendline",
      label: "Trend Line",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "horizontal",
      label: "Horizontal",
      icon: <Square className="w-4 h-4" />,
    },
    {
      id: "vertical",
      label: "Vertical",
      icon: <Triangle className="w-4 h-4" />,
    },
    { id: "fibonacci", label: "Fibonacci", icon: <Type className="w-4 h-4" /> },
    {
      id: "rectangle",
      label: "Rectangle",
      icon: <Square className="w-4 h-4" />,
    },
    { id: "circle", label: "Circle", icon: <Circle className="w-4 h-4" /> },
  ];

  // Drawing Event Handlers
  function handleChartMouseDown(e, chartContext, config) {
    if (!drawingMode) return;
    const rect = e.target.getBoundingClientRect();
    setDrawingStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleChartMouseMove(e, chartContext, config) {
    if (!drawingMode || !drawingStart) return;
    const rect = e.target.getBoundingClientRect();
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (chartRef.current?.chart) {
      chartRef.current.chart.updateOptions({
        annotations: getAnnotationConfig(
          drawingMode,
          drawingStart,
          currentPoint
        ),
      });
    }
  }

  function handleChartMouseUp(e, chartContext, config) {
    if (!drawingMode || !drawingStart) return;
    const rect = e.target.getBoundingClientRect();
    const endPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setAnnotations([
      ...annotations,
      {
        id: Date.now(),
        type: drawingMode,
        start: drawingStart,
        end: endPoint,
      },
    ]);
    setDrawingStart(null);
  }

  // Chart Control Handlers
  const handleZoomIn = () => {
    if (chartRef.current?.chart) {
      const chart = chartRef.current.chart;
      const min = chart.w.globals.minX;
      const max = chart.w.globals.maxX;
      const range = max - min;
      chart.zoomX(min + range * 0.25, max - range * 0.25);
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current?.chart) {
      const chart = chartRef.current.chart;
      const min = chart.w.globals.minX;
      const max = chart.w.globals.maxX;
      const range = max - min;
      chart.zoomX(min - range * 0.25, max + range * 0.25);
    }
  };

  const handleReset = () => {
    if (chartRef.current?.chart) {
      chartRef.current.chart.zoomX(
        chartRef.current.chart.w.globals.dataPoints[0],
        chartRef.current.chart.w.globals.dataPoints[
          chartRef.current.chart.w.globals.dataPoints.length - 1
        ]
      );
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      setHeight(750);
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
      setHeight(500);
    }
  };

  // Effects
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Render
  return (
    <div
      ref={containerRef}
      className="w-full bg-[#1a1a1a] rounded-lg shadow-xl relative"
    >
      {/* Chart Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Chart Type Toggles */}
          <div className="flex p-1 bg-gray-800 rounded-lg">
            <button
              className={`px-3 py-1.5 rounded-md flex items-center ${
                chartType === "candlestick"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setChartType("candlestick")}
            >
              <ChartBar className="w-4 h-4 mr-2" />
              <span className="text-sm">Candlestick</span>
            </button>
            <button
              className={`px-3 py-1.5 rounded-md flex items-center ${
                chartType === "line"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setChartType("line")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-sm">Line</span>
            </button>
          </div>

          {/* Timeframe Selector */}
          <select
            className="px-3 py-1.5 bg-gray-800 text-gray-200 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-500"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            {["1m", "5m", "15m", "1h", "4h", "1d"].map((tf) => (
              <option key={tf} value={tf}>
                {tf}
              </option>
            ))}
          </select>
        </div>

        {/* Right Section - Tools */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 tooltip"
            data-tip="Zoom In"
            onClick={handleZoomIn}
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <button
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 tooltip"
            data-tip="Zoom Out"
            onClick={handleZoomOut}
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <button
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 tooltip"
            data-tip="Reset Chart"
            onClick={handleReset}
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              className={`p-2 ${
                drawingMode ? "text-blue-400" : "text-gray-400"
              } hover:text-white rounded-lg hover:bg-gray-800 tooltip`}
              data-tip="Drawing Tools"
              onClick={() => setShowDrawingTools(!showDrawingTools)}
            >
              <PenTool className="w-5 h-5" />
            </button>

            {showDrawingTools && (
              <div className="absolute right-0 mt-2 p-2 bg-gray-800 rounded-lg shadow-xl z-50 w-48">
                {drawingTools.map((tool) => (
                  <button
                    key={tool.id}
                    className={`w-full flex items-center px-3 py-2 rounded-md ${
                      drawingMode === tool.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      setDrawingMode(drawingMode === tool.id ? null : tool.id);
                      setShowDrawingTools(false);
                    }}
                  >
                    {tool.icon}
                    <span className="ml-2 text-sm">{tool.label}</span>
                  </button>
                ))}
                {annotations.length > 0 && (
                  <>
                    <div className="border-t border-gray-700 my-2"></div>
                    <button
                      className="w-full flex items-center px-3 py-2 rounded-md text-red-400 hover:bg-gray-700"
                      onClick={() => setAnnotations([])}
                    >
                      Clear All
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 tooltip"
            data-tip="Chart Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 tooltip"
            data-tip={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            onClick={handleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-4">
        <ApexCharts
          ref={chartRef}
          options={chartOptions}
          series={[
            {
              name: symbol,
              data: generateDummyData(),
            },
          ]}
          type={chartType}
          height={height}
        />
      </div>
    </div>
  );
};

// Helper function for annotations
const getAnnotationConfig = (type, start, end) => {
  const config = {
    xaxis: [],
    yaxis: [],
    points: [],
  };

  switch (type) {
    case "trendline":
      config.xaxis.push({
        x: start.x,
        x2: end.x,
        y: start.y,
        y2: end.y,
        strokeDashArray: 0,
        borderColor: "#00ff00",
        label: {
          borderColor: "#00ff00",
          style: {
            color: "#fff",
            background: "#00ff00",
          },
        },
      });
      break;

    case "horizontal":
      config.yaxis.push({
        y: start.y,
        strokeDashArray: 0,
        borderColor: "#ffff00",
        label: {
          borderColor: "#ffff00",
          style: {
            color: "#fff",
            background: "#ffff00",
          },
        },
      });
      break;

    case "vertical":
      config.xaxis.push({
        x: start.x,
        strokeDashArray: 0,
        borderColor: "#ff00ff",
        label: {
          borderColor: "#ff00ff",
          style: {
            color: "#fff",
            background: "#ff00ff",
          },
        },
      });
      break;

    case "fibonacci":
      // Add Fibonacci retracement levels
      const distance = end.y - start.y;
      const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];

      levels.forEach((level) => {
        config.yaxis.push({
          y: start.y + distance * level,
          strokeDashArray: 2,
          borderColor: "#ffd700",
          label: {
            text: `${(level * 100).toFixed(1)}%`,
            borderColor: "#ffd700",
            style: {
              color: "#fff",
              background: "#ffd700",
            },
          },
        });
      });
      break;

    case "rectangle":
      config.xaxis.push({
        x: start.x,
        x2: end.x,
        y: start.y,
        y2: end.y,
        strokeDashArray: 0,
        borderColor: "#00ffff",
        fillColor: "#00ffff20",
        label: {
          borderColor: "#00ffff",
          style: {
            color: "#fff",
            background: "#00ffff",
          },
        },
      });
      break;

    case "circle":
      const radius = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      );
      config.points.push({
        x: start.x,
        y: start.y,
        radius,
        strokeDashArray: 0,
        borderColor: "#ff69b4",
        fillColor: "#ff69b420",
        label: {
          borderColor: "#ff69b4",
          style: {
            color: "#fff",
            background: "#ff69b4",
          },
        },
      });
      break;
  }

  return config;
};

export default TradingChart;