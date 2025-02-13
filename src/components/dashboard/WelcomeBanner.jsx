/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const WelcomeBanner = ({ userName, portfolioValue, dailyChange }) => {
  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good Morning' : 
                  currentTime < 18 ? 'Good Afternoon' : 
                  'Good Evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-secondary/90"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {greeting}, {userName}!
            </h1>
            <p className="text-white/80">Welcome back to your crypto dashboard</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="text-white">
              <p className="text-sm text-white/80">Portfolio Value</p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                ${portfolioValue.toLocaleString()}
              </p>
            </div>
            <div className="text-white">
              <p className="text-sm text-white/80">24h Change</p>
              <div className={`flex items-center gap-1 ${dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {dailyChange >= 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
                <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {dailyChange >= 0 ? '+' : ''}{dailyChange}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;