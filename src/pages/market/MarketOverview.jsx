import MarketSummary from "../../components/market-overview/MarketSummary";
import MarketTrends from "../../components/market-overview/MarketTrends";
import TopMovers from "../../components/market-overview/TopMovers";
import MarketHeatmap from "../../components/market-overview/MarketHeatMap";
import PriceGrid from "../../components/market-overview/PriceGrid";
import MarketActivity from "../../components/market-overview/MarketActivity";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MarketOverviewSkeleton from "../../components/market-overview/MarketOverviewSkeleton";

const MarketOverview = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MarketOverviewSkeleton />;
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Market Overview</h1>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li>Market Overview</li>
          </ul>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Market Summary */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 animate-fadeIn">
          <MarketSummary />
        </div>

        {/* Market Trends */}
        <div className="lg:col-span-2 animate-slideInLeft">
          <MarketTrends />
        </div>

        {/* TopMovers + GasTracker Stack */}
        <div className="space-y-4 animate-slideInRight">
          <TopMovers />
        </div>

        {/* Heatmap */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 animate-fadeIn">
          <MarketHeatmap />
        </div>

        {/* Price Grid */}
        <div className="lg:col-span-2 animate-slideInLeft">
          <PriceGrid />
        </div>

        {/* Market Activity */}
        <div className="animate-slideInRight">
          <MarketActivity />
        </div>
      </div>
    </div>

  );
};

export default MarketOverview;
