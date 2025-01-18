import { useState } from 'react';
import { motion } from 'framer-motion';
import QuickStats from '../components/portfolio/Stats/QuickStats';
import PerformanceChart from '../components/portfolio/Charts/PerformanceChart';
import GradientButton from '../components/portfolio/Common/GradientButton';
import TimeRangeSelector from '../components/portfolio/Common/TimeRangeSelector';

const Portfolio = () => {
  const [timeRange, setTimeRange] = useState('24H');
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 125750.25,
    dayChange: 2.5,
    monthChange: 15.8,
    performanceData: [
      { date: '2024-01-01', value: 100000 },
      { date: '2024-01-02', value: 102000 },
      { date: '2024-01-03', value: 105000 },
      { date: '2024-01-04', value: 103000 },
      { date: '2024-01-05', value: 106000 },
      { date: '2024-01-06', value: 110000 },
      { date: '2024-01-07', value: 125750.25 },
    ]
  });

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <p className="text-base-content/60">Track and manage your assets</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2"
          >
            <GradientButton>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Deposit
            </GradientButton>
            <button className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Withdraw
            </button>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <QuickStats
          totalValue={portfolioData.totalValue}
          dayChange={portfolioData.dayChange}
          monthChange={portfolioData.monthChange}
        />

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="card-title">Portfolio Performance</h2>
              <TimeRangeSelector
                selected={timeRange}
                onSelect={setTimeRange}
              />
            </div>
            <PerformanceChart data={portfolioData.performanceData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;