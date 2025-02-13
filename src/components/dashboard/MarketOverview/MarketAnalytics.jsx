import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

// Analytics Tab Components
const VolumeDistribution = () => {
  const data = [
    { name: 'Binance', volume: 5200 },
    { name: 'Coinbase', volume: 3800 },
    { name: 'Kraken', volume: 2900 },
    { name: 'KuCoin', volume: 2400 },
    { name: 'Huobi', volume: 2100 },
    { name: 'Bybit', volume: 1800 },
    { name: 'OKX', volume: 1500 },
    { name: 'Bitfinex', volume: 1200 },
    { name: 'Gate.io', volume: 1000 },
    { name: 'Others', volume: 3100 }
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip 
            formatter={(value) => `$${value}M`}
            labelStyle={{ color: 'black' }}
          />
          <Bar 
            dataKey="volume" 
            fill="#8884d8"
            name="Volume (USD)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const PriceCorrelation = () => {
  // Sample correlation data between major crypto pairs
  const data = [
    { pair: 'BTC-ETH', correlation: 0.85 },
    { pair: 'BTC-BNB', correlation: 0.75 },
    { pair: 'ETH-BNB', correlation: 0.72 },
    { pair: 'BTC-XRP', correlation: 0.65 },
    { pair: 'ETH-XRP', correlation: 0.62 },
    { pair: 'BNB-XRP', correlation: 0.58 },
    { pair: 'BTC-ADA', correlation: 0.55 },
    { pair: 'ETH-ADA', correlation: 0.52 },
    { pair: 'BNB-ADA', correlation: 0.48 },
    { pair: 'XRP-ADA', correlation: 0.45 }
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 1]} />
          <YAxis dataKey="pair" type="category" width={80} />
          <Tooltip 
            formatter={(value) => `${(value * 100).toFixed(1)}%`}
            labelStyle={{ color: 'black' }}
          />
          <Bar 
            dataKey="correlation" 
            fill="#82ca9d"
            name="Correlation"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Options Tab Components
const OptionsChain = ({ selectedAsset = 'BTC' }) => {
  const optionsData = [
    {
      expiry: '2024-03-15',
      data: [
        { strike: 40000, callBid: 2100, callAsk: 2150, callVol: '1.2K', putBid: 1950, putAsk: 2000, putVol: '800' },
        { strike: 42000, callBid: 1800, callAsk: 1850, callVol: '950', putBid: 2200, putAsk: 2250, putVol: '1.1K' },
        { strike: 44000, callBid: 1500, callAsk: 1550, callVol: '750', putBid: 2450, putAsk: 2500, putVol: '1.3K' },
      ]
    },
    {
      expiry: '2024-03-22',
      data: [
        { strike: 40000, callBid: 2300, callAsk: 2350, callVol: '900', putBid: 2100, putAsk: 2150, putVol: '700' },
        { strike: 42000, callBid: 2000, callAsk: 2050, callVol: '800', putBid: 2300, putAsk: 2350, putVol: '950' },
        { strike: 44000, callBid: 1700, callAsk: 1750, callVol: '600', putBid: 2600, putAsk: 2650, putVol: '1.1K' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="tabs tabs-boxed">
          <button className="tab tab-active">BTC</button>
          <button className="tab">ETH</button>
          <button className="tab">BNB</button>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm">Strike Range</button>
          <button className="btn btn-sm">Greeks</button>
          <button className="btn btn-sm">Settings</button>
        </div>
      </div>

      {optionsData.map((expiryGroup, index) => (
        <div key={index} className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-sm">Expiry: {expiryGroup.expiry}</h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th colSpan="4" className="text-center bg-success/10">Calls</th>
                    <th rowSpan="2" className="text-center bg-base-300">Strike</th>
                    <th colSpan="4" className="text-center bg-error/10">Puts</th>
                  </tr>
                  <tr>
                    <th className="bg-success/10">Bid</th>
                    <th className="bg-success/10">Ask</th>
                    <th className="bg-success/10">Vol</th>
                    <th className="bg-success/10">IV%</th>
                    <th className="bg-error/10">Bid</th>
                    <th className="bg-error/10">Ask</th>
                    <th className="bg-error/10">Vol</th>
                    <th className="bg-error/10">IV%</th>
                  </tr>
                </thead>
                <tbody>
                  {expiryGroup.data.map((row) => (
                    <tr key={row.strike} className="hover">
                      <td>{row.callBid}</td>
                      <td>{row.callAsk}</td>
                      <td>{row.callVol}</td>
                      <td>{(Math.random() * 100).toFixed(1)}%</td>
                      <td className="font-bold text-center bg-base-300">{row.strike}</td>
                      <td>{row.putBid}</td>
                      <td>{row.putAsk}</td>
                      <td>{row.putVol}</td>
                      <td>{(Math.random() * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Export combined components
export {
  VolumeDistribution,
  PriceCorrelation,
  OptionsChain
};