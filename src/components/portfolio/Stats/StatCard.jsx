import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
  >
    <div className="card-body">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base-content/60 text-sm">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`flex items-center gap-1 text-sm mt-1 ${change >= 0 ? 'text-success' : 'text-error'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          )}
        </div>
        {Icon && (
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-2xl">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default StatCard;
