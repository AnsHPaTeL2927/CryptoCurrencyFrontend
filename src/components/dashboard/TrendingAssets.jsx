/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';

const TrendingAssets = ({ assets }) => {
  // Mini chart options
  const miniChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      point: { radius: 0 },
      line: { borderWidth: 2 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-100 shadow-xl"
    >
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title">Trending Assets</h2>
          <select className="select select-bordered select-sm">
            <option>All Assets</option>
            <option>Top Gainers</option>
            <option>Top Losers</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market Cap</th>
                <th>Volume (24h)</th>
                <th>Chart</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <img 
                        src={`/api/placeholder/32/32`} 
                        alt={asset.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-bold">{asset.symbol}</div>
                        <div className="text-sm opacity-70">{asset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono font-semibold">
                    ${asset.price.toLocaleString()}
                  </td>
                  <td>
                    <div className={`badge ${asset.change24h >= 0 ? 'badge-success' : 'badge-error'}`}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </div>
                  </td>
                  <td>${(asset.price * 1000000).toLocaleString()}</td>
                  <td>${(asset.price * 500000).toLocaleString()}</td>
                  <td className="w-32">
                    <div className="h-10">
                      <Line 
                        data={{
                          labels: Array(10).fill(''),
                          datasets: [{
                            data: Array(10).fill().map(() => Math.random() * 100),
                            borderColor: asset.change24h >= 0 ? 'rgb(72, 187, 120)' : 'rgb(245, 101, 101)',
                            tension: 0.4
                          }]
                        }}
                        options={miniChartOptions}
                      />
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm">Trade</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingAssets;