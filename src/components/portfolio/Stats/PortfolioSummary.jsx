/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const PortfolioSummary = ({ totalValue, dayChange, dayChangePercentage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card bg-base-100 shadow-xl"
    >
      <div className="card-body">
        <h3 className="card-title">Total Portfolio Value</h3>
        <motion.p 
          className="text-3xl font-bold"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          ${totalValue.toLocaleString()}
        </motion.p>
        <p className={`text-sm ${dayChange >= 0 ? 'text-success' : 'text-error'}`}>
          24h Change: {dayChangePercentage}%
        </p>
      </div>
    </motion.div>
  );
};

export default PortfolioSummary;