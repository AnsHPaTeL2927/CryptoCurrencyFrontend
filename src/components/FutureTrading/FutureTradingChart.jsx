/* eslint-disable react/prop-types */
import React, { 
    useState, 
    useRef, 
    useEffect, 
    useMemo, 
    useCallback 
  } from 'react';
  import dynamic from 'next/dynamic';
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
  
  // Lucide Icons
  import {
    ChartBar,
    TrendingUp,
    BarChart2,
    ZoomIn,
    ZoomOut,
    RefreshCw,
    Settings,
    Maximize2,
    Minimize2,
    PenTool,
    Type,
    Square,
    Circle,
    Triangle,
    // ArrowRight,
  } from 'lucide-react';
  
  // Utility Functions
  const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  // Technical Indicator Configurations
  const TECHNICAL_INDICATORS = [
    { 
      id: 'sma', 
      name: 'Simple Moving Average', 
      periods: [50, 100, 200],
      defaultPeriod: 50,
      description: 'Calculates the average price over a specific number of periods'
    },
    { 
      id: 'ema', 
      name: 'Exponential Moving Average', 
      periods: [20, 50, 100],
      defaultPeriod: 20,
      description: 'Gives more weight to recent prices'
    },
    { 
      id: 'rsi', 
      name: 'Relative Strength Index', 
      periods: [14, 21, 28],
      defaultPeriod: 14,
      description: 'Measures momentum and overbought/oversold conditions'
    },
    { 
      id: 'macd', 
      name: 'MACD', 
      periods: [12, 26, 9],
      defaultPeriod: 12,
      description: 'Shows relationship between two moving averages'
    },
    { 
      id: 'bollinger', 
      name: 'Bollinger Bands', 
      periods: [20],
      defaultPeriod: 20,
      description: 'Measures volatility using standard deviations'
    }
  ];
  
  // Data Generation Utility (Replace with actual API data fetching)
  const generateChartData = (count = 300) => {
    const data = [];
    let lastPrice = 97198.50;
  
    for (let i = 0; i < count; i++) {
      const change = (Math.random() - 0.5) * 500;
      const open = lastPrice;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 100;
      const low = Math.min(open, close) - Math.random() * 100;
      const volume = Math.random() * 1000000;
  
      data.push({
        x: new Date().getTime() - (count - i) * 60000,
        y: [open, high, low, close],
        volume
      });
  
      lastPrice = close;
    }
  
    return data;
  };
  
  const FutureTradingChart = ({ 
    symbol = 'BTC-USDT', 
    initialChartType = 'candlestick',
    initialTimeframe = '1h'
  }) => {
    // State Management
    const [chartType, setChartType] = useState(initialChartType);
    const [timeframe, setTimeframe] = useState(initialTimeframe);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [height, setHeight] = useState(600);
    const [drawingMode, setDrawingMode] = useState(null);
    const [drawingStart, setDrawingStart] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [showDrawingTools, setShowDrawingTools] = useState(false);
    const [selectedIndicators, setSelectedIndicators] = useState([]);
    const [showIndicatorSettings, setShowIndicatorSettings] = useState(false);
    const [marketData, setMarketData] = useState({
      markPrice: 97198.50,
      change24h: '+1.23%',
      fundingRate: '0.0061%'
    });
  
    // Refs
    const chartRef = useRef(null);
    const containerRef = useRef(null);
  
    // Predefined Configuration
    const chartTypes = [
      { 
        id: 'candlestick', 
        name: 'Candlestick', 
        icon: <ChartBar className="w-4 h-4 mr-2" /> 
      },
      { 
        id: 'line', 
        name: 'Line', 
        icon: <TrendingUp className="w-4 h-4 mr-2" /> 
      },
      { 
        id: 'area', 
        name: 'Area', 
        icon: <BarChart2 className="w-4 h-4 mr-2" /> 
      }
    ];
  
    const timeframeOptions = [
      '1m', '5m', '15m', '30m', 
      '1h', '4h', '12h', 
      '1d', '1w', '1M'
    ];
  
    const drawingTools = [
      {
        id: 'trendline',
        label: 'Trend Line',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        id: 'horizontal',
        label: 'Horizontal',
        icon: <Square className="w-4 h-4" />
      },
      {
        id: 'vertical',
        label: 'Vertical',
        icon: <Triangle className="w-4 h-4" />
      },
      { 
        id: 'fibonacci', 
        label: 'Fibonacci', 
        icon: <Type className="w-4 h-4" /> 
      },
      {
        id: 'rectangle',
        label: 'Rectangle',
        icon: <Square className="w-4 h-4" />
      },
      { 
        id: 'circle', 
        label: 'Circle', 
        icon: <Circle className="w-4 h-4" /> 
      }
    ];
  
    // Indicator Management
    const addIndicator = useCallback((indicator) => {
      if (!selectedIndicators.find(i => i.id === indicator.id)) {
        setSelectedIndicators(prev => [
          ...prev, 
          { 
            ...indicator, 
            period: indicator.defaultPeriod 
          }
        ]);
      }
    }, [selectedIndicators]);
  
    const removeIndicator = useCallback((indicatorId) => {
      setSelectedIndicators(prev => 
        prev.filter(i => i.id !== indicatorId)
      );
    }, []);
  
    const updateIndicatorPeriod = useCallback((indicatorId, period) => {
      setSelectedIndicators(prev => 
        prev.map(i => 
          i.id === indicatorId ? { ...i, period: Number(period) } : i
        )
      );
    }, []);


    // Event Handlers
    const handleChartMouseDown = useCallback((e) => {
      if (!drawingMode) return;
      const rect = e.target.getBoundingClientRect();
      setDrawingStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }, [drawingMode]);
  
    const handleChartMouseMove = useCallback((e) => {
      if (!drawingMode || !drawingStart) return;
      const rect = e.target.getBoundingClientRect();
      const currentPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
  
      if (chartRef.current?.chart) {
        chartRef.current.chart.updateOptions({
          annotations: getAnnotationConfig(
            drawingMode, 
            drawingStart, 
            currentPoint
          )
        });
      }
    }, [drawingMode, drawingStart]);
  
    const handleChartMouseUp = useCallback((e) => {
      if (!drawingMode || !drawingStart) return;
      const rect = e.target.getBoundingClientRect();
      const endPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
  
      setAnnotations(prev => [
        ...prev,
        {
          id: Date.now(),
          type: drawingMode,
          start: drawingStart,
          end: endPoint
        }
      ]);
      
      setDrawingStart(null);
    }, [drawingMode, drawingStart]);
  
    // Chart Control Handlers
    const handleZoomIn = useCallback(() => {
      if (chartRef.current?.chart) {
        const chart = chartRef.current.chart;
        const min = chart.w.globals.minX;
        const max = chart.w.globals.maxX;
        const range = max - min;
        chart.zoomX(min + range * 0.25, max - range * 0.25);
      }
    }, []);
  
    const handleZoomOut = useCallback(() => {
      if (chartRef.current?.chart) {
        const chart = chartRef.current.chart;
        const min = chart.w.globals.minX;
        const max = chart.w.globals.maxX;
        const range = max - min;
        chart.zoomX(min - range * 0.25, max + range * 0.25);
      }
    }, []);
  
    const handleReset = useCallback(() => {
      if (chartRef.current?.chart) {
        const chart = chartRef.current.chart;
        chart.zoomX(
          chart.w.globals.dataPoints[0],
          chart.w.globals.dataPoints[chart.w.globals.dataPoints.length - 1]
        );
      }
    }, []);
  
    const handleFullscreen = useCallback(() => {
      if (!document.fullscreenElement) {
        setHeight(750);
        containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setHeight(600);
        setIsFullscreen(false);
      }
    }, []);
  
    // Annotation Configuration
    const getAnnotationConfig = useCallback((type, start, end) => {
      // Similar to previous implementation, but using base classes
      const config = {
        xaxis: [],
        yaxis: [],
        points: []
      };
  
      // Implementation details remain the same as in previous example
      return config;
    }, []);
  
    // Chart Configuration
    const chartOptions = useMemo(() => ({
      chart: {
        type: chartType,
        height: height,
        fontFamily: "Inter, sans-serif",
        foreColor: "#999",
        toolbar: { show: false },
        zoom: { 
          enabled: true, 
          type: "xy", 
          autoScaleYaxis: true 
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          dynamicAnimation: { 
            enabled: true, 
            speed: 350 
          }
        },
        events: {
          mouseDown: handleChartMouseDown,
          mouseMove: handleChartMouseMove,
          mouseUp: handleChartMouseUp
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: 'dd MMM yyyy HH:mm'
        }
      },
      yaxis: {
        tooltip: { enabled: true },
        labels: {
          formatter: formatPrice
        }
      },
      plotOptions: {
        candlestick: {
          colors: { 
            upward: "#26A69A", 
            downward: "#EF5350" 
          }
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
          const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
          const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
          const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
          const time = w.globals.categoryLabels[dataPointIndex];
  
          return `
            <div class="bg-base-200 p-3 rounded-lg shadow-lg border border-base-300">
              <div class="text-sm text-base-content/70 mb-2">${time}</div>
              <div class="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                <div class="text-base-content/70">Open</div>
                <div class="text-right font-mono">${formatPrice(o)}</div>
                <div class="text-base-content/70">High</div>
                <div class="text-right font-mono text-success">${formatPrice(h)}</div>
                <div class="text-base-content/70">Low</div>
                <div class="text-right font-mono text-error">${formatPrice(l)}</div>
                <div class="text-base-content/70">Close</div>
                <div class="text-right font-mono">${formatPrice(c)}</div>
                <div class="text-base-content/70 mt-2">Change</div>
                <div class="text-right font-mono ${
                  c >= o ? "text-success" : "text-error"
                } mt-2">
                  ${(((c - o) / o) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          `;
        }
      }
    }), [chartType, height]);
  
    
  
    // Effects
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
  
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
      };
    }, []);
  
    // Render
    return (
      <div 
        ref={containerRef} 
        className="w-full bg-base-100 rounded-lg shadow-xl relative"
      >
        {/* Chart Controls */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          {/* Left Section - Chart Type and Timeframe */}
          <div className="flex items-center space-x-4">
            {/* Chart Type Selector */}
            <div className="flex p-1 bg-base-200 rounded-lg">
              {chartTypes.map((type) => (
                <button
                  key={type.id}
                  className={`px-3 py-1.5 rounded-md flex items-center ${
                    chartType === type.id
                      ? "bg-base-100 text-primary shadow-sm"
                      : "text-base-content hover:bg-base-200"
                  }`}
                  onClick={() => setChartType(type.id)}
                >
                  {type.icon}
                  <span className="text-sm">{type.name}</span>
              </button>
            ))}
          </div>

          {/* Timeframe Selector */}
          <select
            className="select select-sm bg-base-200"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            {timeframeOptions.map((tf) => (
              <option key={tf} value={tf}>
                {tf}
              </option>
            ))}
          </select>
        </div>

        {/* Right Section - Chart Tools */}
        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <button
            className="btn btn-ghost btn-sm tooltip"
            data-tip="Zoom In"
            onClick={handleZoomIn}
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <button
            className="btn btn-ghost btn-sm tooltip"
            data-tip="Zoom Out"
            onClick={handleZoomOut}
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <button
            className="btn btn-ghost btn-sm tooltip"
            data-tip="Reset Chart"
            onClick={handleReset}
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          {/* Technical Indicators */}
          <div className="relative">
            <button
              className="btn btn-ghost btn-sm tooltip"
              data-tip="Technical Indicators"
              onClick={() => setShowIndicatorSettings(!showIndicatorSettings)}
            >
              <Settings className="w-5 h-5" />
            </button>

            {showIndicatorSettings && (
              <div className="absolute right-0 mt-2 p-4 bg-base-200 rounded-lg shadow-xl z-50 w-64">
                <h4 className="font-semibold mb-2">Add Indicators</h4>
                <div className="space-y-2">
                  {TECHNICAL_INDICATORS.map((indicator) => (
                    <div 
                      key={indicator.id} 
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{indicator.name}</span>
                        <p className="text-xs text-base-content/70">
                          {indicator.description}
                        </p>
                      </div>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => addIndicator(indicator)}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>

                {selectedIndicators.length > 0 && (
                  <>
                    <div className="divider my-2"></div>
                    <h4 className="font-semibold mb-2">Active Indicators</h4>
                    <div className="space-y-2">
                      {selectedIndicators.map((indicator) => (
                        <div 
                          key={indicator.id} 
                          className="flex justify-between items-center"
                        >
                          <div>
                            <span>{indicator.name}</span>
                            <select
                              className="select select-xs w-24 ml-2"
                              value={indicator.period}
                              onChange={(e) => 
                                updateIndicatorPeriod(
                                  indicator.id, 
                                  Number(e.target.value)
                                )
                              }
                            >
                              {indicator.periods.map((period) => (
                                <option key={period} value={period}>
                                  {period} Period
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => removeIndicator(indicator.id)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Drawing Tools */}
          <div className="relative">
            <button
              className={`btn btn-ghost btn-sm tooltip ${
                drawingMode ? "text-primary" : ""
              }`}
              data-tip="Drawing Tools"
              onClick={() => setShowDrawingTools(!showDrawingTools)}
            >
              <PenTool className="w-5 h-5" />
            </button>

            {showDrawingTools && (
              <div className="absolute right-0 mt-2 p-2 bg-base-200 rounded-lg shadow-xl z-50 w-48">
                {drawingTools.map((tool) => (
                  <button
                    key={tool.id}
                    className={`w-full flex items-center px-3 py-2 rounded-md ${
                      drawingMode === tool.id
                        ? "bg-primary text-primary-content"
                        : "text-base-content hover:bg-base-300"
                    }`}
                    onClick={() => {
                      setDrawingMode(
                        drawingMode === tool.id ? null : tool.id
                      );
                      setShowDrawingTools(false);
                    }}
                  >
                    {tool.icon}
                    <span className="ml-2 text-sm">{tool.label}</span>
                  </button>
                ))}
                {annotations.length > 0 && (
                  <>
                    <div className="border-t border-base-300 my-2"></div>
                    <button
                      className="w-full flex items-center px-3 py-2 rounded-md text-error hover:bg-base-300"
                      onClick={() => setAnnotations([])}
                    >
                      Clear All Drawings
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <button
            className="btn btn-ghost btn-sm tooltip"
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
          options={{
            ...chartOptions,
            // Additional dynamic configurations
            annotations: {
              xaxis: annotations
                .filter(a => ['vertical', 'trendline', 'rectangle'].includes(a.type))
                .map(a => ({
                  x: a.start.x,
                  x2: a.type === 'trendline' || a.type === 'rectangle' ? a.end.x : undefined,
                  borderColor: '#00ff00',
                  label: { text: a.type }
                })),
              yaxis: annotations
                .filter(a => ['horizontal', 'trendline', 'rectangle'].includes(a.type))
                .map(a => ({
                  y: a.start.y,
                  y2: a.type === 'trendline' || a.type === 'rectangle' ? a.end.y : undefined,
                  borderColor: '#ff0000',
                  label: { text: a.type }
                }))
            }
          }}
          series={[
            {
              name: symbol,
              type: chartType,
              data: generateChartData()
            },
            {
              name: 'Volume',
              type: 'column',
              data: generateChartData().map(item => ({
                x: item.x,
                y: item.volume
              }))
            }
          ]}
          height={height}
        />
      </div>

      {/* Market Information Overlay */}
      <div className="absolute bottom-4 left-4 bg-base-200/50 backdrop-blur-sm rounded-lg p-2 text-sm">
        <div className="flex space-x-4">
          <div>
            <span className="opacity-70 mr-2">Mark Price:</span>
            <span className="font-semibold">{formatPrice(marketData.markPrice)}</span>
          </div>
          <div>
            <span className="opacity-70 mr-2">24h Change:</span>
            <span className={`
              ${marketData.change24h.startsWith('+') 
                ? 'text-success' 
                : 'text-error'
              }`}
            >
              {marketData.change24h}
            </span>
          </div>
          <div>
            <span className="opacity-70 mr-2">Funding Rate:</span>
            <span>{marketData.fundingRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureTradingChart;