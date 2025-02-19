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
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-2 sm:p-4">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 items-start">
            {/* Symbol Selector - Full width on mobile */}
            <div className="relative col-span-1 sm:col-span-2 lg:w-auto">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-warning text-xl sm:text-2xl">★</span>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
                    {selectedPair.symbol}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </h2>
                  <span className="text-xs sm:text-sm opacity-70">{selectedPair.name}</span>
                </div>
              </div>

              {/* Dropdown - Full screen on mobile */}
              {isDropdownOpen && (
                <div className="fixed sm:absolute inset-0 sm:inset-auto sm:top-full sm:left-0 mt-2 bg-base-200 sm:rounded-lg shadow-xl z-50 sm:w-80">
                  <div className="p-2 bg-base-100 sm:rounded-t-lg border-b border-base-300">
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

                  <div className="max-h-[80vh] sm:max-h-96 overflow-y-auto bg-base-100">
                    <table className="table table-compact w-full">
                      <thead className="sticky top-0 bg-base-100 z-10">
                        <tr className="bg-base-100">
                          <th className="bg-base-100">Name</th>
                          <th className="bg-base-100">Last Price</th>
                          <th className="bg-base-100">24h Chg.</th>
                          <th className="bg-base-100 hidden sm:table-cell">24h Vol.</th>
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
                            <td className="bg-base-100 hidden sm:table-cell">${pair.volume}</td>
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
              <div className="text-base sm:text-xl font-semibold">${selectedPair.price}</div>
              <span className={`text-sm ${
                Number(selectedPair.change) >= 0 ? 'text-success' : 'text-error'
              }`}>
                {selectedPair.change}%
              </span>
            </div>

            {/* Market Stats - Scrollable container on mobile */}
            <div className="col-span-1 sm:col-span-2 lg:ml-auto">
              <div className="overflow-x-auto">
                <div className="flex gap-4 lg:gap-8 min-w-max lg:min-w-0 pb-2 lg:pb-0">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm opacity-70">Funding</span>
                    <span className="text-xs sm:text-sm">{marketData.fundingRate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm opacity-70">Est. Next Funding</span>
                    <span className="text-xs sm:text-sm">{marketData.estNextFunding}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm opacity-70">Next Funding In</span>
                    <span className="text-xs sm:text-sm">{marketData.nextFundingIn}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm opacity-70">24h High</span>
                    <span className="text-xs sm:text-sm">{marketData.h24High}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm opacity-70">24h Low</span>
                    <span className="text-xs sm:text-sm">{marketData.h24Low}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MarketInfo;