
const MarketSummarySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="card bg-base-100 shadow-xl animate-pulse">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 bg-base-300 rounded-lg"></div>
            <div className="w-16 h-4 bg-base-300 rounded"></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-24 h-8 bg-base-300 rounded"></div>
            <div className="w-20 h-4 bg-base-300 rounded"></div>
          </div>
          <div className="mt-4 w-full h-2 bg-base-300 rounded-full"></div>
        </div>
      </div>
    ))}
  </div>
);

const MarketTrendsSkeleton = () => (
  <div className="card bg-base-100 shadow-xl animate-pulse">
    <div className="card-body">
      <div className="flex justify-between items-center mb-6">
        <div className="w-32 h-6 bg-base-300 rounded"></div>
        <div className="flex gap-2">
          <div className="w-24 h-8 bg-base-300 rounded"></div>
          <div className="w-24 h-8 bg-base-300 rounded"></div>
        </div>
      </div>
      <div className="w-full h-[300px] bg-base-300 rounded-lg"></div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-base-300 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
);

const TopMoversSkeleton = () => (
  <div className="card bg-base-100 shadow-xl animate-pulse">
    <div className="card-body">
      <div className="flex justify-between items-center mb-6">
        <div className="w-32 h-6 bg-base-300 rounded"></div>
        <div className="w-24 h-8 bg-base-300 rounded"></div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 bg-base-300 rounded-lg mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-base-200"></div>
            <div className="space-y-2">
              <div className="w-20 h-4 bg-base-200 rounded"></div>
              <div className="w-16 h-3 bg-base-200 rounded"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-base-200 rounded"></div>
            <div className="w-16 h-3 bg-base-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MarketOverviewSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="w-48 h-8 bg-base-300 rounded animate-pulse"></div>
        <div className="w-32 h-4 bg-base-300 rounded animate-pulse"></div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Market Summary */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <MarketSummarySkeleton />
        </div>

        {/* Market Trends */}
        <div className="lg:col-span-2">
          <MarketTrendsSkeleton />
        </div>

        {/* TopMovers + GasTracker Stack */}
        <div className="space-y-4">
          <TopMoversSkeleton />
        </div>

        {/* Market Heatmap */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card bg-base-100 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="flex justify-between items-center mb-6">
                <div className="w-32 h-6 bg-base-300 rounded"></div>
                <div className="flex gap-2">
                  <div className="w-24 h-8 bg-base-300 rounded"></div>
                  <div className="w-24 h-8 bg-base-300 rounded"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-base-300 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Price Grid */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="flex justify-between items-center mb-6">
                <div className="w-32 h-6 bg-base-300 rounded"></div>
                <div className="w-64 h-8 bg-base-300 rounded"></div>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-base-300 rounded-lg mb-2"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Activity */}
        <div>
          <div className="card bg-base-100 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="flex justify-between items-center mb-6">
                <div className="w-32 h-6 bg-base-300 rounded"></div>
                <div className="w-24 h-8 bg-base-300 rounded"></div>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-base-300 rounded-lg mb-2"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverviewSkeleton;