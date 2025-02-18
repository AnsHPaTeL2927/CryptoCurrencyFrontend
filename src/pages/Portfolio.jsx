import React, { useState } from "react";
import { Link } from "react-router-dom";

const PortfolioDashboard = () => {
  const [timeframe, setTimeframe] = useState("24h");
  const [activeView, setActiveView] = useState("portfolio");

  // Dummy portfolio data
  const portfolioMetrics = {
    totalValue: 156789.42,
    totalPnL: 12450.3,
    pnlPercentage: 8.62,
    totalInvested: 144339.12,
    availableBalance: 25000.0,
    roi: 21.5,
    dailyChange: 2.8,
    weeklyChange: 5.2,
    monthlyChange: 15.8,
    lastUpdated: new Date(),
    marketValue: {
      current: 156789.42,
      previous: 144339.12,
    },
    riskMetrics: {
      score: 65,
      volatility: 0.45,
      sharpeRatio: 2.1,
      maxDrawdown: -15.3,
    },
  };

  const assets = [
    {
      id: 1,
      symbol: "BTC",
      name: "Bitcoin",
      amount: 2.5,
      currentPrice: 48250.75,
      value: 120626.88,
      allocation: 76.93,
      pnl: 8540.25,
      pnlPercentage: 7.62,
      priceChange24h: 2.5,
      volume24h: 28500000000,
      high24h: 49100.0,
      low24h: 47200.0,
      marketCap: 925000000000,
      sparklineData: [47200, 47800, 48100, 48250, 48400, 48250],
    },
    {
      id: 2,
      symbol: "ETH",
      name: "Ethereum",
      amount: 15.8,
      currentPrice: 2250.42,
      value: 35556.64,
      allocation: 22.68,
      pnl: 3910.05,
      pnlPercentage: 12.35,
      priceChange24h: 3.8,
      volume24h: 15800000000,
      high24h: 2280.0,
      low24h: 2180.0,
      marketCap: 270000000000,
      sparklineData: [2180, 2210, 2240, 2250, 2270, 2250],
    },
    {
      id: 3,
      symbol: "BNB",
      name: "Binance Coin",
      amount: 28,
      currentPrice: 215.32,
      value: 6029.0,
      allocation: 3.84,
      pnl: -850.2,
      pnlPercentage: -12.33,
      priceChange24h: -2.1,
      volume24h: 980000000,
      high24h: 220.0,
      low24h: 212.0,
      marketCap: 33000000000,
      sparklineData: [220, 218, 215, 213, 214, 215],
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "buy",
      asset: "Bitcoin",
      symbol: "BTC",
      amount: 0.25,
      price: 48100.0,
      total: 12025.0,
      date: "2024-02-18T10:30:00Z",
      status: "completed",
      fee: 12.03,
    },
    {
      id: 2,
      type: "sell",
      asset: "Ethereum",
      symbol: "ETH",
      amount: 2.5,
      price: 2245.0,
      total: 5612.5,
      date: "2024-02-18T09:15:00Z",
      status: "completed",
      fee: 5.61,
    },
  ];

  const [showDropdown, setShowDropdown] = useState(false);

  const portfolioStats = {
    totalValue: 156789.42,
    dailyChange: 2.8,
    dailyPnL: 4350.25,
    monthlyChange: 15.8,
    monthlyPnL: 21450.75,
    availableBalance: 25000.0,
    roi: 21.5,
    marketStatus: "bullish",
    lastUpdated: new Date(),
    btcDominance: 45.2,
    marketCap: 2.1,
    volume24h: 125.4,
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Stats Bar */}
      <div className="bg-gradient-to-r from-base-100 to-base-200 shadow-xl border-b border-base-300">
      {/* Main Stats Grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Total Value Card */}
          <div className="col-span-3">
            <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-base-200/50 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col gap-2">
                <span className="text-base-content/70 text-sm font-medium">Total Portfolio Value</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">${portfolioStats.totalValue.toLocaleString()}</span>
                  <div className={`flex items-center ${portfolioStats.dailyChange >= 0 ? 'text-success' : 'text-error'}`}>
                    <span className="text-sm font-medium">
                      {portfolioStats.dailyChange >= 0 ? '↑' : '↓'} {Math.abs(portfolioStats.dailyChange)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="badge badge-ghost badge-sm">ROI {portfolioStats.roi}%</div>
                  <span className="text-xs text-base-content/60">24h change</span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily PnL Card */}
          <div className="col-span-3">
            <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-base-200/50 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col gap-2">
                <span className="text-base-content/70 text-sm font-medium">24h Profit/Loss</span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${portfolioStats.dailyPnL >= 0 ? 'text-success' : 'text-error'}`}>
                    {portfolioStats.dailyPnL >= 0 ? '+' : '-'}${Math.abs(portfolioStats.dailyPnL).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`badge badge-sm ${portfolioStats.dailyPnL >= 0 ? 'badge-success' : 'badge-error'} bg-opacity-20`}>
                    {portfolioStats.dailyPnL >= 0 ? 'Profit' : 'Loss'}
                  </div>
                  <span className="text-xs text-base-content/60">Updated live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Performance Card */}
          <div className="col-span-3">
            <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-base-200/50 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col gap-2">
                <span className="text-base-content/70 text-sm font-medium">30 Day Performance</span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${portfolioStats.monthlyChange >= 0 ? 'text-success' : 'text-error'}`}>
                    {portfolioStats.monthlyChange}%
                  </span>
                  <span className="text-sm font-medium text-base-content/70">
                    ${Math.abs(portfolioStats.monthlyPnL).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="badge badge-ghost badge-sm">Monthly trend</div>
                  <span className="text-xs text-base-content/60">30d analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="col-span-3">
            <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-base-200/50 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-base-content/70 text-sm font-medium">Quick Actions</span>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52">
                      <li><a>View Reports</a></li>
                      <li><a>Share Portfolio</a></li>
                      <li><a>Settings</a></li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-primary btn-sm flex-1 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Deposit
                  </button>
                  <button className="btn btn-outline btn-primary btn-sm flex-1 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div className="container mx-auto px-4 py-6">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-base-100 rounded-box shadow-lg p-4 mb-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="btn btn-primary w-full">Buy Crypto</button>
                <button className="btn btn-primary btn-outline w-full">
                  Sell Crypto
                </button>
                <div className="divider"></div>
                <button className="btn btn-ghost w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Portfolio Analysis
                </button>
                <button className="btn btn-ghost w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Transaction History
                </button>
                <button className="btn btn-ghost w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Security Settings
                </button>
              </div>
            </div>

            <div className="bg-base-100 rounded-box shadow-lg p-4">
              <h3 className="text-lg font-bold mb-4">Portfolio Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm opacity-70 mb-1">Risk Score</div>
                  <div className="flex items-center gap-2">
                    <div
                      className="radial-progress text-primary"
                      style={{ "--value": portfolioMetrics.riskMetrics.score }}
                    >
                      {portfolioMetrics.riskMetrics.score}
                    </div>
                    <div className="text-sm">Moderate Risk</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-70 mb-1">ROI</div>
                  <div className="text-lg font-semibold text-success">
                    +{portfolioMetrics.roi}%
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-70 mb-1">Sharpe Ratio</div>
                  <div className="text-lg font-semibold">
                    {portfolioMetrics.riskMetrics.sharpeRatio}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-70 mb-1">Max Drawdown</div>
                  <div className="text-lg font-semibold text-error">
                    {portfolioMetrics.riskMetrics.maxDrawdown}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-9">
            {/* Asset Overview */}
            <div className="bg-base-100 rounded-box shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Asset Overview</h2>
                <div className="flex gap-2">
                  {["24h", "7d", "30d", "90d", "1y"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeframe(period)}
                      className={`btn btn-sm ${
                        timeframe === period ? "btn-primary" : "btn-ghost"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Price</th>
                      <th>24h Change</th>
                      <th>Holdings</th>
                      <th>Value</th>
                      <th>Allocation</th>
                      <th>P/L</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.id} className="hover">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content rounded-full w-8">
                                <span className="text-xs">{asset.symbol}</span>
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{asset.name}</div>
                              <div className="text-sm opacity-50">
                                {asset.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-semibold">
                            ${asset.currentPrice.toLocaleString()}
                          </div>
                          <div
                            className={`text-xs ${
                              asset.priceChange24h >= 0
                                ? "text-success"
                                : "text-error"
                            }`}
                          >
                            {asset.priceChange24h >= 0 ? "+" : ""}
                            {asset.priceChange24h}%
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span
                              className={`${
                                asset.priceChange24h >= 0
                                  ? "text-success"
                                  : "text-error"
                              }`}
                            >
                              {asset.priceChange24h >= 0 ? "↑" : "↓"}
                              {Math.abs(asset.priceChange24h)}%
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="font-semibold">
                            {asset.amount} {asset.symbol}
                          </div>
                          <div className="text-sm opacity-50">
                            $
                            {(
                              asset.amount * asset.currentPrice
                            ).toLocaleString()}
                          </div>
                        </td>
                        <td>${asset.value.toLocaleString()}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <progress
                              className="progress progress-primary w-20"
                              value={asset.allocation}
                              max="100"
                            ></progress>
                            <span>{asset.allocation.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td>
                          <div
                            className={`font-semibold ${
                              asset.pnl >= 0 ? "text-success" : "text-error"
                            }`}
                          >
                            ${Math.abs(asset.pnl).toLocaleString()}
                          </div>
                          <div
                            className={`text-xs ${
                              asset.pnlPercentage >= 0
                                ? "text-success"
                                : "text-error"
                            }`}
                          >
                            {asset.pnlPercentage >= 0 ? "+" : ""}
                            {asset.pnlPercentage}%
                          </div>
                        </td>
                        <td>
                          <div className="dropdown dropdown-end">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-ghost btn-xs"
                            >
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
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110
                                -2 1 1 0 110-2z"
                                />
                              </svg>
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <a className="text-primary">Trade</a>
                              </li>
                              <li>
                                <a>View History</a>
                              </li>
                              <li>
                                <a>Set Alert</a>
                              </li>
                              <li>
                                <a className="text-error">Hide Asset</a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Transactions & Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Recent Transactions */}
              <div className="bg-base-100 rounded-box shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Recent Transactions</h2>
                  <button className="btn btn-ghost btn-sm">View All</button>
                </div>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "buy"
                              ? "bg-success/20 text-success"
                              : "bg-error/20 text-error"
                          }`}
                        >
                          {transaction.type === "buy" ? (
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
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                          ) : (
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
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {transaction.type === "buy" ? "Bought" : "Sold"}{" "}
                            {transaction.amount} {transaction.symbol}
                          </div>
                          <div className="text-sm opacity-70">
                            {new Date(transaction.date).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${transaction.total.toLocaleString()}
                        </div>
                        <div className="text-sm opacity-70">
                          Fee: ${transaction.fee}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-base-100 rounded-box shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="stat bg-base-200 rounded-box p-4">
                    <div className="stat-title">Total Investment</div>
                    <div className="stat-value text-lg">
                      ${portfolioMetrics.totalInvested.toLocaleString()}
                    </div>
                    <div className="stat-desc">Initial investment amount</div>
                  </div>
                  <div className="stat bg-base-200 rounded-box p-4">
                    <div className="stat-title">Available Balance</div>
                    <div className="stat-value text-lg">
                      ${portfolioMetrics.availableBalance.toLocaleString()}
                    </div>
                    <div className="stat-desc">Ready to invest</div>
                  </div>
                  <div className="stat bg-base-200 rounded-box p-4">
                    <div className="stat-title">Total Return</div>
                    <div className="stat-value text-lg text-success">
                      +${portfolioMetrics.totalPnL.toLocaleString()}
                    </div>
                    <div className="stat-desc text-success">
                      +{portfolioMetrics.pnlPercentage}%
                    </div>
                  </div>
                  <div className="stat bg-base-200 rounded-box p-4">
                    <div className="stat-title">Daily Change</div>
                    <div
                      className={`stat-value text-lg ${
                        portfolioMetrics.dailyChange >= 0
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      {portfolioMetrics.dailyChange >= 0 ? "+" : ""}
                      {portfolioMetrics.dailyChange}%
                    </div>
                    <div className="stat-desc">Last 24 hours</div>
                  </div>
                </div>

                {/* Period Changes */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Period Performance</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">24h Change</span>
                        <span
                          className={`text-sm ${
                            portfolioMetrics.dailyChange >= 0
                              ? "text-success"
                              : "text-error"
                          }`}
                        >
                          {portfolioMetrics.dailyChange >= 0 ? "+" : ""}
                          {portfolioMetrics.dailyChange}%
                        </span>
                      </div>
                      <progress
                        className={`progress w-full ${
                          portfolioMetrics.dailyChange >= 0
                            ? "progress-success"
                            : "progress-error"
                        }`}
                        value={Math.abs(portfolioMetrics.dailyChange)}
                        max="100"
                      ></progress>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Weekly Change</span>
                        <span
                          className={`text-sm ${
                            portfolioMetrics.weeklyChange >= 0
                              ? "text-success"
                              : "text-error"
                          }`}
                        >
                          {portfolioMetrics.weeklyChange >= 0 ? "+" : ""}
                          {portfolioMetrics.weeklyChange}%
                        </span>
                      </div>
                      <progress
                        className={`progress w-full ${
                          portfolioMetrics.weeklyChange >= 0
                            ? "progress-success"
                            : "progress-error"
                        }`}
                        value={Math.abs(portfolioMetrics.weeklyChange)}
                        max="100"
                      ></progress>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Monthly Change</span>
                        <span
                          className={`text-sm ${
                            portfolioMetrics.monthlyChange >= 0
                              ? "text-success"
                              : "text-error"
                          }`}
                        >
                          {portfolioMetrics.monthlyChange >= 0 ? "+" : ""}
                          {portfolioMetrics.monthlyChange}%
                        </span>
                      </div>
                      <progress
                        className={`progress w-full ${
                          portfolioMetrics.monthlyChange >= 0
                            ? "progress-success"
                            : "progress-error"
                        }`}
                        value={Math.abs(portfolioMetrics.monthlyChange)}
                        max="100"
                      ></progress>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="bg-base-100 rounded-box shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Active Alerts</h2>
                <button className="btn btn-primary btn-sm">
                  Set New Alert
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="alert alert-warning shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold">BTC Price Alert</h3>
                    <div className="text-sm">
                      Alert when BTC price reaches $50,000
                    </div>
                  </div>
                  <button className="btn btn-sm">Edit</button>
                </div>
                <div className="alert alert-info shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-bold">Portfolio Alert</h3>
                    <div className="text-sm">Alert on 5% daily change</div>
                  </div>
                  <button className="btn btn-sm">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
