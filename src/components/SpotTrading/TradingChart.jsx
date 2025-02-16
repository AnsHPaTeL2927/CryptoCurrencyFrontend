/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import {
  ChartBar, TrendingUp, ZoomIn, ZoomOut, 
  RefreshCw, Settings, Maximize2, PenTool,
  Minimize2, Square, Triangle, Circle, Type
} from "lucide-react";

const generateDummyData = (count = 300) => {
  const data = [];
  let lastPrice = 50000;

  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * 500;
    const open = lastPrice;
    const close = open + change;
    const volume = Math.random() * 1000000;

    data.push({
      x: new Date().getTime() - (count - i) * 60000, // 1-minute intervals
      y: [
        open, // open
        Math.max(open, close) + Math.random() * 100, // high
        Math.min(open, close) - Math.random() * 100, // low
        close, // close
      ],
      volume,
    });

    lastPrice = close;
  }

  return data;
};

const chartOptions = {
  chart: {
    type: "candlestick",
    height: 600,
    fontFamily: "Inter, sans-serif",
    foreColor: "#999",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
      type: "x",
      autoScaleYaxis: true,
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
    background: "#1E1E1E",
  },
  grid: {
    show: true,
    borderColor: "#2A2A2A",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: true,
        color: "#2A2A2A",
      },
    },
    yaxis: {
      lines: {
        show: true,
        color: "#2A2A2A",
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      show: true,
      color: "#2A2A2A",
    },
    axisTicks: {
      show: true,
      color: "#2A2A2A",
    },
    labels: {
      show: true,
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
      stroke: {
        color: "#666",
        width: 1,
        dashArray: 0,
      },
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
    labels: {
      style: {
        colors: "#999",
        fontSize: "12px",
        fontFamily: "Inter, sans-serif",
      },
      formatter: (value) => {
        return (
          "$" +
          value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      },
    },
    axisBorder: {
      show: true,
      color: "#2A2A2A",
    },
    axisTicks: {
      show: true,
      color: "#2A2A2A",
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#26A69A", // Green for price increase
        downward: "#EF5350", // Red for price decrease
      },
      wick: {
        useFillColor: true,
      },
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
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      filter: {
        type: "none",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: undefined,
    align: "left",
  },
};

// Helper function to format price
const formatPrice = (price) => {
  return (
    "$" +
    price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};


const TradingChart = ({ symbol = "BTC/USDT" }) => {
  const [chartType, setChartType] = useState("candlestick");
  const [timeframe, setTimeframe] = useState("1m");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const height = !isFullscreen ? 600 : 750
  const [drawingMode, setDrawingMode] = useState(null);
  const [drawingStart, setDrawingStart] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [showDrawingTools, setShowDrawingTools] = useState(false);

  const drawingTools = [
    { id: 'trendline', label: 'Trend Line', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'horizontal', label: 'Horizontal', icon: <Square className="w-4 h-4" /> },
    { id: 'vertical', label: 'Vertical', icon: <Triangle className="w-4 h-4" /> },
    { id: 'fibonacci', label: 'Fibonacci', icon: <Type className="w-4 h-4" /> },
    { id: 'rectangle', label: 'Rectangle', icon: <Square className="w-4 h-4" /> },
    { id: 'circle', label: 'Circle', icon: <Circle className="w-4 h-4" /> }
  ];

  const handleDrawingMode = (mode) => {
    setDrawingMode(mode === drawingMode ? null : mode);
    setDrawingStart(null);
  };

  const handleChartMouseDown = (e, chartContext, config) => {
    if (!drawingMode) return;

    const rect = chartRef.current.chart.el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawingStart({ x, y });
  };

  const handleChartMouseMove = (e, chartContext, config) => {
    if (!drawingMode || !drawingStart) return;

    const rect = chartRef.current.chart.el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update temporary annotation
    const updatedOptions = {
      ...chartOptions,
      annotations: {
        ...getAnnotationConfig(drawingMode, drawingStart, { x, y })
      }
    };
    
    chartRef.current.chart.updateOptions(updatedOptions);
  };

  const handleChartMouseUp = (e, chartContext, config) => {
    if (!drawingMode || !drawingStart) return;

    const rect = chartRef.current.chart.el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Save permanent annotation
    const newAnnotation = {
      id: Date.now(),
      type: drawingMode,
      start: drawingStart,
      end: { x, y }
    };

    setAnnotations([...annotations, newAnnotation]);
    setDrawingStart(null);
  };

  // Update chart options with current annotations
  useEffect(() => {
    console.log(chartRef.current)
    if (chartRef.current) {
      const updatedOptions = {
        ...chartOptions,
        annotations: {
          position: 'front',
          xaxis: [],
          yaxis: [],
          points: [],
          ...annotations.reduce((acc, annotation) => {
            const config = getAnnotationConfig(
              annotation.type,
              annotation.start,
              annotation.end
            );
            return {
              xaxis: [...acc.xaxis, ...(config.xaxis || [])],
              yaxis: [...acc.yaxis, ...(config.yaxis || [])],
              points: [...acc.points, ...(config.points || [])]
            };
          }, { xaxis: [], yaxis: [], points: [] })
        }
      };

      chartRef.current.chart.updateOptions(updatedOptions);
    }
  }, [annotations]);

  // Function to get annotation configuration based on type
  const getAnnotationConfig = (type, start, end) => {
    const config = {
      xaxis: [],
      yaxis: [],
      points: []
    };

    switch (type) {
      case 'trendline':
        config.xaxis.push({
          x: start.x,
          x2: end.x,
          y: start.y,
          y2: end.y,
          strokeDashArray: 0,
          borderColor: '#00ff00',
          label: {
            borderColor: '#00ff00',
            style: {
              color: '#fff',
              background: '#00ff00'
            }
          }
        });
        break;

      case 'horizontal':
        config.yaxis.push({
          y: start.y,
          strokeDashArray: 0,
          borderColor: '#ffff00',
          label: {
            borderColor: '#ffff00',
            style: {
              color: '#fff',
              background: '#ffff00'
            }
          }
        });
        break;

      case 'vertical':
        config.xaxis.push({
          x: start.x,
          strokeDashArray: 0,
          borderColor: '#ff00ff',
          label: {
            borderColor: '#ff00ff',
            style: {
              color: '#fff',
              background: '#ff00ff'
            }
          }
        });
        break;

      // Add more cases for other drawing tools
    }

    return config;
  };

  // Update chartOptions with mouse events
  const updatedChartOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      events: {
        mouseDown: handleChartMouseDown,
        mouseMove: handleChartMouseMove,
        mouseUp: handleChartMouseUp,
      }
    }
  };

  // Add this to your toolbar section
  const renderDrawingTools = () => (
    <div className="relative">
      <button 
        className={`p-2 ${drawingMode ? 'text-blue-400' : 'text-gray-400'} hover:text-white rounded-lg hover:bg-gray-800 tooltip`}
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
                drawingMode === tool.id ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => handleDrawingMode(tool.id)}
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
  );


  // Handle zoom in
  const handleZoomIn = () => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
      const currentMin = chart.w.globals.minX;
      const currentMax = chart.w.globals.maxX;
      const range = currentMax - currentMin;

      // Zoom in by reducing the visible range by 50%
      const newMin = currentMin + range * 0.25;
      const newMax = currentMax - range * 0.25;

      chart.zoomX(newMin, newMax);
    }
  };

  // Handle zoom out
  const handleZoomOut = () => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
      const currentMin = chart.w.globals.minX;
      const currentMax = chart.w.globals.maxX;
      const range = currentMax - currentMin;

      // Zoom out by increasing the visible range by 50%
      const newMin = currentMin - range * 0.25;
      const newMax = currentMax + range * 0.25;

      chart.zoomX(newMin, newMax);
    }
  };

  // Handle chart reset
  const handleReset = () => {
    if (chartRef.current) {
      chartRef.current.chart.resetSeries();
      chartRef.current.chart.zoomX(
        chartRef.current.chart.w.globals.dataPoints[0],
        chartRef.current.chart.w.globals.dataPoints[
          chartRef.current.chart.w.globals.dataPoints.length - 1
        ]
      );
    }
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#1a1a1a] rounded-lg shadow-xl relative"
    >
      {console.log("containerRef", containerRef)}
      {/* Chart Header */}
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
            <option value="1m">1 Min</option>
            <option value="5m">5 Min</option>
            <option value="15m">15 Min</option>
            <option value="1h">1 Hour</option>
            <option value="4h">4 Hours</option>
            <option value="1d">1 Day</option>
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
          {/* <button
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 tooltip"
            data-tip="Drawing Tools"
          >
            <PenTool className="w-5 h-5" />
          </button> */}
          {renderDrawingTools()}
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

export default TradingChart;
