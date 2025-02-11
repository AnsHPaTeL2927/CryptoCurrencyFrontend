import { useState } from 'react';
import { motion } from 'framer-motion';

const TaxReports = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [reportType, setReportType] = useState('summary');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample data - replace with API data
  const taxSummary = {
    totalProfits: 15000,
    totalLosses: 3500,
    netGain: 11500,
    taxableAmount: 11500,
    estimatedTax: 2875,
    trades: 45,
    longTermGains: 8000,
    shortTermGains: 7000,
    longTermLosses: 2000,
    shortTermLosses: 1500
  };

  const handleDownload = async (format) => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Here you would call your API endpoint
      // await portfolioService.exportTaxReport(selectedYear, format);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating report:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <select 
            className="select select-bordered"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {[2024, 2023, 2022].map(year => (
              <option key={year} value={year}>Tax Year {year}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary">
              {isGenerating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Report
                </>
              )}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><button onClick={() => handleDownload('pdf')}>Download PDF</button></li>
              <li><button onClick={() => handleDownload('csv')}>Export CSV</button></li>
              <li><button onClick={() => handleDownload('xlsx')}>Export Excel</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h3 className="card-title text-lg">Net Taxable Gain</h3>
            <p className="text-2xl font-bold">${taxSummary.netGain.toLocaleString()}</p>
            <div className="text-sm opacity-70">
              From {taxSummary.trades} trades
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h3 className="card-title text-lg">Estimated Tax</h3>
            <p className="text-2xl font-bold">${taxSummary.estimatedTax.toLocaleString()}</p>
            <div className="text-sm opacity-70">
              Based on current tax rates
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h3 className="card-title text-lg">Total Trades</h3>
            <p className="text-2xl font-bold">{taxSummary.trades}</p>
            <div className="text-sm opacity-70">
              In tax year {selectedYear}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Tables */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Detailed Tax Breakdown</h2>
            <div className="tabs tabs-boxed">
              <a 
                className={`tab ${reportType === 'summary' ? 'tab-active' : ''}`}
                onClick={() => setReportType('summary')}
              >
                Summary
              </a>
              <a 
                className={`tab ${reportType === 'trades' ? 'tab-active' : ''}`}
                onClick={() => setReportType('trades')}
              >
                Trades
              </a>
            </div>
          </div>

          {reportType === 'summary' ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Gains</th>
                    <th>Losses</th>
                    <th>Net</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Long Term</td>
                    <td className="text-success">+${taxSummary.longTermGains.toLocaleString()}</td>
                    <td className="text-error">-${taxSummary.longTermLosses.toLocaleString()}</td>
                    <td>${(taxSummary.longTermGains - taxSummary.longTermLosses).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Short Term</td>
                    <td className="text-success">+${taxSummary.shortTermGains.toLocaleString()}</td>
                    <td className="text-error">-${taxSummary.shortTermLosses.toLocaleString()}</td>
                    <td>${(taxSummary.shortTermGains - taxSummary.shortTermLosses).toLocaleString()}</td>
                  </tr>
                  <tr className="font-bold">
                    <td>Total</td>
                    <td className="text-success">+${taxSummary.totalProfits.toLocaleString()}</td>
                    <td className="text-error">-${taxSummary.totalLosses.toLocaleString()}</td>
                    <td>${taxSummary.netGain.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Asset</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Cost Basis</th>
                    <th>Proceeds</th>
                    <th>Gain/Loss</th>
                    <th>Term</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample trade data - replace with actual data */}
                  <tr>
                    <td>2024-01-15</td>
                    <td>BTC</td>
                    <td>Sell</td>
                    <td>0.5</td>
                    <td>$15,000</td>
                    <td>$17,000</td>
                    <td className="text-success">+$2,000</td>
                    <td>Short</td>
                  </tr>
                  {/* Add more trade rows */}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {/* Notes and Disclaimers */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h3 className="card-title text-lg">Important Notes</h3>
          <ul className="list-disc list-inside space-y-2 text-sm opacity-70">
            <li>This is an estimated tax summary and should not be considered as financial advice.</li>
            <li>Please consult with a tax professional for accurate tax obligations.</li>
            <li>Long-term gains are from assets held for more than 1 year.</li>
            <li>Tax rates may vary based on your jurisdiction and tax bracket.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default TaxReports;