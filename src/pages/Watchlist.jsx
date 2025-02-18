import React, { useState } from "react";
import { Bell, Star, Plus, X, Search } from "lucide-react";

const Watchlist = () => {
  const [watchlistItems, setWatchlistItems] = useState([
    {
      id: 1,
      symbol: "BTC",
      name: "Bitcoin",
      shortCode: "BT",
      price: 48250.32,
      change24h: 2.45,
      marketCap: "915.2B",
      volume24h: "25.6B",
      alerts: true,
      favorite: true,
    },
    {
      id: 2,
      symbol: "ETH",
      name: "Ethereum",
      shortCode: "ET",
      price: 2890.15,
      change24h: -1.2,
      marketCap: "345.8B",
      volume24h: "15.2B",
      alerts: false,
      favorite: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [availableCryptos] = useState([
    { id: 3, symbol: "BNB", name: "Binance Coin", shortCode: "BN" },
    { id: 4, symbol: "ADA", name: "Cardano", shortCode: "AD" },
    { id: 5, symbol: "SOL", name: "Solana", shortCode: "SO" },
  ]);

  const toggleAlert = (id) => {
    setWatchlistItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, alerts: !item.alerts } : item
      )
    );
  };

  const toggleFavorite = (id) => {
    setWatchlistItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const removeFromWatchlist = (id) => {
    setWatchlistItems((items) => items.filter((item) => item.id !== id));
  };

  const addToWatchlist = (crypto) => {
    const newItem = {
      ...crypto,
      price: 0,
      change24h: 0,
      marketCap: "0",
      volume24h: "0",
      alerts: false,
      favorite: false,
    };
    setWatchlistItems((items) => [...items, newItem]);
    setShowAddModal(false);
  };

  return (
    <div className="container mx-auto p-4 lg:p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold">Watchlist</h1>
          <div className="badge badge-primary">{watchlistItems.length}</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-base-content/50" />
              <input
                type="text"
                placeholder="Search assets..."
                className="input bg-base-200 border-none w-full sm:w-[280px] md:w-[350px] pl-10 pr-4 h-12 focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 text-base-content/50 hover:text-base-content"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between sm:justify-start">
            {/* View Toggle */}
            <div className="btn-group">
              <button
                className={`btn btn-sm md:btn-md ${
                  view === "grid" ? "btn-active" : ""
                }`}
                onClick={() => setView("grid")}
              >
                Grid
              </button>
              <button
                className={`btn btn-sm md:btn-md ${
                  view === "list" ? "btn-active" : ""
                }`}
                onClick={() => setView("list")}
              >
                List
              </button>
            </div>

            <button className="btn btn-circle btn-ghost btn-sm md:btn-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="stats shadow">
          <div className="stat p-4">
            <div className="stat-title text-sm md:text-base">Total Assets</div>
            <div className="stat-value text-lg md:text-2xl">
              {watchlistItems.length}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat p-4">
            <div className="stat-title text-sm md:text-base">Favorites</div>
            <div className="stat-value text-lg md:text-2xl">
              {watchlistItems.filter((item) => item.favorite).length}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat p-4">
            <div className="stat-title text-sm md:text-base">Active Alerts</div>
            <div className="stat-value text-lg md:text-2xl">
              {watchlistItems.filter((item) => item.alerts).length}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat p-4">
            <div className="stat-title text-sm md:text-base">24h Change</div>
            <div className="stat-value text-lg md:text-2xl text-success">
              +5.2%
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist Grid */}
      <div
        className={`grid gap-4 lg:gap-6 ${
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {watchlistItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <div className="card-body p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10 md:w-12">
                      <span className="text-lg md:text-xl">
                        {item.shortCode}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold">
                      {item.name}
                    </h3>
                    <p className="text-xs md:text-sm opacity-70">
                      {item.symbol}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 md:gap-2">
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => toggleAlert(item.id)}
                  >
                    <Bell
                      className={`h-4 w-4 ${item.alerts ? "text-primary" : ""}`}
                    />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        item.favorite ? "fill-warning text-warning" : ""
                      }`}
                    />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => removeFromWatchlist(item.id)}
                  >
                    <X className="h-4 w-4 text-error" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs md:text-sm opacity-70">Price</p>
                  <p className="text-sm md:text-base font-bold">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm opacity-70">24h Change</p>
                  <p
                    className={`text-sm md:text-base font-bold ${
                      item.change24h >= 0 ? "text-success" : "text-error"
                    }`}
                  >
                    {item.change24h >= 0 ? "+" : ""}
                    {item.change24h}%
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm opacity-70">Market Cap</p>
                  <p className="text-sm md:text-base font-bold">
                    ${item.marketCap}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm opacity-70">24h Volume</p>
                  <p className="text-sm md:text-base font-bold">
                    ${item.volume24h}
                  </p>
                </div>
              </div>

              <div className="card-actions mt-4 gap-2 md:gap-4">
                <button className="btn btn-primary btn-sm md:btn-md flex-1">
                  Trade
                </button>
                <button className="btn btn-outline btn-sm md:btn-md flex-1">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Asset Card */}
        <div
          className="card bg-base-100 shadow-xl border-2 border-dashed hover:bg-base-200 cursor-pointer transition-all"
          onClick={() => setShowAddModal(true)}
        >
          <div className="card-body items-center justify-center p-4 md:p-6">
            <Plus className="h-8 w-8 md:h-12 md:w-12 mb-2 text-base-content/50" />
            <p className="font-semibold text-sm md:text-base text-base-content/50">
              Add New Asset
            </p>
          </div>
        </div>
      </div>

      {/* Add Crypto Modal */}
      <dialog className={`modal ${showAddModal ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-lg">
          <h3 className="font-bold text-lg mb-4">Add New Asset</h3>
          <div className="flex flex-col gap-4">
            {availableCryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="flex justify-between items-center p-4 bg-base-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8 md:w-10">
                      <span className="text-sm md:text-base">
                        {crypto.shortCode}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base">
                      {crypto.name}
                    </p>
                    <p className="text-xs md:text-sm opacity-70">
                      {crypto.symbol}
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => addToWatchlist(crypto)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowAddModal(false)}>
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowAddModal(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Watchlist;
