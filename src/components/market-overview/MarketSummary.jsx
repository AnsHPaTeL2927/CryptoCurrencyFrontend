import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react';

const MarketSummary = () => {
  const summaryData = {
    marketCap: {
      value: '1.89T',
      change: 2.5,
      title: 'Market Cap'
    },
    volume: {
      value: '98.2B',
      change: -1.2,
      title: '24h Volume'
    },
    btcDominance: {
      value: '48.2%',
      change: 0.8,
      title: 'BTC Dominance'
    },
    defiTVL: {
      value: '45.6B',
      change: 3.2,
      title: 'DeFi TVL'
    }
  };

  const renderChange = (change) => {
    const Icon = change >= 0 ? TrendingUp : TrendingDown;
    return (
      <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-success' : 'text-error'}`}>
        <Icon size={16} />
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(summaryData).map(([key, data]) => (
        <div 
          key={key}
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                {key === 'marketCap' && <DollarSign className="w-6 h-6 text-primary" />}
                {key === 'volume' && <BarChart2 className="w-6 h-6 text-primary" />}
                {key === 'btcDominance' && (
                  <div className="text-xl font-bold text-primary">₿</div>
                )}
                {key === 'defiTVL' && (
                  <div className="text-xl font-bold text-primary">Ð</div>
                )}
              </div>
              {renderChange(data.change)}
            </div>
            
            <div className="mt-4">
              <h2 className="card-title text-2xl font-bold">${data.value}</h2>
              <p className="text-sm opacity-70">{data.title}</p>
            </div>

            <div className="mt-4 h-1 w-full bg-base-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${data.change >= 0 ? 'bg-success' : 'bg-error'} transition-all duration-500`}
                style={{ width: `${Math.min(Math.abs(data.change) * 10, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketSummary;