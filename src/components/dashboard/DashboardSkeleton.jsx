const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200 pb-8">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Welcome Banner Skeleton */}
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <div className="skeleton h-8 w-64 mb-2"></div>
                <div className="skeleton h-4 w-48"></div>
              </div>
              <div className="flex gap-4">
                <div className="skeleton h-16 w-32"></div>
                <div className="skeleton h-16 w-32"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview & Live Trades Skeleton */}
        <div className="grid grid-cols-12 gap-6">
          {/* Market Overview */}
          <div className="col-span-12 lg:col-span-9">
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="flex justify-between items-center mb-6">
                  <div className="skeleton h-8 w-48"></div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="skeleton h-8 w-24"></div>
                    ))}
                  </div>
                </div>
                <div className="skeleton h-[300px]"></div>
              </div>
            </div>
          </div>

          {/* Live Trades */}
          <div className="col-span-12 lg:col-span-3">
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="skeleton h-8 w-32 mb-4"></div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="skeleton h-16 w-full mb-2"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Layout Skeleton */}
        <div className="grid grid-cols-12 gap-6">
          {/* Portfolio Summary */}
          <div className="col-span-12 lg:col-span-3">
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="skeleton h-8 w-full mb-4"></div>
                <div className="skeleton h-32 w-full mb-4"></div>
                <div className="skeleton h-24 w-full"></div>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Top Movers */}
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="skeleton h-8 w-48 mb-4"></div>
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton h-16 w-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activities & Sentiment */}
            <div className="grid grid-cols-2 gap-6">
              <div className="card bg-base-100">
                <div className="card-body">
                  <div className="skeleton h-8 w-32 mb-4"></div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton h-16 w-full mb-2"></div>
                  ))}
                </div>
              </div>
              <div className="card bg-base-100">
                <div className="card-body">
                  <div className="skeleton h-8 w-32 mb-4"></div>
                  <div className="skeleton h-32 w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Gas Tracker */}
          <div className="col-span-12 lg:col-span-3">
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="skeleton h-8 w-32 mb-4"></div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="skeleton h-16 w-full mb-2"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;