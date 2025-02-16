import React, { useState } from "react";

const TradeForm = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [orderType, setOrderType] = useState("limit");
  const [leverage, setLeverage] = useState("1");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [stopType, setStopType] = useState("none");

  const percentageOptions = [10, 25, 50, 75, 100];

  return (
    <div className="w-full">
      {/* Main Tabs */}
      <div className="flex mb-2 bg-base-200 p-1 rounded-lg">
        <button
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 
            ${
              activeTab === "buy"
                ? "bg-base-100 text-success shadow-md"
                : "hover:bg-base-100/50"
            }`}
          onClick={() => setActiveTab("buy")}
        >
          Buy/Long
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              activeTab === "sell"
                ? "bg-base-100 text-error shadow-md"
                : "hover:bg-base-100/50"
            }`}
          onClick={() => setActiveTab("sell")}
        >
          Sell/Short
        </button>
      </div>

      {/* Trade Settings */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-base-200 rounded-lg p-1">
          {["limit", "market", "stop"].map((type) => (
            <button
              key={type}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-all
                ${
                  orderType === type
                    ? "bg-base-100 shadow-sm"
                    : "hover:bg-base-100/50"
                }`}
              onClick={() => setOrderType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <select
          className="select select-sm bg-base-200 border-0 font-medium min-h-0 h-9"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
        >
          {[1, 2, 5, 10, 20, 50, 100].map((x) => (
            <option key={x} value={x}>
              {x}×
            </option>
          ))}
        </select>
      </div>

      <form className="space-y-4">
        {/* Price Input */}
        {orderType !== "market" && (
          <div className="bg-base-200 rounded-lg p-3">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-medium">Price</span>
              <span className="text-xs text-primary">
                Best {activeTab === "buy" ? "Ask" : "Bid"}: 97,269.5
              </span>
            </div>
            <div className="relative">
              <label className="input input-bordered flex items-center gap-2">
                USD
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter Amount"
                />
              </label>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="bg-base-200 rounded-lg p-3">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs font-medium">Amount</span>
            <span className="text-xs">1 Lot = 0.001 BTC</span>
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="Enter amount"
              className="input input-sm w-full bg-base-100 border-0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium">
              BTC
            </div>
          </div>
          {/* Percentage Buttons */}
          <div className="grid grid-cols-5 gap-2 mt-2">
            {percentageOptions.map((percent) => (
              <button
                key={percent}
                type="button"
                className={`py-1 rounded text-xs font-medium transition-all
                  ${
                    amount === ((100000 * percent) / 100).toString()
                      ? "bg-base-content text-base-100"
                      : "bg-base-100 hover:bg-base-content hover:text-base-100"
                  }`}
                onClick={() => setAmount(((100000 * percent) / 100).toString())}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Trade Options */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-base-200 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">TP/SL</span>
              <input
                type="checkbox"
                className="toggle toggle-xs toggle-success"
                checked={stopType === "tpsl"}
                onChange={(e) =>
                  setStopType(e.target.checked ? "tpsl" : "none")
                }
              />
            </div>
          </div>
          <div className="bg-base-200 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">Bracket</span>
              <input
                type="checkbox"
                className="toggle toggle-xs toggle-success"
                checked={stopType === "bracket"}
                onChange={(e) =>
                  setStopType(e.target.checked ? "bracket" : "none")
                }
              />
            </div>
          </div>
        </div>

        {/* Available Margin */}
        <div className="bg-base-200 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Available Margin</span>
            <span className="font-medium">0.47 USD</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-4 rounded-lg font-medium transition-all
            ${
              activeTab === "buy"
                ? "bg-success text-success-content hover:brightness-110"
                : "bg-error text-error-content hover:brightness-110"
            }`}
        >
          {activeTab === "buy" ? "Buy/Long" : "Sell/Short"} BTC
        </button>

        {/* Additional Options */}
        <div className="flex items-center justify-between text-sm pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-xs" />
            <span>Reduce Only</span>
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              className="hover:text-primary transition-colors"
            >
              Calculator
            </button>
            <button
              type="button"
              className="hover:text-primary transition-colors"
            >
              Fees
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TradeForm;
