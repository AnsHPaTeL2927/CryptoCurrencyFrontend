import { useState, useEffect } from "react";
import TradingChart from "../../components/SpotTrading/TradingChart";
import OrderBook from "../../components/SpotTrading/OrderBook";
import TradeHistory from "../../components/SpotTrading/TradeHistory";
import TradeForm from "../../components/SpotTrading/TradeForm";
import MarketInfo from "../../components/SpotTrading/MarketInfo";
import { BarChart, Book, Clock, LineChart } from "lucide-react";
import Skeleton from "../../components/SpotTrading/Skeleton";

const SpotTradingPage = () => {
  // State for active tab on mobile
  const [activeTab, setActiveTab] = useState("chart");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

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
              <TradeForm />
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-4">Order Book</h2>
              <OrderBook />
            </div>
          </div>
        );
      case "history":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-4">Trade History</h2>
              <TradeHistory />
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
        <Skeleton />
      ) : (
        <div className="min-h-screen bg-base-200">
          {/* Market Info Header - Always visible */}
          <div className="p-2 lg:p-4 sticky top-0 z-10 bg-base-200">
            <MarketInfo />
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
          <div className="hidden lg:block p-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Main Content */}
              <div className="col-span-8">
                {/* Trading Chart */}
                <div className="card bg-base-100 shadow-xl mb-4">
                  <div className="card-body p-2">
                    <TradingChart symbol="BTC/USDT" />
                  </div>
                </div>

                {/* Trade History */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg mb-4">Trade History</h2>
                    <TradeHistory />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-4 space-y-4">
                {/* Order Book */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg mb-4">Order Book</h2>
                    <OrderBook />
                  </div>
                </div>

                {/* Trade Form */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body p-4">
                    <TradeForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotTradingPage;
