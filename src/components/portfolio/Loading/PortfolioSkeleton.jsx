const PortfolioSkeleton = () => {
    return (
      <div className="min-h-screen bg-base-200 pb-8">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="skeleton h-10 w-32 mb-2"></div>
              <div className="skeleton h-4 w-48"></div>
            </div>
            <div className="flex gap-2">
              <div className="skeleton h-12 w-28"></div>
              <div className="skeleton h-12 w-28"></div>
            </div>
          </div>
  
          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="skeleton h-4 w-28 mb-2"></div>
                  <div className="skeleton h-8 w-36"></div>
                  <div className="skeleton h-4 w-20"></div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Chart Skeleton */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <div className="skeleton h-8 w-48"></div>
                <div className="skeleton h-10 w-72"></div>
              </div>
              <div className="skeleton h-[400px] w-full"></div>
            </div>
          </div>
  
          {/* Assets Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl lg:col-span-2">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <div className="skeleton h-8 w-32"></div>
                  <div className="skeleton h-10 w-24"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="card bg-base-200">
                      <div className="card-body">
                        <div className="flex items-center gap-4">
                          <div className="skeleton w-12 h-12 rounded-full"></div>
                          <div>
                            <div className="skeleton h-4 w-20 mb-2"></div>
                            <div className="skeleton h-3 w-16"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Distribution Chart Skeleton */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="skeleton h-8 w-40 mb-4"></div>
                <div className="skeleton h-[200px] w-full rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PortfolioSkeleton;