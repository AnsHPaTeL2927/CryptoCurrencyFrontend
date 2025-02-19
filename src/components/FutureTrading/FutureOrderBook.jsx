import React, { useState } from 'react';

const FuturesOrderBook = () => {
  const [depth, setDepth] = useState(10);
  const [selectedPair, setSelectedPair] = useState('BTC-USDT');

  // Sample futures trading pairs
  const futuresPairs = [
    { symbol: 'BTC-USDT', name: 'Bitcoin Perpetual', leverage: '200x' },
    { symbol: 'ETH-USDT', name: 'Ethereum Perpetual', leverage: '200x' },
    { symbol: 'SOL-USDT', name: 'Solana Perpetual', leverage: '100x' },
    { symbol: 'XRP-USDT', name: 'Ripple Perpetual', leverage: '100x' }
  ];

  // Generate mock order book data
  const generateOrderBook = (basePrice) => {
    return {
      asks: Array(depth).fill().map((_, i) => ({
        price: (basePrice + i * 10).toFixed(2),
        amount: (Math.random() * 100).toFixed(3),
        total: ((basePrice + i * 10) * (Math.random() * 100)).toFixed(2)
      })),
      bids: Array(depth).fill().map((_, i) => ({
        price: (basePrice - i * 10).toFixed(2),
        amount: (Math.random() * 100).toFixed(3),
        total: ((basePrice - i * 10) * (Math.random() * 100)).toFixed(2)
      })),
      spread: 0.05
    };
  };

  // Generate order book based on selected pair
  const orderBook = generateOrderBook(97198.50);

  return (
    <div className="w-full">
      {/* Header with Trading Pair Selection */}
      <div className="flex justify-between items-center mb-4">
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-sm m-1">
            {selectedPair} 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 ml-1 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </label>
          <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 max-h-96 overflow-y-auto">
            {futuresPairs.map((pair) => (
              <div 
                key={pair.symbol}
                className="p-2 hover:bg-base-300 cursor-pointer rounded-lg"
                onClick={() => setSelectedPair(pair.symbol)}
              >
                <div className="font-medium">{pair.symbol}</div>
                <div className="text-xs opacity-70">{pair.name}</div>
                <div className="text-xs text-primary">{pair.leverage}</div>
              </div>
            ))}
          </div>
        </div>

        <select 
          className="select select-bordered select-sm w-24"
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Order Book Table */}
      <div className="h-[400px] overflow-y-auto">
        <table className="table table-compact w-full">
          <thead className="sticky top-0 bg-base-100">
            <tr>
              <th>Price (USDT)</th>
              <th>Size (Contracts)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="text-error">
            {orderBook.asks.slice(0).reverse().map((ask, index) => (
              <tr key={`ask-${index}`} className="hover">
                <td className="text-error">{ask.price}</td>
                <td>{ask.amount}</td>
                <td>{ask.total}</td>
              </tr>
            ))}
          </tbody>
          {/* Spread */}
          <tr className="bg-base-200">
            <td colSpan={3} className="text-center text-sm py-1">
              Spread: {orderBook.spread}%
            </td>
          </tr>
          <tbody className="text-success">
            {orderBook.bids.map((bid, index) => (
              <tr key={`bid-${index}`} className="hover">
                <td className="text-success">{bid.price}</td>
                <td>{bid.amount}</td>
                <td>{bid.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuturesOrderBook;