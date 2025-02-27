/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { format } from "date-fns";

const RecentActivities = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type.toLowerCase()) {
      case "buy":
        return (
          <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-success"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "sell":
        return (
          <div className="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-error"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-100 shadow-xl h-full" // Added h-full
    >
      <div className="card-body p-3">
        {" "}
        {/* Reduced padding */}
        <div className="flex justify-between items-center mb-3">
          {" "}
          {/* Reduced margin */}
          <h2 className="card-title">Recent Activities</h2>
          <button className="btn btn-ghost btn-sm">View All</button>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-[calc(100%-3rem)]">
          {" "}
          {/* Added overflow handling */}
          {activities.map((activity, index) => (
            <motion.div
              key={activity.time}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors"
            >
              {getActivityIcon(activity.type)}
              <div className="flex-1 min-w-0">
                {" "}
                {/* Added min-w-0 for text truncation */}
                <p className="font-semibold truncate">
                  {activity.type === "buy" ? "Bought" : "Sold"}{" "}
                  {activity.amount} {activity.asset}
                </p>
                <p className="text-sm opacity-70 truncate">
                  at ${activity.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right shrink-0">
                {" "}
                {/* Added shrink-0 */}
                <p className="font-mono">
                  ${(activity.amount * activity.price).toLocaleString()}
                </p>
                <p className="text-xs opacity-70">
                  {format(new Date(activity.time), "MMM d, h:mm a")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentActivities;
