import React, { useState } from "react";

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState([]);

  return (
    <div className="container mx-auto px-4">
      {/* Portfolio Summary */}
      <div className="stats shadow mt-4">
        <div className="stat">
          <div className="stat-title">Total Portfolio Value</div>
          <div className="stat-value">$25,000</div>
        </div>
        <div className="stat">
          <div className="stat-title">Profit/Loss</div>
          <div className="stat-value text-green-500">+12%</div>
        </div>
      </div>

      {/* Add Cryptocurrency Button */}
      <button className="btn btn-primary my-4">+ Add Cryptocurrency</button>

      {/* Portfolio Table */}
      <div className="overflow-x-auto">
        {portfolio.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Cryptocurrency</th>
                <th>Quantity</th>
                <th>Purchase Price</th>
                <th>Current Price</th>
                <th>Value</th>
                <th>Profit/Loss</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Data Row */}
              <tr>
                <td>Bitcoin (BTC)</td>
                <td>0.5</td>
                <td>$20,000</td>
                <td>$30,000</td>
                <td>$15,000</td>
                <td className="text-green-500">+50%</td>
                <td>
                  <button className="btn btn-sm btn-warning">Edit</button>
                  <button className="btn btn-sm btn-error ml-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl">🎉 No cryptocurrencies in your portfolio!</p>
            <button className="btn btn-primary mt-4">+ Add Cryptocurrency</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
