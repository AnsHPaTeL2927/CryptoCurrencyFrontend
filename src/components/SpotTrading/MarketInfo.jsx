import React, { useState } from 'react';

const MarketInfo = () => {
  const [selectedPair, setSelectedPair] = useState({
    symbol: 'BTCUSD',
    name: 'Bitcoin Perpetual',
    price: '97198.5',
    change: '-0.12',
    volume: '291.1M',
    leverage: '200x'
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample watchlist data
  const watchlist = [
    {
      symbol: 'ETHUSD',
      name: 'Ethereum Perpetual',
      price: '2693.6',
      change: '-0.13',
      volume: '173.92M',
      leverage: '200x'
    },
    {
      symbol: 'BTCUSD',
      name: 'Bitcoin Perpetual',
      price: '97207.5',
      change: '-0.12',
      volume: '291.13M',
      leverage: '200x'
    },
    {
      symbol: 'SOLUSD',
      name: 'Solana Perpetual',
      price: '192.68',
      change: '-1.62',
      volume: '82.86M',
      leverage: '100x'
    },
    {
      symbol: 'XRPUSD',
      name: 'Ripple Perpetual',
      price: '2.759',
      change: '-0.17',
      volume: '60.07M',
      leverage: '100x'
    },
    {
      symbol: 'DOGEUSD',
      name: 'Dogecoin Perpetual',
      price: '0.26925',
      change: '-2.18',
      volume: '14.33M',
      leverage: '100x'
    }
  ];

  const marketData = {
    fundingRate: '0.0061%',
    estNextFunding: '0.0029%',
    nextFundingIn: '00h:00m:26s',
    h24High: '$97900.0',
    h24Low: '$97136.0'
  };

  return (
    <div className="relative">
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body p-4">
          <div className="flex flex-wrap gap-4 lg:gap-8 items-start">
            {/* Symbol Selector */}
            <div className="relative">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-warning text-2xl">★</span>
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {selectedPair.symbol}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </h2>
                  <span className="text-sm opacity-70">{selectedPair.name}</span>
                </div>
              </div>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-base-200 rounded-lg shadow-xl w-80 z-50">
                  <div className="p-2 bg-base-100 rounded-t-lg border-b border-base-300">
                    <input 
                      type="text" 
                      placeholder="Search" 
                      className="input input-bordered input-sm w-full bg-base-200"
                    />
                  </div>
                  
                  <div className="bg-base-100 border-b border-base-300">
                    <div className="tabs w-full">
                      <a className="tab flex-1 tab-bordered tab-active">Watchlist</a>
                      <a className="tab flex-1 tab-bordered">Futures</a>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto bg-base-100">
                    <table className="table table-compact w-full">
                      <thead className="sticky top-0 bg-base-100 z-10">
                        <tr className="bg-base-100">
                          <th className="bg-base-100">Name</th>
                          <th className="bg-base-100">Last Price</th>
                          <th className="bg-base-100">24h Chg.</th>
                          <th className="bg-base-100">24h Vol.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {watchlist.map((pair) => (
                          <tr 
                            key={pair.symbol}
                            className="hover cursor-pointer"
                            onClick={() => {
                              setSelectedPair(pair);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <td className="bg-base-100">
                              <div className="flex items-center gap-2">
                                <span className="text-warning">★</span>
                                <div>
                                  <div className="font-medium">{pair.symbol}</div>
                                  <div className="text-xs opacity-70">{pair.name}</div>
                                  <div className="badge badge-sm">{pair.leverage}</div>
                                </div>
                              </div>
                            </td>
                            <td className="bg-base-100">${pair.price}</td>
                            <td className={`bg-base-100 ${Number(pair.change) >= 0 ? 'text-success' : 'text-error'}`}>
                              {pair.change}%
                            </td>
                            <td className="bg-base-100">${pair.volume}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Price and Change */}
            <div className="flex items-center gap-4">
              <div className="text-xl font-semibold">${selectedPair.price}</div>
              <span className={`text-sm ${
                Number(selectedPair.change) >= 0 ? 'text-success' : 'text-error'
              }`}>
                {selectedPair.change}%
              </span>
            </div>

            {/* Market Stats */}
            <div className="flex flex-wrap gap-4 lg:gap-8 ml-auto text-sm">
              <div className="flex flex-col">
                <span className="opacity-70">Funding</span>
                <span>{marketData.fundingRate}</span>
              </div>
              <div className="flex flex-col">
                <span className="opacity-70">Est. Next Funding</span>
                <span>{marketData.estNextFunding}</span>
              </div>
              <div className="flex flex-col">
                <span className="opacity-70">Next Funding In</span>
                <span>{marketData.nextFundingIn}</span>
              </div>
              <div className="flex flex-col">
                <span className="opacity-70">24h High</span>
                <span>{marketData.h24High}</span>
              </div>
              <div className="flex flex-col">
                <span className="opacity-70">24h Low</span>
                <span>{marketData.h24Low}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MarketInfo;