import { useState, useEffect } from "react";
import {
  Calendar,
  Download,
  Filter,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCcw,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import OrderHistorySkeleton from "../../components/OrderHistory/OrderHistorySkeleton";

const OrderHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPair, setSelectedPair] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  // Sample data
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    totalValue: 0,
    successRate: 0,
    todayVolume: 0,
    monthVolume: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Sample data
        const ordersData = [
          {
            id: '1',
            type: 'buy',
            pair: 'BTC/USDT',
            symbol: 'BTC',
            amount: 0.5,
            price: 48250.32,
            total: 24125.16,
            status: 'completed',
            date: '2024-02-17T14:30:00',
            filled: '100%',
            fee: '0.001 BTC',
            txId: '0x1234...5678',
            orderType: 'Market',
            avgFillPrice: 48250.32
          },
          {
            id: '2',
            type: 'sell',
            pair: 'ETH/USDT',
            symbol: 'ETH',
            amount: 2.5,
            price: 2890.15,
            total: 7225.38,
            status: 'pending',
            date: '2024-02-17T13:45:00',
            filled: '0%',
            fee: '0.005 ETH',
            txId: '0x8765...4321',
            orderType: 'Limit',
            avgFillPrice: 0
          },
        ];

        const statsData = {
          totalOrders: 150,
          completedOrders: 120,
          pendingOrders: 20,
          cancelledOrders: 10,
          totalValue: 125890.45,
          successRate: 80,
          todayVolume: 35250.75,
          monthVolume: 890450.25
        };

        setOrders(ordersData);
        setStats(statsData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load order history. Please try again.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Error Loading Order History</h3>
            <div className="text-sm">{error}</div>
          </div>
          <button className="btn btn-sm" onClick={handleRefresh}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (isLoading || !stats) {
    return <OrderHistorySkeleton />;
  }

  const timeframes = ['24H', '7D', '1M', '3M', 'ALL'];
  const orderTypes = ['all', 'buy', 'sell'];
  const statusTypes = ['all', 'completed', 'pending', 'cancelled'];
  const tradingPairs = ['all', 'BTC/USDT', 'ETH/USDT', 'BNB/USDT'];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  return (
    <div className="container mx-auto p-4 lg:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">Order History</h1>
            <div className="badge badge-primary">Live</div>
          </div>
          <div className="flex items-center gap-2 text-base-content/60">
            <Clock className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <button className="btn btn-ghost btn-xs">
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-outline gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline gap-2">
              <Download className="h-4 w-4" />
              Export
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Export as CSV</a>
              </li>
              <li>
                <a>Export as PDF</a>
              </li>
              <li>
                <a>Export as Excel</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-desc text-success">↗ 14% vs last month</div>
          </div>
        </div>

        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-figure text-success">
              <CheckCircle2 className="w-8 h-8 stroke-current" />
            </div>
            <div className="stat-title">Success Rate</div>
            <div className="stat-value text-success">{stats.successRate}%</div>
            <div className="stat-desc">
              {stats.completedOrders} completed orders
            </div>
          </div>
        </div>

        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-figure text-warning">
              <AlertCircle className="w-8 h-8 stroke-current" />
            </div>
            <div className="stat-title">Pending Orders</div>
            <div className="stat-value text-warning">{stats.pendingOrders}</div>
            <div className="stat-desc">Requires attention</div>
          </div>
        </div>

        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <XCircle className="w-8 h-8 stroke-current" />
            </div>
            <div className="stat-title">Cancelled Orders</div>
            <div className="stat-value text-error">{stats.cancelledOrders}</div>
            <div className="stat-desc">Last 30 days</div>
          </div>
        </div>
      </div>

      {/* Volume Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-title">Today's Volume</div>
            <div className="stat-value">
              ${stats.todayVolume.toLocaleString()}
            </div>
            <div className="stat-desc text-success">↗ 8% vs yesterday</div>
          </div>
        </div>

        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-title">Monthly Volume</div>
            <div className="stat-value">
              ${stats.monthVolume.toLocaleString()}
            </div>
            <div className="stat-desc text-success">↗ 23% vs last month</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-base-100 shadow rounded-box p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
            <input
              type="text"
              placeholder="Search by Order ID, Symbol, or TxID..."
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline gap-2">
                <Calendar className="h-4 w-4" />
                {selectedTimeframe}
                <ChevronDown className="h-4 w-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {timeframes.map((timeframe) => (
                  <li key={timeframe}>
                    <a
                      className={
                        timeframe === selectedTimeframe ? "active" : ""
                      }
                      onClick={() => setSelectedTimeframe(timeframe)}
                    >
                      {timeframe}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline gap-2">
                Pair: {selectedPair}
                <ChevronDown className="h-4 w-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {tradingPairs.map((pair) => (
                  <li key={pair}>
                    <a
                      className={pair === selectedPair ? "active" : ""}
                      onClick={() => setSelectedPair(pair)}
                    >
                      {pair}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline gap-2">
                Type: {selectedType.toUpperCase()}
                <ChevronDown className="h-4 w-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {orderTypes.map((type) => (
                  <li key={type}>
                    <a
                      className={type === selectedType ? "active" : ""}
                      onClick={() => setSelectedType(type)}
                    >
                      {type.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline gap-2">
                Status: {selectedStatus.toUpperCase()}
                <ChevronDown className="h-4 w-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {statusTypes.map((status) => (
                  <li key={status}>
                    <a
                      className={status === selectedStatus ? "active" : ""}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-base-100 shadow rounded-box overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Pair</th>
              <th>Type</th>
              <th>Order Type</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Filled</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover">
                <td className="whitespace-nowrap">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="font-medium">{order.pair}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {order.type === "buy" ? (
                      <ArrowDownRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-error" />
                    )}
                    <span
                      className={
                        order.type === "buy" ? "text-success" : "text-error"
                      }
                    >
                      {order.type.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td>{order.orderType}</td>
                <td className="font-medium">${order.price.toLocaleString()}</td>
                <td>
                  {order.amount} {order.symbol}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div
                      className="radial-progress"
                      style={{
                        "--value": parseInt(order.filled),
                        "--size": "2rem",
                      }}
                    >
                      {order.filled}
                    </div>
                  </div>
                </td>
                <td className="font-medium">${order.total.toLocaleString()}</td>
                <td>
                  <div
                    className={`badge ${
                      order.status === "completed"
                        ? "badge-success"
                        : order.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    } badge-sm`}
                  >
                    {order.status}
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleOrderClick(order)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <div className="text-sm text-base-content/60">
          Showing <span className="font-medium">1-10</span> of{" "}
          <span className="font-medium">150</span> orders
        </div>
        <div className="join">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-sm text-base-content/60">
              Showing <span className="font-medium">1-10</span> of{" "}
              <span className="font-medium">150</span> orders
            </div>
            <div className="join">
              <button className="join-item btn btn-sm md:btn-md">«</button>
              <button className="join-item btn btn-sm md:btn-md btn-active">
                1
              </button>
              <button className="join-item btn btn-sm md:btn-md">2</button>
              <button className="join-item btn btn-sm md:btn-md">3</button>
              <button className="join-item btn btn-sm md:btn-md">»</button>
            </div>
          </div>

          {/* Order Details Modal */}
          <dialog className={`modal ${showDetails ? "modal-open" : ""}`}>
            <div className="modal-box max-w-3xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Order Details</h3>
                  <p className="text-sm text-base-content/60">
                    Order ID: {selectedOrder?.id}
                  </p>
                </div>
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-circle btn-ghost"
                    onClick={() => setShowDetails(false)}
                  >
                    ✕
                  </button>
                </form>
              </div>

              {selectedOrder && (
                <div className="space-y-6">
                  {/* Order Status Banner */}
                  <div
                    className={`alert ${
                      selectedOrder.status === "completed"
                        ? "alert-success"
                        : selectedOrder.status === "pending"
                        ? "alert-warning"
                        : "alert-error"
                    }`}
                  >
                    <div>
                      {selectedOrder.status === "completed" && (
                        <CheckCircle2 className="h-6 w-6" />
                      )}
                      {selectedOrder.status === "pending" && (
                        <AlertCircle className="h-6 w-6" />
                      )}
                      {selectedOrder.status === "cancelled" && (
                        <XCircle className="h-6 w-6" />
                      )}
                      <div>
                        <h3 className="font-bold capitalize">
                          {selectedOrder.status}
                        </h3>
                        <div className="text-xs">
                          Last updated:{" "}
                          {new Date(selectedOrder.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-base-200">
                      <div className="card-body p-4">
                        <h3 className="card-title text-base">Trade Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-base-content/60">
                              Trading Pair
                            </span>
                            <span className="font-medium">
                              {selectedOrder.pair}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-base-content/60">Type</span>
                            <span
                              className={`font-medium ${
                                selectedOrder.type === "buy"
                                  ? "text-success"
                                  : "text-error"
                              }`}
                            >
                              {selectedOrder.type.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-base-content/60">
                              Order Type
                            </span>
                            <span className="font-medium">
                              {selectedOrder.orderType}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-base-content/60">Amount</span>
                            <span className="font-medium">
                              {selectedOrder.amount} {selectedOrder.symbol}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-200">
                      <div className="card-body p-4">
                        <h3 className="card-title text-base">
                          Price Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-base-content/60">Price</span>
                            <span className="font-medium">
                              ${selectedOrder.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-base-content/60">
                              Total Value
                            </span>
                            <span className="font-medium">
                              ${selectedOrder.total.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-base-content/60">Fee</span>
                            <span className="font-medium">
                              {selectedOrder.fee}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-base-content/60">Filled</span>
                            <span className="font-medium">
                              {selectedOrder.filled}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="card bg-base-200">
                    <div className="card-body p-4">
                      <h3 className="card-title text-base">
                        Transaction Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-base-content/60">
                            Transaction ID
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-medium">
                              {selectedOrder.txId}
                            </span>
                            <button className="btn btn-ghost btn-xs">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {selectedOrder.status === "completed" && (
                          <div className="flex justify-between">
                            <span className="text-base-content/60">
                              Average Fill Price
                            </span>
                            <span className="font-medium">
                              ${selectedOrder.avgFillPrice.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 justify-end">
                    {selectedOrder.status === "pending" && (
                      <>
                        <button className="btn btn-error btn-outline">
                          Cancel Order
                        </button>
                        <button className="btn btn-primary">
                          Modify Order
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-outline"
                      onClick={() => setShowDetails(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setShowDetails(false)}>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
