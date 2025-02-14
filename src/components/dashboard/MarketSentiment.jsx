import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MarketSentiment = () => {
  const [sentiment, setSentiment] = useState({
    bullish: 65,
    bearish: 35,
    fear_greed: 75,
    indicators: {
      volatility: { value: 'Medium', color: 'warning' },
      trend: { value: 'Bullish', color: 'success' },
      momentum: { value: 'Strong', color: 'success' }
    },
    signals: [
      { name: 'RSI', value: 62, signal: 'Neutral' },
      { name: 'MACD', value: 'Bullish', signal: 'Buy' },
      { name: 'MA', value: 'Above 200', signal: 'Buy' }
    ],
    social: {
      twitter: 78,
      reddit: 65,
      news: 70
    }
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSentiment(prev => ({
        ...prev,
        bullish: Math.min(Math.max(prev.bullish + (Math.random() * 4 - 2), 0), 100),
        bearish: Math.min(Math.max(100 - prev.bullish, 0), 100),
        fear_greed: Math.min(Math.max(prev.fear_greed + (Math.random() * 4 - 2), 0), 100)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getFearGreedColor = (value) => {
    if (value >= 75) return 'text-success';
    if (value >= 50) return 'text-warning';
    return 'text-error';
  };


  const renderProgressBar = (value, color = 'primary') => (
    <div className="w-full bg-base-200 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5 }}
        className={`h-full rounded-full bg-${color}`}
      />
    </div>
  );

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-4">
        {/* Header with Overall Sentiment */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-lg">Market Sentiment</h2>
          <div className="badge badge-primary gap-1">
            Live
          </div>
        </div>

        {/* Main Sentiment Gauge */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col items-center">
            <div className="radial-progress text-success" 
              style={{"--value": sentiment.bullish, "--size": "6rem"}}>
              {sentiment.bullish.toFixed(1)}%
            </div>
            <span className="text-sm mt-2">Bullish</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="radial-progress text-error" 
              style={{"--value": sentiment.bearish, "--size": "6rem"}}>
              {sentiment.bearish.toFixed(1)}%
            </div>
            <span className="text-sm mt-2">Bearish</span>
          </div>
        </div>

        {/* Fear & Greed Index */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Fear & Greed Index</span>
            <span className={`font-bold ${getFearGreedColor(sentiment.fear_greed)}`}>
              {sentiment.fear_greed.toFixed(0)}
            </span>
          </div>
          {renderProgressBar(sentiment.fear_greed, 'warning')}
          <div className="flex justify-between text-xs mt-1">
            <span>Extreme Fear</span>
            <span>Extreme Greed</span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-center mt-4 opacity-60">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MarketSentiment;