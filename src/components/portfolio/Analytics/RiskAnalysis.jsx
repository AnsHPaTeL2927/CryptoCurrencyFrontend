/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const RiskAnalysis = ({ riskMetrics, assets }) => {
  const [selectedMetric, setSelectedMetric] = useState('overall');

  // Chart configurations
  const riskScoreChartData = {
    labels: ['Risk Score', 'Safe Zone'],
    datasets: [{
      data: [riskMetrics?.score || 0, 100 - (riskMetrics?.score || 0)],
      backgroundColor: [
        'rgba(239, 68, 68, 0.7)',
        'rgba(74, 222, 128, 0.2)'
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(74, 222, 128)'
      ],
      borderWidth: 1
    }]
  };

  const riskTrendData = {
    labels: ['1d', '7d', '14d', '30d', '90d'],
    datasets: [{
      label: 'Risk Score Trend',
      data: riskMetrics?.trend || [65, 68, 62, 70, 65],
      borderColor: 'rgb(99, 102, 241)',
      tension: 0.4,
      fill: false
    }]
  };

  const riskTrendOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  };

  const getRiskLevelStyle = (score) => {
    if (score >= 75) return 'text-error';
    if (score >= 50) return 'text-warning';
    return 'text-success';
  };

  const getRiskLevelBadge = (score) => {
    if (score >= 75) return 'badge-error';
    if (score >= 50) return 'badge-warning';
    return 'badge-success';
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Overall Risk Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="card-title">Portfolio Risk Analysis</h2>
              <p className="text-base-content/60 mt-1">Overall portfolio risk assessment</p>
            </div>
            <select 
              className="select select-bordered select-sm"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="overall">Overall Risk</option>
              <option value="market">Market Risk</option>
              <option value="volatility">Volatility</option>
              <option value="concentration">Concentration</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24">
                <Doughnut 
                  data={riskScoreChartData}
                  options={{
                    cutout: '75%',
                    plugins: {
                      legend: { display: false }
                    }
                  }}
                />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${getRiskLevelStyle(riskMetrics?.score || 0)}`}>
                  {riskMetrics?.score || 0}%
                </h3>
                <p className="text-sm opacity-70">Risk Score</p>
                <span className={`badge ${getRiskLevelBadge(riskMetrics?.score || 0)} mt-2`}>
                  {riskMetrics?.level || 'Calculating...'}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Risk Score Trend</h3>
              <div className="h-24">
                <Line data={riskTrendData} options={riskTrendOptions} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Risk Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title">Risk Factors</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Current Level</th>
                  <th>Impact</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Market Volatility</td>
                  <td>
                    <div className="badge badge-warning">Moderate</div>
                  </td>
                  <td>Medium</td>
                  <td>Consider hedging strategies</td>
                </tr>
                <tr>
                  <td>Asset Concentration</td>
                  <td>
                    <div className="badge badge-error">High</div>
                  </td>
                  <td>High</td>
                  <td>Diversify portfolio</td>
                </tr>
                <tr>
                  <td>Liquidity Risk</td>
                  <td>
                    <div className="badge badge-success">Low</div>
                  </td>
                  <td>Low</td>
                  <td>Maintain current position</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Asset Risk Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title">Asset Risk Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Risk Score</th>
                  <th>Volatility</th>
                  <th>Exposure</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets?.map(asset => (
                  <tr key={asset.id}>
                    <td className="flex items-center gap-2">
                      <img src={asset.icon} alt={asset.symbol} className="w-6 h-6 rounded-full" />
                      <span>{asset.symbol}</span>
                    </td>
                    <td>
                      <div className={`badge ${getRiskLevelBadge(asset.riskScore)}`}>
                        {asset.riskScore}%
                      </div>
                    </td>
                    <td>{asset.volatility || 'Medium'}</td>
                    <td>{asset.percentage}%</td>
                    <td>
                      {asset.riskScore > 75 ? (
                        <span className="text-error">Reduce Position</span>
                      ) : asset.riskScore > 50 ? (
                        <span className="text-warning">Monitor Closely</span>
                      ) : (
                        <span className="text-success">Hold</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Risk Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title">Risk Alerts</h2>
            <button className="btn btn-primary btn-sm">Configure Alerts</button>
          </div>
          <div className="space-y-4 mt-4">
            {riskMetrics?.alerts?.map((alert, index) => (
              <div key={index} className={`alert ${alert.type === 'high' ? 'alert-error' : 'alert-warning'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-bold">{alert.title}</h3>
                  <div className="text-sm">{alert.message}</div>
                </div>
              </div>
            ))}
            {(!riskMetrics?.alerts || riskMetrics.alerts.length === 0) && (
              <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No active risk alerts at this time.</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RiskAnalysis;