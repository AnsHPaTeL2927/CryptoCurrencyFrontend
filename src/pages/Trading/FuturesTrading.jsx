import { useState, useEffect } from "react";
import FuturesMarketInfo from "../../components/FutureTrading/FutureMarketInfo";
import FuturesOrderBook from "../../components/FutureTrading/FutureOrderBook";
import FuturesTradeHistory from "../../components/FutureTrading/FutureTradeHistory";
import FuturesTradeForm from "../../components/FutureTrading/FutureTradeForm";
import TradingChart from "../../components/SpotTrading/TradingChart";
import FuturePositionHistory from "../../components/FutureTrading/FuturePositionHistory";
import FutureRecentTrades from "../../components/FutureTrading/FutureRecentTrades";
import { BarChart, Book, Clock, Wallet, LineChart } from "lucide-react";
import FutureSkeleton from "../../components/FutureTrading/FutureSkeleton";

const FuturesTrading = () => {
  // State for active tab on mobile
  const [activeTab, setActiveTab] = useState("chart");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 2000));
  
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);

  // Tab configuration
  const tabs = [
    { id: "chart", label: "Chart", icon: <LineChart className="w-4 h-4" /> },
    { id: "trade", label: "Trade", icon: <BarChart className="w-4 h-4" /> },
    { id: "orders", label: "Orders", icon: <Book className="w-4 h-4" /> },
    {
      id: "positions",
      label: "Positions",
      icon: <Wallet className="w-4 h-4" />,
    },
    { id: "history", label: "History", icon: <Clock className="w-4 h-4" /> },
  ];

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "chart":
        return (
          <div className="h-[calc(100vh-180px)]">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-2">
                <TradingChart symbol="BTC/USDT" />
              </div>
            </div>
          </div>
        );
      case "trade":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <FuturesTradeForm />
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-4">Order Book</h2>
              <FuturesOrderBook />
            </div>
          </div>
        );
      case "positions":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <FuturePositionHistory />
            </div>
          </div>
        );
      case "history":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <FuturesTradeHistory />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? (
        <FutureSkeleton />
      ) : (
        <div className="min-h-screen bg-base-200">
          {/* Market Info Header - Always visible */}
          <div className="p-2 lg:p-4 sticky top-0 z-10 bg-base-200">
            <FuturesMarketInfo />
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col min-h-[calc(100vh-64px)]">
            {/* Tab Content */}
            <div className="flex-1 p-2 overflow-y-auto">
              {renderTabContent()}
            </div>

            {/* Bottom Navigation Tabs */}
            <div className="btm-nav bg-base-100 border-t border-base-300">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${
                    activeTab === tab.id
                      ? "active text-primary border-t-2 border-primary"
                      : "text-base-content"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="btm-nav-label text-xs">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex p-4 gap-4">
            {/* Left Side - Chart & Market Info */}
            <div className="w-2/3 flex flex-col gap-4">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-2">
                  <TradingChart symbol="BTC/USDT" />
                </div>
              </div>
              <FutureRecentTrades />
              <FuturePositionHistory />
            </div>

            {/* Right Side - Trade Form & Order Book */}
            <div className="w-1/3 flex flex-col gap-4">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-4">
                  <FuturesTradeForm />
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-4">
                  <h2 className="card-title text-lg mb-4">Order Book</h2>
                  <FuturesOrderBook />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FuturesTrading;
