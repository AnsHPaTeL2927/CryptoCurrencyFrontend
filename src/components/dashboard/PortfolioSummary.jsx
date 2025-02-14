/* eslint-disable react/prop-types */
// components/dashboard/PortfolioSummary.jsx
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AnimatePulseBedge from "../common/AnimatePulseBedge";

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioSummary = ({
  totalValue = 125750.25,
  dailyChange = 2.5,
  assets = [],
}) => {
  const allocationData = {
    labels: ["Bitcoin", "Ethereum", "BNB", "Others"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
    cutout: "75%",
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  const totalValueFormatted = totalValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-100 shadow-xl"
    >
      <div className="card-body p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="card-title text-lg">Portfolio Summary</h2>
          <button className="btn btn-ghost btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Portfolio Value */}
          <div className="bg-base-200 rounded-xl p-4">
            <p className="text-sm opacity-70 mb-1">Total Value</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{totalValueFormatted}</h3>
              <span
                className={`text-sm font-medium ${
                  dailyChange >= 0 ? "text-success" : "text-error"
                }`}
              >
                {dailyChange >= 0 ? "+" : ""}
                {dailyChange}%
              </span>
            </div>
          </div>

          {/* Asset Allocation */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Asset Allocation</h3>
              <AnimatePulseBedge text="4 Assets" className="badge-outline"/>
            </div>

            <div className="relative">
              <div className="w-48 h-48 mx-auto">
                <Doughnut data={allocationData} options={options} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs opacity-70">Total</p>
                  <p className="text-xl font-bold">$125.7K</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {allocationData.labels.map((label, index) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        allocationData.datasets[0].backgroundColor[index],
                    }}
                  ></div>
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs opacity-70">
                      {allocationData.datasets[0].data[index]}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            {" "}
            {/* Reduced space-y */}
            <h3 className="font-semibold text-sm">Quick Actions</h3>
            <div className="flex gap-2">
              {" "}
              {/* Changed to flex from grid */}
              <button className="btn btn-primary btn-sm flex-1 h-10">
                {" "}
                {/* Added flex-1 and h-10 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add
              </button>
              <button className="btn btn-outline btn-sm flex-1 h-10">
                {" "}
                {/* Added flex-1 and h-10 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioSummary;
