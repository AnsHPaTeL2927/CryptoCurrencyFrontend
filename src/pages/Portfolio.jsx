import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuickStats from '../components/portfolio/Stats/QuickStats';
import PerformanceChart from '../components/portfolio/Charts/PerformanceChart';
import AssetList from '../components/portfolio/Asserts/AssetList';
import AssetDistribution from '../components/portfolio/Charts/AssetDistribution';
import RiskAnalysis from '../components/portfolio/Analytics/RiskAnalysis';
import ProfitLossBreakdown from '../components/portfolio/Analytics/ProfitLossBreakdown';
import ROIAnalysis from '../components/portfolio/Analytics/ROIAnalysis';
import GradientButton from '../components/portfolio/Common/GradientButton';
import TimeRangeSelector from '../components/portfolio/Common/TimeRangeSelector';
import AlertsPanel from '../components/portfolio/Alerts/AlertsPanel';
import PortfolioSkeleton from '../components/portfolio/Loading/PortfolioSkeleton';
import TaxReports from '../components/portfolio/Tax/taxReport';

const Portfolio = () => {
  // State management for all API data
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24H');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('overview');
  
  // States for different API responses
  const [portfolioOverview, setPortfolioOverview] = useState(null);
  const [realTimeValue, setRealTimeValue] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [riskMetrics, setRiskMetrics] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Sample data - Replace with API calls when integrating
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Future API calls will go here
        // const overview = await portfolioService.getOverview();
        // const realTime = await portfolioService.getRealTimeValue();
        // etc...

        // Simulate API response
        setPortfolioOverview({
          totalValue: 125750.25,
          dayChange: 2.5,
          monthChange: 15.8,
          performanceData: [  // Add this performanceData array
            { date: '2024-01-01', value: 100000 },
            { date: '2024-01-02', value: 102000 },
            { date: '2024-01-03', value: 105000 },
            { date: '2024-01-04', value: 103000 },
            { date: '2024-01-05', value: 106000 },
            { date: '2024-01-06', value: 110000 },
            { date: '2024-01-07', value: 125750.25 }
          ],
          assets: [
            {
              id: 1,
              name: 'Bitcoin',
              symbol: 'BTC',
              holdings: 2.5,
              value: 75000,
              price: 30000,
              change: 2.5,
              percentage: 60,
              costBasis: 28000,
              profitLoss: 5000,
              riskScore: 75,
              icon: '/api/placeholder/32/32'
            },
            {
              id: 2,
              name: 'Ethereum',
              symbol: 'ETH',
              holdings: 15,
              value: 45000,
              price: 3000,
              change: -1.2,
              percentage: 30,
              costBasis: 2800,
              profitLoss: 3000,
              riskScore: 65,
              icon: '/api/placeholder/32/32'
            },
            {
              id: 3,
              name: 'Binance Coin',
              symbol: 'BNB',
              holdings: 50,
              value: 15000,
              price: 300,
              change: 5.7,
              percentage: 10,
              costBasis: 280,
              profitLoss: 1000,
              riskScore: 70,
              icon: '/api/placeholder/32/32'
            }
          ]
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Future WebSocket or polling updates will go here
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <div className="min-h-screen bg-base-200 pb-8">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header with Actions */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Withdraw
            </button>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs tabs-boxed">
          <a 
            className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </a>
          <a 
            className={`tab ${activeTab === 'analytics' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </a>
          <a 
            className={`tab ${activeTab === 'risk' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('risk')}
          >
            Risk Analysis
          </a>
          <a 
            className={`tab ${activeTab === 'tax' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('tax')}
          >
            Tax & Reports
          </a>
        </div>

        {/* Quick Stats Section */}
        <QuickStats
          totalValue={portfolioOverview?.totalValue}
          dayChange={portfolioOverview?.dayChange}
          monthChange={portfolioOverview?.monthChange}
        />

        {/* Alerts Panel */}
        {alerts.length > 0 && (
          <AlertsPanel alerts={alerts} />
        )}

        {activeTab === 'overview' && (
          <>
            {/* Performance Chart */}
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
                <PerformanceChart data={portfolioOverview?.performanceData} />
              </div>
            </motion.div>

            {/* Assets Grid/List and Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-base-100 shadow-xl lg:col-span-2"
              >
                <div className="card-body">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title">Your Assets</h2>
                    <div className="join">
                      <button 
                        className={`join-item btn btn-sm ${viewMode === 'grid' ? 'btn-active' : ''}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button 
                        className={`join-item btn btn-sm ${viewMode === 'list' ? 'btn-active' : ''}`}
                        onClick={() => setViewMode('list')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <AssetList 
                    assets={portfolioOverview?.assets} 
                    viewMode={viewMode} 
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <h2 className="card-title mb-4">Asset Distribution</h2>
                  <AssetDistribution assets={portfolioOverview?.assets} />
                </div>
              </motion.div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ROIAnalysis data={portfolioOverview} />
            <ProfitLossBreakdown data={portfolioOverview} />
          </div>
        )}

        {activeTab === 'risk' && (
          <RiskAnalysis 
            riskMetrics={riskMetrics} 
            assets={portfolioOverview?.assets} 
          />
        )}

        {activeTab === 'tax' && (
           <TaxReports />
        )}
      </div>
    </div>
  );
};

export default Portfolio;