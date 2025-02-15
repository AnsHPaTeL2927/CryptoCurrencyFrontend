/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AnimatePulseBedge from "../common/AnimatePulseBedge";
const LiveTradesFeed = ({ theme }) => {
  const [trades, setTrades] = useState([
    {
      id: 1,
      pair: "BTC/USDT",
      price: 42567.89,
      type: "buy",
      time: "2024-02-12T10:30:00Z",
    },
    {
      id: 2,
      pair: "ETH/USDT",
      price: 2456.78,
      type: "sell",
      time: "2024-02-12T10:29:00Z",
    },
    {
      id: 3,
      pair: "BNB/USDT",
      price: 321.45,
      type: "buy",
      time: "2024-02-12T10:28:00Z",
    },
  ]);

  useEffect(() => {
    // Simulate real-time trade updates
    const interval = setInterval(() => {
      const newTrade = {
        id: Date.now(),
        pair: ["BTC/USDT", "ETH/USDT", "BNB/USDT"][
          Math.floor(Math.random() * 3)
        ],
        price: Math.random() * 50000,
        type: Math.random() > 0.5 ? "buy" : "sell",
        time: new Date().toISOString(),
      };
      setTrades((prev) => [newTrade, ...prev.slice(0, 2)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-lg">Live Trades</h2>
          <AnimatePulseBedge theme={theme} color="error" />
        </div>
        <div className="space-y-4">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-2 bg-base-200 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    trade.type === "buy" ? "bg-success" : "bg-error"
                  }`}
                ></div>
                <span className="font-mono">{trade.pair}</span>
              </div>
              <div className="text-right">
                <div
                  className={`font-mono ${
                    trade.type === "buy" ? "text-success" : "text-error"
                  }`}
                >
                  $
                  {trade.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-xs opacity-60">
                  {new Date(trade.time).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTradesFeed;
