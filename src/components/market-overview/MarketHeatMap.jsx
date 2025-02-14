import { useState } from 'react';

const MarketHeatmap = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [view, setView] = useState('marketCap');

  // Sample data - would come from API
  const sectors = [
    {
      name: 'Layer 1',
      marketCap: '1.2T',
      change: 2.5,
      assets: [
        { name: 'Bitcoin', symbol: 'BTC', marketCap: '945B', change: 2.5 },
        { name: 'Ethereum', symbol: 'ETH', marketCap: '345B', change: -1.2 },
        { name: 'Solana', symbol: 'SOL', marketCap: '38B', change: 5.3 }
      ]
    },
    {
      name: 'DeFi',
      marketCap: '128B',
      change: -1.8,
      assets: [
        { name: 'Uniswap', symbol: 'UNI', marketCap: '28B', change: -2.1 },
        { name: 'Aave', symbol: 'AAVE', marketCap: '12B', change: -1.5 },
        { name: 'Maker', symbol: 'MKR', marketCap: '8B', change: -1.8 }
      ]
    },
    {
      name: 'Layer 2',
      marketCap: '82B',
      change: 4.2,
      assets: [
        { name: 'Polygon', symbol: 'MATIC', marketCap: '45B', change: 4.5 },
        { name: 'Arbitrum', symbol: 'ARB', marketCap: '25B', change: 3.8 },
        { name: 'Optimism', symbol: 'OP', marketCap: '12B', change: 4.3 }
      ]
    }
  ];

  const getColorIntensity = (change) => {
    const absChange = Math.abs(change);
    const intensity = Math.min(absChange * 10, 100);
    return change >= 0 
      ? `rgba(0, 255, 0, ${intensity / 100})`
      : `rgba(255, 0, 0, ${intensity / 100})`;
  };

  const getBoxSize = (marketCap) => {
    const value = parseFloat(marketCap.replace(/[TB]/g, ''));
    if (marketCap.includes('T')) return value * 100;
    return value;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="card-title">Market Heatmap</h2>
          
          <div className="flex flex-wrap gap-2">
            <div className="join">
              {['1h', '24h', '7d', '30d'].map((tf) => (
                <button
                  key={tf}
                  className={`join-item btn btn-sm ${
                    timeframe === tf ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>

            <select 
              className="select select-sm select-bordered"
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              <option value="marketCap">Market Cap</option>
              <option value="volume">Volume</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector) => (
            <div 
              key={sector.name}
              className="card bg-base-200"
            >
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">{sector.name}</h3>
                  <div className={`text-sm ${
                    sector.change >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {sector.change}%
                  </div>
                </div>

                <div className="grid gap-2">
                  {sector.assets.map((asset) => (
                    <div
                      key={asset.symbol}
                      className="relative p-4 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: getColorIntensity(asset.change),
                        height: `${Math.max(80, getBoxSize(asset.marketCap) / 4)}px`
                      }}
                    >
                      <div className="absolute inset-0 bg-base-200 opacity-90 hover:opacity-80 transition-opacity p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-xs opacity-70">{asset.symbol}</div>
                          </div>
                          <div className={`text-sm ${
                            asset.change >= 0 ? 'text-success' : 'text-error'
                          }`}>
                            {asset.change}%
                          </div>
                        </div>
                        <div className="mt-2 text-sm opacity-70">
                          ${asset.marketCap}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success opacity-50"></div>
            <span className="text-sm">Bullish</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-error opacity-50"></div>
            <span className="text-sm">Bearish</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeatmap;