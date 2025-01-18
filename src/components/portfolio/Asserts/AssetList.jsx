/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const AssetList = ({ assets }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Holdings</th>
            <th>Price</th>
            <th>Value</th>
            <th>24h Change</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <motion.tr 
              key={asset.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <td>
                <div className="flex items-center gap-2">
                  <img src={asset.icon} alt={asset.symbol} className="w-8 h-8 rounded-full"/>
                  <div>
                    <div className="font-bold">{asset.symbol}</div>
                    <div className="text-sm opacity-50">{asset.name}</div>
                  </div>
                </div>
              </td>
              <td>{asset.holdings}</td>
              <td>${asset.price.toLocaleString()}</td>
              <td>${asset.value.toLocaleString()}</td>
              <td className={asset.change >= 0 ? 'text-success' : 'text-error'}>
                {asset.change}%
              </td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-primary">Trade</button>
                  <button className="btn btn-sm btn-outline">Details</button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;