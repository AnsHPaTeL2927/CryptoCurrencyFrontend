import React, { useState } from 'react';

const FuturePositionHistory = () => {
  const [activeTab, setActiveTab] = useState('positions');
  const [positionFilter, setPositionFilter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  // Sample data
  const activePositions = [
    {
      id: 1,
      symbol: 'BTC-USDT',
      type: 'long',
      size: '0.5',
      leverage: '20x',
      entryPrice: '97,198.50',
      markPrice: '97,350.25',
      margin: '2,429.96',
      pnl: '+151.75',
      roe: '+12.5%',
      liqPrice: '94,321.75',
      updateTime: '2024-02-19 14:30:25'
    },
    {
      id: 2,
      symbol: 'ETH-USDT',
      type: 'short',
      size: '5.0',
      leverage: '10x',
      entryPrice: '2,693.60',
      markPrice: '2,675.40',
      margin: '1,346.80',
      pnl: '+91.00',
      roe: '+6.8%',
      liqPrice: '2,895.25',
      updateTime: '2024-02-19 15:15:10'
    }
  ];

  const closedPositions = [
    {
      id: 1,
      symbol: 'BTC-USDT',
      type: 'long',
      size: '0.3',
      leverage: '20x',
      entryPrice: '96,750.25',
      exitPrice: '97,325.50',
      pnl: '+172.57',
      roe: '+14.2%',
      closeTime: '2024-02-19 12:45:30'
    }
  ];

  const openOrders = [
    {
      id: 1,
      symbol: 'BTC-USDT',
      type: 'limit',
      side: 'long',
      price: '96,800.50',
      size: '0.2',
      margin: '968.01',
      leverage: '20x',
      timeInForce: 'GTC',
      createTime: '2024-02-19 14:20:15'
    }
  ];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-4">
        <div className="flex justify-between items-center mb-4">
          {/* Tab Navigation */}
          <div className="tabs tabs-boxed">
            <button 
              className={`tab ${activeTab === 'positions' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('positions')}
            >
              Positions (2)
            </button>
            <button 
              className={`tab ${activeTab === 'orders' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders (1)
            </button>
            <button 
              className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 items-center">
            <select 
              className="select select-bordered select-sm"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="all">All Positions</option>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>

            <select 
              className="select select-bordered select-sm"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="24h">24H</option>
              <option value="7d">7D</option>
              <option value="30d">30D</option>
              <option value="90d">90D</option>
            </select>
          </div>
        </div>

        {/* Active Positions */}
        {activeTab === 'positions' && (
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Leverage</th>
                  <th>Entry Price</th>
                  <th>Mark Price</th>
                  <th>Margin</th>
                  <th>PnL (ROE%)</th>
                  <th>Liq. Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activePositions.map((position) => (
                  <tr key={position.id} className="hover">
                    <td className="font-medium">{position.symbol}</td>
                    <td>
                      <div className={`badge ${
                        position.type === 'long' ? 'badge-success' : 'badge-error'
                      }`}>
                        {position.type.toUpperCase()}
                      </div>
                    </td>
                    <td>{position.size}</td>
                    <td>{position.leverage}</td>
                    <td>${position.entryPrice}</td>
                    <td>${position.markPrice}</td>
                    <td>${position.margin}</td>
                    <td>
                      <div className="flex flex-col">
                        <span className={position.pnl.startsWith('+') ? 'text-success' : 'text-error'}>
                          ${position.pnl}
                        </span>
                        <span className="text-xs opacity-70">({position.roe})</span>
                      </div>
                    </td>
                    <td className="text-error">${position.liqPrice}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-error btn-xs">Close</button>
                        <button className="btn btn-primary btn-xs">TP/SL</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Open Orders */}
        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Side</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Margin</th>
                  <th>Leverage</th>
                  <th>Time in Force</th>
                  <th>Create Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {openOrders.map((order) => (
                  <tr key={order.id} className="hover">
                    <td className="font-medium">{order.symbol}</td>
                    <td>
                      <div className="badge badge-ghost">{order.type.toUpperCase()}</div>
                    </td>
                    <td>
                      <div className={`badge ${
                        order.side === 'long' ? 'badge-success' : 'badge-error'
                      }`}>
                        {order.side.toUpperCase()}
                      </div>
                    </td>
                    <td>${order.price}</td>
                    <td>{order.size}</td>
                    <td>${order.margin}</td>
                    <td>{order.leverage}</td>
                    <td>{order.timeInForce}</td>
                    <td className="text-sm opacity-70">{order.createTime}</td>
                    <td>
                      <button className="btn btn-ghost btn-xs">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Position History */}
        {activeTab === 'history' && (
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Leverage</th>
                  <th>Entry Price</th>
                  <th>Exit Price</th>
                  <th>PnL</th>
                  <th>ROE%</th>
                  <th>Close Time</th>
                </tr>
              </thead>
              <tbody>
                {closedPositions.map((position) => (
                  <tr key={position.id} className="hover">
                    <td className="font-medium">{position.symbol}</td>
                    <td>
                      <div className={`badge ${
                        position.type === 'long' ? 'badge-success' : 'badge-error'
                      }`}>
                        {position.type.toUpperCase()}
                      </div>
                    </td>
                    <td>{position.size}</td>
                    <td>{position.leverage}</td>
                    <td>${position.entryPrice}</td>
                    <td>${position.exitPrice}</td>
                    <td className={position.pnl.startsWith('+') ? 'text-success' : 'text-error'}>
                      ${position.pnl}
                    </td>
                    <td className={position.roe.startsWith('+') ? 'text-success' : 'text-error'}>
                      {position.roe}
                    </td>
                    <td className="text-sm opacity-70">{position.closeTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuturePositionHistory;