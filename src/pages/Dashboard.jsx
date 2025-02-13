import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MarketOverview from "../components/dashboard/MarketOverview";
import PortfolioSummary from "../components/dashboard/PortfolioSummary";
import RecentActivities from "../components/dashboard/RecentActivities";
import NewsSection from "../components/dashboard/NewsSection";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import MarketSentiment from "../components/dashboard/MarketSentiment";
import LiveTradesFeed from "../components/dashboard/LiveTradesFeed";
import TopMovers from "../components/dashboard/TopMovers";
import GasTracker from "../components/dashboard/GasTracker";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    user: {
      name: "John Doe",
      portfolioValue: 125750.25,
      dailyChange: 2.5,
    },
    marketOverview: {
      btcDominance: 45.2,
      globalMarketCap: 2.1,
      volume24h: 98.5,
      trending: [
        { symbol: "BTC", name: "Bitcoin", price: 43567.89, change24h: 2.5 },
        { symbol: "ETH", name: "Ethereum", price: 2890.12, change24h: -1.2 },
        { symbol: "BNB", name: "BNB", price: 312.45, change24h: 3.7 },
      ],
    },
    recentActivities: [
      {
        type: "buy",
        asset: "BTC",
        amount: 0.25,
        price: 43567.89,
        time: "2024-02-11T10:30:00Z",
      },
      {
        type: "sell",
        asset: "ETH",
        amount: 1.5,
        price: 2890.12,
        time: "2024-02-11T09:15:00Z",
      },
      {
        type: "buy",
        asset: "BNB",
        amount: 3.2,
        price: 312.45,
        time: "2024-02-11T08:45:00Z",
      },
    ],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-[1600px] mx-auto p-4 space-y-4 md:space-y-6">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <WelcomeBanner
            userName={dashboardData.user.name}
            portfolioValue={dashboardData.user.portfolioValue}
            dailyChange={dashboardData.user.dailyChange}
          />
        </motion.div>

        {/* Market Overview & Live Trades Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-9"
          >
            <MarketOverview data={dashboardData.marketOverview} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <LiveTradesFeed />
          </motion.div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* Left Column - Portfolio Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-1 lg:col-span-3 order-1"
          >
            <PortfolioSummary
              totalValue={dashboardData.user.portfolioValue}
              dailyChange={dashboardData.user.dailyChange}
            />
          </motion.div>

          {/* Center Column - TopMovers & Activity/Sentiment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 lg:col-span-6 order-3 lg:order-2 space-y-4"
          >
            <TopMovers />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RecentActivities activities={dashboardData.recentActivities} />
              <MarketSentiment />
            </div>
          </motion.div>

          {/* Right Column - Gas Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-1 lg:col-span-3 order-2 lg:order-3"
          >
            <GasTracker />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;