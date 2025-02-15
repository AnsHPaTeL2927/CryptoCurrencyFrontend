import { useState, useEffect } from 'react';
import AnimatePulseBedge from '../common/AnimatePulseBedge';

const GasTracker = ({theme}) => {
  const [networks, setNetworks] = useState([
    {
      name: 'Ethereum',
      icon: '⟠',
      currentGas: 32,
      gasRange: { low: 25, avg: 32, high: 45 },
      baseGas: 12,
      trend: 'stable',
      status: 'Normal',
      lastUpdate: new Date()
    },
    {
      name: 'BSC',
      icon: '⛓️',
      currentGas: 5,
      gasRange: { low: 3, avg: 5, high: 8 },
      baseGas: 3,
      trend: 'down',
      status: 'Low',
      lastUpdate: new Date()
    },
    {
      name: 'Polygon',
      icon: '⬡',
      currentGas: 89,
      gasRange: { low: 50, avg: 89, high: 120 },
      baseGas: 40,
      trend: 'up',
      status: 'High',
      lastUpdate: new Date()
    },
    {
      name: 'Arbitrum',
      icon: '🔵',
      currentGas: 0.25,
      gasRange: { low: 0.1, avg: 0.25, high: 0.4 },
      baseGas: 0.1,
      trend: 'stable',
      status: 'Normal',
      lastUpdate: new Date()
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setNetworks(prev => prev.map(network => ({
        ...network,
        currentGas: network.currentGas + (Math.random() - 0.5) * 5,
        lastUpdate: new Date()
      })));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'low': return 'text-success';
      case 'normal': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-info';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-error" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Gas Tracker</h2>
          <AnimatePulseBedge theme={theme} color='error'/>
        </div>

        <div className="space-y-4">
          {networks.map((network) => (
            <div key={network.name} className="p-3 bg-base-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{network.icon}</span>
                  <span className="font-medium">{network.name}</span>
                </div>
                {getTrendIcon(network.trend)}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">{network.currentGas.toFixed(2)}</div>
                  <div className="text-xs opacity-70">Gwei</div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${getStatusColor(network.status)}`}>
                    {network.status}
                  </div>
                  <div className="text-xs opacity-70">
                    Base: {network.baseGas} Gwei
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex justify-between text-xs opacity-70 mb-1">
                  <span>Low: {network.gasRange.low}</span>
                  <span>Average: {network.gasRange.avg}</span>
                  <span>High: {network.gasRange.high}</span>
                </div>
                <div className="w-full bg-base-300 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${(network.currentGas / network.gasRange.high * 100)}%`,
                      maxWidth: '100%'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-center opacity-60">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default GasTracker;