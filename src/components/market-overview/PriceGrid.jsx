import { useState } from 'react';
import { Search, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const PriceGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sample data - would come from API
  const cryptoData = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 48250.32, change24h: 2.5, marketCap: '945.2B', volume: '24.5B', favorite: true },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 2890.15, change24h: -1.2, marketCap: '345.8B', volume: '15.2B', favorite: true },
    { id: 3, name: 'Binance Coin', symbol: 'BNB', price: 320.45, change24h: 0.8, marketCap: '52.3B', volume: '2.1B', favorite: false },
    { id: 4, name: 'Solana', symbol: 'SOL', price: 102.78, change24h: 5.3, marketCap: '38.9B', volume: '3.4B', favorite: false },
    { id: 5, name: 'Cardano', symbol: 'ADA', price: 1.23, change24h: -2.1, marketCap: '41.2B', volume: '1.8B', favorite: false },
    { id: 6, name: 'Polkadot', symbol: 'DOT', price: 18.95, change24h: 3.7, marketCap: '22.1B', volume: '1.2B', favorite: false }
  ];

  const filteredData = cryptoData
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'price':
          return (a.price - b.price) * order;
        case 'change':
          return (a.change24h - b.change24h) * order;
        case 'marketCap':
          return (parseFloat(a.marketCap) - parseFloat(b.marketCap)) * order;
        case 'volume':
          return (parseFloat(a.volume) - parseFloat(b.volume)) * order;
        default:
          return (a.id - b.id) * order;
      }
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="card-title">Price Overview</h2>
          
          <div className="join w-full sm:w-auto">
            <div className="join-item flex-1 relative">
              <input
                type="text"
                placeholder="Search crypto..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="w-12"></th>
                <th onClick={() => handleSort('rank')} className="cursor-pointer hover:bg-base-200">
                  #
                </th>
                <th>Name</th>
                <th onClick={() => handleSort('price')} className="cursor-pointer hover:bg-base-200">
                  Price
                </th>
                <th onClick={() => handleSort('change')} className="cursor-pointer hover:bg-base-200">
                  24h Change
                </th>
                <th onClick={() => handleSort('marketCap')} className="cursor-pointer hover:bg-base-200">
                  Market Cap
                </th>
                <th onClick={() => handleSort('volume')} className="cursor-pointer hover:bg-base-200">
                  Volume (24h)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((crypto) => (
                <tr key={crypto.id} className="hover:bg-base-200 transition-colors">
                  <td>
                    <Star 
                      className={`w-5 h-5 cursor-pointer ${
                        crypto.favorite ? 'fill-warning stroke-warning' : 'stroke-base-content/50'
                      }`}
                    />
                  </td>
                  <td>{crypto.id}</td>
                  <td className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                        {crypto.symbol.charAt(0)}
                      </div>
                      <div>
                        <div>{crypto.name}</div>
                        <div className="text-xs opacity-60">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td>${crypto.price.toLocaleString()}</td>
                  <td className={crypto.change24h >= 0 ? 'text-success' : 'text-error'}>
                    <div className="flex items-center gap-1">
                      {crypto.change24h >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {Math.abs(crypto.change24h)}%
                    </div>
                  </td>
                  <td>${crypto.marketCap}</td>
                  <td>${crypto.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceGrid;