// components/portfolio/Analytics/ROIAnalysis.jsx
import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ROIAnalysis = ({ data }) => {
  const chartRef = useRef(null);

  // Cleanup function to destroy chart instance
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: (context) => `${context.raw}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.1)',
        },
        ticks: {
          callback: (value) => `${value}%`
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const chartData = {
    labels: ['1d', '7d', '30d', '90d', '180d', '1y'],
    datasets: [
      {
        label: 'ROI',
        data: [2.5, 5.8, 15.2, 22.4, 35.6, 42.1],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Return on Investment</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-sm opacity-70">24h ROI</p>
            <p className="text-xl font-bold text-success">+2.5%</p>
          </div>
          <div>
            <p className="text-sm opacity-70">7d ROI</p>
            <p className="text-xl font-bold text-success">+5.8%</p>
          </div>
          <div>
            <p className="text-sm opacity-70">30d ROI</p>
            <p className="text-xl font-bold text-success">+15.2%</p>
          </div>
        </div>
        <div className="h-64">
          <Line ref={chartRef} options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default ROIAnalysis;