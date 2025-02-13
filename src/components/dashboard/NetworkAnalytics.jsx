import { useState } from 'react';

const NetworkAnalytics = () => {
  const [networks] = useState([
    {
      name: 'Ethereum',
      status: 'Operational',
      tps: 15,
      blockTime: '13.2s',
      pendingTx: 123456,
      avgGas: '32',
      trend: 'up'
    },
    {
      name: 'BSC',
      status: 'Operational',
      tps: 65,
      blockTime: '3.0s',
      pendingTx: 45678,
      avgGas: '5',
      trend: 'stable'
    },
    {
      name: 'Polygon',
      status: 'High Load',
      tps: 45,
      blockTime: '2.1s',
      pendingTx: 78901,
      avgGas: '89',
      trend: 'down'
    }
  ]);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-error" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 110 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-warning" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Operational': 'badge-success',
      'High Load': 'badge-warning',
      'Issues': 'badge-error'
    };
    return `badge ${statusColors[status] || 'badge-ghost'}`;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Network Status</h2>
          <div className="badge badge-primary">Live Updates</div>
        </div>

        <div className="grid gap-4">
          {networks.map((network) => (
            <div key={network.name} className="bg-base-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                    {network.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{network.name}</h3>
                    <div className={getStatusBadge(network.status)}>{network.status}</div>
                  </div>
                </div>
                {getTrendIcon(network.trend)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm opacity-70">TPS</div>
                  <div className="font-mono">{network.tps}</div>
                </div>
                <div>
                  <div className="text-sm opacity-70">Block Time</div>
                  <div className="font-mono">{network.blockTime}</div>
                </div>
                <div>
                  <div className="text-sm opacity-70">Pending Tx</div>
                  <div className="font-mono">{network.pendingTx.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm opacity-70">Avg Gas (Gwei)</div>
                  <div className="font-mono">{network.avgGas}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-base-300 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${(network.tps / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button className="btn btn-sm btn-ghost gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button className="btn btn-sm btn-ghost">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default NetworkAnalytics;