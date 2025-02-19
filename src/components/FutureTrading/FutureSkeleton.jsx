import React from "react";
import { BarChart, Book, Clock, Wallet, LineChart } from 'lucide-react';

const FutureSkeleton = () => {
  // Tab configuration for mobile view
  const tabs = [
    { id: 'chart', label: 'Chart', icon: <LineChart className="w-4 h-4" /> },
    { id: 'trade', label: 'Trade', icon: <BarChart className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <Book className="w-4 h-4" /> },
    { id: 'positions', label: 'Positions', icon: <Wallet className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <Clock className="w-4 h-4" /> }
  ];

  // Market Info Skeleton
  const MarketInfoSkeleton = () => (
    <div className="p-4 bg-base-100 rounded-lg animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-base-300" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-base-300 rounded" />
            <div className="h-3 w-32 bg-base-300 rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-base-300 rounded" />
          <div className="h-3 w-24 bg-base-300 rounded" />
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
        <div className="flex gap-2">
          <div className="h-8 w-1/2 bg-base-300 rounded" />
          <div className="h-8 w-1/2 bg-base-300 rounded" />
        </div>
        <div className="h-10 w-full bg-base-300 rounded" />
        <div className="h-10 w-full bg-base-300 rounded" />
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 w-full bg-base-300 rounded" />
          ))}
        </div>
        <div className="h-12 w-full bg-base-300 rounded" />
      </div>
    </div>
  );

  // Position History Skeleton
  const PositionHistorySkeleton = () => (
    <div className="bg-base-100 rounded-lg p-4 animate-pulse">
      <div className="space-y-4">
        <div className="flex justify-between mb-4">
          <div className="h-4 w-32 bg-base-300 rounded" />
          <div className="h-4 w-24 bg-base-300 rounded" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 w-32 bg-base-300 rounded" />
            <div className="h-3 w-24 bg-base-300 rounded" />
            <div className="h-3 w-24 bg-base-300 rounded" />
            <div className="h-3 w-24 bg-base-300 rounded" />
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
        <div className="flex-1 p-2">
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
      <div className="hidden lg:flex p-4 gap-4">
        {/* Left Side - Chart & Market Info */}
        <div className="w-2/3 flex flex-col gap-4">
          <ChartSkeleton />
          <PositionHistorySkeleton />
        </div>

        {/* Right Side - Trade Form & Order Book */}
        <div className="w-1/3 flex flex-col gap-4">
          <TradeFormSkeleton />
          <OrderBookSkeleton />
        </div>
      </div>
    </div>
  );
};

export default FutureSkeleton;