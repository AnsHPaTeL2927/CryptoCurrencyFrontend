const OrderHistorySkeleton = () => {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="skeleton h-8 w-32"></div>
            <div className="skeleton h-5 w-14"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="skeleton h-4 w-40"></div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="skeleton h-10 w-32"></div>
          <div className="skeleton h-10 w-32"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="skeleton h-4 w-20 mb-2"></div>
              <div className="skeleton h-8 w-16"></div>
              <div className="skeleton h-3 w-24 mt-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Volume Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="skeleton h-4 w-24 mb-2"></div>
              <div className="skeleton h-8 w-32"></div>
              <div className="skeleton h-3 w-28 mt-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section Skeleton */}
      <div className="bg-base-100 shadow rounded-box p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="skeleton h-12 w-full"></div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton h-12 w-28"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table Skeleton */}
      <div className="bg-base-100 shadow rounded-box overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th><div className="skeleton h-4 w-24"></div></th>
              <th><div className="skeleton h-4 w-20"></div></th>
              <th><div className="skeleton h-4 w-16"></div></th>
              <th><div className="skeleton h-4 w-24"></div></th>
              <th><div className="skeleton h-4 w-20"></div></th>
              <th><div className="skeleton h-4 w-20"></div></th>
              <th><div className="skeleton h-4 w-16"></div></th>
              <th><div className="skeleton h-4 w-24"></div></th>
              <th><div className="skeleton h-4 w-20"></div></th>
              <th><div className="skeleton h-4 w-16"></div></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="hover">
                <td><div className="skeleton h-4 w-32"></div></td>
                <td><div className="skeleton h-4 w-24"></div></td>
                <td><div className="skeleton h-4 w-16"></div></td>
                <td><div className="skeleton h-4 w-24"></div></td>
                <td><div className="skeleton h-4 w-24"></div></td>
                <td><div className="skeleton h-4 w-20"></div></td>
                <td>
                  <div className="skeleton w-8 h-8 rounded-full"></div>
                </td>
                <td><div className="skeleton h-4 w-24"></div></td>
                <td><div className="skeleton h-6 w-20 rounded-full"></div></td>
                <td><div className="skeleton h-8 w-16"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <div className="skeleton h-4 w-48"></div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton h-10 w-10"></div>
          ))}
        </div>
      </div>

      {/* Loading State Overlay - Optional */}
      <div className="toast toast-end">
        <div className="alert alert-info">
          <span className="loading loading-spinner"></span>
          <span>Loading order history...</span>
        </div>
      </div>
    </div>
  );
};

export default OrderHistorySkeleton;