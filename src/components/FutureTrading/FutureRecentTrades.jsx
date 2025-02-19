import React from 'react';

const FutureRecentTrades = () => {
  const trends = [
    {
      symbol: 'BTC-USDT',
      price: '97,198.50',
      change: '+2.34',
      volume: '291.1M',
      longShortRatio: '1.45',
      topTraderLongRatio: '65.4%',
      sentiment: 'bullish'
    },
    {
      symbol: 'ETH-USDT',
      price: '2,693.60',
      change: '-1.23',
      volume: '173.9M',
      longShortRatio: '0.85',
      topTraderLongRatio: '42.3%',
      sentiment: 'bearish'
    },
    {
      symbol: 'SOL-USDT',
      price: '192.68',
      change: '+5.67',
      volume: '82.86M',
      longShortRatio: '1.23',
      topTraderLongRatio: '58.7%',
      sentiment: 'bullish'
    }
  ];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-4">
        <h2 className="card-title text-lg mb-4 flex justify-between items-center">
          Recent Market Trends
          <span className="text-xs font-normal opacity-70">Updated every 5 minutes</span>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Volume</th>
                <th>Long/Short Ratio</th>
                <th>Top Trader Long%</th>
                <th>Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {trends.map((trend) => (
                <tr key={trend.symbol} className="hover">
                  <td className="font-medium">{trend.symbol}</td>
                  <td>${trend.price}</td>
                  <td className={trend.change.startsWith('+') ? 'text-success' : 'text-error'}>
                    {trend.change}%
                  </td>
                  <td>{trend.volume}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{trend.longShortRatio}</span>
                      <div className="h-2 w-20 bg-base-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${trend.longShortRatio > 1 ? 'bg-success' : 'bg-error'}`}
                          style={{ width: `${(trend.longShortRatio / 2) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{trend.topTraderLongRatio}</span>
                      <div className="h-2 w-20 bg-base-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: trend.topTraderLongRatio }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={`badge ${
                      trend.sentiment === 'bullish' ? 'badge-success' : 'badge-error'
                    }`}>
                      {trend.sentiment}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FutureRecentTrades;