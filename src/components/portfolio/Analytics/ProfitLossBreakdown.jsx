// components/portfolio/Analytics/ProfitLossBreakdown.jsx
import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfitLossBreakdown = ({ data }) => {
  const chartRef = useRef(null);

  // Cleanup function to destroy chart instance
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
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
          label: (context) => `$${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.1)',
        },
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Sample data - replace with actual data from props
  const chartData = {
    labels: ['BTC', 'ETH', 'BNB', 'SOL', 'ADA'],
    datasets: [
      {
        data: [5000, 3000, -1000, 2000, -500],
        backgroundColor: (context) => {
          const value = context.raw;
          return value >= 0 ? 'rgba(72, 187, 120, 0.7)' : 'rgba(245, 101, 101, 0.7)';
        },
        borderColor: (context) => {
          const value = context.raw;
          return value >= 0 ? 'rgb(72, 187, 120)' : 'rgb(245, 101, 101)';
        },
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Profit/Loss Breakdown</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm opacity-70">Total Profit</p>
            <p className="text-xl font-bold text-success">$10,000</p>
          </div>
          <div>
            <p className="text-sm opacity-70">Total Loss</p>
            <p className="text-xl font-bold text-error">-$1,500</p>
          </div>
        </div>
        <div className="h-64">
          <Bar options={options} data={chartData} />
        </div>
        <div className="mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Realized P/L</th>
                <th>Unrealized P/L</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BTC</td>
                <td className="text-success">+$3,000</td>
                <td className="text-success">+$2,000</td>
              </tr>
              <tr>
                <td>ETH</td>
                <td className="text-success">+$2,000</td>
                <td className="text-success">+$1,000</td>
              </tr>
              <tr>
                <td>BNB</td>
                <td className="text-error">-$500</td>
                <td className="text-error">-$500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossBreakdown;