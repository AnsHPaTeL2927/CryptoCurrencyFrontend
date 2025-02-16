import TradingChart from "../../components/SpotTrading/TradingChart";
import OrderBook from "../../components/SpotTrading/OrderBook";
import TradeHistory from "../../components/SpotTrading/TradeHistory";
import TradeForm from "../../components/SpotTrading/TradeForm";
import MarketInfo from "../../components/SpotTrading/MarketInfo";

const SpotTradingPage = () => {
  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Market Info Header */}
        <div className="col-span-12">
          <MarketInfo />
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          {/* Trading Chart */}
          <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body p-2">
              <TradingChart symbol="BTC/USDT" />
            </div>
          </div>

          {/* Trade History (Moved here) */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-4">Trade History</h2>
              <TradeHistory />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Order Book */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-4">Order Book</h2>
              <OrderBook />
            </div>
          </div>

          {/* Trade Form (Moved here) */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <TradeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotTradingPage;
