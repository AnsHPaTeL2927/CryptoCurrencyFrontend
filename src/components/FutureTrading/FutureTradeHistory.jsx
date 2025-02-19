import { useState } from 'react';

const FuturesTradeHistory = () => {
  const [activeTab, setActiveTab] = useState('market');
  const [filter, setFilter] = useState('all');

  // Sample market trades
  const marketTrades = [
    {
      id: 1,
      price: '97,198.50',
      amount: '10',
      total: '97,198.50',
      time: '14:30:25',
      type: 'buy'
    },
    {
      id: 2,
      price: '97,188.25',
      amount: '15',
      total: '97,188.25',
      time: '14:29:15',
      type: 'sell'
    },
    {
      id: 3,
      price: '97,208.75',
      amount: '8',
      total: '97,208.75',
      time: '14:28:30',
      type: 'buy'
    },
    {
      id: 4,
      price: '97,178.50',
      amount: '12',
      total: '97,178.50',
      time: '14:27:45',
      type: 'sell'
    },
    {
      id: 5,
      price: '97,218.25',
      amount: '6',
      total: '97,218.25',
      time: '14:26:55',
      type: 'buy'
    }
  ];

  // Sample my trades
  const myTrades = [
    {
      id: 1,
      type: 'buy',
      price: '97,198.50',
      amount: '10',
      total: '97,198.50',
      time: '2024-02-16 14:30:25',
      status: 'filled'
    },
    {
      id: 2,
      type: 'sell',
      price: '97,188.25',
      amount: '15',
      total: '97,188.25',
      time: '2024-02-16 14:29:15',
      status: 'filled'
    }
  ];

  // Filter trades based on active tab and filter
  const filteredTrades = filter === 'all' 
    ? (activeTab === 'market' ? marketTrades : myTrades)
    : (activeTab === 'market' ? marketTrades : myTrades).filter(trade => trade.type === filter);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        {/* Main Tabs */}
        <div className="tabs tabs-boxed">
          <button 
            className={`tab ${activeTab === 'market' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('market')}
          >
            Market Trades
          </button>
          <button 
            className={`tab ${activeTab === 'my' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('my')}
          >
            My Trades
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button 
            className={`btn btn-xs ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`btn btn-xs ${filter === 'buy' ? 'btn-success' : 'btn-ghost'}`}
            onClick={() => setFilter('buy')}
          >
            Long
          </button>
          <button 
            className={`btn btn-xs ${filter === 'sell' ? 'btn-error' : 'btn-ghost'}`}
            onClick={() => setFilter('sell')}
          >
            Short
          </button>
        </div>
      </div>

      <div className="overflow-x-auto h-96">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Price (USDT)</th>
              <th>Size (Contracts)</th>
              {activeTab === 'market' ? (
                <>
                  <th>Total</th>
                  <th>Time</th>
                </>
              ) : (
                <>
                  <th>Total</th>
                  <th>Time</th>
                  <th>Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade) => (
              <tr key={trade.id} className="hover">
                <td className={trade.type === 'buy' ? 'text-success' : 'text-error'}>
                  {trade.price}
                </td>
                <td>{trade.amount}</td>
                <td>{trade.total}</td>
                <td className="text-sm opacity-70">{trade.time}</td>
                {activeTab === 'my' && (
                  <td>
                    <span className={`badge badge-sm ${
                      trade.status === 'filled' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuturesTradeHistory;