import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  VolumeDistribution,
  PriceCorrelation,
  OptionsChain,
} from "./MarketOverview/MarketAnalytics";

const MarketOverview = () => {
  const [activeTab, setActiveTab] = useState("watchlist");
  const [timeframe, setTimeframe] = useState("24h");

  // Your existing watchlist data
  const watchlistData = [
    {
      symbol: "BTC/USDT",
      name: "Bitcoin",
      price: 48250.23,
      change24h: 2.5,
      volume: "1.2B",
      marketCap: "934.5B",
      lastUpdated: new Date(),
      priceHistory: Array(24)
        .fill(0)
        .map(() => 45000 + Math.random() * 5000),
    },
    // ... your existing watchlist data
  ];

  const renderAnalytics = () => (
    <div className="space-y-6 h-[calc(100vh-300px)] overflow-y-auto pr-4">
      <div className="grid grid-cols-1 gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Volume Distribution by Exchange</h3>
            <VolumeDistribution />
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Price Correlation Analysis</h3>
            <PriceCorrelation />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOptions = () => (
    <div className="h-[calc(100vh-300px)] overflow-y-auto pr-4">
      <OptionsChain />
    </div>
  );

  const renderFutures = () => (
    <div className="space-y-6">
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Futures Overview</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Contract</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Volume</th>
                  <th>Open Interest</th>
                  <th>Funding Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    contract: "BTC-PERP",
                    price: 42000,
                    change24h: 2.5,
                    volume: "1.2B",
                    openInterest: "500M",
                    fundingRate: "0.01%",
                  },
                  {
                    contract: "ETH-PERP",
                    price: 2800,
                    change24h: -1.2,
                    volume: "800M",
                    openInterest: "300M",
                    fundingRate: "0.02%",
                  },
                ].map((row) => (
                  <tr key={row.contract}>
                    <td>{row.contract}</td>
                    <td>${row.price.toLocaleString()}</td>
                    <td
                      className={
                        row.change24h >= 0 ? "text-success" : "text-error"
                      }
                    >
                      {row.change24h}%
                    </td>
                    <td>{row.volume}</td>
                    <td>{row.openInterest}</td>
                    <td>{row.fundingRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Header section - your existing code */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* ... existing header code ... */}
        </div>

        {/* Tab Navigation */}
        <div className="tabs tabs-boxed mb-6">
          <button
            className={`tab ${activeTab === "watchlist" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("watchlist")}
          >
            Watchlist
          </button>
          <button
            className={`tab ${activeTab === "analytics" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={`tab ${activeTab === "options" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("options")}
          >
            Options
          </button>
          <button
            className={`tab ${activeTab === "futures" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("futures")}
          >
            Futures
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "watchlist" && (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>24h Volume</th>
                  <th>Market Cap</th>
                  <th>Chart (24h)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {watchlistData.map((asset) => (
                  <tr key={asset.symbol} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full">
                            <img
                              src={`/api/placeholder/32/32`}
                              alt={asset.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{asset.symbol}</div>
                          <div className="text-sm opacity-70">{asset.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono font-medium">
                      ${asset.price.toLocaleString()}
                    </td>
                    <td>
                      <div
                        className={`badge ${
                          asset.change24h >= 0 ? "badge-success" : "badge-error"
                        }`}
                      >
                        {asset.change24h >= 0 ? "+" : ""}
                        {asset.change24h}%
                      </div>
                    </td>
                    <td>${asset.volume}</td>
                    <td>${asset.marketCap}</td>
                    <td className="w-32">
                      <div className="h-10">
                        <Line
                          data={{
                            labels: Array(24).fill(""),
                            datasets: [
                              {
                                data: asset.priceHistory,
                                borderColor:
                                  asset.change24h >= 0
                                    ? "rgb(34, 197, 94)"
                                    : "rgb(239, 68, 68)",
                                backgroundColor:
                                  asset.change24h >= 0
                                    ? "rgba(34, 197, 94, 0.1)"
                                    : "rgba(239, 68, 68, 0.1)",
                                fill: true,
                                tension: 0.4,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                              x: { display: false },
                              y: { display: false },
                            },
                            elements: {
                              point: { radius: 0 },
                            },
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-primary">
                          Trade
                        </button>
                        <button className="btn btn-sm btn-ghost">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "analytics" && renderAnalytics()}
        {activeTab === "options" && renderOptions()}
        {activeTab === "futures" && renderFutures()}
      </div>
    </div>
  );
};

export default MarketOverview;
