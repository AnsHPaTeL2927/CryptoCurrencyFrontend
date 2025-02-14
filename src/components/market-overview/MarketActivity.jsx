import { useState } from 'react';
import { Activity, AlertTriangle, ArrowRightLeft, Wallet } from 'lucide-react';

const MarketActivity = () => {
  const [filter, setFilter] = useState('all');

  // Sample data - would come from API
  const activities = [
    {
      id: 1,
      type: 'whale',
      symbol: 'BTC',
      amount: '1,250',
      value: '58.2M',
      direction: 'inflow',
      exchange: 'Binance',
      time: '2 mins ago'
    },
    {
      id: 2,
      type: 'alert',
      symbol: 'ETH',
      message: 'High sell pressure detected',
      severity: 'warning',
      time: '5 mins ago'
    },
    {
      id: 3,
      type: 'trade',
      symbol: 'SOL',
      price: '102.45',
      change: '+5.2%',
      volume: '2.1M',
      time: '8 mins ago'
    },
    {
      id: 4,
      type: 'whale',
      symbol: 'ETH',
      amount: '12,500',
      value: '35.8M',
      direction: 'outflow',
      exchange: 'Coinbase',
      time: '12 mins ago'
    },
    {
      id: 5,
      type: 'alert',
      symbol: 'BTC',
      message: 'Strong buy signals',
      severity: 'success',
      time: '15 mins ago'
    }
  ];

  const filterActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  const renderActivityIcon = (type, direction = null, severity = null) => {
    switch (type) {
      case 'whale':
        return (
          <div className={`p-2 rounded-full ${
            direction === 'inflow' ? 'bg-success/20' : 'bg-error/20'
          }`}>
            <Wallet className={`w-4 h-4 ${
              direction === 'inflow' ? 'text-success' : 'text-error'
            }`} />
          </div>
        );
      case 'alert':
        return (
          <div className={`p-2 rounded-full ${
            severity === 'success' ? 'bg-success/20' : 'bg-warning/20'
          }`}>
            <AlertTriangle className={`w-4 h-4 ${
              severity === 'success' ? 'text-success' : 'text-warning'
            }`} />
          </div>
        );
      case 'trade':
        return (
          <div className="p-2 rounded-full bg-primary/20">
            <ArrowRightLeft className="w-4 h-4 text-primary" />
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-base-300">
            <Activity className="w-4 h-4" />
          </div>
        );
    }
  };

  const renderActivityContent = (activity) => {
    switch (activity.type) {
      case 'whale':
        return (
          <>
            <div className="font-medium">
              Whale {activity.direction} detected
            </div>
            <div className="text-sm opacity-70">
              {activity.amount} {activity.symbol} (${activity.value}) on {activity.exchange}
            </div>
          </>
        );
      case 'alert':
        return (
          <>
            <div className="font-medium">
              {activity.symbol} Alert
            </div>
            <div className="text-sm opacity-70">
              {activity.message}
            </div>
          </>
        );
      case 'trade':
        return (
          <>
            <div className="font-medium">
              {activity.symbol} Price Update
            </div>
            <div className="text-sm opacity-70">
              ${activity.price} ({activity.change}) | Vol: ${activity.volume}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="card-title">Market Activity</h2>
          
          <div className="join">
            <button 
              className={`join-item btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`join-item btn btn-sm ${filter === 'whale' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter('whale')}
            >
              Whales
            </button>
            <button 
              className={`join-item btn btn-sm ${filter === 'alert' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter('alert')}
            >
              Alerts
            </button>
            <button 
              className={`join-item btn btn-sm ${filter === 'trade' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter('trade')}
            >
              Trades
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filterActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
            >
              {renderActivityIcon(activity.type, activity.direction, activity.severity)}
              
              <div className="flex-1">
                {renderActivityContent(activity)}
              </div>

              <div className="text-sm opacity-70">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketActivity;