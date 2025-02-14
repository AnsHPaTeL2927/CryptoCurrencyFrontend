import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MarketTrends = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('marketCap');

  // Sample data - would come from API in real implementation
  const chartData = {
    marketCap: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      values: [1.82, 1.85, 1.87, 1.84, 1.86, 1.89]
    },
    volume: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      values: [92.1, 94.3, 95.8, 93.2, 96.5, 98.2]
    },
    dominance: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      values: [47.5, 47.8, 48.1, 47.9, 48.0, 48.2]
    }
  };

  const timeframes = [
    { label: '24h', value: '24h' },
    { label: '7d', value: '7d' },
    { label: '30d', value: '30d' },
    { label: '90d', value: '90d' }
  ];

  const metrics = [
    { label: 'Market Cap', value: 'marketCap' },
    { label: '24h Volume', value: 'volume' },
    { label: 'BTC Dominance', value: 'dominance' }
  ];

  const getMetricValue = (value, type) => {
    switch (type) {
      case 'marketCap':
        return `$${value}T`;
      case 'volume':
        return `$${value}B`;
      case 'dominance':
        return `${value}%`;
      default:
        return value;
    }
  };

  const getGradient = (ctx) => {
    if (!ctx) return null;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.5)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
    return gradient;
  };

  const data = {
    labels: chartData[selectedMetric].labels,
    datasets: [
      {
        label: metrics.find(m => m.value === selectedMetric)?.label,
        data: chartData[selectedMetric].values,
        borderColor: 'rgb(56, 189, 248)',
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          return getGradient(ctx);
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(56, 189, 248)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: (value) => getMetricValue(value, selectedMetric),
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgb(30, 41, 59)',
        titleColor: 'rgb(226, 232, 240)',
        bodyColor: 'rgb(226, 232, 240)',
        padding: 12,
        borderColor: 'rgb(51, 65, 85)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return getMetricValue(context.raw, selectedMetric);
          }
        }
      }
    }
  };

  const calculateChange = (values) => {
    const first = values[0];
    const last = values[values.length - 1];
    return ((last - first) / first) * 100;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="card-title">Market Trends</h2>
          
          <div className="flex flex-wrap gap-2">
            <div className="join">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  className={`join-item btn btn-sm ${
                    selectedTimeframe === tf.value ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setSelectedTimeframe(tf.value)}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            <select 
              className="select select-sm select-bordered"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              {metrics.map((metric) => (
                <option key={metric.value} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <Line data={data} options={options} />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {metrics.map((metric) => {
            const values = chartData[metric.value].values;
            const currentValue = values[values.length - 1];
            const change = calculateChange(values);

            return (
              <div key={metric.value} className="stat bg-base-200 rounded-box p-4">
                <div className="stat-title">{metric.label}</div>
                <div className="stat-value text-lg">
                  {getMetricValue(currentValue, metric.value)}
                </div>
                <div className={`stat-desc ${change >= 0 ? 'text-success' : 'text-error'}`}>
                  {change >= 0 ? '↗︎' : '↘︎'} {Math.abs(change).toFixed(2)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;