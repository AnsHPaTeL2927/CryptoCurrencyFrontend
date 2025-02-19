import React from "react";
import { BarChart, Book, Clock, LineChart } from 'lucide-react';

const Skeleton = () => {
  // Tab configuration for mobile view
  const tabs = [
    { id: 'chart', label: 'Chart', icon: <LineChart className="w-4 h-4" /> },
    { id: 'trade', label: 'Trade', icon: <BarChart className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <Book className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <Clock className="w-4 h-4" /> }
  ];

  // Market Info Skeleton
  const MarketInfoSkeleton = () => (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="card-body p-2 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 items-start">
          {/* Symbol Section */}
          <div className="col-span-1 sm:col-span-2 lg:w-auto flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-base-300" />
            <div className="space-y-2">
              <div className="h-6 w-32 bg-base-300 rounded" />
              <div className="h-4 w-24 bg-base-300 rounded" />
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-4">
            <div className="h-6 w-24 bg-base-300 rounded" />
            <div className="h-4 w-16 bg-base-300 rounded" />
          </div>

          {/* Market Stats */}
          <div className="col-span-1 sm:col-span-2 lg:ml-auto">
            <div className="overflow-x-auto">
              <div className="flex gap-4 lg:gap-8 min-w-max lg:min-w-0">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="h-4 w-20 bg-base-300 rounded" />
                    <div className="h-4 w-16 bg-base-300 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Chart Skeleton
  const ChartSkeleton = () => (
    <div className="bg-base-100 rounded-lg p-4 animate-pulse">
      <div className="h-[400px] bg-base-300 rounded-lg" />
    </div>
  );

  // Order Book Skeleton
  const OrderBookSkeleton = () => (
    <div className="bg-base-100 rounded-lg p-4 animate-pulse">
      <div className="h-4 w-32 bg-base-300 rounded mb-4" />
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 w-24 bg-base-300 rounded" />
            <div className="h-3 w-20 bg-base-300 rounded" />
            <div className="h-3 w-24 bg-base-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );

  // Trade Form Skeleton
  const TradeFormSkeleton = () => (
    <div className="bg-base-100 rounded-lg p-4 animate-pulse">
      <div className="space-y-4">
        {/* Buy/Sell Tabs */}
        <div className="flex gap-2">
          <div className="h-10 w-1/2 bg-base-300 rounded" />
          <div className="h-10 w-1/2 bg-base-300 rounded" />
        </div>
        
        {/* Price Input */}
        <div className="h-12 w-full bg-base-300 rounded" />
        
        {/* Amount Input */}
        <div className="h-12 w-full bg-base-300 rounded" />
        
        {/* Percentage Buttons */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 flex-1 bg-base-300 rounded" />
          ))}
        </div>
        
        {/* Submit Button */}
        <div className="h-12 w-full bg-base-300 rounded" />
      </div>
    </div>
  );

  // Trade History Skeleton
  const TradeHistorySkeleton = () => (
    <div className="bg-base-100 rounded-lg p-4 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-4 w-32 bg-base-300 rounded" />
        <div className="h-4 w-24 bg-base-300 rounded" />
      </div>
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 w-24 bg-base-300 rounded" />
            <div className="h-3 w-20 bg-base-300 rounded" />
            <div className="h-3 w-24 bg-base-300 rounded" />
            <div className="h-3 w-16 bg-base-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200">
      {/* Market Info Header - Always visible */}
      <div className="p-2 lg:p-4 sticky top-0 z-10 bg-base-200">
        <MarketInfoSkeleton />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-[calc(100vh-64px)]">
        {/* Tab Content */}
        <div className="flex-1 p-2 overflow-y-auto">
          <ChartSkeleton />
        </div>

        {/* Bottom Navigation Tabs */}
        <div className="btm-nav bg-base-100 border-t border-base-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="text-base-content"
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
                <ChartSkeleton />
              </div>
            </div>

            {/* Trade History */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-4">
                <TradeHistorySkeleton />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-4">
            {/* Order Book */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-4">
                <OrderBookSkeleton />
              </div>
            </div>

            {/* Trade Form */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-4">
                <TradeFormSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;